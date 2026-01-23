// Gallery images data - centralized for easy management
import equipment1 from "@/assets/gallery/equipment-1.jpg";
import equipment2 from "@/assets/gallery/equipment-2.jpg";
import equipment3 from "@/assets/gallery/equipment-3.jpg";
import garten1 from "@/assets/gallery/garten-1.jpg";
import garten2 from "@/assets/gallery/garten-2.jpg";
import garten3 from "@/assets/gallery/garten-3.jpg";

export type GalleryCategory = 
  | "Alle"
  | "Straßenbau"
  | "Tiefbau"
  | "Kanalbau"
  | "Garten";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "eq-1",
    src: equipment1,
    alt: "AsphaltBox mit Baumaschinen",
    category: "Straßenbau",
    title: "Modernes Equipment – AsphaltBox",
  },
  {
    id: "eq-2",
    src: equipment2,
    alt: "LKW mit AsphaltBox Transport",
    category: "Straßenbau",
    title: "Professioneller Transport",
  },
  {
    id: "eq-3",
    src: equipment3,
    alt: "JCB Bagger und Radlader",
    category: "Tiefbau",
    title: "Leistungsstarke Baumaschinen",
  },
  {
    id: "garten-1",
    src: garten1,
    alt: "Rollrasen Verlegung",
    category: "Garten",
    title: "Rollrasen – Professionelle Verlegung",
  },
  {
    id: "garten-2",
    src: garten2,
    alt: "Fertiger Garten mit Gewächshaus",
    category: "Garten",
    title: "Gartengestaltung mit Wegführung",
  },
  {
    id: "garten-3",
    src: garten3,
    alt: "Außenanlage mit Mulch und Treppe",
    category: "Garten",
    title: "Neugestaltung Außenanlage",
  },
];

export const categories: GalleryCategory[] = [
  "Alle",
  "Straßenbau",
  "Tiefbau",
  "Kanalbau",
  "Garten",
];
