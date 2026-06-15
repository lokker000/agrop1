// API route (server-side) que obtiene datos horarios oficiales de temperatura
// desde agrometeorologia.cl. Se ejecuta en el servidor para evitar CORS.
//
// GET /api/estacion?stationId=INIA-202&from=2024-06-01&to=2024-06-05
import { NextResponse } from "next/server";
import { fetchAgrometHourly } from "@/lib/agromet";

// Evita cacheo: los datos dependen de los parámetros.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get("stationId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!stationId || !from || !to) {
    return NextResponse.json(
      { error: "Faltan parámetros: stationId, from, to (YYYY-MM-DD)." },
      { status: 400 }
    );
  }

  try {
    const data = await fetchAgrometHourly({ stationId, from, to });
    return NextResponse.json({ data, count: data.length });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 502 }
    );
  }
}
