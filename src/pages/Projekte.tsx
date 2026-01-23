import { useState, useEffect } from "react";
import { useSEOHead } from "@/hooks/useSEOHead";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryImages, GalleryImage, GalleryCategory } from "@/components/gallery/GalleryData";
import { Loader2 } from "lucide-react";

const Projekte = () => {
  const [projects, setProjects] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useSEOHead({
    title: "Referenzprojekte & Galerie | Diker Straßenbau Solingen",
    description: "Entdecken Sie unsere erfolgreich abgeschlossenen Bauprojekte in Solingen und Umgebung. Straßenbau, Tiefbau, Kanalbau und Garten-Landschaftsbau Referenzen.",
    canonical: "https://diker-v2.lovable.app/projekte",
    keywords: "Bauprojekte Solingen, Straßenbau Referenzen, Tiefbau Galerie, Pflasterarbeiten Beispiele",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (error) {
        console.error("Error fetching projects:", error);
        // Fallback to static images
        setProjects(galleryImages);
      } else if (data && data.length > 0) {
        // Convert database projects to GalleryImage format
        const dbProjects: GalleryImage[] = data.map((project) => ({
          id: project.id,
          src: project.image_url,
          alt: project.description || project.title,
          category: (project.category || "Straßenbau") as GalleryCategory,
          title: project.title,
        }));
        setProjects(dbProjects);
      } else {
        // No projects in DB, use static images
        setProjects(galleryImages);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Projektgalerie
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Unsere Referenzprojekte
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Überzeugen Sie sich selbst von der Qualität unserer Arbeit. 
              Hier finden Sie Impressionen aus unseren erfolgreich abgeschlossenen 
              Projekten in allen Bereichen.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <GalleryGrid images={projects} showFilters={true} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projekte;
