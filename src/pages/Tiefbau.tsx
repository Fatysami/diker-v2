import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings, LucideIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import tiefbauImg from "@/assets/service-tiefbau.jpg";
import ServiceFeatureCard from "@/components/services/ServiceFeatureCard";
import { useTiefbauSections } from "@/hooks/useTiefbauSections";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Wrench,
  MessageSquare,
  Settings,
};

const services = [
  "Erdarbeiten",
  "Fundamente",
  "Baugründung",
  "Kanalbau",
  "Reparaturen",
  "Beratung"
];

const Tiefbau = () => {
  const { sections, loading } = useTiefbauSections();

  useSEOHead({
    title: "Tiefbau Solingen | Erdarbeiten & Fundamente",
    description: "Professioneller Tiefbau in Solingen ✓ Erdarbeiten ✓ Fundamente ✓ Baugründung ✓ Kanalbau. Erfahrenes Team & modernste Technik. Jetzt Angebot anfordern!",
    canonical: "https://www.dikerstrassenbau.de/tiefbau",
    keywords: "Tiefbau Solingen, Erdarbeiten NRW, Fundamente, Baugründung, Tiefbauunternehmen, Baugrube",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={tiefbauImg} 
            alt="Straßentiefbau" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        </div>
        
        <div className="relative z-10 container-custom section-padding">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-up">
              Tiefbau mit Leidenschaft
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Ihr Tiefbauunternehmen in Solingen
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Wir von der Tiefbaufirma Diker haben Ihre Bauvorhaben im Griff. Ob Parkplatz, Straße, Fahrradweg oder Baugründung, wir sind Tiefbauer mit Herz, Leidenschaft und Können. Vertrauen Sie uns Ihre Herausforderung rund um den Tiefbau an.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link to="/anfrage?leistung=tiefbau">
                  Jetzt Angebot anfordern
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-2 text-secondary-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Unsere Stärken
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Warum Diker Tiefbau?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Wir bieten ein modernes Equipment, ein kompetentes Team und vor allem eine Leidenschaft zur Sache. 
              Wo immer es gilt, erstklassige Arbeit rund um den Tiefbau rund um Solingen abzuliefern, sind wir Ihre ersten Ansprechpartner.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {sections.map((section, index) => {
                const IconComponent = iconMap[section.icon] || Wrench;
                return (
                  <ServiceFeatureCard
                    key={section.id}
                    title={section.title}
                    paragraphs={section.paragraphs}
                    icon={IconComponent}
                    imageUrl={section.image_url}
                    imageUrl2={section.image_url_2}
                    imageUrl3={section.image_url_3}
                    imageUrl4={section.image_url_4}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tiefbau;
