import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceTag {
  id: string;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type ServiceType = "strassenbau" | "tiefbau" | "kanalbau";

// Helper to execute raw queries for tables not yet in types
const queryServiceTags = async (
  service: ServiceType,
  activeOnly: boolean = false
): Promise<ServiceTag[]> => {
  const tableName = `${service}_service_tags`;
  
  let query = `SELECT * FROM ${tableName}`;
  if (activeOnly) {
    query += ` WHERE is_active = true`;
  }
  query += ` ORDER BY display_order ASC`;
  
  const { data, error } = await supabase.rpc("execute_sql" as any, { sql: query });
  
  // Fallback to direct table access with type assertion
  if (error) {
    // Try direct access - types may not be updated yet
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${tableName}?${activeOnly ? 'is_active=eq.true&' : ''}order=display_order.asc`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${tableName}`);
    }
    
    return await response.json();
  }
  
  return data || [];
};

// Public hook - only active tags
export const useServiceTags = (service: ServiceType) => {
  return useQuery({
    queryKey: ["service-tags", service],
    queryFn: () => queryServiceTags(service, true),
  });
};

// Admin hook - all tags
export const useServiceTagsAdmin = (service: ServiceType) => {
  return useQuery({
    queryKey: ["service-tags-admin", service],
    queryFn: () => queryServiceTags(service, false),
  });
};

export const useUpdateServiceTag = (service: ServiceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ServiceTag> & { id: string }) => {
      const tableName = `${service}_service_tags`;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${tableName}?id=eq.${id}`,
        {
          method: "PATCH",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({ ...updates, updated_at: new Date().toISOString() }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to update tag`);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-tags", service] });
      queryClient.invalidateQueries({ queryKey: ["service-tags-admin", service] });
    },
  });
};

export const useCreateServiceTag = (service: ServiceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tag: { name: string; display_order: number }) => {
      const tableName = `${service}_service_tags`;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${tableName}`,
        {
          method: "POST",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(tag),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to create tag`);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-tags", service] });
      queryClient.invalidateQueries({ queryKey: ["service-tags-admin", service] });
    },
  });
};

export const useDeleteServiceTag = (service: ServiceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const tableName = `${service}_service_tags`;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${tableName}?id=eq.${id}`,
        {
          method: "DELETE",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to delete tag`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-tags", service] });
      queryClient.invalidateQueries({ queryKey: ["service-tags-admin", service] });
    },
  });
};
