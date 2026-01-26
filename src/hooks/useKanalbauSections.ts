import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface KanalbauSection {
  id: string;
  title: string;
  paragraphs: string[];
  icon: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  display_order: number;
  is_active: boolean;
}

export const useKanalbauSections = () => {
  const [sections, setSections] = useState<KanalbauSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from("kanalbau_sections")
          .select("*")
          .order("display_order");

        if (error) throw error;
        setSections(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, loading, error };
};
