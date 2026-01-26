import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  id: string;
  type: string;
  value: string;
  icon: string | null;
  display_order: number;
}

export interface FormattedContactInfo {
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  hours: string;
}

const defaultContactInfo: FormattedContactInfo = {
  address: "Wittkuller Str. 161, 42719 Solingen",
  phone: "0212 22 66 39 31",
  phoneHref: "tel:+4921222663931",
  email: "info@dikerstrassenbau.de",
  emailHref: "mailto:info@dikerstrassenbau.de",
  hours: "Mo–Fr: 7:00–17:00 Uhr",
};

// Helper to convert phone number to tel: href format
const formatPhoneHref = (phone: string): string => {
  // Remove all non-numeric characters except + at start
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Ensure it starts with country code
  if (cleaned.startsWith('0')) {
    return `tel:+49${cleaned.slice(1)}`;
  }
  return `tel:${cleaned}`;
};

export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: async (): Promise<FormattedContactInfo> => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .order("display_order");

      if (error) {
        console.error("Error fetching contact info:", error);
        return defaultContactInfo;
      }

      if (!data || data.length === 0) {
        return defaultContactInfo;
      }

      // Convert array to formatted object
      const result: FormattedContactInfo = { ...defaultContactInfo };
      
      data.forEach((item: ContactInfo) => {
        switch (item.type) {
          case "address":
            result.address = item.value;
            break;
          case "phone":
            result.phone = item.value;
            result.phoneHref = formatPhoneHref(item.value);
            break;
          case "email":
            result.email = item.value;
            result.emailHref = `mailto:${item.value}`;
            break;
          case "hours":
            result.hours = item.value;
            break;
        }
      });

      return result;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export const useRawContactInfo = () => {
  return useQuery({
    queryKey: ["contact-info-raw"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .order("display_order");

      if (error) {
        console.error("Error fetching contact info:", error);
        return [];
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
