import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GartenProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  image_focal_point: string | null;
  image_focal_point_2: string | null;
  image_focal_point_3: string | null;
  image_focal_point_4: string | null;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Static fallback data in case database is empty
const fallbackProjects: GartenProject[] = [
  {
    id: "1",
    title: "Geräteschuppen mit Pflaster- und Terrassenbau",
    description: "Für den Kunden wurde ein Geräteschuppen errichtet, den Bereich davor mit Pflastersteinen gestaltet und seitlich eine Fläche mit Terrassenplatten angelegt. So ist ein klar strukturierter Gartenbereich mit Stauraum, Wegführung und zusätzlicher Nutzfläche entstanden.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "Warehouse",
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Wegegestaltung mit Trittplatten und Granitmauer",
    description: "Bei diesem Projekt wurde ein Großteil der Außenanlage aufgewertet. Die Wege sind mit hochwertigen Naturstein-Trittplatten ausgelegt. Zwischen Weg und Rasen sorgt eine Mauer aus Granitplatten für eine klare und stabile Trennung.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "Map",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Terrassenbau mit harmonischer Treppe",
    description: "In diesem Projekt wurde zunächst eine Terrasse mit großformatigen Terrassenplatten im Maß 100×100 cm realisiert. Die gleichen Platten kamen anschließend bei der Treppe in Kombination mit Blockstufen zum Einsatz.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "Grid3X3",
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Gartenumgestaltung mit Rollrasen und Wintergarten",
    description: "Der Garten erhielt eine komplette Neugestaltung mit frischem Rollrasen, der sofort für ein gepflegtes Erscheinungsbild sorgt. Ergänzt wird die Anlage durch einen neuen Wintergarten, der Haus und Garten harmonisch verbindet.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "Flower2",
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Neugestaltung der vorderen Außenanlage",
    description: "Die Außenanlage erstrahlt nun in einem komplett neuen Look. Nach dem Aufnehmen der alten Pflasterflächen wurde der Untergrund sorgfältig vorbereitet und das Pflaster neu verlegt.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "LayoutGrid",
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Erneuerung des Hauseingangs und Zugangsbereichs",
    description: "Die alte Treppe wich neuen, massiven Blockstufen, die Stabilität und Sicherheit bieten. Das Ergebnis ist ein langlebiger, funktionaler und optisch stimmiger Eingangsbereich.",
    image_url: null,
    image_url_2: null,
    image_url_3: null,
    image_url_4: null,
    image_focal_point: "center",
    image_focal_point_2: "center",
    image_focal_point_3: "center",
    image_focal_point_4: "center",
    icon: "DoorOpen",
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useGartenProjects = () => {
  return useQuery({
    queryKey: ["garten-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("garten_projects")
        .select("*")
        .order("display_order");

      if (error) {
        console.error("Error fetching garten projects:", error);
        return fallbackProjects;
      }

      // Return fallback if no data
      if (!data || data.length === 0) {
        return fallbackProjects;
      }

      return data as GartenProject[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
