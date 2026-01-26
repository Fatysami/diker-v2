import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useServices } from "@/hooks/useServices";

// Fallback images for services without uploaded images
import strassenbauImg from "@/assets/service-strassenbau.jpg";
import tiefbauImg from "@/assets/service-tiefbau.jpg";
import kanalbauImg from "@/assets/service-kanalbau.jpg";
import gartenImg from "@/assets/service-garten.jpg";

const fallbackImages: Record<string, string> = {
  "Straßenbau": strassenbauImg,
  "Straßentiefbau": tiefbauImg,
  "Kanalbau": kanalbauImg,
  "Garten- & Landschaftsbau": gartenImg,
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { services, loading, error } = useServices();

  // Debug log
  console.log("Services loaded:", services.length, "isInView:", isInView);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section id="leistungen" className="section-padding bg-background">
        <div className="container-custom flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading services:", error);
  }

  return (
    <section id="leistungen" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kompetenz auf ganzer Linie
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Von der Beratung bis zur Fertigstellung – wir bieten Ihnen 
            umfassende Lösungen für Ihre Bauprojekte.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const imageUrl = service.image_url || fallbackImages[service.title] || strassenbauImg;
            
            const content = (
              <>
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {service.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-primary/10 group-hover:bg-primary group-hover:scale-110">
                      <ArrowUpRight className="w-5 h-5 transition-all duration-300 text-primary group-hover:text-primary-foreground group-hover:rotate-45" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {(service.features || []).map((feature) => (
                      <span
                        key={feature}
                        className="inline-block bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <motion.div key={service.id} variants={itemVariants}>
                {service.link ? (
                  <Link
                    to={service.link}
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border block cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30">
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
