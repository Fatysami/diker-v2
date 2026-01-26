import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryImage, GalleryCategory } from "@/components/gallery/GalleryData";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
}

export const useProjects = (limit?: number) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase
          .from("projects")
          .select("*")
          .eq("is_active", true)
          .order("display_order");

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        setProjects(data || []);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  // Convert projects to GalleryImage format for compatibility with GalleryGrid
  const toGalleryImages = (): GalleryImage[] => {
    return projects.map((project) => ({
      id: project.id,
      src: project.image_url,
      alt: project.description || project.title,
      category: (project.category as GalleryCategory) || "Straßenbau",
      title: project.title,
    }));
  };

  return { projects, loading, error, toGalleryImages };
};
