import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export const useSiteContent = (section: string, key: string) => {
  return useQuery({
    queryKey: ["site-content", section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section)
        .eq("key", key)
        .maybeSingle();

      if (error) throw error;
      return data as SiteContent | null;
    },
  });
};

export const useSiteContentBySection = (section: string) => {
  return useQuery({
    queryKey: ["site-content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section);

      if (error) throw error;
      return data as SiteContent[];
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: string }) => {
      // Try to update first
      const { data: existing } = await supabase
        .from("site_content")
        .select("id")
        .eq("section", section)
        .eq("key", key)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from("site_content")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("site_content")
          .insert({ section, key, value })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["site-content", variables.section, variables.key] });
      queryClient.invalidateQueries({ queryKey: ["site-content", variables.section] });
    },
  });
};
