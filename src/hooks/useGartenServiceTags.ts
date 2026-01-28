import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GartenServiceTag {
  id: string;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useGartenServiceTags = () => {
  return useQuery({
    queryKey: ["garten-service-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("garten_service_tags")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as GartenServiceTag[];
    },
  });
};

export const useGartenServiceTagsAdmin = () => {
  return useQuery({
    queryKey: ["garten-service-tags-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("garten_service_tags")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as GartenServiceTag[];
    },
  });
};

export const useUpdateGartenServiceTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<GartenServiceTag> & { id: string }) => {
      const { data, error } = await supabase
        .from("garten_service_tags")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags"] });
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags-admin"] });
    },
  });
};

export const useCreateGartenServiceTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tag: { name: string; display_order: number }) => {
      const { data, error } = await supabase
        .from("garten_service_tags")
        .insert(tag)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags"] });
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags-admin"] });
    },
  });
};

export const useDeleteGartenServiceTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("garten_service_tags")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags"] });
      queryClient.invalidateQueries({ queryKey: ["garten-service-tags-admin"] });
    },
  });
};
