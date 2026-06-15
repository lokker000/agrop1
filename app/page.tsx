import Hero from "@/components/Hero";
import ColdHoursCalculator from "@/components/ColdHoursCalculator";
import { LeafIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      {/* Fondo aurora vivo detrás de todo */}
      <div className="aurora grain" aria-hidden />

      <Hero />

      <main className="mx-auto -mt-10 w-full max-w-6xl flex-1 px-4 pb-24 sm:px-6">
        <ColdHoursCalculator />
      </main>

      <footer className="border-t border-emerald-100/60 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-7 text-sm text-emerald-900/50">
          <LeafIcon className="h-4 w-4 text-emerald-500" />
          <span className="font-medium text-emerald-900/70">
            Calculadora de Horas Frío
          </span>
          · Modelo de rango 0–7.2 °C · Datos oficiales Red Agrometeorológica INIA
        </div>
      </footer>
    </div>
  );
}
