"use client";

import { UploadIcon, CloudIcon } from "./icons";

export type DataSource = "excel" | "station";

interface Props {
  value: DataSource;
  onChange: (v: DataSource) => void;
}

export default function DataSourceSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Option
        active={value === "excel"}
        onClick={() => onChange("excel")}
        icon={<UploadIcon className="h-6 w-6" />}
        title="Datos propios"
        desc="Sube tu archivo Excel con registros horarios."
      />
      <Option
        active={value === "station"}
        onClick={() => onChange("station")}
        icon={<CloudIcon className="h-6 w-6" />}
        title="Estación agrometeorológica"
        desc="Usa datos de una estación (demo con datos oficiales)."
      />
    </div>
  );
}

function Option({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition ${
        active
          ? "border-emerald-500 bg-emerald-50/60 shadow-sm"
          : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          {title}
          {active && (
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
              ACTIVO
            </span>
          )}
        </span>
        <span className="mt-1 block text-sm text-gray-500">{desc}</span>
      </span>
    </button>
  );
}
