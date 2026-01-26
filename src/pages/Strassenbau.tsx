import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings, LucideIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import strassenbauImg from "@/assets/service-strassenbau.jpg";
import ServiceFeatureCard from "@/components/services/ServiceFeatureCard";
import { useStrassenbauSections } from "@/hooks/useStrassenbauSections";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Wrench,
  MessageSquare,
  Settings,
};

const services = [
  "Parkplätze",
  "Straßen",
  "Fahrradwege",
  "Baugründung",
  "Pflasterarbeiten",
  "Asphaltierung"
];

const Strassenbau = () => {
  const { sections, loading } = useStrassenbauSections();

  useSEOHead({
    title: "Straßenbau Solingen | Asphaltierung & Pflasterarbeiten",
    description: "Professioneller Straßenbau in Solingen ✓ Parkplätze ✓ Fahrradwege ✓ Asphaltierung ✓ Pflasterarbeiten. Kompetentes Team & moderne Ausstattung. Jetzt anfragen!",
    canonical: "https://www.dikerstrassenbau.de/strassenbau",
    keywords: "Straßenbau Solingen, Asphaltierung NRW, Pflasterarbeiten, Parkplatzbau, Fahrradwege, Straßenbauunternehmen",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={strassenbauImg} 
            alt="Straßenbau" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        </div>
        
        <div className="relative z-10 container-custom section-padding">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-up">
              Straßenbau mit Leidenschaft
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Mit Kraft und Kompetenz: Ihr Straßenbauunternehmen
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Wir von Diker Straßenbau sind Ihre Straßenbauer in Solingen und Umgebung. Durch Kompetenz, Motivation und einem modernen Equipment haben wir Ihre Herausforderungen rund um den Straßenbau im Griff. Wir kommen mit Manpower und High-Tech. Lassen Sie sich begeistern.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link to="/anfrage?leistung=strassenbau">
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
              Warum Diker Straßenbau?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Damit sichern wir uns für Ihre Projekte rund um Straßenbau und Tiefbau stets die größte Kompetenz. 
              Das macht uns nicht nur jederzeit einsatzbereit – vor allem erreichen wir damit, dass jeder aus unserem Team 
              einen immer größeren Schatz an Erfahrungen ansammeln kann.
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

export default Strassenbau;
