import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import strassenbauImg from "@/assets/service-strassenbau.jpg";
import tiefbauImg from "@/assets/service-tiefbau.jpg";
import kanalbauImg from "@/assets/service-kanalbau.jpg";
import gartenImg from "@/assets/service-garten.jpg";

const services = [
  {
    title: "Straßenbau",
    description:
      "Parkplätze, Straßen und Fahrradwege – professionell geplant und termingerecht umgesetzt.",
    image: strassenbauImg,
    features: ["Asphaltierung", "Pflasterarbeiten", "Fahrradwege"],
    link: "/strassenbau",
  },
  {
    title: "Straßentiefbau",
    description:
      "Fundamente und Erdarbeiten bilden die Basis für jedes erfolgreiche Bauprojekt.",
    image: tiefbauImg,
    features: ["Erdarbeiten", "Fundamente", "Baugründung"],
    link: "/tiefbau",
  },
  {
    title: "Kanalbau",
    description:
      "Spezialisierte Infrastrukturarbeiten für Entwässerung und unterirdische Systeme.",
    image: kanalbauImg,
    features: ["Entwässerung", "Rohrleitungen", "Schachtbau"],
    link: "/kanalbau",
  },
  {
    title: "Garten- & Landschaftsbau",
    description:
      "Gestaltung von Außenanlagen mit Naturstein, Bepflanzung und modernem Design.",
    image: gartenImg,
    features: ["Naturstein", "Bepflanzung", "Terrassen"],
    link: "/garten-landschaftsbau",
  },
];

const Services = () => {
  return (
    <section id="leistungen" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const content = (
              <>
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {service.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-primary/10 group-hover:bg-primary">
                      <ArrowUpRight className="w-5 h-5 transition-colors text-primary group-hover:text-primary-foreground" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-block bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            const cardClassName = `group relative bg-card rounded-2xl overflow-hidden card-hover border border-border block ${service.link ? 'cursor-pointer' : ''}`;
            const cardStyle = { animationDelay: `${index * 0.1}s` };

            return service.link ? (
              <Link
                key={service.title}
                to={service.link}
                className={cardClassName}
                style={cardStyle}
              >
                {content}
              </Link>
            ) : (
              <div
                key={service.title}
                className={cardClassName}
                style={cardStyle}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
