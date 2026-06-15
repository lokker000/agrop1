"use client";

import { useMemo } from "react";
import type { HourlyResult } from "@/lib/cold-hours";

interface Props {
  rows: HourlyResult[];
  requiredHF: number;
}

// Gráfico de área SVG propio (sin librerías) de HF acumuladas en el tiempo.
export default function ColdHoursChart({ rows, requiredHF }: Props) {
  const W = 720;
  const H = 280;
  const pad = { top: 20, right: 20, bottom: 34, left: 44 };

  const { path, area, maxY, ticksX, gridY, lastPt } = useMemo(() => {
    if (rows.length === 0) {
      return {
        path: "",
        area: "",
        maxY: requiredHF,
        ticksX: [] as { x: number; label: string }[],
        gridY: [] as { y: number; label: number }[],
        lastPt: null as { x: number; y: number } | null,
      };
    }

    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const maxYv = Math.max(requiredHF, rows[rows.length - 1].hfAcumulada);
    const n = rows.length;

    const x = (i: number) => pad.left + (i / Math.max(1, n - 1)) * innerW;
    const y = (v: number) => pad.top + innerH - (v / maxYv) * innerH;

    const pts = rows.map((r, i) => ({ x: x(i), y: y(r.hfAcumulada) }));
    const line = pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ");
    const areaPath =
      `M${pts[0].x.toFixed(1)},${(pad.top + innerH).toFixed(1)} ` +
      pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
      ` L${pts[n - 1].x.toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`;

    // Ticks X: ~5 fechas.
    const step = Math.max(1, Math.floor(n / 5));
    const tx: { x: number; label: string }[] = [];
    for (let i = 0; i < n; i += step) {
      tx.push({ x: x(i), label: rows[i].fecha_hora.slice(5, 10) }); // MM-DD
    }

    // Grid Y: 4 líneas.
    const gy: { y: number; label: number }[] = [];
    for (let k = 0; k <= 4; k++) {
      const v = (maxYv / 4) * k;
      gy.push({ y: y(v), label: Math.round(v) });
    }

    return {
      path: line,
      area: areaPath,
      maxY: maxYv,
      ticksX: tx,
      gridY: gy,
      lastPt: pts[n - 1],
    };
  }, [rows, requiredHF]);

  if (rows.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-400">
        Sin datos para graficar.
      </div>
    );
  }

  const innerH = H - pad.top - pad.bottom;
  const reqY = pad.top + innerH - (requiredHF / maxY) * innerH;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        <defs>
          <linearGradient id="hfArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid Y */}
        {gridY.map((g, i) => (
          <g key={i}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={g.y}
              y2={g.y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={g.y + 4}
              textAnchor="end"
              className="fill-gray-400"
              fontSize={11}
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* Línea objetivo (requerimiento HF) */}
        <line
          x1={pad.left}
          x2={W - pad.right}
          y1={reqY}
          y2={reqY}
          stroke="#0ea5e9"
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />
        <text
          x={W - pad.right}
          y={reqY - 6}
          textAnchor="end"
          className="fill-sky-600"
          fontSize={11}
          fontWeight={600}
        >
          Meta {requiredHF} HF
        </text>

        {/* Área + línea */}
        <path d={area} fill="url(#hfArea)" />
        <path d={path} fill="none" stroke="#059669" strokeWidth={2.5} />

        {/* Punto final */}
        {lastPt && (
          <circle
            cx={lastPt.x}
            cy={lastPt.y}
            r={4.5}
            fill="#059669"
            stroke="#fff"
            strokeWidth={2}
          />
        )}

        {/* Ticks X */}
        {ticksX.map((t, i) => (
          <text
            key={i}
            x={t.x}
            y={H - 10}
            textAnchor="middle"
            className="fill-gray-400"
            fontSize={11}
          >
            {t.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
