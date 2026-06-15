// Catálogo de cultivos y variedades.
// Estructura preparada para agregar más cultivos/variedades sin tocar la lógica.

export interface Variety {
  id: string;
  name: string;
  requiredHF: number; // Horas Frío necesarias para salir de dormancia
  cyanamideThreshold: number; // % de avance mínimo para aplicar cianamida
}

export interface Crop {
  id: string;
  name: string;
  varieties: Variety[];
}

export const crops: Crop[] = [
  {
    id: "cerezo",
    name: "Cerezo",
    varieties: [
      {
        id: "lapins",
        name: "Lapins",
        requiredHF: 650,
        cyanamideThreshold: 70,
      },
      // Agregar más variedades aquí:
      // { id: "santina", name: "Santina", requiredHF: 600, cyanamideThreshold: 70 },
    ],
  },
  // Agregar más cultivos aquí (manzano, durazno, etc.)
];

export function findCrop(cropId: string): Crop | undefined {
  return crops.find((c) => c.id === cropId);
}

export function findVariety(
  cropId: string,
  varietyId: string
): Variety | undefined {
  return findCrop(cropId)?.varieties.find((v) => v.id === varietyId);
}
