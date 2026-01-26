import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  features: string[] | null;
  link: string | null;
  display_order: number;
  is_active: boolean;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("display_order");

        if (error) throw error;
        
        setServices(data || []);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};
