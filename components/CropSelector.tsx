"use client";

import { crops, type Crop, type Variety } from "@/data/crops";
import { LeafIcon, SproutIcon, CalendarIcon } from "./icons";

interface Props {
  cropId: string;
  varietyId: string;
  startDate: string;
  onCropChange: (id: string) => void;
  onVarietyChange: (id: string) => void;
  onStartDateChange: (date: string) => void;
}

export default function CropSelector({
  cropId,
  varietyId,
  startDate,
  onCropChange,
  onVarietyChange,
  onStartDateChange,
}: Props) {
  const crop: Crop | undefined = crops.find((c) => c.id === cropId);
  const varieties: Variety[] = crop?.varieties ?? [];
  const variety = varieties.find((v) => v.id === varietyId);

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {/* Cultivo */}
      <Field label="Cultivo" icon={<LeafIcon className="h-4 w-4" />}>
        <select
          value={cropId}
          onChange={(e) => {
            const c = crops.find((x) => x.id === e.target.value);
            onCropChange(e.target.value);
            // Auto-seleccionar primera variedad del nuevo cultivo.
            if (c?.varieties[0]) onVarietyChange(c.varieties[0].id);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        >
          {crops.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Variedad */}
      <Field label="Variedad" icon={<SproutIcon className="h-4 w-4" />}>
        <select
          value={varietyId}
          onChange={(e) => onVarietyChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        >
          {varieties.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} · {v.requiredHF} HF
            </option>
          ))}
        </select>
        {variety && (
          <p className="mt-1.5 text-xs text-gray-500">
            Requiere{" "}
            <span className="font-semibold text-emerald-700">
              {variety.requiredHF} HF
            </span>{" "}
            para salir de dormancia.
          </p>
        )}
      </Field>

      {/* Fecha inicio dormancia */}
      <Field
        label="Inicio de dormancia"
        icon={<CalendarIcon className="h-4 w-4" />}
      >
        <input
          type="date"
          value={startDate}
          min="2020-01-01"
          onChange={(e) => onStartDateChange(e.target.value)}
          className="date-field w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
        <span className="text-emerald-600">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
