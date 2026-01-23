import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/components/gallery/GalleryData";

const Projekte = () => {
  useSEOHead({
    title: "Referenzprojekte & Galerie | Diker Straßenbau Solingen",
    description: "Entdecken Sie unsere erfolgreich abgeschlossenen Bauprojekte in Solingen und Umgebung. Straßenbau, Tiefbau, Kanalbau und Garten-Landschaftsbau Referenzen.",
    canonical: "https://diker-v2.lovable.app/projekte",
    keywords: "Bauprojekte Solingen, Straßenbau Referenzen, Tiefbau Galerie, Pflasterarbeiten Beispiele",
  });

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
          <GalleryGrid images={galleryImages} showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projekte;
