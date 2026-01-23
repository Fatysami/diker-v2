import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-construction.jpg";

const Hero = () => {
  const highlights = [
    "Modernes Equipment",
    "Kompetentes Team",
    "Termingerechte Ausführung",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Straßenbau Projekt"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom section-padding pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">
              Ihr Partner in Solingen & Umgebung
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Straßenbau mit{" "}
            <span className="text-gradient">Leidenschaft</span>
            <br />
            und Präzision
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Wir als Firma Diker haben Ihre Bauvorhaben im Griff. Ob Parkplatz, Straße, 
            Fahrradweg oder Baugründung – wir arbeiten mit Herz und Können.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-primary-foreground/80"
              >
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="group" asChild>
              <Link to="/anfrage">
                Jetzt Angebot anfordern
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#leistungen">Unsere Leistungen</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
