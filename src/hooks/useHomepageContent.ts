import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
}

export const useHomepageContent = (section: string) => {
  return useQuery({
    queryKey: ["homepage-content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section);

      if (error) throw error;
      
      // Convert array to object for easy access by key
      const contentMap: Record<string, string> = {};
      (data || []).forEach((item: ContentItem) => {
        contentMap[item.key] = item.value;
      });
      
      return contentMap;
    },
  });
};

// Hook to get all homepage content at once
export const useAllHomepageContent = () => {
  return useQuery({
    queryKey: ["homepage-content-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("section", ["hero", "about", "services"]);

      if (error) throw error;
      
      // Group by section
      const grouped: Record<string, Record<string, string>> = {
        hero: {},
        about: {},
        services: {},
      };
      
      (data || []).forEach((item: ContentItem) => {
        if (!grouped[item.section]) {
          grouped[item.section] = {};
        }
        grouped[item.section][item.key] = item.value;
      });
      
      return grouped;
    },
  });
};
