"use client";

import { useMemo, useState } from "react";
import { crops, findVariety } from "@/data/crops";
import {
  calculateColdHours,
  calculateProgress,
  canApplyCyanamide,
  type HourlyRecord,
} from "@/lib/cold-hours";
import CropSelector from "./CropSelector";
import DataSourceSelector, { type DataSource } from "./DataSourceSelector";
import ExcelUploader from "./ExcelUploader";
import StationSelector from "./StationSelector";
import ResultsDashboard from "./ResultsDashboard";
import { AlertIcon } from "./icons";

export default function ColdHoursCalculator() {
  const [cropId, setCropId] = useState(crops[0].id);
  const [varietyId, setVarietyId] = useState(crops[0].varieties[0].id);
  const [startDate, setStartDate] = useState("2026-05-01");
  const [endDate, setEndDate] = useState(""); // vacío = hasta última fila
  const [source, setSource] = useState<DataSource>("excel");
  const [data, setData] = useState<HourlyRecord[]>([]);
  const [calculated, setCalculated] = useState(false);

  const crop = crops.find((c) => c.id === cropId)!;
  const variety = findVariety(cropId, varietyId) ?? crop.varieties[0];

  const computation = useMemo(() => {
    if (data.length === 0) return null;
    const result = calculateColdHours(
      data,
      startDate || undefined,
      endDate || undefined
    );
    const progress = calculateProgress(result.totalHF, variety.requiredHF);
    const canApply = canApplyCyanamide(progress, variety.cyanamideThreshold);
    return { result, progress, canApply };
  }, [data, startDate, endDate, variety]);

  function handleCalculate() {
    setCalculated(true);
  }

  // Resetear resultado al cambiar de fuente.
  function handleSourceChange(s: DataSource) {
    setSource(s);
    setData([]);
    setCalculated(false);
  }

  function setNewData(d: HourlyRecord[]) {
    setData(d);
    setCalculated(false);
  }

  const canCalculate = data.length > 0;

  return (
    <div className="space-y-6">
      {/* Paso 1: Cultivo / variedad / fecha */}
      <Card step={1} title="Cultivo, variedad y dormancia">
        <CropSelector
          cropId={cropId}
          varietyId={varietyId}
          startDate={startDate}
          onCropChange={setCropId}
          onVarietyChange={setVarietyId}
          onStartDateChange={(d) => {
            setStartDate(d);
            setCalculated(false);
          }}
        />
        <div className="mt-4 max-w-xs">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
              Fecha final (opcional)
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCalculated(false);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            <span className="mt-1 block text-xs text-gray-400">
              Si se deja vacío, se considera hasta el último dato disponible.
            </span>
          </label>
        </div>
      </Card>

      {/* Paso 2: Fuente de datos */}
      <Card step={2} title="Fuente de datos climáticos">
        <DataSourceSelector value={source} onChange={handleSourceChange} />
        <div className="mt-5">
          {source === "excel" ? (
            <ExcelUploader onData={setNewData} />
          ) : (
            <StationSelector onData={setNewData} from={startDate} to={endDate} />
          )}
        </div>
      </Card>

      {/* Botón calcular */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="btn-tactile w-full max-w-sm rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none"
        >
          Calcular Horas Frío
        </button>
        {!canCalculate && (
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <AlertIcon className="h-4 w-4" />
            Carga datos (Excel o estación) para habilitar el cálculo.
          </p>
        )}
      </div>

      {/* Resultados */}
      {calculated && computation && (
        <ResultsDashboard
          cropName={crop.name}
          varietyName={variety.name}
          requiredHF={variety.requiredHF}
          threshold={variety.cyanamideThreshold}
          result={computation.result}
          progress={computation.progress}
          canApply={computation.canApply}
        />
      )}

      {calculated && computation && computation.result.rows.length === 0 && (
        <div className="rounded-2xl bg-amber-50 p-6 text-center text-sm font-medium text-amber-700 ring-1 ring-amber-200">
          No hay registros dentro del rango de fechas seleccionado. Ajusta la
          fecha de inicio de dormancia o la fecha final.
        </div>
      )}
    </div>
  );
}

function Card({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="card-premium animate-fade-up rounded-3xl p-6 sm:p-7"
      style={{ animationDelay: `${0.08 * step}s` }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-sm shadow-emerald-600/30">
          {step}
        </span>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );
}
