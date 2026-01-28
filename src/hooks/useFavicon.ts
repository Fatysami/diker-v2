import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

export const useFavicon = () => {
  const { data: faviconContent, isLoading } = useSiteContent("branding", "favicon_url");

  useEffect(() => {
    if (isLoading || !faviconContent?.value) return;

    const faviconUrl = faviconContent.value;

    // Find existing favicon link or create new one
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    // Update the href
    link.href = faviconUrl;

    // Also update apple-touch-icon if exists
    const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (appleLink) {
      appleLink.href = faviconUrl;
    }
  }, [faviconContent, isLoading]);

  return { faviconUrl: faviconContent?.value, isLoading };
};
