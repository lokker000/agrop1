"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { crops, findVariety } from "@/data/crops";
import { regions } from "@/data/stations";
import { calculateColdHours, type HourlyRecord } from "@/lib/cold-hours";
import {
  proyectarCianamida,
  type ForecastResult,
  type DayProjection,
} from "@/lib/forecast";

// Región/estación por defecto: O'Higgins · Los Lingues (INIA-329).
const DEFAULT_REGION =
  regions.find((r) => r.id === "o-higgins") ?? regions[0];
const DEFAULT_STATION =
  DEFAULT_REGION.stations.find((s) => s.id === "INIA-329") ??
  DEFAULT_REGION.stations[0];
import {
  SnowIcon,
  LeafIcon,
  AlertIcon,
  ChartIcon,
  CheckIcon,
} from "@/components/icons";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function etiquetaDia(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const f = new Date(y, m - 1, d);
  return { dow: DIAS[f.getDay()], num: d, mes: MESES[m - 1] };
}

function fechaLarga(iso: string) {
  const e = etiquetaDia(iso);
  return `${e.dow} ${e.num} ${e.mes}`;
}

// Formatea el ISO de obtención a hora local legible (es-CL).
function formatActualizado(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Intensidad de frío -> tono (más HF = más azul).
function tono(hf: number) {
  if (hf >= 18) return "from-sky-600 to-cyan-600 text-white";
  if (hf >= 12) return "from-sky-500 to-cyan-500 text-white";
  if (hf >= 6) return "from-sky-300 to-cyan-300 text-sky-950";
  if (hf >= 1) return "from-sky-100 to-cyan-100 text-sky-800";
  return "from-gray-100 to-gray-100 text-gray-500";
}

export default function PronosticoPage() {
  const [data, setData] = useState<ForecastResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Selección de región / estación (cualquier región del país).
  const [regionId, setRegionId] = useState(DEFAULT_REGION.id);
  const [stationId, setStationId] = useState(DEFAULT_STATION.id);
  const region = regions.find((r) => r.id === regionId) ?? DEFAULT_REGION;
  const station =
    region.stations.find((s) => s.id === stationId) ?? region.stations[0];

  // Controles agronómicos
  const [cropId, setCropId] = useState(crops[0].id);
  const [varietyId, setVarietyId] = useState(crops[0].varieties[0].id);
  const [dormancyStart, setDormancyStart] = useState("2026-05-01");
  const [baseHF, setBaseHF] = useState(0); // HF acumuladas hasta hoy (auto desde estación)

  // Estado de la carga del acumulado histórico (estación Los Lingues)
  const [histLoading, setHistLoading] = useState(false);
  const [histError, setHistError] = useState<string | null>(null);
  const [histInfo, setHistInfo] = useState<string | null>(null);

  const crop = crops.find((c) => c.id === cropId)!;
  const variety = findVariety(cropId, varietyId) ?? crop.varieties[0];

  // Trae el histórico real de la estación elegida y calcula las HF acumuladas hasta hoy.
  async function cargarHistorico(desde: string, estacionId: string) {
    if (!desde) return;
    setHistLoading(true);
    setHistError(null);
    setHistInfo(null);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const params = new URLSearchParams({
        stationId: estacionId,
        from: desde,
        to: today,
      });
      const res = await fetch(`/api/estacion?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Error HTTP ${res.status}`);

      const data: HourlyRecord[] = json.data ?? [];
      if (data.length === 0) {
        setHistError(
          "Esta estación no tiene datos en ese rango. Ingresa las HF acumuladas a mano."
        );
        return;
      }
      const result = calculateColdHours(data, desde, today);
      setBaseHF(result.totalHF);
      setHistInfo(
        `${result.totalHF} HF acumuladas desde ${desde} · ${data.length} registros (${station.name})`
      );
    } catch (e) {
      setHistError(
        `No se pudo obtener el acumulado histórico: ${(e as Error).message}. Puedes ingresarlo a mano.`
      );
    } finally {
      setHistLoading(false);
    }
  }

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ stationId });
      const res = await fetch(`/api/pronostico?${params}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Error HTTP ${res.status}`);
      setData(json);
    } catch (e) {
      setError(`No se pudo obtener el pronóstico: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  // Recarga el pronóstico al montar y cada vez que cambia la estación.
  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  // Acumulado histórico automático: al cambiar dormancia o estación.
  useEffect(() => {
    cargarHistorico(dormancyStart, stationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dormancyStart, stationId]);

  // Proyección de cianamida (se recalcula al cambiar variedad / base / datos).
  const proj = useMemo(() => {
    if (!data) return null;
    return proyectarCianamida(
      data.resumenDiario,
      baseHF,
      variety.requiredHF,
      variety.cyanamideThreshold
    );
  }, [data, baseHF, variety]);

  const dias: DayProjection[] = proj?.dias ?? [];

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="aurora grain" aria-hidden />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-20 pb-24 sm:px-6">
        {/* Encabezado */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900 dark:text-emerald-300"
            >
              ← Volver a la calculadora
            </Link>
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              <SnowIcon className="h-8 w-8 text-sky-500" />
              Pronóstico de Horas Frío
              <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold tracking-wide text-white uppercase">
                beta
              </span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {data?.ubicacion ?? station.name} · próximos {data?.dias ?? 14} días ·
              modelo 0–7.2 °C · fuente Open-Meteo
            </p>
            {data?.generado && (
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Datos obtenidos de Open-Meteo: {formatActualizado(data.generado)} hrs
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={cargar}
            disabled={loading}
            className="btn-tactile rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 disabled:opacity-60"
          >
            {loading ? "Actualizando…" : "↻ Actualizar"}
          </button>
        </div>

        {/* Selección de región y estación (cualquier región del país) */}
        <div className="card-premium animate-fade-up mb-6 grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
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
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
              Estación ({region.stations.length})
            </span>
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              {region.stations.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
            <AlertIcon className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm font-medium text-amber-800">{error}</p>
          </div>
        )}

        {loading && !data && (
          <p className="text-sm text-gray-500">Cargando pronóstico…</p>
        )}

        {dias.length > 0 && proj && (
          <>
            {/* Controles: cultivo / variedad / dormancia / HF acumuladas */}
            <div className="card-premium animate-fade-up mb-6 grid gap-4 rounded-3xl p-6 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Cultivo
                </span>
                <select
                  value={cropId}
                  onChange={(e) => {
                    const c = crops.find((x) => x.id === e.target.value)!;
                    setCropId(c.id);
                    setVarietyId(c.varieties[0].id);
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Variedad ({variety.requiredHF} HF · umbral {variety.cyanamideThreshold}%)
                </span>
                <select
                  value={varietyId}
                  onChange={(e) => setVarietyId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  {crop.varieties.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Inicio de dormancia
                </span>
                <input
                  type="date"
                  value={dormancyStart}
                  min="2020-01-01"
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDormancyStart(e.target.value)}
                  className="date-field w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <span className="mt-1 block text-xs text-gray-400">
                  Desde aquí se acumulan las HF reales.
                </span>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
                  HF acumuladas (hasta hoy)
                  <button
                    type="button"
                    onClick={() => cargarHistorico(dormancyStart, stationId)}
                    disabled={histLoading}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-800 disabled:opacity-50"
                    title="Recalcular desde la estación seleccionada"
                  >
                    {histLoading ? "…" : "↻"}
                  </button>
                </span>
                <input
                  type="number"
                  min={0}
                  value={baseHF}
                  onChange={(e) => setBaseHF(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <span className="mt-1 block text-xs text-gray-400">
                  {histLoading
                    ? "Consultando estación…"
                    : histError
                      ? histError
                      : histInfo ?? "Automático desde la estación seleccionada."}
                </span>
              </label>
            </div>

            {/* Veredicto de cianamida */}
            <CyanamideVerdict proj={proj} variety={variety.name} crop={crop.name} />

            {/* Resumen numérico */}
            <div className="card-premium animate-fade-up mt-6 mb-7 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-3xl p-6">
              <Stat label="HF próximos 14 días" value={`${data?.totalHF}`} />
              <Stat label="HF acumuladas proyectadas" value={`${proj.totalProyectado}`} />
              <Stat
                label="Avance proyectado"
                value={`${proj.progresoFinal.toFixed(0)}%`}
              />
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
                <ChartIcon className="h-4 w-4 text-emerald-600" />
                Umbral: {Math.ceil(proj.thresholdHF)} HF ({variety.cyanamideThreshold}% de {variety.requiredHF})
              </div>
            </div>

            {/* Tarjetas por día */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {dias.map((d, i) => {
                const e = etiquetaDia(d.dia);
                const esDiaUmbral = proj.diaAlcanza?.dia === d.dia;
                return (
                  <div
                    key={d.dia}
                    className={`card-premium animate-fade-up overflow-hidden rounded-2xl ${
                      esDiaUmbral ? "ring-2 ring-emerald-500" : ""
                    }`}
                    style={{ animationDelay: `${0.03 * i}s` }}
                  >
                    <div className="px-3 pt-3 text-center">
                      <div className="text-xs font-semibold text-gray-500">{e.dow}</div>
                      <div className="text-sm font-bold text-gray-700">
                        {e.num} {e.mes}
                      </div>
                    </div>
                    <div className={`mt-2 bg-gradient-to-br ${tono(d.horasFrio)} py-3 text-center`}>
                      <div className="text-3xl leading-none font-bold">{d.horasFrio}</div>
                      <div className="text-[0.65rem] font-medium opacity-90">h frío</div>
                    </div>
                    <div className="flex justify-between px-3 pt-2 text-xs font-medium">
                      <span className="text-sky-600">▼ {d.tMin?.toFixed(1)}°</span>
                      <span className="text-orange-500">▲ {d.tMax?.toFixed(1)}°</span>
                    </div>
                    <div className="px-3 pb-2.5 pt-1 text-center">
                      <div className="text-[0.65rem] text-gray-400">acum.</div>
                      <div
                        className={`text-xs font-bold ${
                          d.alcanza ? "text-emerald-600" : "text-gray-600"
                        }`}
                      >
                        {d.acumuladoHF} HF · {d.progreso.toFixed(0)}%
                      </div>
                      {esDiaUmbral && (
                        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[0.6rem] font-bold text-emerald-700">
                          <CheckIcon className="h-3 w-3" /> umbral
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 flex items-start gap-2 text-xs text-gray-400">
              <LeafIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                Una “hora frío” es cada hora con temperatura entre 0 y 7.2 °C (mismo
                modelo de la calculadora). El veredicto de cianamida compara las HF
                acumuladas proyectadas con el umbral de la variedad. Pronóstico de{" "}
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-emerald-600"
                >
                  Open-Meteo
                </a>{" "}
                (se actualiza varias veces al día); es una estimación, no un dato
                observado.
              </span>
            </p>
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gradient text-3xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-xs font-medium text-gray-500">{label}</div>
    </div>
  );
}

function CyanamideVerdict({
  proj,
  crop,
  variety,
}: {
  proj: NonNullable<ReturnType<typeof proyectarCianamida>>;
  crop: string;
  variety: string;
}) {
  // Tres estados: ya alcanzado · se alcanza dentro de la ventana · no se alcanza.
  let estado: "ya" | "pronto" | "no";
  if (proj.yaAlcanzado) estado = "ya";
  else if (proj.diaAlcanza) estado = "pronto";
  else estado = "no";

  const positivo = estado !== "no";
  const wrap = positivo
    ? "bg-emerald-50 ring-emerald-200"
    : "bg-amber-50 ring-amber-200";
  const Icon = positivo ? CheckIcon : AlertIcon;
  const iconColor = positivo ? "text-emerald-600" : "text-amber-500";

  return (
    <div className={`card-premium animate-fade-up rounded-3xl p-6 ring-1 ${wrap}`}>
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 ${iconColor} ring-1 ring-white/60`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <div className="flex-1">
          <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {crop} · {variety} · ¿Aplicar cianamida?
          </div>

          {estado === "ya" && (
            <p className="mt-1 text-lg font-bold text-emerald-800">
              ✅ Sí — ya se puede aplicar. Las HF acumuladas ({proj.baseHF}) ya superan
              el umbral de {Math.ceil(proj.thresholdHF)} HF ({proj.threshold}%).
            </p>
          )}

          {estado === "pronto" && (
            <p className="mt-1 text-lg font-bold text-emerald-800">
              ✅ Sí — se alcanzará el umbral el{" "}
              <span className="underline decoration-emerald-400">
                {fechaLarga(proj.diaAlcanza!.dia)}
              </span>
              . Desde ese día las HF acumuladas ({proj.diaAlcanza!.acumuladoHF}) llegan
              al {proj.diaAlcanza!.progreso.toFixed(0)}% (umbral {proj.threshold}%).
            </p>
          )}

          {estado === "no" && (
            <p className="mt-1 text-lg font-bold text-amber-800">
              ⛔ Todavía no. Con el pronóstico de 14 días se llega a{" "}
              {proj.totalProyectado} HF ({proj.progresoFinal.toFixed(0)}%), bajo el
              umbral de {Math.ceil(proj.thresholdHF)} HF. Faltarían ~{proj.faltanHF} HF.
            </p>
          )}

          {/* Barra de avance proyectado al final de la ventana */}
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs font-medium text-gray-500">
              <span>Avance proyectado (14 días)</span>
              <span>
                {proj.totalProyectado} / {proj.requiredHF} HF
              </span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-emerald-900/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400"
                style={{ width: `${Math.min(100, proj.progresoFinal)}%` }}
              />
              {/* Marca del umbral */}
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-700/60"
                style={{ left: `${Math.min(100, proj.threshold)}%` }}
                title={`Umbral ${proj.threshold}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
