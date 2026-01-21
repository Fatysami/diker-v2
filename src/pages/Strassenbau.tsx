import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings, Phone, Mail, MapPin } from "lucide-react";
import strassenbauImg from "@/assets/service-strassenbau.jpg";

const features = [
  {
    icon: Users,
    title: "Kompetente Straßenbauer für Ihre Projekte",
    description: "Unser Team besteht aus ausgebildeten Tiefbau-Facharbeitern und hausintern angelernten Hilfskräften. Darüber hinaus steht uns ein großer Pool an Spezialisten zur Seite, mit denen wir auch besonderen Herausforderungen begegnen können. Durch eine faire Behandlung, familiären Umgang und übertarifliche Bezahlung halten wir unser hoch kompetentes Team. Wir verfolgen bei unseren Mitarbeitern ein klares Ziel: Jeder sollte alles können."
  },
  {
    icon: Wrench,
    title: "Moderne Maschinen und Fahrzeuge",
    description: "Bei uns bleibt eine Maschine nur so lange im Einsatz, bis es eine bessere gibt. Hocheffiziente Werkzeuge, leistungsstarke Fahrzeuge und innovative Hilfsmittel machen jedes Bauprojekt in kürzester Zeit umsetzbar. Neben einer maximalen Effizienz achten wir bei unserem Equipment auch auf den Umweltschutz – alle Fahrzeuge erfüllen die Anforderungen an den Emissionsschutz."
  },
  {
    icon: MessageSquare,
    title: "Umfassende Beratung für Straßenbau und Tiefbau",
    description: "Wir bieten Ihnen unsere umfassende Kompetenz bei Beratung und Begutachtung Ihrer Projekte an. Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau oder Sanierung anbieten. Sie erhalten damit eine hohe Sicherheit, was die termingerechte Ausführung und das Einhalten Ihres Budgets angeht."
  },
  {
    icon: Settings,
    title: "Für kleine wie große Projekte bereit",
    description: "Rufen Sie uns an, gleichgültig, wie klein, groß, eilig oder langfristig Ihr Bauvorhaben sein soll. Wir kommen zur Ausbesserung von Schlaglöchern ebenso gerne, wie zur Sanierung ganzer Straßen. Die fristgerechte, schnelle und professionelle Ausführung aller Aufträge ist Teil unserer Firmenphilosophie."
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
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay))/95%] via-[hsl(var(--hero-overlay))/70%] to-transparent" />
        </div>
        
        <div className="relative z-10 container-custom section-padding">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-up">
              Straßenbau mit Leidenschaft
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-light))] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Mit Kraft und Kompetenz: Ihr Straßenbauunternehmen
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--text-light))/80%] mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Wir von Diker Straßenbau sind Ihre Straßenbauer in Solingen und Umgebung. Durch Kompetenz, Motivation und einem modernen Equipment haben wir Ihre Herausforderungen rund um den Straßenbau im Griff. Wir kommen mit Manpower und High-Tech.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-[hsl(var(--text-light))/30%] text-[hsl(var(--text-light))] hover:bg-[hsl(var(--text-light))/10%]">
                Mehr erfahren
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[hsl(var(--surface-darker))]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text-light))] mb-6">
                Zuverlässigkeit für Ihre Planungssicherheit
              </h2>
              <p className="text-[hsl(var(--text-light))/80%] text-lg mb-8">
                Wir entwickeln auf Grundlage der festgestellten Notwendigkeiten die bestmögliche Lösung für Ihr Projekt. 
                Wenn wir kommen, dann ist die professionelle, sachgerechte und effiziente Ausführung Ihres Bauvorhabens garantiert. 
                Zuverlässigkeit für Ihre Planungssicherheit gehört bei uns zur Firmenphilosophie.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Kostenlose Beratung anfragen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="bg-[hsl(var(--surface-dark))] rounded-2xl p-8 lg:p-10">
              <h3 className="text-xl font-bold text-[hsl(var(--text-light))] mb-6">
                Kontaktdaten
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[hsl(var(--text-light))]">Adresse</p>
                    <p className="text-[hsl(var(--text-light))/70%]">Wittkuller Str. 161, 42719 Solingen</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[hsl(var(--text-light))]">Telefon</p>
                    <a href="tel:02122266393" className="text-[hsl(var(--text-light))/70%] hover:text-primary transition-colors">
                      0212 22 66 39 31
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[hsl(var(--text-light))]">E-Mail</p>
                    <a href="mailto:info@dikerstrassenbau.de" className="text-[hsl(var(--text-light))/70%] hover:text-primary transition-colors">
                      info@dikerstrassenbau.de
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Strassenbau;
