import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
}

export const useTestimonials = (featuredOnly = false) => {
  return useQuery({
    queryKey: ["testimonials", featuredOnly],
    queryFn: async (): Promise<Testimonial[]> => {
      let query = supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
      }

      return data || [];
    },
  });
};
