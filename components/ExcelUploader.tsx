"use client";

import { useRef, useState } from "react";
import { downloadTemplate, readExcelFile } from "@/lib/excel";
import type { HourlyRecord } from "@/lib/cold-hours";
import { DownloadIcon, UploadIcon, AlertIcon, CheckIcon } from "./icons";

interface Props {
  onData: (data: HourlyRecord[]) => void;
}

export default function ExcelUploader({ onData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    const result = await readExcelFile(file);
    if (!result.ok) {
      setError(result.error ?? "Error desconocido al leer el archivo.");
      setFileName(null);
      setCount(0);
      onData([]);
      return;
    }
    setFileName(file.name);
    setCount(result.data.length);
    onData(result.data);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sky-50 p-4 ring-1 ring-sky-100">
        <div className="flex items-center gap-3">
          <DownloadIcon className="h-5 w-5 text-sky-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Plantilla Excel
            </p>
            <p className="text-xs text-gray-500">
              Columnas: <code>fecha_hora</code>, <code>temperatura</code>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => downloadTemplate()}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          Descargar plantilla
        </button>
      </div>

      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/40"
        }`}
      >
        <UploadIcon className="h-8 w-8 text-emerald-600" />
        <p className="text-sm font-medium text-gray-700">
          Arrastra tu archivo aquí o haz clic para seleccionar
        </p>
        <p className="text-xs text-gray-400">Formatos: .xlsx, .xls</p>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
          <AlertIcon className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {fileName && !error && (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <CheckIcon className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800">
            <span className="font-semibold">{fileName}</span> · {count} registros
            cargados.
          </p>
        </div>
      )}
    </div>
  );
}
