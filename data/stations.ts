// AUTO-GENERADO desde el portal oficial agrometeorologia.cl (formulario de consulta).
// 16 regiones · 432 estaciones.

export interface Station { id: string; name: string; }
export interface Region { id: string; name: string; stations: Station[]; }

/** Busca una estación por id y devuelve también su región. */
export function findStation(
  id: string
): { station: Station; region: Region } | null {
  for (const region of regions) {
    const station = region.stations.find((s) => s.id === id);
    if (station) return { station, region };
  }
  return null;
}

export const regions: Region[] = [
  {
    "id": "arica-y-parinacota",
    "name": "Arica y Parinacota",
    "stations": [
      {
        "id": "EXT-225",
        "name": "Aeropuerto Chacalluta, Arica, DMC"
      },
      {
        "id": "INIA-81",
        "name": "Azapa Alto, Arica, INIA"
      },
      {
        "id": "INIA-39",
        "name": "Azapa Medio, Arica, INIA"
      },
      {
        "id": "INIA-156",
        "name": "Belén, Putre, INIA"
      },
      {
        "id": "INIA-150",
        "name": "Caleta Vitor, Arica, INIA"
      },
      {
        "id": "INIA-77",
        "name": "Camarones, Camarones, INIA"
      },
      {
        "id": "INIA-63",
        "name": "Cerro Blanco, Arica, INIA"
      },
      {
        "id": "EXT-117",
        "name": "Cerro Sombrero AR, Arica, DMC"
      },
      {
        "id": "INIA-137",
        "name": "Chaca, Arica, INIA"
      },
      {
        "id": "INIA-152",
        "name": "Chapiquiña, Putre, INIA"
      },
      {
        "id": "INIA-76",
        "name": "Codpa, Camarones, INIA"
      },
      {
        "id": "EXT-69",
        "name": "Concordia Medio, Arica, ANPROS"
      },
      {
        "id": "INIA-204",
        "name": "Cuya, Camarones, INIA"
      },
      {
        "id": "EXT-121",
        "name": "Defensa Civil, Arica, DMC"
      },
      {
        "id": "EXT-72",
        "name": "La Violeta Open, Arica, ANPROS"
      },
      {
        "id": "INIA-80",
        "name": "Lago Chungará, Putre, INIA"
      },
      {
        "id": "INIA-75",
        "name": "Lluta Alto, Arica, INIA"
      },
      {
        "id": "INIA-34",
        "name": "Lluta Bajo, Arica, INIA"
      },
      {
        "id": "INIA-38",
        "name": "Lluta Medio, Arica, INIA"
      },
      {
        "id": "INIA-302",
        "name": "Pampa Concordia, Arica, INIA"
      },
      {
        "id": "INIA-134",
        "name": "Putre, Putre, INIA"
      },
      {
        "id": "EXT-120",
        "name": "Putre DMC, Putre, DMC"
      },
      {
        "id": "INIA-79",
        "name": "Salar de Surire, Putre, INIA"
      },
      {
        "id": "INIA-43",
        "name": "Socoroma, Putre, INIA"
      },
      {
        "id": "INIA-149",
        "name": "Ticnamar, Putre, INIA"
      },
      {
        "id": "INIA-78",
        "name": "Visviri, General Lagos, INIA"
      }
    ]
  },
  {
    "id": "tarapac",
    "name": "Tarapacá",
    "stations": [
      {
        "id": "EXT-99",
        "name": "Aeropuerto Diego Aracena, Iquique, DMC"
      },
      {
        "id": "INIA-352",
        "name": "Bajo Soga, Huara, INDAP-CONADI-INIA"
      },
      {
        "id": "EXT-1012",
        "name": "Colchane, Colchane, DMC"
      },
      {
        "id": "INIA-350",
        "name": "Pachica, Huara, INDAP-CONADI-INIA"
      },
      {
        "id": "INIA-202",
        "name": "Pica, Pica, INIA"
      },
      {
        "id": "EXT-123",
        "name": "Universidad Arturo Prat, Iquique, DMC"
      }
    ]
  },
  {
    "id": "antofagasta",
    "name": "Antofagasta",
    "stations": [
      {
        "id": "EXT-125",
        "name": "Aeródromo El Loa, Calama, DMC"
      },
      {
        "id": "INIA-218",
        "name": "Altos la Portada, Antofagasta, INIA"
      },
      {
        "id": "INIA-61",
        "name": "Calama Rural, Calama, INIA"
      },
      {
        "id": "INIA-216",
        "name": "Camar, San Pedro de Atacama, INIA"
      },
      {
        "id": "INIA-56",
        "name": "Caspana, Calama, INIA"
      },
      {
        "id": "EXT-202",
        "name": "Cerro Paranal, Antofagasta, DMC"
      },
      {
        "id": "EXT-1017",
        "name": "Chorrillos MMA, Calama, MMA-DMC"
      },
      {
        "id": "INIA-225",
        "name": "La Cachina, Taltal, INIA"
      },
      {
        "id": "EXT-203",
        "name": "Llano de Chajnantor, San Pedro de Atacama, DMC"
      },
      {
        "id": "EXT-177",
        "name": "Mejillones, Mejillones, DMC"
      },
      {
        "id": "INIA-62",
        "name": "Ollagüe, Ollagüe, INIA"
      },
      {
        "id": "EXT-124",
        "name": "Ollagüe DMC, Ollagüe, DMC"
      },
      {
        "id": "INIA-59",
        "name": "San Pedro de Atacama, San Pedro de Atacama, INIA"
      },
      {
        "id": "INIA-57",
        "name": "Socaire, San Pedro de Atacama, INIA"
      },
      {
        "id": "EXT-128",
        "name": "Taltal, Taltal, DMC"
      },
      {
        "id": "EXT-127",
        "name": "Toconao, San Pedro de Atacama, DMC"
      },
      {
        "id": "INIA-58",
        "name": "Toconao, San Pedro de Atacama, INIA"
      },
      {
        "id": "EXT-126",
        "name": "Universidad Católica del Norte, Antofagasta, DMC"
      }
    ]
  },
  {
    "id": "atacama",
    "name": "Atacama",
    "stations": [
      {
        "id": "EXT-227",
        "name": "Aeródromo Caldera, Caldera, DMC"
      },
      {
        "id": "EXT-1007",
        "name": "Aeródromo Ricardo García Posada, Diego de Almagro, DMC"
      },
      {
        "id": "EXT-971",
        "name": "Altar de la Virgen, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "INIA-356",
        "name": "Alto del Carmen, Alto del Carmen, INIA"
      },
      {
        "id": "EXT-968",
        "name": "Amalfi, Copiapó, APECO-FDF"
      },
      {
        "id": "INIA-97",
        "name": "Amolana, Tierra Amarilla, INIA"
      },
      {
        "id": "EXT-27",
        "name": "Cachiyuyo, Vallenar, CEAZA"
      },
      {
        "id": "EXT-964",
        "name": "Casa Rosada, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "INIA-65",
        "name": "Centro Experimental Huasco, Vallenar, INIA"
      },
      {
        "id": "EXT-966",
        "name": "Copayapu, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "INIA-353",
        "name": "El Tránsito, Alto del Carmen, INIA"
      },
      {
        "id": "INIA-223",
        "name": "Falda Verde, Chañaral, INIA"
      },
      {
        "id": "EXT-130",
        "name": "Freirina Nicolasa, Freirina, DMC"
      },
      {
        "id": "INIA-224",
        "name": "La Copa, Copiapó, INIA"
      },
      {
        "id": "EXT-967",
        "name": "Las Canteras, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "EXT-969",
        "name": "María Isabel, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "EXT-965",
        "name": "Mayorquina, Copiapó, APECO-FDF"
      },
      {
        "id": "EXT-970",
        "name": "Nantoco, Tierra Amarilla, APECO-FDF"
      },
      {
        "id": "EXT-129",
        "name": "Universidad de Atacama, Copiapó, DMC"
      }
    ]
  },
  {
    "id": "coquimbo",
    "name": "Coquimbo",
    "stations": [
      {
        "id": "EXT-100",
        "name": "Aeródromo La Florida, La Serena, DMC"
      },
      {
        "id": "INIA-304",
        "name": "Ajial de Quiles, Punitaqui, INIA"
      },
      {
        "id": "INIA-64",
        "name": "Algarrobo Bajo, Ovalle, INIA"
      },
      {
        "id": "EXT-24",
        "name": "Canela, Canela, CEAZA"
      },
      {
        "id": "EXT-62",
        "name": "Cerro Grande, La Serena, CEAZA"
      },
      {
        "id": "EXT-954",
        "name": "Cerro La Silla, La Higuera, DMC"
      },
      {
        "id": "INIA-229",
        "name": "Chaguaral, Monte Patria, INIA"
      },
      {
        "id": "EXT-25",
        "name": "Chillepín, Salamanca, CEAZA"
      },
      {
        "id": "EXT-35",
        "name": "Collowara, Andacollo, CEAZA"
      },
      {
        "id": "EXT-29",
        "name": "Combarbalá Sur, Combarbalá, CEAZA"
      },
      {
        "id": "INIA-66",
        "name": "El Palqui, Monte Patria, INIA"
      },
      {
        "id": "EXT-11",
        "name": "El Panul, Coquimbo, CEAZA"
      },
      {
        "id": "EXT-64",
        "name": "El Polvo, Monte Patria, CEAZA"
      },
      {
        "id": "EXT-10",
        "name": "El Romeral, La Serena, CEAZA"
      },
      {
        "id": "EXT-32",
        "name": "El Tapado, Vicuña, CEAZA"
      },
      {
        "id": "EXT-131",
        "name": "El Tololo, Vicuña, DMC"
      },
      {
        "id": "EXT-101",
        "name": "Escuela Agrícola, Ovalle, DMC"
      },
      {
        "id": "EXT-63",
        "name": "Estero Derecho, Paiguano, CEAZA"
      },
      {
        "id": "EXT-43",
        "name": "Fray Jorge Bosque, Ovalle, IEB-CEAZA"
      },
      {
        "id": "EXT-42",
        "name": "Fray Jorge Quebrada, Ovalle, IEB-CEAZA"
      },
      {
        "id": "EXT-14",
        "name": "Gabriela Mistral, La Serena, CEAZA"
      },
      {
        "id": "EXT-61",
        "name": "Guandacol, Río Hurtado, CEAZA"
      },
      {
        "id": "INIA-220",
        "name": "Huentelauquén, Canela, INIA"
      },
      {
        "id": "EXT-19",
        "name": "Huintil, Illapel, CEAZA"
      },
      {
        "id": "EXT-5",
        "name": "Illapel, Illapel, CEAZA"
      },
      {
        "id": "EXT-26",
        "name": "La Laguna - Elqui, Vicuña, CEAZA"
      },
      {
        "id": "INIA-305",
        "name": "La Polvareda, Punitaqui, INIA"
      },
      {
        "id": "EXT-38",
        "name": "Laguna Hurtado, Río Hurtado, CEAZA"
      },
      {
        "id": "EXT-7",
        "name": "Las Cardas, Coquimbo, CEAZA"
      },
      {
        "id": "INIA-323",
        "name": "Las Naranjas, Punitaqui, INIA"
      },
      {
        "id": "EXT-20",
        "name": "Lavaderos, Río Hurtado, CEAZA"
      },
      {
        "id": "EXT-172",
        "name": "Liceo Padre José Herde, Canela, DMC"
      },
      {
        "id": "EXT-173",
        "name": "Liceo Samuel Román Rojas, Combarbalá, DMC"
      },
      {
        "id": "INIA-319",
        "name": "Los Acacios, Ovalle, INIA"
      },
      {
        "id": "EXT-23",
        "name": "Los Molles - Bocatoma, Monte Patria, CEAZA"
      },
      {
        "id": "EXT-33",
        "name": "Mincha Sur, Canela, CEAZA"
      },
      {
        "id": "EXT-103",
        "name": "Monte Patria - Centro Cultural, Monte Patria, DMC"
      },
      {
        "id": "EXT-12",
        "name": "Pan de Azúcar, Coquimbo, CEAZA"
      },
      {
        "id": "EXT-102",
        "name": "Parque Los Pimientos, Vicuña, DMC"
      },
      {
        "id": "EXT-28",
        "name": "Pichasca, Río Hurtado, CEAZA"
      },
      {
        "id": "EXT-1009",
        "name": "Pisco Capel, Salamanca, DMC"
      },
      {
        "id": "EXT-8",
        "name": "Pisco Elqui, Paiguano, CEAZA"
      },
      {
        "id": "EXT-31",
        "name": "Punta Colorada, La Higuera, CEAZA"
      },
      {
        "id": "EXT-6",
        "name": "Punta de Choros, La Higuera, CEAZA"
      },
      {
        "id": "EXT-16",
        "name": "Quebrada Seca, Ovalle, CEAZA"
      },
      {
        "id": "INIA-221",
        "name": "Quilimarí, Los Vilos, INIA"
      },
      {
        "id": "EXT-1",
        "name": "Rapel, Monte Patria, CEAZA"
      },
      {
        "id": "EXT-18",
        "name": "Talhuén, Ovalle, CEAZA"
      },
      {
        "id": "EXT-37",
        "name": "Tascadero, Monte Patria, CEAZA"
      },
      {
        "id": "EXT-194",
        "name": "Tilama, Los Vilos, CEAZA"
      },
      {
        "id": "EXT-15",
        "name": "UCN Guayacan, Coquimbo, CEAZA"
      },
      {
        "id": "EXT-36",
        "name": "Universidad de La Serena, La Serena, CEAZA"
      },
      {
        "id": "EXT-13",
        "name": "Vicuña, Vicuña, CEAZA"
      },
      {
        "id": "EXT-174",
        "name": "Vivero CONAF, Illapel, DMC"
      }
    ]
  },
  {
    "id": "valpara-so",
    "name": "Valparaíso",
    "stations": [
      {
        "id": "EXT-135",
        "name": "Aeródromo Rodelillo, Viña del Mar, DMC"
      },
      {
        "id": "EXT-139",
        "name": "Aeródromo Santo Domingo, Santo Domingo, DMC"
      },
      {
        "id": "EXT-175",
        "name": "Aeródromo Torquemada, Concón, MMA-DMC"
      },
      {
        "id": "EXT-116",
        "name": "Aeropuerto Mataveri, Isla de Pascua, DMC"
      },
      {
        "id": "EXT-133",
        "name": "Catapilco, Zapallar, DMC"
      },
      {
        "id": "EXT-972",
        "name": "Catemu, Catemu, DMC"
      },
      {
        "id": "INIA-213",
        "name": "Colliguay, Quilpué, INIA"
      },
      {
        "id": "INIA-167",
        "name": "Cuncumén, San Antonio, INIA"
      },
      {
        "id": "INIA-165",
        "name": "El Maqui, Puchuncaví, INIA"
      },
      {
        "id": "EXT-1018",
        "name": "El Tártaro, Putaendo, DMC"
      },
      {
        "id": "EXT-192",
        "name": "Escuela Agrícola, San Felipe, DMC"
      },
      {
        "id": "EXT-134",
        "name": "Jardín Botánico, Viña del Mar, DMC"
      },
      {
        "id": "EXT-140",
        "name": "Juan Fernández, Juan Fernández, DMC"
      },
      {
        "id": "INIA-51",
        "name": "La Cruz, La Cruz, INIA"
      },
      {
        "id": "EXT-104",
        "name": "Las Peñas, Llaillay, DMC"
      },
      {
        "id": "EXT-105",
        "name": "Liceo Agrícola Chincolco, Petorca, DMC"
      },
      {
        "id": "EXT-1029",
        "name": "Liceo Agrícola Quillota, Quillota, DMC"
      },
      {
        "id": "EXT-1028",
        "name": "Liceo San Esteban, San Esteban, DMC"
      },
      {
        "id": "EXT-167",
        "name": "Lo Zarate, Cartagena, DMC"
      },
      {
        "id": "EXT-132",
        "name": "Los Libertadores, Los Andes, DMC"
      },
      {
        "id": "EXT-1016",
        "name": "Panquehue, Panquehue, DMC"
      },
      {
        "id": "EXT-106",
        "name": "Quintero - Climatológica, Quintero, DMC"
      }
    ]
  },
  {
    "id": "metropolitana",
    "name": "Metropolitana",
    "stations": [
      {
        "id": "EXT-150",
        "name": "Aeródromo Curacaví, Curacaví, DMC"
      },
      {
        "id": "EXT-136",
        "name": "Aeródromo Eulogio Sánchez, La Reina, DMC"
      },
      {
        "id": "EXT-980",
        "name": "Aeródromo Peldehue, Colina, DMC"
      },
      {
        "id": "EXT-142",
        "name": "Cerro San Francisco, Lo Prado, MMA-DMC"
      },
      {
        "id": "INIA-313",
        "name": "Chacabuco, Colina, INIA"
      },
      {
        "id": "EXT-141",
        "name": "Chorombo Hacienda, María Pinto, DMC"
      },
      {
        "id": "INIA-314",
        "name": "Chorrillos, Lampa, INIA"
      },
      {
        "id": "INIA-210",
        "name": "El Asiento, Alhué, INIA"
      },
      {
        "id": "EXT-108",
        "name": "El Colorado, Lo Barnechea, DMC"
      },
      {
        "id": "EXT-109",
        "name": "El Milagro, Buin, DMC"
      },
      {
        "id": "INIA-311",
        "name": "El Oasis, Lampa, INIA"
      },
      {
        "id": "EXT-144",
        "name": "El Paico, Talagante, MMA-DMC"
      },
      {
        "id": "INIA-320",
        "name": "El Parrón, María Pinto, INIA"
      },
      {
        "id": "INIA-315",
        "name": "El Villorrio, Padre Hurtado, INIA"
      },
      {
        "id": "EXT-143",
        "name": "Guayacán, San José de Maipo, MMA-DMC"
      },
      {
        "id": "INIA-318",
        "name": "La Aurora, Curacaví, INIA"
      },
      {
        "id": "EXT-973",
        "name": "La Dormida, Tiltil, MMA-DMC"
      },
      {
        "id": "INIA-4",
        "name": "La Platina, La Pintana, INIA"
      },
      {
        "id": "EXT-149",
        "name": "Lo Pinto, Colina, MMA-DMC"
      },
      {
        "id": "INIA-6",
        "name": "Los Tilos, Buin, INIA"
      },
      {
        "id": "EXT-978",
        "name": "Polpaico, Tiltil, DMC"
      },
      {
        "id": "EXT-138",
        "name": "Pudahuel , Pudahuel, DMC"
      },
      {
        "id": "EXT-137",
        "name": "Quinta Normal, Quinta Normal, DMC"
      },
      {
        "id": "EXT-179",
        "name": "Regimiento de Colina, Colina, DMC"
      },
      {
        "id": "INIA-162",
        "name": "Rinconada - U de Chile, Maipú, INIA"
      },
      {
        "id": "EXT-107",
        "name": "Río Clarillo, Pirque, DMC"
      },
      {
        "id": "INIA-100",
        "name": "San Antonio de Naltahua, Isla de Maipo, INIA"
      },
      {
        "id": "EXT-145",
        "name": "San Pablo-DASA, Pudahuel, MMA-DMC"
      },
      {
        "id": "INIA-101",
        "name": "San Pedro de Melipilla, San Pedro, INIA"
      },
      {
        "id": "INIA-316",
        "name": "Santa Amelia, Talagante, INIA"
      },
      {
        "id": "EXT-118",
        "name": "Talagante, Talagante, DMC"
      },
      {
        "id": "INIA-321",
        "name": "Valdivia de Paine, Buin, INIA"
      }
    ]
  },
  {
    "id": "o-higgins",
    "name": "O'Higgins",
    "stations": [
      {
        "id": "EXT-153",
        "name": "Aeródromo La Independencia, Rancagua, DMC"
      },
      {
        "id": "EXT-110",
        "name": "Aeródromo Pichilemu, Pichilemu, DMC"
      },
      {
        "id": "INIA-332",
        "name": "Altair, Requinoa, VDCH-INIA"
      },
      {
        "id": "INIA-334",
        "name": "Calleuque, Peralillo, VDCH-INIA"
      },
      {
        "id": "INIA-163",
        "name": "El Arenal, Quinta de Tilcoco, INIA"
      },
      {
        "id": "INIA-52",
        "name": "El Tambo, San Vicente, INIA"
      },
      {
        "id": "EXT-1034",
        "name": "Escuela Agrícola Cristo Obrero, Graneros, EACO"
      },
      {
        "id": "INIA-55",
        "name": "Hidango, Litueche, INIA"
      },
      {
        "id": "INIA-307",
        "name": "Licancheu, Navidad, INIA"
      },
      {
        "id": "INIA-228",
        "name": "Liceo Jean Buchanan, Peumo, INIA"
      },
      {
        "id": "INIA-329",
        "name": "Los Lingues, San Fernando, VDCH-INIA"
      },
      {
        "id": "EXT-155",
        "name": "Nilahue - La Quebrada, Pumanque, DMC"
      },
      {
        "id": "INIA-317",
        "name": "Peor es Nada, Chimbarongo, INIA"
      },
      {
        "id": "EXT-78",
        "name": "Portezuelo-Codelco, Machalí, MMA-DMC"
      },
      {
        "id": "INIA-217",
        "name": "Puente Negro, Pichilemu, INIA"
      },
      {
        "id": "EXT-154",
        "name": "Quimávida, Coltauco, DMC"
      },
      {
        "id": "INIA-303",
        "name": "Rayentué, Rengo, INIA"
      }
    ]
  },
  {
    "id": "maule",
    "name": "Maule",
    "stations": [
      {
        "id": "EXT-152",
        "name": "Aeródromo General Freire, Curicó, DMC"
      },
      {
        "id": "EXT-958",
        "name": "Camarico, Río Claro, AGRICHILE"
      },
      {
        "id": "EXT-1003",
        "name": "Carrizal, Constitución, ARAUCO"
      },
      {
        "id": "INIA-46",
        "name": "Cauquenes, Cauquenes, INIA"
      },
      {
        "id": "INIA-22",
        "name": "Chanco, Chanco, INIA"
      },
      {
        "id": "EXT-161",
        "name": "Copihue, Retiro, MMA-DMC"
      },
      {
        "id": "INIA-12",
        "name": "Coronel de Maule, Cauquenes, INIA"
      },
      {
        "id": "EXT-1004",
        "name": "Curepto, Curepto, ARAUCO"
      },
      {
        "id": "EXT-991",
        "name": "Cuyuname, Empedrado, ARAUCO"
      },
      {
        "id": "INIA-214",
        "name": "Deuca, Curepto, INIA"
      },
      {
        "id": "EXT-992",
        "name": "El Auquil, Pelarco, ARAUCO"
      },
      {
        "id": "EXT-1000",
        "name": "Escuela Agrícola de Molina, Molina, EAM-FDF"
      },
      {
        "id": "EXT-974",
        "name": "Escuela de Artillería, Linares, MMA-DMC"
      },
      {
        "id": "EXT-983",
        "name": "Hualañé, Hualañé, ARAUCO"
      },
      {
        "id": "INIA-331",
        "name": "La Reserva, Río Claro, VDCH-INIA"
      },
      {
        "id": "INIA-212",
        "name": "Lomas, Pelluhue, INIA"
      },
      {
        "id": "INIA-14",
        "name": "Los Despachos, Cauquenes, INIA"
      },
      {
        "id": "EXT-963",
        "name": "Los Niches, Curicó, AGRICHILE"
      },
      {
        "id": "INIA-227",
        "name": "Miraflores, Longaví, INIA"
      },
      {
        "id": "INIA-154",
        "name": "Monte Flor-Tucapel, Parral, INIA"
      },
      {
        "id": "EXT-986",
        "name": "Palhuen, Curepto, ARAUCO"
      },
      {
        "id": "EXT-156",
        "name": "Panguilemo, Talca, DMC"
      },
      {
        "id": "EXT-960",
        "name": "Parral, Parral, AGRICHILE"
      },
      {
        "id": "INIA-333",
        "name": "Pencahue, Pencahue, VDCH-INIA"
      },
      {
        "id": "INIA-135",
        "name": "San Clemente, San Clemente, INIA"
      },
      {
        "id": "INIA-215",
        "name": "San Jorge Los Niches, Curicó, INIA"
      },
      {
        "id": "EXT-959",
        "name": "San Sebastián, Río Claro, AGRICHILE"
      },
      {
        "id": "INIA-136",
        "name": "Santa Amada, Linares, INIA"
      },
      {
        "id": "EXT-981",
        "name": "Santa Estela, Constitución, ARAUCO"
      },
      {
        "id": "INIA-7",
        "name": "Santa Sofía, Cauquenes, INIA"
      },
      {
        "id": "INIA-11",
        "name": "Sauzal, Cauquenes, INIA"
      },
      {
        "id": "EXT-982",
        "name": "Talca, Talca, ARAUCO"
      },
      {
        "id": "EXT-1031",
        "name": "Teno, Teno, ARAUCO"
      },
      {
        "id": "EXT-977",
        "name": "Villa Alegre, Villa Alegre, FDF"
      },
      {
        "id": "INIA-327",
        "name": "Villa Seca, Retiro, VDCH-INIA"
      },
      {
        "id": "EXT-993",
        "name": "Vivero Quivolgo, Constitución, ARAUCO"
      }
    ]
  },
  {
    "id": "uble",
    "name": "Ñuble",
    "stations": [
      {
        "id": "EXT-157",
        "name": "Aeródromo Gral. Bernardo O'Higgins, Chillán, DMC"
      },
      {
        "id": "EXT-1020",
        "name": "Bandurrias, San Fabián, ARAUCO"
      },
      {
        "id": "INIA-139",
        "name": "Centro Experimental Arroz, San Carlos, INIA"
      },
      {
        "id": "EXT-1011",
        "name": "Cerro Cayumanque, Quillón, MMA-DMC"
      },
      {
        "id": "EXT-160",
        "name": "Chillán Mayulermo, San Ignacio, MMA-DMC"
      },
      {
        "id": "EXT-997",
        "name": "Coyanco, Quillón, ARAUCO"
      },
      {
        "id": "EXT-1030",
        "name": "El Espolón, Chillán, ARAUCO"
      },
      {
        "id": "EXT-1001",
        "name": "El Kayser, Coihueco, ARAUCO"
      },
      {
        "id": "INIA-330",
        "name": "Larqui, Bulnes, VDCH-INIA"
      },
      {
        "id": "EXT-1008",
        "name": "Liceo San Nicolás, San Nicolás, DMC"
      },
      {
        "id": "EXT-1033",
        "name": "Litral, Bulnes, ARAUCO"
      },
      {
        "id": "INIA-73",
        "name": "Navidad, El Carmen, INIA"
      },
      {
        "id": "INIA-47",
        "name": "Ninhue, Chillán, INIA"
      },
      {
        "id": "INIA-24",
        "name": "Nueva Aldea, Ránquil, INIA"
      },
      {
        "id": "INIA-23",
        "name": "Portezuelo, Portezuelo, INIA"
      },
      {
        "id": "INIA-211",
        "name": "Puralihue, Treguaco, INIA"
      },
      {
        "id": "INIA-351",
        "name": "Quilamapu, Chillán, INIA"
      },
      {
        "id": "EXT-1019",
        "name": "Remolinos, Pemuco, ARAUCO"
      },
      {
        "id": "EXT-961",
        "name": "San Gregorio, Ñiquén, AGRICHILE"
      },
      {
        "id": "INIA-17",
        "name": "Santa Rosa, Chillán, INIA"
      },
      {
        "id": "EXT-999",
        "name": "Siberia, Yungay, ARAUCO"
      },
      {
        "id": "EXT-158",
        "name": "Termas de Chillán, Pinto, DMC"
      },
      {
        "id": "EXT-994",
        "name": "Totoral, Coelemu, ARAUCO"
      },
      {
        "id": "INIA-49",
        "name": "Yungay, Yungay, INIA"
      },
      {
        "id": "EXT-989",
        "name": "Zorzal Blanco, Quirihue, ARAUCO"
      }
    ]
  },
  {
    "id": "biob-o",
    "name": "Biobío",
    "stations": [
      {
        "id": "EXT-975",
        "name": "Aeródromo Isla Mocha, Lebu, DMC"
      },
      {
        "id": "EXT-955",
        "name": "Aeródromo Lequecahue, Tirúa, DMC"
      },
      {
        "id": "EXT-229",
        "name": "Aeródromo María Dolores, Los Ángeles, DMC"
      },
      {
        "id": "EXT-996",
        "name": "Cangrejillo, Florida, ARAUCO"
      },
      {
        "id": "EXT-111",
        "name": "Carriel Sur, Concepción, DMC"
      },
      {
        "id": "INIA-328",
        "name": "Chumulco, Mulchén, VDCH-INIA"
      },
      {
        "id": "INIA-354",
        "name": "Colegio Agrícola Los Mayos, Santa Bárbara, INIA"
      },
      {
        "id": "INIA-322",
        "name": "Contulmo Urbano, Contulmo, INIA"
      },
      {
        "id": "INIA-21",
        "name": "Human, Los Ángeles, INIA"
      },
      {
        "id": "EXT-990",
        "name": "La Colcha, Curanilahue, ARAUCO"
      },
      {
        "id": "EXT-1015",
        "name": "La Colcha MMA, Curanilahue, MMA-DMC"
      },
      {
        "id": "INIA-312",
        "name": "La Colonia, Laja, INIA"
      },
      {
        "id": "INIA-325",
        "name": "La Hijuela, Nacimiento, INIA"
      },
      {
        "id": "INIA-308",
        "name": "Las Puentes, Arauco, INIA"
      },
      {
        "id": "INIA-84",
        "name": "Lebu, Lebu, INIA"
      },
      {
        "id": "EXT-162",
        "name": "Liceo Agrícola El Huertón, Los Ángeles, DMC"
      },
      {
        "id": "INIA-36",
        "name": "Llenquehue (ex GTT Peleco), Cañete, INIA"
      },
      {
        "id": "EXT-1014",
        "name": "Los Alamos, Los Álamos, ARAUCO"
      },
      {
        "id": "INIA-161",
        "name": "Ponotro, Tirúa, INIA"
      },
      {
        "id": "INIA-10",
        "name": "Punta Parra, Tomé, INIA"
      },
      {
        "id": "EXT-998",
        "name": "Santa Juana, Santa Juana, ARAUCO"
      },
      {
        "id": "INIA-310",
        "name": "Santa Lucía, Florida, INIA"
      },
      {
        "id": "EXT-1006",
        "name": "Tanahullin, Santa Juana, ARAUCO"
      }
    ]
  },
  {
    "id": "la-araucan-a",
    "name": "La Araucanía",
    "stations": [
      {
        "id": "EXT-163",
        "name": "Aeródromo Maquehue, Padre las Casas, DMC"
      },
      {
        "id": "EXT-979",
        "name": "Aeródromo Pucón, Pucón, DMC"
      },
      {
        "id": "EXT-165",
        "name": "Aeropuerto Araucanía, Freire, DMC"
      },
      {
        "id": "EXT-1037",
        "name": "Baltimore, Collipulli, ARAUCO"
      },
      {
        "id": "INIA-147",
        "name": "Caballería, Galvarino, INIA"
      },
      {
        "id": "EXT-962",
        "name": "Caracas, Cunco, AGRICHILE"
      },
      {
        "id": "INIA-8",
        "name": "Carillanca, Vilcún, INIA"
      },
      {
        "id": "INIA-239",
        "name": "Collimallin, Temuco, INIA"
      },
      {
        "id": "INIA-40",
        "name": "Cuarta Faja, Gorbea, INIA"
      },
      {
        "id": "INIA-29",
        "name": "Dominguez, Saavedra, INIA"
      },
      {
        "id": "INIA-141",
        "name": "El Membrillo, Melipeuco, INIA"
      },
      {
        "id": "INIA-164",
        "name": "El Quincho, Cunco, INIA"
      },
      {
        "id": "INIA-237",
        "name": "El Vergel, Angol, INIA"
      },
      {
        "id": "INIA-168",
        "name": "Faja Maisan, Pitrufquén, INIA"
      },
      {
        "id": "INIA-206",
        "name": "Gaby Ranquilco, Lumaco, INIA"
      },
      {
        "id": "INIA-140",
        "name": "Huiscapi, Villarrica, INIA"
      },
      {
        "id": "EXT-180",
        "name": "Húsares, Angol, DMC"
      },
      {
        "id": "INIA-157",
        "name": "La Isla, Purén, INIA"
      },
      {
        "id": "INIA-208",
        "name": "La Paz, Loncoche, INIA"
      },
      {
        "id": "INIA-33",
        "name": "La Providencia, Traiguén, INIA"
      },
      {
        "id": "INIA-355",
        "name": "Lago Icalma, Lonquimay, INIA"
      },
      {
        "id": "INIA-146",
        "name": "Las Palmas, Victoria, INIA"
      },
      {
        "id": "INIA-31",
        "name": "Llollinco, Teodoro Schmidt, INIA"
      },
      {
        "id": "EXT-164",
        "name": "Lonquimay, Lonquimay, DMC"
      },
      {
        "id": "INIA-203",
        "name": "Los Arrayanes, Toltén, INIA"
      },
      {
        "id": "INIA-144",
        "name": "Manzanares, Renaico, INIA"
      },
      {
        "id": "EXT-79",
        "name": "Maquehue - UFRO, Freire, MMA-DMC"
      },
      {
        "id": "INIA-148",
        "name": "Marimenuco, Lonquimay, INIA"
      },
      {
        "id": "INIA-238",
        "name": "Pailahueque, Ercilla, INIA"
      },
      {
        "id": "INIA-138",
        "name": "Perales, Cholchol, INIA"
      },
      {
        "id": "INIA-142",
        "name": "Puala, Curarrehue, INIA"
      },
      {
        "id": "INIA-28",
        "name": "Quiripio, Carahue, INIA"
      },
      {
        "id": "INIA-233",
        "name": "Radal, Freire, INIA"
      },
      {
        "id": "EXT-181",
        "name": "Regimiento Victoria, Victoria, DMC"
      },
      {
        "id": "EXT-166",
        "name": "Rucamanque - UFRO, Temuco, MMA-DMC"
      },
      {
        "id": "INIA-205",
        "name": "San Enrique, Pucón, INIA"
      },
      {
        "id": "INIA-48",
        "name": "San Luis, Curacautín, INIA"
      },
      {
        "id": "INIA-209",
        "name": "San Rafael, Los Sauces, INIA"
      },
      {
        "id": "INIA-235",
        "name": "San Sebastián, Perquenco, INIA"
      },
      {
        "id": "INIA-41",
        "name": "Santa Adela, Nueva Imperial, INIA"
      },
      {
        "id": "EXT-1005",
        "name": "Santa Amelia, Collipulli, ARAUCO"
      },
      {
        "id": "INIA-143",
        "name": "Santa Inés, Lautaro, INIA"
      },
      {
        "id": "INIA-145",
        "name": "Surco y Semilla, Collipulli, INIA"
      },
      {
        "id": "INIA-236",
        "name": "Taplon, Padre las Casas, INIA"
      },
      {
        "id": "EXT-74",
        "name": "Temuco, Temuco, ANPROS"
      },
      {
        "id": "INIA-18",
        "name": "Tranapuente, Carahue, INIA"
      },
      {
        "id": "EXT-75",
        "name": "Villarrica, Villarrica, DMC"
      }
    ]
  },
  {
    "id": "los-r-os",
    "name": "Los Ríos",
    "stations": [
      {
        "id": "EXT-80",
        "name": "Aeropuerto Pichoy, Mariquina, DMC"
      },
      {
        "id": "INIA-151",
        "name": "Austral, Valdivia, UACh-INIA"
      },
      {
        "id": "EXT-112",
        "name": "Corral - ESSAL, Corral, DMC"
      },
      {
        "id": "EXT-1024",
        "name": "Crucero, Río Bueno, COLUN"
      },
      {
        "id": "INIA-71",
        "name": "El Cardal, Río Bueno, INIA"
      },
      {
        "id": "EXT-1027",
        "name": "El Copihue, Paillaco, COLUN"
      },
      {
        "id": "EXT-1010",
        "name": "Fundo el Maitén, Paillaco, DMC"
      },
      {
        "id": "EXT-1023",
        "name": "Ignao, Río Bueno, COLUN"
      },
      {
        "id": "EXT-81",
        "name": "Isla Teja - UACh, Valdivia, DMC"
      },
      {
        "id": "EXT-1026",
        "name": "La Estrella, Futrono, COLUN"
      },
      {
        "id": "EXT-984",
        "name": "La Unión, La Unión, ARAUCO"
      },
      {
        "id": "INIA-72",
        "name": "Lago Verde, Paillaco, INIA"
      },
      {
        "id": "INIA-99",
        "name": "Las Lomas, Máfil, INIA"
      },
      {
        "id": "EXT-976",
        "name": "Liceo Agrotec, La Unión, MMA-DMC"
      },
      {
        "id": "EXT-995",
        "name": "Llongo, Mariquina, ARAUCO"
      },
      {
        "id": "EXT-1035",
        "name": "Mamalona, Panguipulli, UFRO"
      },
      {
        "id": "EXT-1032",
        "name": "Oldenburgo, La Unión, ARAUCO"
      },
      {
        "id": "INIA-132",
        "name": "Palermo, La Unión, INIA"
      },
      {
        "id": "EXT-985",
        "name": "Pancul, Los Lagos, ARAUCO"
      },
      {
        "id": "EXT-82",
        "name": "Panguipulli, Panguipulli, DMC"
      },
      {
        "id": "EXT-1025",
        "name": "Piruco, Río Bueno, COLUN"
      },
      {
        "id": "INIA-155",
        "name": "Rucatayo, Río Bueno, INIA"
      },
      {
        "id": "INIA-102",
        "name": "Santa Carla, Los Lagos, INIA"
      }
    ]
  },
  {
    "id": "los-lagos",
    "name": "Los Lagos",
    "stations": [
      {
        "id": "EXT-76",
        "name": "Adolfo Matthei, Osorno, DMC"
      },
      {
        "id": "EXT-200",
        "name": "Aeródromo de Futaleufú, Futaleufú, DMC"
      },
      {
        "id": "EXT-193",
        "name": "Aeródromo de Quellón, Quellón, DMC"
      },
      {
        "id": "EXT-201",
        "name": "Aeropuerto de Cañal Bajo, Osorno, DMC"
      },
      {
        "id": "EXT-113",
        "name": "Aeropuerto El Tepual , Puerto Montt, DMC"
      },
      {
        "id": "EXT-83",
        "name": "Bahía Mansa, San Juan de la Costa, DMC"
      },
      {
        "id": "INIA-25",
        "name": "Butalcura, Dalcahue, INIA"
      },
      {
        "id": "INIA-207",
        "name": "Carelmapu, Maullín, INIA"
      },
      {
        "id": "EXT-1022",
        "name": "Casona Los Ulmos, Puerto Varas, ULMOS"
      },
      {
        "id": "INIA-326",
        "name": "Chiriuco, Puerto Octay, INIA"
      },
      {
        "id": "INIA-69",
        "name": "Colegual, Llanquihue, INIA"
      },
      {
        "id": "INIA-104",
        "name": "Desagüe Rupanco, Puyehue, INIA"
      },
      {
        "id": "INIA-105",
        "name": "Ensenada, Puerto Varas, INIA"
      },
      {
        "id": "EXT-85",
        "name": "Escuela Mirasol, Puerto Montt, DMC"
      },
      {
        "id": "INIA-201",
        "name": "Huacamapu, San Juan de la Costa, INIA"
      },
      {
        "id": "INIA-20",
        "name": "Huyar Alto, Curaco de Vélez, INIA"
      },
      {
        "id": "INIA-232",
        "name": "Isla Chelin, Castro, INIA"
      },
      {
        "id": "INIA-45",
        "name": "La Pampa, Purranque, INIA"
      },
      {
        "id": "EXT-84",
        "name": "Liceo Agrícola de Ancud, Ancud, DMC"
      },
      {
        "id": "INIA-26",
        "name": "Los Canelos, Los Muermos, INIA"
      },
      {
        "id": "EXT-86",
        "name": "Nueva Chaitén, Chaitén, DMC"
      },
      {
        "id": "EXT-1021",
        "name": "Pampa Los Ulmos , Puerto Varas, ULMOS"
      },
      {
        "id": "INIA-230",
        "name": "Pid-Pid, Castro, INIA"
      },
      {
        "id": "INIA-68",
        "name": "Polizones, Fresia, INIA"
      },
      {
        "id": "EXT-114",
        "name": "Puerto Varas - ESSAL, Puerto Varas, DMC"
      },
      {
        "id": "INIA-324",
        "name": "Putenio, Calbuco, INIA"
      },
      {
        "id": "INIA-133",
        "name": "Quilacahuin, San Pablo, INIA"
      },
      {
        "id": "INIA-50",
        "name": "Quilanto, Frutillar, INIA"
      },
      {
        "id": "INIA-231",
        "name": "Quilquico, Castro, INIA"
      },
      {
        "id": "INIA-19",
        "name": "Remehue, Osorno, INIA"
      },
      {
        "id": "INIA-67",
        "name": "Tara, Chonchi, INIA"
      },
      {
        "id": "INIA-309",
        "name": "Tenaún, Dalcahue, INIA"
      }
    ]
  },
  {
    "id": "ays-n",
    "name": "Aysén",
    "stations": [
      {
        "id": "EXT-222",
        "name": "Aeródromo Balmaceda, Coyhaique, DMC"
      },
      {
        "id": "EXT-198",
        "name": "Aeródromo Melinka, Guaitecas, DMC"
      },
      {
        "id": "EXT-88",
        "name": "Aeródromo Puerto Aysén, Aisén, DMC"
      },
      {
        "id": "EXT-89",
        "name": "Aeródromo Teniente Vidal, Coyhaique, DMC"
      },
      {
        "id": "INIA-234",
        "name": "Arroyo el Gato, Coyhaique, INIA"
      },
      {
        "id": "INIA-226",
        "name": "Bajada Ibañez, Río Ibáñez, INIA"
      },
      {
        "id": "INIA-13",
        "name": "Chile Chico, Chile Chico, INIA"
      },
      {
        "id": "INIA-32",
        "name": "Cochrane, Cochrane, INIA"
      },
      {
        "id": "INIA-98",
        "name": "El Claro, Coyhaique, INIA"
      },
      {
        "id": "INIA-166",
        "name": "La Junta, Cisnes, INIA"
      },
      {
        "id": "EXT-197",
        "name": "Mirador Marchant, Coyhaique, MMA-DMC"
      },
      {
        "id": "INIA-301",
        "name": "Ñirehuao, Coyhaique, INIA"
      },
      {
        "id": "INIA-306",
        "name": "Puerto Ibáñez, Río Ibáñez, INIA"
      },
      {
        "id": "EXT-87",
        "name": "Puyuhuapi, Cisnes, DMC"
      },
      {
        "id": "EXT-90",
        "name": "Subcomisaría de Villa O'Higgins, O’Higgins, DMC"
      },
      {
        "id": "INIA-16",
        "name": "Tamelaike, Coyhaique, INIA"
      },
      {
        "id": "INIA-44",
        "name": "Vista Hermosa, Coyhaique, INIA"
      }
    ]
  },
  {
    "id": "magallanes",
    "name": "Magallanes",
    "stations": [
      {
        "id": "EXT-95",
        "name": "Aeródromo Fuentes Martínez, Porvenir, DMC"
      },
      {
        "id": "EXT-91",
        "name": "Aeródromo Teniente Gallardo, Natales, DMC"
      },
      {
        "id": "EXT-223",
        "name": "Aeropuerto Carlos Ibañez, Punta Arenas, DMC"
      },
      {
        "id": "EXT-97",
        "name": "Aeropuerto Guardiamarina Zañartu, Cabo de Hornos, DMC"
      },
      {
        "id": "EXT-98",
        "name": "Base Eduardo Frei Montalva, Antártica, DMC"
      },
      {
        "id": "INIA-159",
        "name": "Cerro Castillo, Torres del Paine, INIA"
      },
      {
        "id": "EXT-176",
        "name": "Cerro Sombrero MA, Primavera, DMC"
      },
      {
        "id": "INIA-339",
        "name": "Complejo Torres del Paine, Torres del Paine, GORE-MAGALLANES-INIA"
      },
      {
        "id": "EXT-96",
        "name": "Escuela Alberto Hurtado, Punta Arenas, DMC"
      },
      {
        "id": "INIA-219",
        "name": "Estancia 5 de Enero, San Gregorio, INIA"
      },
      {
        "id": "INIA-338",
        "name": "Estancia Berta, Natales, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-335",
        "name": "Estancia El Ovejero, Laguna Blanca, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-336",
        "name": "Estancia Laguna Blanca, Laguna Blanca, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-337",
        "name": "Estancia Skyring, Río Verde, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-222",
        "name": "Estancia Zenia, Porvenir, INIA"
      },
      {
        "id": "INIA-348",
        "name": "Fuerte Bulnes, Punta Arenas, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-349",
        "name": "Huertos Familiares, Cabo de Hornos, GORE-MAGALLANES-INIA"
      },
      {
        "id": "EXT-92",
        "name": "Instituto de la Patagonia, Punta Arenas, DMC"
      },
      {
        "id": "INIA-103",
        "name": "Isla Riesco, Río Verde, INIA"
      },
      {
        "id": "INIA-37",
        "name": "Kampenaike, Laguna Blanca, INIA"
      },
      {
        "id": "INIA-340",
        "name": "La Fueguina, Porvenir, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-347",
        "name": "La Pelecha, San Gregorio, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-344",
        "name": "La Pirucha, Timaukel, GORE-MAGALLANES-INIA"
      },
      {
        "id": "EXT-115",
        "name": "Pampa Guanaco, Timaukel, DMC"
      },
      {
        "id": "INIA-35",
        "name": "Puerto Natales, Natales, INIA"
      },
      {
        "id": "INIA-82",
        "name": "Punta Arenas Rural, Punta Arenas, INIA"
      },
      {
        "id": "INIA-346",
        "name": "Punta Delgada, San Gregorio, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-343",
        "name": "Río Grande, Timaukel, GORE-MAGALLANES-INIA"
      },
      {
        "id": "EXT-956",
        "name": "Río Serrano, Torres del Paine, DMC"
      },
      {
        "id": "INIA-342",
        "name": "Rita, Primavera, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-341",
        "name": "Rosita, Porvenir, GORE-MAGALLANES-INIA"
      },
      {
        "id": "INIA-83",
        "name": "Tierra del Fuego, Primavera, INIA"
      },
      {
        "id": "INIA-345",
        "name": "Tres Hermanos, Porvenir, GORE-MAGALLANES-INIA"
      },
      {
        "id": "EXT-93",
        "name": "Unidad Aeropolicial, Punta Arenas, DMC"
      },
      {
        "id": "EXT-94",
        "name": "Villa Tehuelche, Laguna Blanca, DMC"
      }
    ]
  }
];
