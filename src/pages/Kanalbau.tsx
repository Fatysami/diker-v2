import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Droplets, Flame, Settings, Scale, Calculator, Wrench, LucideIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import kanalbauImg from "@/assets/service-kanalbau.jpg";
import ServiceFeatureCard from "@/components/services/ServiceFeatureCard";
import { useKanalbauSections } from "@/hooks/useKanalbauSections";
import { useServiceTags } from "@/hooks/useServiceTags";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Shield,
  Droplets,
  Flame,
  Settings,
  Scale,
  Calculator,
  Wrench,
};

// Fallback services if database is empty
const defaultServices = [
  "Dichtheitsprüfung Kanal",
  "Abwasserleitungen",
  "Wasserleitungen",
  "Gasleitungen",
  "Flüssiggasleitungen",
  "Heizungsrohre"
];

const Kanalbau = () => {
  const { sections, loading } = useKanalbauSections();
  const { data: serviceTags } = useServiceTags("kanalbau");
  
  const services = serviceTags && serviceTags.length > 0 
    ? serviceTags.map(tag => tag.name) 
    : defaultServices;

  useSEOHead({
    title: "Kanalbau & Dichtheitsprüfung Solingen | Rohrleitungen",
    description: "Kanalbau & Dichtheitsprüfung in Solingen ✓ Abwasserleitungen ✓ Gasleitungen ✓ Wasserleitungen. Professionelle Prüfung nach DIN. Jetzt Termin vereinbaren!",
    canonical: "https://www.diker-bau.de/kanalbau",
    keywords: "Kanalbau Solingen, Dichtheitsprüfung NRW, Abwasserleitungen, Gasleitungen prüfen, Rohrleitungsbau",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={kanalbauImg} 
            alt="Kanalbau" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        </div>
        
        <div className="relative z-10 container-custom section-padding">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-up">
              Kanalbau & Dichtheitsprüfung
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Unsere Leistungen rund um den Kanalbau und die Dichtheitsprüfung
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Egal ob eine Dichtheitsprüfung für den Kanal, eine Dichtheitsprüfung für Abwasser- und Wasserrohre oder eine Dichtheitsprüfung für Gas- oder Flüssiggasleitungen ins Haus steht: Mit unseren professionellen Leistungen rund um die Dichtigkeitsprüfung Ihrer Rohre und Leitungen sind Sie auf der sicheren Seite.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link to="/anfrage?leistung=kanalbau">
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
              Unsere Leistungen
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Warum Diker Kanalbau?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Mit unserer Erfahrung und modernen Prüfgeräten bieten wir Ihnen eine transparente und zuverlässige Dienstleistung. 
              Vertrauen Sie auf unsere Expertise für alle Dichtheitsprüfungen.
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
                    imageFocalPoint={section.image_focal_point}
                    imageFocalPoint2={section.image_focal_point_2}
                    imageFocalPoint3={section.image_focal_point_3}
                    imageFocalPoint4={section.image_focal_point_4}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
            Überzeugt? Dann rufen Sie uns an
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Wir hoffen, wir konnten Ihr Vertrauen wecken. Rufen Sie uns an und schildern Sie uns Ihre Herausforderung. 
            Wir vereinbaren einen Termin und begutachten Ihre Baustelle vor Ort. Mit einem gemeinsam entwickelten 
            Maßnahmenplan legen wir dann die nächsten Schritte fest.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link to="/anfrage?leistung=kanalbau">
              Jetzt Angebot anfordern
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kanalbau;
