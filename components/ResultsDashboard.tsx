"use client";

import type { ColdHoursResult } from "@/lib/cold-hours";
import { exportResults } from "@/lib/excel";
import ColdHoursChart from "./ColdHoursChart";
import HourlyDataTable from "./HourlyDataTable";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import {
  LeafIcon,
  SproutIcon,
  SnowIcon,
  ChartIcon,
  CalendarIcon,
  DownloadIcon,
  CheckIcon,
  AlertIcon,
} from "./icons";

interface Props {
  cropName: string;
  varietyName: string;
  requiredHF: number;
  threshold: number;
  result: ColdHoursResult;
  progress: number;
  canApply: boolean;
}

export default function ResultsDashboard({
  cropName,
  varietyName,
  requiredHF,
  threshold,
  result,
  progress,
  canApply,
}: Props) {
  const pct = Math.min(100, progress);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Tarjeta estado cianamida */}
      <CyanamideCard canApply={canApply} progress={progress} threshold={threshold} />

      {/* Progreso circular + stats */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="card-premium flex flex-col items-center justify-center rounded-3xl p-6">
          <ProgressRing pct={pct} canApply={canApply} />
          <p className="mt-4 text-sm font-medium text-gray-500">
            <CountUp value={result.totalHF} className="font-bold text-emerald-700" />{" "}
            / {requiredHF} HF acumuladas
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat
            icon={<LeafIcon className="h-5 w-5" />}
            label="Cultivo"
            value={cropName}
            tint="emerald"
          />
          <Stat
            icon={<SproutIcon className="h-5 w-5" />}
            label="Variedad"
            value={varietyName}
            tint="emerald"
          />
          <Stat
            icon={<SnowIcon className="h-5 w-5" />}
            label="HF necesarias"
            value={`${requiredHF} HF`}
            tint="sky"
          />
          <Stat
            icon={<ChartIcon className="h-5 w-5" />}
            label="HF acumuladas"
            value={`${result.totalHF} HF`}
            tint="sky"
          />
          <Stat
            icon={<CalendarIcon className="h-5 w-5" />}
            label="Inicio considerado"
            value={result.startDate ?? "—"}
            tint="gray"
          />
          <Stat
            icon={<CalendarIcon className="h-5 w-5" />}
            label="Fecha final"
            value={result.endDate ?? "—"}
            tint="gray"
          />
        </div>
      </div>

      {/* Gráfico */}
      <Reveal>
      <section className="card-premium rounded-3xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <ChartIcon className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">
            Avance de HF acumuladas
          </h3>
        </div>
        <ColdHoursChart rows={result.rows} requiredHF={requiredHF} />
      </section>
      </Reveal>

      {/* Tabla + export */}
      <Reveal delay={80}>
      <section className="card-premium rounded-3xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-gray-800">Detalle horario</h3>
          <button
            type="button"
            onClick={() => exportResults(result.rows)}
            className="btn-tactile inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/25"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar Excel
          </button>
        </div>
        <HourlyDataTable rows={result.rows} />
      </section>
      </Reveal>
    </div>
  );
}

function CyanamideCard({
  canApply,
  progress,
  threshold,
}: {
  canApply: boolean;
  progress: number;
  threshold: number;
}) {
  return (
    <div
      className={`relative flex items-start gap-4 overflow-hidden rounded-3xl p-6 ring-1 ${
        canApply
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 ring-emerald-200"
          : "bg-gradient-to-br from-amber-50 to-orange-50 ring-amber-200"
      }`}
    >
      {/* Orbe decorativo */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl ${
          canApply ? "bg-emerald-300/30" : "bg-amber-300/30"
        }`}
      />
      <span
        className={`glow-pulse relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ${
          canApply
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-600/30"
            : "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30"
        }`}
      >
        {canApply ? (
          <CheckIcon className="h-6 w-6" />
        ) : (
          <AlertIcon className="h-6 w-6" />
        )}
      </span>
      <div className="relative">
        <p
          className={`text-xl font-bold ${
            canApply ? "text-emerald-800" : "text-amber-800"
          }`}
        >
          {canApply
            ? "Ya puede aplicar cianamida"
            : "Aún no se recomienda aplicar cianamida"}
        </p>
        <p
          className={`mt-1 text-sm ${
            canApply ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          Avance actual:{" "}
          <span className="font-semibold">
            <CountUp value={progress} decimals={1} suffix="%" />
          </span>{" "}
          · umbral requerido: {threshold}%
        </p>
      </div>
    </div>
  );
}

function ProgressRing({ pct, canApply }: { pct: number; canApply: boolean }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const gid = canApply ? "ringPos" : "ringNeg";

  return (
    <div className="relative h-48 w-48">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="ringPos" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="ringNeg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="ringGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#e9f3ee" strokeWidth="14" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          filter="url(#ringGlow)"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gradient">
          <CountUp value={pct} suffix="%" />
        </span>
        <span className="text-xs font-medium text-gray-400">de avance</span>
      </div>
    </div>
  );
}

const TINTS = {
  emerald: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-600/25",
  sky: "bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm shadow-sky-600/25",
  gray: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-sm shadow-slate-500/20",
} as const;

function Stat({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: keyof typeof TINTS;
}) {
  return (
    <div className="card-premium flex items-center gap-3 rounded-2xl p-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TINTS[tint]}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="truncate font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
