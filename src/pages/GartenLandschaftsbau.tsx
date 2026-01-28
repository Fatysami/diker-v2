import { useSEOHead } from "@/hooks/useSEOHead";
import { ArrowRight, Check, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GartenProjectCard from "@/components/garten/GartenProjectCard";
import { useGartenProjects } from "@/hooks/useGartenProjects";
import { useGartenServiceTags } from "@/hooks/useGartenServiceTags";
import gartenImg from "@/assets/service-garten.jpg";

// Fallback services in case database is empty
const fallbackServices = [
  "Terrassenbau",
  "Pflasterarbeiten",
  "Rollrasen",
  "Naturstein-Trittplatten",
  "Granitmauern",
  "Wintergarten",
  "Blockstufen",
  "Mulchflächen",
];

const GartenLandschaftsbau = () => {
  const { data: projects, isLoading } = useGartenProjects();
  const { data: serviceTags, isLoading: tagsLoading } = useGartenServiceTags();

  // Use database tags if available, otherwise fallback
  const services = serviceTags?.length ? serviceTags.map(t => t.name) : fallbackServices;

  useSEOHead({
    title: "Garten- & Landschaftsbau Solingen | Terrassen & Pflaster",
    description: "Garten- & Landschaftsbau in Solingen ✓ Terrassenbau ✓ Pflasterarbeiten ✓ Rollrasen ✓ Naturstein. Von der Planung bis zur Pflege. Kostenlose Beratung!",
    canonical: "https://www.dikerstrassenbau.de/garten-landschaftsbau",
    keywords: "Garten Landschaftsbau Solingen, Terrassenbau NRW, Pflasterarbeiten, Rollrasen, Naturstein Terrasse",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={gartenImg}
            alt="Garten- und Landschaftsbau"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Garten- & Landschaftsbau
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ihr Garten- und Landschaftsbau
              <span className="text-primary"> – Von der Planung bis zur Pflege</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Wir verwandeln Ihren Außenbereich in eine harmonische Oase. Von Terrassen über 
              Pflasterarbeiten bis hin zu Rollrasen – alles aus einer Hand.
            </p>
            <Button
              size="lg"
              className="group"
              asChild
            >
              <Link to="/anfrage?leistung=garten-landschaftsbau">
                Jetzt Angebot anfordern
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unsere Leistungen im Überblick
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professionelle Garten- und Landschaftsgestaltung für jeden Anspruch
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-card-foreground font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Referenzprojekte
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Unsere Garten- und Landschaftsprojekte
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Entdecken Sie unsere erfolgreich abgeschlossenen Projekte – von der Planung bis zur Pflege
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {projects?.map((project, index) => (
                <GartenProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.image_url}
                  imageUrl2={project.image_url_2}
                  imageUrl3={project.image_url_3}
                  imageUrl4={project.image_url_4}
                  icon={project.icon}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section id="kontakt" className="py-20 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Überzeugt? Dann rufen Sie uns an
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Wir hoffen, wir konnten Ihr Vertrauen wecken. Rufen Sie uns an und schildern Sie uns 
              Ihre Herausforderung. Wir vereinbaren einen Termin und begutachten Ihre Baustelle vor Ort. 
              Mit einem gemeinsam entwickelten Maßnahmenplan legen wir dann die nächsten Schritte fest. 
              Lassen Sie sich von unserer Leistung begeistern.
            </p>
            <Button
              size="lg"
              className="group"
              asChild
            >
              <Link to="/anfrage?leistung=garten-landschaftsbau">
                Jetzt Angebot anfordern
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GartenLandschaftsbau;
