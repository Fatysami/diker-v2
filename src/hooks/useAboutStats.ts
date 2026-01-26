import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AboutStat {
  id: string;
  stat_key: string;
  stat_value: string;
  stat_suffix: string;
  label: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export const useAboutStats = () => {
  return useQuery({
    queryKey: ["about-stats"],
    queryFn: async (): Promise<AboutStat[]> => {
      const { data, error } = await supabase
        .from("about_stats")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (error) {
        console.error("Error fetching about stats:", error);
        return [];
      }

      return data || [];
    },
  });
};
