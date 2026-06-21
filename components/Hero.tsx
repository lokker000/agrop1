import Link from "next/link";
import { SnowIcon, LeafIcon, ThermometerIcon, ChartIcon } from "./icons";

const TITLE = "Calculadora de Horas Frío";

export default function Hero() {
  // Engine tipográfico: cada palabra animada en cascada.
  const words = TITLE.split(" ");

  return (
    <header className="grain relative overflow-hidden text-white">
      {/* Mesh gradient de fondo (capas) */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_0%,rgba(190,242,100,0.22),transparent_55%),radial-gradient(800px_600px_at_100%_30%,rgba(34,211,238,0.28),transparent_55%)]" />

      {/* Profundidad: orbes flotantes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="float-slow absolute -top-24 -right-16 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />
        <div className="float-slower absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="float-slow absolute top-1/3 left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Patrón de puntos sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Fundido inferior hacia el fondo de la página */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--background)] to-transparent" />

      {/* Botón Pronóstico (beta) — esquina superior derecha */}
      <Link
        href="/pronostico"
        className="glass btn-tactile absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-emerald-950/80 ring-1 ring-white/40"
      >
        <SnowIcon className="h-4 w-4 text-sky-600" />
        Pronóstico
        <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-white uppercase">
          beta
        </span>
      </Link>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
        {/* Columna texto */}
        <div>
          <div
            className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-emerald-50 ring-1 ring-white/20 backdrop-blur-sm"
            style={{ animationDelay: "0.05s" }}
          >
            <LeafIcon className="h-4 w-4 text-lime-200" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase">
              Herramienta agrícola · Frutales
            </span>
          </div>

          <h1
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: "var(--step-hero)" }}
          >
            <span className="sr-only">{TITLE}</span>
            <span aria-hidden className="inline-flex flex-wrap gap-x-4">
              {words.map((w, i) => (
                <span
                  key={i}
                  className={`word ${i >= 2 ? "text-shimmer" : ""}`}
                  style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-emerald-50/90 sm:text-xl"
            style={{ animationDelay: "0.5s" }}
          >
            Evalúa el avance de dormancia y determina el momento óptimo para
            aplicar cianamida.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "0.62s" }}
          >
            <Badge icon={<ThermometerIcon className="h-4 w-4" />} text="Modelo 0–7.2 °C" />
            <Badge icon={<SnowIcon className="h-4 w-4" />} text="HF acumuladas" />
            <Badge icon={<LeafIcon className="h-4 w-4" />} text="Cerezo · Lapins" />
            <Badge icon={<LeafIcon className="h-4 w-4" />} text="Datos oficiales INIA" />
          </div>
        </div>

        {/* Columna: tarjeta glass flotante de vista previa */}
        <div
          className="animate-fade-up hidden lg:block"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="float-slow glass relative rounded-3xl p-6 shadow-2xl ring-1 ring-white/30">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                <SnowIcon className="h-5 w-5 text-teal-600" />
                Avance de dormancia
              </span>
              <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                Cerezo
              </span>
            </div>

            {/* Mini barra de progreso ilustrativa */}
            <div className="mt-5">
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-gradient">72%</span>
                <span className="text-xs font-medium text-emerald-900/60">
                  468 / 650 HF
                </span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-emerald-900/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400" />
              </div>
            </div>

            {/* Mini gráfico de barras decorativo */}
            <div className="mt-6 flex items-end gap-1.5">
              {[30, 45, 38, 60, 52, 70, 64, 82, 76, 90, 84, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-teal-400"
                  style={{ height: `${h * 0.6}px` }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
              <ChartIcon className="h-4 w-4 text-emerald-600" />
              Ya puede aplicar cianamida
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="glass btn-tactile inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-950/80 ring-1 ring-white/30">
      <span className="text-emerald-700">{icon}</span>
      {text}
    </span>
  );
}
