// Lógica de cálculo de Horas Frío (HF).
// Modelo simple de rango: 1 HF por cada hora con temperatura entre 0°C y 7.2°C.

export interface HourlyRecord {
  fecha_hora: string; // "2026-05-01 00:00"
  temperatura: number; // °C
}

export interface HourlyResult extends HourlyRecord {
  hf: number; // HF de esa hora (0 ó 1)
  hfAcumulada: number; // HF acumuladas hasta esa fila inclusive
  dateValue: number; // timestamp para ordenar/graficar
}

export interface ColdHoursResult {
  rows: HourlyResult[];
  totalHF: number;
  startDate: string | null; // fecha primera fila considerada
  endDate: string | null; // fecha última fila considerada
}

/**
 * HF horaria: 1 si 0 <= temp <= 7.2, si no 0.
 */
export function calculateHourlyHF(temperature: number): number {
  if (temperature >= 0 && temperature <= 7.2) return 1;
  return 0;
}

/**
 * Convierte "2026-05-01 00:00" (o ISO) a timestamp. Devuelve NaN si inválido.
 */
function parseFecha(fecha: string): number {
  // Acepta "YYYY-MM-DD HH:mm" reemplazando espacio por T para parseo robusto.
  const normalized = fecha.trim().replace(" ", "T");
  const t = new Date(normalized).getTime();
  return t;
}

/**
 * Calcula HF acumuladas desde una fecha de inicio de dormancia hasta una
 * fecha final (o la última fila disponible).
 *
 * @param data registros horarios (fecha_hora, temperatura)
 * @param startDate fecha inicio dormancia (Date | string ISO) — opcional
 * @param endDate fecha final considerada (Date | string ISO) — opcional
 */
export function calculateColdHours(
  data: HourlyRecord[],
  startDate?: Date | string,
  endDate?: Date | string
): ColdHoursResult {
  const startTs =
    startDate != null
      ? new Date(startDate).getTime()
      : Number.NEGATIVE_INFINITY;
  const endTs =
    endDate != null ? new Date(endDate).getTime() : Number.POSITIVE_INFINITY;

  // Normalizar, filtrar por rango de fechas y ordenar cronológicamente.
  const filtered = data
    .map((r) => ({
      fecha_hora: r.fecha_hora,
      temperatura: Number(r.temperatura),
      dateValue: parseFecha(r.fecha_hora),
    }))
    .filter(
      (r) =>
        !Number.isNaN(r.dateValue) &&
        !Number.isNaN(r.temperatura) &&
        r.dateValue >= startTs &&
        r.dateValue <= endTs
    )
    .sort((a, b) => a.dateValue - b.dateValue);

  let acc = 0;
  const rows: HourlyResult[] = filtered.map((r) => {
    const hf = calculateHourlyHF(r.temperatura);
    acc += hf;
    return {
      fecha_hora: r.fecha_hora,
      temperatura: r.temperatura,
      hf,
      hfAcumulada: acc,
      dateValue: r.dateValue,
    };
  });

  return {
    rows,
    totalHF: acc,
    startDate: rows.length ? rows[0].fecha_hora : null,
    endDate: rows.length ? rows[rows.length - 1].fecha_hora : null,
  };
}

/**
 * Porcentaje de avance respecto al requerimiento de la variedad.
 */
export function calculateProgress(totalHF: number, requiredHF: number): number {
  if (requiredHF <= 0) return 0;
  return (totalHF / requiredHF) * 100;
}

/**
 * ¿Se puede aplicar cianamida? True si avance >= umbral (default 70%).
 */
export function canApplyCyanamide(progress: number, threshold = 70): boolean {
  return progress >= threshold;
}
