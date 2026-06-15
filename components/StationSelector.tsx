"use client";

import { useEffect, useMemo, useState } from "react";
import { regions } from "@/data/stations";
import type { HourlyRecord } from "@/lib/cold-hours";
import { CloudIcon, CheckIcon, AlertIcon, CalendarIcon } from "./icons";

interface Props {
  onData: (data: HourlyRecord[]) => void;
  from: string; // YYYY-MM-DD (sugerido: inicio dormancia)
  to: string; // YYYY-MM-DD (sugerido: fecha final; si vacío se usa hoy)
}

export default function StationSelector({ onData, from, to }: Props) {
  // Por defecto región del Maule si existe, si no la primera.
  const defaultRegion =
    regions.find((r) => r.name === "Maule") ?? regions[0];
  const [regionId, setRegionId] = useState(defaultRegion.id);
  const [stationId, setStationId] = useState(defaultRegion.stations[0].id);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  // Rango editable por el usuario. Parte desde las fechas sugeridas
  // (dormancia) pero se puede cambiar libremente.
  const [fromDate, setFromDate] = useState(from);
  const [toDate, setToDate] = useState(to || today);

  // Si el usuario cambia la fecha de dormancia arriba, actualizar la sugerencia.
  useEffect(() => {
    if (from) setFromDate(from);
  }, [from]);
  useEffect(() => {
    if (to) setToDate(to);
  }, [to]);

  const region = useMemo(
    () => regions.find((r) => r.id === regionId) ?? regions[0],
    [regionId]
  );

  async function load() {
    setError(null);
    setLoaded(0);
    if (!fromDate || !toDate) {
      setError("Ingresa la fecha de inicio y de término del rango.");
      return;
    }
    if (fromDate > toDate) {
      setError("La fecha de inicio debe ser anterior a la de término.");
      return;
    }
    setLoading(true);
    try {
      // Datos oficiales reales de agrometeorologia.cl vía API route server-side.
      const params = new URLSearchParams({
        stationId,
        from: fromDate,
        to: toDate,
      });
      const res = await fetch(`/api/estacion?${params}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? `Error HTTP ${res.status}`);
      }
      const data: HourlyRecord[] = json.data ?? [];
      if (data.length === 0) {
        setError(
          "La estación no tiene datos en ese rango de fechas. Prueba otra estación o ajusta las fechas."
        );
        onData([]);
        return;
      }
      onData(data);
      setLoaded(data.length);
    } catch (e) {
      setError(`No se pudieron obtener los datos: ${(e as Error).message}`);
      onData([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Región
          </span>
          <select
            value={regionId}
            onChange={(e) => {
              const r = regions.find((x) => x.id === e.target.value)!;
              setRegionId(r.id);
              setStationId(r.stations[0].id);
              setLoaded(0);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Estación ({region.stations.length})
          </span>
          <select
            value={stationId}
            onChange={(e) => {
              setStationId(e.target.value);
              setLoaded(0);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            {region.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Rango de fechas editable */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <CalendarIcon className="h-4 w-4 text-sky-600" />
            Fecha de inicio del rango
          </span>
          <input
            type="date"
            value={fromDate}
            max={toDate || today}
            onChange={(e) => {
              setFromDate(e.target.value);
              setLoaded(0);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <CalendarIcon className="h-4 w-4 text-sky-600" />
            Fecha de término del rango
          </span>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            max={today}
            onChange={(e) => {
              setToDate(e.target.value);
              setLoaded(0);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-sky-50 p-4 ring-1 ring-sky-100">
        <CloudIcon className="h-5 w-5 text-sky-600" />
        <p className="flex-1 text-xs text-sky-800">
          Datos oficiales <span className="font-semibold">reales</span> de la Red
          Agrometeorológica de INIA (agrometeorologia.cl). Rango elegido:{" "}
          <span className="font-mono">{fromDate || "—"}</span> →{" "}
          <span className="font-mono">{toDate || "—"}</span>
        </p>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
        >
          {loading ? "Consultando INIA…" : "Obtener datos reales"}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <AlertIcon className="h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-sm font-medium text-amber-800">{error}</p>
        </div>
      )}

      {loaded > 0 && !loading && (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <CheckIcon className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800">
            {loaded} registros horarios oficiales cargados desde la estación.
          </p>
        </div>
      )}
    </div>
  );
}
