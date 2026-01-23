import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GalleryGrid from "./gallery/GalleryGrid";
import { galleryImages } from "./gallery/GalleryData";

const GalleryPreview = () => {
  return (
    <section id="projekte" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
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
        </motion.div>

        {/* Gallery Grid - Show only 6 items, no filters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GalleryGrid images={galleryImages} showFilters={false} maxItems={6} />
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/projekte">
            <Button size="lg" variant="outline" className="group">
              Alle Projekte ansehen
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
