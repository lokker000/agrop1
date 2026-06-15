// Utilidades Excel con xlsx-js-style (fork de SheetJS con soporte de estilos):
// plantilla estilizada, lectura y exportación.
import * as XLSX from "xlsx-js-style";
import type { HourlyRecord, HourlyResult } from "./cold-hours";

export const TEMPLATE_COLUMNS = ["fecha_hora", "temperatura"] as const;

// ---- Paleta agrícola para las celdas (sin "#") ----
const C = {
  green700: "047857",
  green600: "059669",
  green50: "ECFDF5",
  greenBand: "F0FBF6",
  sky600: "0284C7",
  sky50: "E0F2FE",
  gray700: "374151",
  gray400: "9CA3AF",
  white: "FFFFFF",
  border: "D1FAE5",
};

const thinBorder = {
  top: { style: "thin", color: { rgb: C.border } },
  bottom: { style: "thin", color: { rgb: C.border } },
  left: { style: "thin", color: { rgb: C.border } },
  right: { style: "thin", color: { rgb: C.border } },
};

/**
 * Descarga una plantilla Excel visualmente atractiva:
 * título, instrucciones, cabecera verde y filas de ejemplo.
 * Lista para que el usuario la complete y la vuelva a subir.
 */
export function downloadTemplate(filename = "plantilla_horas_frio.xlsx") {
  const ejemplo = [
    ["2026-05-01 00:00", 4.8],
    ["2026-05-01 01:00", 5.2],
    ["2026-05-01 02:00", 8.1],
    ["2026-05-01 03:00", 3.6],
  ];

  // Layout (array de arrays). Filas 0..: título, subtítulo, instrucciones,
  // separador, cabecera, ejemplos, fila vacía guía.
  const aoa: (string | number)[][] = [
    ["❄  Calculadora de Horas Frío — Plantilla de datos", ""],
    ["Completa una fila por cada hora y vuelve a subir este archivo.", ""],
    ["Formato fecha: AAAA-MM-DD HH:mm   ·   Temperatura en °C (usa punto decimal)", ""],
    ["", ""],
    ["fecha_hora", "temperatura"],
    ...ejemplo,
    ["", ""],
  ];

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // Merges para título e instrucciones (ocupan 2 columnas).
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
  ];

  // Anchos y altos.
  ws["!cols"] = [{ wch: 26 }, { wch: 18 }];
  ws["!rows"] = [{ hpt: 30 }, { hpt: 18 }, { hpt: 18 }, { hpt: 8 }, { hpt: 22 }];

  const set = (addr: string, style: Record<string, unknown>) => {
    if (ws[addr]) ws[addr].s = style;
  };

  // Título.
  set("A1", {
    font: { bold: true, sz: 15, color: { rgb: C.white } },
    fill: { fgColor: { rgb: C.green700 } },
    alignment: { vertical: "center", horizontal: "left", indent: 1 },
  });
  // Subtítulo + instrucciones.
  set("A2", {
    font: { sz: 11, color: { rgb: C.gray700 } },
    fill: { fgColor: { rgb: C.green50 } },
    alignment: { vertical: "center", horizontal: "left", indent: 1 },
  });
  set("A3", {
    font: { italic: true, sz: 10, color: { rgb: C.sky600 } },
    fill: { fgColor: { rgb: C.sky50 } },
    alignment: { vertical: "center", horizontal: "left", indent: 1 },
  });

  // Cabecera de columnas (fila 5 => índice 4).
  const headerStyle = {
    font: { bold: true, sz: 11, color: { rgb: C.white } },
    fill: { fgColor: { rgb: C.green600 } },
    alignment: { vertical: "center", horizontal: "center" },
    border: thinBorder,
  };
  set("A5", headerStyle);
  set("B5", headerStyle);

  // Filas de ejemplo (6..9) con banda alterna.
  ejemplo.forEach((_, i) => {
    const r = 6 + i; // fila 1-based
    const band = i % 2 === 0 ? C.white : C.greenBand;
    set(`A${r}`, {
      font: { sz: 11, color: { rgb: C.gray700 } },
      fill: { fgColor: { rgb: band } },
      alignment: { horizontal: "center" },
      border: thinBorder,
    });
    set(`B${r}`, {
      font: { sz: 11, color: { rgb: C.gray700 } },
      fill: { fgColor: { rgb: band } },
      alignment: { horizontal: "center" },
      border: thinBorder,
      numFmt: "0.0",
    });
  });

  // Congelar hasta la cabecera para que se vea siempre.
  ws["!freeze"] = { xSplit: 0, ySplit: 5 };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Datos HF");
  XLSX.utils.book_append_sheet(wb, buildInstructionsSheet(), "Instrucciones");
  XLSX.writeFile(wb, filename);
}

