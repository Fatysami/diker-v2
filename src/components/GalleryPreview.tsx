import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GalleryGrid from "./gallery/GalleryGrid";
import { galleryImages } from "./gallery/GalleryData";

const GalleryPreview = () => {
  return (
    <section id="projekte" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Unsere Projekte
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Einblicke in unsere Arbeit
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Entdecken Sie eine Auswahl unserer erfolgreich abgeschlossenen Projekte 
            im Straßenbau, Tiefbau und Garten- & Landschaftsbau.
          </p>
        </div>

        {/* Gallery Grid - Show only 6 items, no filters */}
        <GalleryGrid images={galleryImages} showFilters={false} maxItems={6} />

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link to="/projekte">
            <Button size="lg" variant="outline" className="group">
              Alle Projekte ansehen
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
