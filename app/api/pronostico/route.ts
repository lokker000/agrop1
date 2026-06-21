// API route (server-side) que entrega el pronóstico de Horas Frío de los
// próximos días para Los Lingues, usando Open-Meteo. Se ejecuta en el servidor
// para evitar CORS y mantener la lógica fuera del browser.
//
// GET /api/pronostico            -> 14 días (por defecto)
// GET /api/pronostico?dias=7     -> 7 días
import { NextResponse } from "next/server";
import { fetchForecast } from "@/lib/forecast";

// Datos dinámicos: el pronóstico cambia cada día, no cachear.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const diasParam = Number(searchParams.get("dias"));
  const dias = Number.isFinite(diasParam) && diasParam > 0 && diasParam <= 16
    ? Math.floor(diasParam)
    : 14;

  try {
    const data = await fetchForecast(dias);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
