// Pronóstico de Horas Frío (HF) para los próximos días, desde Open-Meteo.
//
// agrometeorologia.cl (lib/agromet.ts) solo entrega datos HISTÓRICOS/observados.
// Para PREDECIR las HF de los próximos 14 días usamos Open-Meteo, que es gratis,
// sin API key y entrega temperatura HORARIA (indispensable para contar HF).
//
// Reutiliza el mismo modelo de HF de la app (lib/cold-hours.ts, rango 0–7.2 °C)
// para que el pronóstico sea consistente con el cálculo histórico.

import {
  calculateHourlyHF,
  calculateProgress,
  canApplyCyanamide,
  type HourlyRecord,
} from "./cold-hours";

// Coordenadas de la estación "Los Lingues, San Fernando" (INIA-329).
// Aproximadas: ajusta si tienes las exactas del predio.
export const LOS_LINGUES = {
  nombre: "Los Lingues",
  lat: -34.6275,
  lon: -70.9192,
  tz: "America/Santiago",
};

const HOURLY_VARS = [
  "temperature_2m",
  "relative_humidity_2m",
  "dew_point_2m",
  "wind_speed_10m",
  "precipitation",
  "precipitation_probability",
].join(",");

export interface ForecastHour extends HourlyRecord {
  humedad: number | null;
  puntoRocio: number | null;
  viento: number | null;
  precip: number | null;
  probPrecip: number | null;
}

export interface DailyHF {
  dia: string; // "YYYY-MM-DD"
  horasFrio: number; // nº de horas con 0 ≤ T ≤ 7.2 °C
  tMin: number | null;
  tMax: number | null;
}

export interface ForecastResult {
  ubicacion: string;
  generado: string; // ISO timestamp de generación
  dias: number; // nº de días solicitados
  hourly: ForecastHour[];
  resumenDiario: DailyHF[];
  totalHF: number;
}

/** Convierte "2026-06-21T14:00" -> "2026-06-21 14:00". */
function toAppDateTime(t: string): string {
  return t.replace("T", " ");
}

/**
 * Descarga el pronóstico horario de los próximos `days` días para Los Lingues.
 * Pensado para ejecutarse en el SERVIDOR (API route).
 */
export async function fetchForecast(days = 14): Promise<ForecastResult> {
  const params = new URLSearchParams({
    latitude: String(LOS_LINGUES.lat),
    longitude: String(LOS_LINGUES.lon),
    hourly: HOURLY_VARS,
    timezone: LOS_LINGUES.tz,
    forecast_days: String(days),
    wind_speed_unit: "kmh",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Open-Meteo respondió HTTP ${res.status}`);
  }

  const json = await res.json();
  const h = json.hourly;
  if (!h || !Array.isArray(h.time)) {
    throw new Error("Respuesta de Open-Meteo sin datos horarios.");
  }

  const hourly: ForecastHour[] = h.time.map((t: string, i: number) => ({
    fecha_hora: toAppDateTime(t),
    temperatura: h.temperature_2m?.[i] ?? NaN,
    humedad: h.relative_humidity_2m?.[i] ?? null,
    puntoRocio: h.dew_point_2m?.[i] ?? null,
    viento: h.wind_speed_10m?.[i] ?? null,
    precip: h.precipitation?.[i] ?? null,
    probPrecip: h.precipitation_probability?.[i] ?? null,
  }));

  const resumenDiario = resumirPorDia(hourly);
  const totalHF = resumenDiario.reduce((acc, d) => acc + d.horasFrio, 0);

  return {
    ubicacion: LOS_LINGUES.nombre,
    generado: new Date().toISOString(),
    dias: days,
    hourly,
    resumenDiario,
    totalHF,
  };
}

// ----- Proyección de cianamida -----
//
// La cianamida se aplica cuando las HF ACUMULADAS (desde el inicio de dormancia)
// alcanzan el umbral de la variedad (% de su requerimiento). El pronóstico solo
// cubre los próximos días, así que partimos de las HF ya acumuladas hasta hoy
// (baseHF, de la calculadora histórica) y le sumamos las HF proyectadas día a día.

export interface DayProjection extends DailyHF {
  acumuladoHF: number; // baseHF + HF proyectadas hasta este día (inclusive)
  progreso: number; // % respecto al requerimiento de la variedad
  alcanza: boolean; // true si ese día ya se cumple el umbral de cianamida
}

export interface CyanamideProjection {
  baseHF: number;
  requiredHF: number;
  threshold: number; // % mínimo para aplicar
  thresholdHF: number; // HF equivalentes al umbral
  dias: DayProjection[];
  yaAlcanzado: boolean; // las HF de hoy ya cumplen el umbral
  diaAlcanza: DayProjection | null; // primer día del pronóstico que cruza el umbral
  totalProyectado: number; // baseHF + total HF de los 14 días
  progresoFinal: number; // % al final de la ventana
  faltanHF: number; // HF que faltarían al final si no se alcanza (>=0)
}

/**
 * Proyecta el avance de dormancia día a día y determina si/ cuándo se puede
 * aplicar cianamida. Reutiliza el modelo de la app (calculateProgress / canApplyCyanamide).
 */
export function proyectarCianamida(
  resumen: DailyHF[],
  baseHF: number,
  requiredHF: number,
  threshold: number
): CyanamideProjection {
  const thresholdHF = (requiredHF * threshold) / 100;

  let acc = baseHF;
  let diaAlcanza: DayProjection | null = null;

  const dias: DayProjection[] = resumen.map((d) => {
    acc += d.horasFrio;
    const progreso = calculateProgress(acc, requiredHF);
    const alcanza = canApplyCyanamide(progreso, threshold);
    const dp: DayProjection = { ...d, acumuladoHF: acc, progreso, alcanza };
    if (alcanza && !diaAlcanza) diaAlcanza = dp;
    return dp;
  });

  const yaAlcanzado = canApplyCyanamide(
    calculateProgress(baseHF, requiredHF),
    threshold
  );
  const totalProyectado = acc;
  const progresoFinal = calculateProgress(totalProyectado, requiredHF);
  const faltanHF = Math.max(0, Math.ceil(thresholdHF - totalProyectado));

  return {
    baseHF,
    requiredHF,
    threshold,
    thresholdHF,
    dias,
    yaAlcanzado,
    diaAlcanza,
    totalProyectado,
    progresoFinal,
    faltanHF,
  };
}

/** Agrupa las horas por día y cuenta HF usando el modelo oficial de la app. */
export function resumirPorDia(hourly: ForecastHour[]): DailyHF[] {
  const porDia = new Map<string, DailyHF>();

  for (const r of hourly) {
    const temp = Number(r.temperatura);
    if (Number.isNaN(temp)) continue;
    const dia = r.fecha_hora.slice(0, 10);

    let d = porDia.get(dia);
    if (!d) {
      d = { dia, horasFrio: 0, tMin: temp, tMax: temp };
      porDia.set(dia, d);
    }
    d.horasFrio += calculateHourlyHF(temp);
    d.tMin = d.tMin === null ? temp : Math.min(d.tMin, temp);
    d.tMax = d.tMax === null ? temp : Math.max(d.tMax, temp);
  }

  return [...porDia.values()].sort((a, b) => a.dia.localeCompare(b.dia));
}
