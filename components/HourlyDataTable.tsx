"use client";

import { useState } from "react";
import type { HourlyResult } from "@/lib/cold-hours";

interface Props {
  rows: HourlyResult[];
}

const PAGE = 50;

export default function HourlyDataTable({ rows }: Props) {
  const [limit, setLimit] = useState(PAGE);
  const shown = rows.slice(0, limit);

  if (rows.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gray-400">
        Sin registros para mostrar.
      </p>
    );
  }

  return (
    <div>
      <div className="max-h-[420px] overflow-auto rounded-xl ring-1 ring-gray-100">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-50 text-left">
            <tr>
              <Th>fecha_hora</Th>
              <Th className="text-right">temperatura (°C)</Th>
              <Th className="text-center">HF</Th>
              <Th className="text-right">HF acumulada</Th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr
                key={i}
                className={i % 2 ? "bg-white" : "bg-gray-50/40"}
              >
                <td className="px-4 py-2 font-mono text-xs text-gray-600">
                  {r.fecha_hora}
                </td>
                <td className="px-4 py-2 text-right text-gray-700">
                  {r.temperatura.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-center">
                  {r.hf === 1 ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                      1
                    </span>
                  ) : (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-400">
                      0
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-emerald-700">
                  {r.hfAcumulada}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>
          Mostrando {shown.length} de {rows.length} registros
        </span>
        {limit < rows.length && (
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Mostrar más
          </button>
        )}
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
}
