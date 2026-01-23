import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string;
  noIndex?: boolean;
}

/**
 * Hook to dynamically update page meta tags for SEO
 * Usage: useSEOHead({ title: "Page Title", description: "Page description" })
 */
export const useSEOHead = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  keywords,
  noIndex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title.includes("Diker") 
      ? title 
      : `${title} | Diker Straßenbau`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update standard meta tags
    updateMeta("description", description);
    updateMeta("title", fullTitle);
    
    if (keywords) {
      updateMeta("keywords", keywords);
    }

    if (noIndex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      updateMeta("robots", "index, follow, max-image-preview:large");
    }

    // Update Open Graph tags
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    
    if (canonical) {
      updateMeta("og:url", canonical, true);
      
      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Update Twitter tags
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

  }, [title, description, canonical, ogImage, ogType, keywords, noIndex]);
};

export default useSEOHead;
