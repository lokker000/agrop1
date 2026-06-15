// Cliente del portal oficial agrometeorologia.cl (Red Agrometeorológica de INIA).
//
// NO existe API REST pública documentada. Este módulo reproduce el flujo que usa
// el propio sitio: hace POST al formulario de "consulta", el servidor genera un
// CSV temporal y devuelve su URL; luego se descarga y parsea ese CSV.
//
// Endpoint:  POST https://agrometeorologia.cl/consulta
//   estaciones[] = ID de estación (ej "INIA-202", "EXT-225")
//   variables[]  = "TA_AVG"  (Temperatura del Aire, promedio horario)
//   intervalo    = "hour"
//   desde / hasta = "DD-MM-YYYY"
//   vista[]      = "csv"
// Respuesta: HTML con enlace a https://agrometeorologia.cl/tmp/agrometeorologia-*.csv
//
// El CSV trae cabecera (5 líneas) + columna "Tiempo UTC-4" y "Temperatura del Aire ºC".

import type { HourlyRecord } from "./cold-hours";

const BASE = "https://agrometeorologia.cl";

/** Convierte "YYYY-MM-DD" -> "DD-MM-YYYY" (formato que espera el portal). */
function toPortalDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

/** "DD-MM-YYYY HH:mm" -> "YYYY-MM-DD HH:mm" (formato interno de la app). */
function fromPortalDateTime(s: string): string {
  const [date, time] = s.trim().split(" ");
  const [d, m, y] = date.split("-");
  return `${y}-${m}-${d} ${time ?? "00:00"}`;
}

/**
 * Parsea el CSV oficial de agromet a registros horarios.
 * Ignora cabeceras y filas sin valor de temperatura.
 */
export function parseAgrometCsv(csv: string): HourlyRecord[] {
  const lines = csv.split(/\r?\n/);
  const out: HourlyRecord[] = [];

  for (const line of lines) {
    // Celdas entre comillas separadas por coma: "01-06-2024 00:00","11","100"
    const cells = line
      .split(",")
      .map((c) => c.replace(/^"|"$/g, "").trim());

    const fecha = cells[0];
    const temp = cells[1];

    // Validar que la primera celda sea una fecha "DD-MM-YYYY HH:mm".
    if (!/^\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}/.test(fecha)) continue;
    if (temp === "" || temp == null) continue; // hueco de datos

    const t = Number(temp.replace(",", "."));
    if (Number.isNaN(t)) continue;

    out.push({
      fecha_hora: fromPortalDateTime(fecha),
      temperatura: t,
    });
  }

  return out;
}

export interface AgrometQuery {
  stationId: string; // "INIA-202"
  from: string; // "YYYY-MM-DD"
  to: string; // "YYYY-MM-DD"
}

/**
 * Descarga datos horarios oficiales de temperatura del aire desde agromet.
 * Pensado para ejecutarse en el SERVIDOR (API route), nunca en el browser
 * (el portal no envía cabeceras CORS).
 */
export async function fetchAgrometHourly(
  q: AgrometQuery
): Promise<HourlyRecord[]> {
  const body = new URLSearchParams();
  body.append("estaciones[]", q.stationId);
  body.append("variables[]", "TA_AVG");
  body.append("intervalo", "hour");
  body.append("desde", toPortalDate(q.from));
  body.append("hasta", toPortalDate(q.to));
  body.append("vista[]", "csv");

  // 1) POST que genera el CSV temporal en el servidor de agromet.
  const res = await fetch(`${BASE}/consulta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Referer: `${BASE}/consulta`,
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`agromet respondió HTTP ${res.status}`);
  }

  const html = await res.text();

  // 2) Extraer la URL del CSV generado.
  const match = html.match(
    /https:\/\/agrometeorologia\.cl\/tmp\/[^"']+\.csv/i
  );
  if (!match) {
    throw new Error(
      "agromet no devolvió un archivo CSV (estación sin datos o formato cambiado)."
    );
  }

  // 3) Descargar y parsear el CSV.
  const csvRes = await fetch(match[0], {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!csvRes.ok) {
    throw new Error(`No se pudo descargar el CSV (HTTP ${csvRes.status}).`);
  }
  const csv = await csvRes.text();

  return parseAgrometCsv(csv);
}