/**
 * Construye la hoja "Instrucciones" estilizada con guía paso a paso.
 */
function buildInstructionsSheet() {
  // Cada fila: [texto, tipo de estilo].
  type Kind = "title" | "section" | "step" | "text" | "note" | "blank";
  const lines: [string, Kind][] = [
    ["❄  Cómo completar esta plantilla", "title"],
    ["", "blank"],
    ["¿Qué es?", "section"],
    [
      "Esta plantilla registra la temperatura del aire hora por hora. Con esos datos la app calcula las Horas Frío (HF) acumuladas para tu cultivo.",
      "text",
    ],
    ["", "blank"],
    ["Pasos", "section"],
    ["1.  Ve a la hoja «Datos HF» (pestaña inferior).", "step"],
    ["2.  Completa una fila por cada hora del periodo que quieras evaluar.", "step"],
    ["3.  Columna fecha_hora: usa el formato AAAA-MM-DD HH:mm   (ej: 2026-05-01 06:00).", "step"],
    ["4.  Columna temperatura: grados Celsius, con punto decimal   (ej: 4.8).", "step"],
    ["5.  Guarda el archivo y vuelve a subirlo en la app.", "step"],
    ["", "blank"],
    ["Reglas importantes", "section"],
    ["•  No cambies los nombres de las columnas: fecha_hora y temperatura.", "text"],
    ["•  Puedes borrar las filas de ejemplo y poner tus propios datos.", "text"],
    ["•  Idealmente un dato por hora (24 por día). Si falta alguna hora, no pasa nada.", "text"],
    ["•  Si una celda de temperatura queda vacía, esa hora se ignora en el cálculo.", "text"],
    ["", "blank"],
    ["¿Cómo se calculan las Horas Frío?", "section"],
    ["•  Cada hora con temperatura entre 0 °C y 7.2 °C suma 1 Hora Frío.", "text"],
    ["•  Temperaturas bajo 0 °C o sobre 7.2 °C suman 0.", "text"],
    ["•  Al 70 % del requerimiento de la variedad ya se puede aplicar cianamida.", "note"],
    ["", "blank"],
    ["Consejo: también puedes obtener datos oficiales automáticamente desde una", "text"],
    ["estación de la Red Agrometeorológica de INIA dentro de la app.", "text"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(lines.map(([t]) => [t]));
  ws["!cols"] = [{ wch: 95 }];
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }];

  const styles: Record<Kind, Record<string, unknown>> = {
    title: {
      font: { bold: true, sz: 15, color: { rgb: C.white } },
      fill: { fgColor: { rgb: C.green700 } },
      alignment: { vertical: "center", horizontal: "left", indent: 1 },
    },
    section: {
      font: { bold: true, sz: 12, color: { rgb: C.green700 } },
      fill: { fgColor: { rgb: C.green50 } },
      alignment: { vertical: "center", horizontal: "left", indent: 1 },
    },
    step: {
      font: { sz: 11, color: { rgb: C.gray700 } },
      alignment: { vertical: "center", horizontal: "left", indent: 1, wrapText: true },
    },
    text: {
      font: { sz: 11, color: { rgb: C.gray700 } },
      alignment: { vertical: "center", horizontal: "left", indent: 1, wrapText: true },
    },
    note: {
      font: { bold: true, italic: true, sz: 11, color: { rgb: C.sky600 } },
      fill: { fgColor: { rgb: C.sky50 } },
      alignment: { vertical: "center", horizontal: "left", indent: 1, wrapText: true },
    },
    blank: {},
  };

  const rows: { hpt: number }[] = [];
  lines.forEach(([, kind], i) => {
    const addr = `A${i + 1}`;
    if (ws[addr]) ws[addr].s = styles[kind];
    rows.push({ hpt: kind === "title" ? 30 : kind === "blank" ? 8 : 20 });
  });
  ws["!rows"] = rows;

  return ws;
}

export interface ParseResult {
  ok: boolean;
  data: HourlyRecord[];
  error?: string;
}

/**
 * Convierte un valor de celda (string, número o fecha de Excel) a
 * texto "YYYY-MM-DD HH:mm".
 */
function cellToFechaHora(value: unknown): string {
  if (value instanceof Date) {
    return formatDate(value);
  }
  if (typeof value === "number") {
    // Número serial de Excel -> fecha JS.
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      const d = new Date(
        parsed.y,
        (parsed.m || 1) - 1,
        parsed.d || 1,
        parsed.H || 0,
        parsed.M || 0
      );
      return formatDate(d);
    }
  }
  return String(value).trim();
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Lee un archivo Excel subido y devuelve los registros horarios.
 * Valida que existan las columnas fecha_hora y temperatura.
 */
