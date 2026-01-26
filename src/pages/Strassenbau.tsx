import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import strassenbauImg from "@/assets/service-strassenbau.jpg";

const features = [
  {
    icon: Users,
    title: "Kompetente Straßenbauer für Ihre Projekte",
    paragraphs: [
      "Unser Team besteht aus ausgebildeten Tiefbau-Facharbeitern und hausintern angelernten Hilfskräften. Darüber hinaus steht uns ein großer Pool an Spezialisten zur Seite, mit denen wir auch besonderen Herausforderungen begegnen können. Damit sichern wir uns für Ihre Projekte rund um Straßenbau und Tiefbau stets die größte Kompetenz.",
      "Durch eine faire Behandlung, familiären Umgang und übertarifliche Bezahlung halten wir unser hoch kompetentes Team in unserem Straßenbauunternehmen. Das macht uns nicht nur jederzeit einsatzbereit. Vor allem erreichen wir damit, dass jeder aus unserem Team einen immer größeren Schatz an Erfahrungen ansammeln kann.",
      "Wir verfolgen bei unseren Mitarbeitern ein klares Ziel: Jeder sollte alles können. Das macht uns für Ihre Projekte besonders flexibel. Gleichgültig, wer zur Bewältigung Ihrer Herausforderungen antritt, Sie erhalten eine Ausführung in zuverlässiger und gleichbleibender Qualität."
    ]
  },
  {
    icon: Wrench,
    title: "Moderne Maschinen und Fahrzeuge für Ihren Vorteil",
    paragraphs: [
      "Bei uns bleibt eine Maschine nur so lange im Einsatz, bis es eine bessere gibt. Wir fahren nicht jedes einzelne Gerät auf Verschleiß, sondern nutzen stets die Möglichkeiten neuester Technologie voll aus. Damit sind wir eine der schnellsten Unternehmen für Straßenbau und Tiefbau der Umgebung.",
      "Hocheffiziente Werkzeuge, leistungsstarke Fahrzeuge und innovative Hilfsmittel machen jedes Bauprojekt in kürzester Zeit umsetzbar. Neben einer maximalen Effizienz achten wir bei unserem Equipment auch auf den Umweltschutz.",
      "Die von uns verwendeten im Straßenbau Fahrzeuge und Maschinen erfüllen alle Anforderungen an den Emissionsschutz. Superleise Kompressoren und Stromaggregate sind für uns ebenso selbstverständlich, wie Baufahrzeuge mit den neuesten Abgas-Reinigungssystemen."
    ]
  },
  {
    icon: MessageSquare,
    title: "Umfassende Beratung für Straßenbau und Tiefbau",
    paragraphs: [
      "Kommen Sie zu uns, wenn Sie sich einer Herausforderung im Straßenbau stellen müssen. Unser Straßenbauunternehmen kann Ihnen nicht nur bei der Ausführung bestmöglich helfen. Wir bieten Ihnen darüber hinaus auch unsere umfassende Kompetenz bei Beratung und Begutachtung Ihrer Projekte an.",
      "Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau oder Sanierung anbieten. Wir entwickeln auf Grundlage der festgestellten Notwendigkeiten die bestmögliche Lösung für Ihr Projekt.",
      "Sie erhalten damit eine hohe Sicherheit, was die termingerechte Ausführung und das Einhalten Ihres Budgets angeht. Wir haben alles, um Ihr Projekt fristgerecht und unter Einhaltung des Kostenrahmens fertig zu stellen."
    ]
  },
  {
    icon: Settings,
    title: "Für kleine wie große Projekte bereit",
    paragraphs: [
      "Rufen Sie uns an, gleichgültig, wie klein, groß, eilig oder langfristig Ihr Bauvorhaben sein soll. Wir kommen zur Ausbesserung von Schlaglöchern ebenso gerne, wie zur Sanierung ganzer Straßen.",
      "Die fristgerechte, schnelle und professionelle Ausführung aller Aufträge ist Teil unserer Firmenphilosophie, denn wir wissen: 'Wer nicht in kleinen Dingen zuverlässig ist, der ist es auch nicht in großen'.",
      "Wenn wir kommen, dann ist die professionelle, sachgerechte und effiziente Ausführung Ihres Bauvorhabens garantiert. Zuverlässigkeit für Ihre Planungssicherheit gehört bei uns zur Firmenphilosophie."
    ]
  }
];

const services = [
  "Parkplätze",
  "Straßen",
  "Fahrradwege",
  "Baugründung",
  "Pflasterarbeiten",
  "Asphaltierung"
];

const Strassenbau = () => {
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

          <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card rounded-2xl p-8 border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">
                  {feature.title}
                </h3>
                <div className="space-y-3">
                  {feature.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Strassenbau;