export async function readExcelFile(file: File): Promise<ParseResult> {
  try {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: "array", cellDates: true });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    if (!sheet) {
      return { ok: false, data: [], error: "El archivo no contiene hojas." };
    }

    // Leer como matriz cruda para localizar la fila de cabecera. Así soporta
    // tanto la plantilla estilizada (título + instrucciones arriba) como un
    // Excel plano donde la cabecera está en la primera fila.
    const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      defval: "",
      blankrows: false,
    });

    if (matrix.length === 0) {
      return { ok: false, data: [], error: "El archivo está vacío." };
    }

    const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();

    // Buscar la fila que contiene fecha_hora y temperatura.
    let headerRow = -1;
    let fechaCol = -1;
    let tempCol = -1;
    for (let i = 0; i < matrix.length; i++) {
      const cells = matrix[i].map(norm);
      const f = cells.indexOf("fecha_hora");
      const t = cells.indexOf("temperatura");
      if (f !== -1 && t !== -1) {
        headerRow = i;
        fechaCol = f;
        tempCol = t;
        break;
      }
    }

    if (headerRow === -1) {
      return {
        ok: false,
        data: [],
        error:
          "No se encontraron las columnas requeridas. El Excel debe tener una fila de cabecera con: fecha_hora y temperatura. Descarga la plantilla como referencia.",
      };
    }

    // Mapear las filas posteriores a la cabecera.
    const data: HourlyRecord[] = matrix
      .slice(headerRow + 1)
      .map((row) => ({
        fecha_hora: cellToFechaHora(row[fechaCol]),
        temperatura: Number(String(row[tempCol]).replace(",", ".")),
      }))
      .filter((r) => r.fecha_hora !== "" && !Number.isNaN(r.temperatura));

    if (data.length === 0) {
      return {
        ok: false,
        data: [],
        error: "No se encontraron filas válidas con fecha y temperatura.",
      };
    }

    return { ok: true, data };
  } catch (e) {
    return {
      ok: false,
      data: [],
      error: `No se pudo leer el archivo: ${(e as Error).message}`,
    };
  }
}

/**
 * Exporta los resultados calculados a Excel:
 * fecha_hora | temperatura | HF | HF acumulada
 */
export function exportResults(
  rows: HourlyResult[],
  filename = "resultado_horas_frio.xlsx"
) {
  const header = ["fecha_hora", "temperatura", "HF", "HF_acumulada"];
  const aoa: (string | number)[][] = [
    header,
    ...rows.map((r) => [r.fecha_hora, r.temperatura, r.hf, r.hfAcumulada]),
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 20 }, { wch: 14 }, { wch: 8 }, { wch: 16 }];
  ws["!rows"] = [{ hpt: 22 }];
  ws["!freeze"] = { xSplit: 0, ySplit: 1 };

  const headerStyle = {
    font: { bold: true, sz: 11, color: { rgb: C.white } },
    fill: { fgColor: { rgb: C.green600 } },
    alignment: { vertical: "center", horizontal: "center" },
    border: thinBorder,
  };

  // Estilar cabecera.
  ["A1", "B1", "C1", "D1"].forEach((a) => {
    if (ws[a]) ws[a].s = headerStyle;
  });

  // Estilar filas de datos: banda alterna + HF=1 resaltada.
  rows.forEach((r, i) => {
    const rowN = i + 2; // 1-based, +1 cabecera
    const band = i % 2 === 0 ? C.white : C.greenBand;
    const baseCell = {
      font: { sz: 10, color: { rgb: C.gray700 } },
      fill: { fgColor: { rgb: band } },
      alignment: { horizontal: "center" as const },
      border: thinBorder,
    };
    if (ws[`A${rowN}`]) ws[`A${rowN}`].s = baseCell;
    if (ws[`B${rowN}`])
      ws[`B${rowN}`].s = { ...baseCell, numFmt: "0.0" };
    if (ws[`C${rowN}`]) {
      // HF=1 en celeste, HF=0 gris tenue.
      ws[`C${rowN}`].s = {
        ...baseCell,
        font: { bold: r.hf === 1, sz: 10, color: { rgb: r.hf === 1 ? C.sky600 : C.gray400 } },
        fill: { fgColor: { rgb: r.hf === 1 ? C.sky50 : band } },
      };
    }
    if (ws[`D${rowN}`])
      ws[`D${rowN}`].s = {
        ...baseCell,
        font: { bold: true, sz: 10, color: { rgb: C.green700 } },
      };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resultado HF");
  XLSX.writeFile(wb, filename);
}
