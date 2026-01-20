import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings, Phone, Mail, MapPin } from "lucide-react";
import strassenbauImg from "@/assets/service-strassenbau.jpg";

const features = [
  {
    icon: Users,
    title: "Kompetentes Team",
    description: "Wir beschäftigen ausschließlich ausgebildete Tiefbauer und hausintern angelernte Hilfskräfte. Bei uns muss 'jeder alles können' - so sammelt sich in unserem Team immer mehr Erfahrung an."
  },
  {
    icon: Wrench,
    title: "Modernes Equipment",
    description: "Moderne Werkzeuge, leistungsstarke Maschinen und innovative, effiziente Verfahren erledigen Ihre Bauvorhaben in einer gleich bleibend hohen Qualität."
  },
  {
    icon: MessageSquare,
    title: "Umfassende Beratung",
    description: "Wir begutachten Ihre Baustelle professionell und erarbeiten gemeinsam mit Ihnen einen Maßnahmenplan. Profitieren Sie von unserer hohen Erfahrung."
  },
  {
    icon: Settings,
    title: "Reparatur & Instandsetzung",
    description: "Ob Beseitigung von kleinen Frostschäden oder Instandsetzung massiver Schäden: Wir stehen bereit mit innovativen Produkten und aktuellstem Wissen."
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
              Tiefbauer mit Herz
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-light))] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Ihr Tiefbauunternehmen in Solingen
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--text-light))/80%] mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Ob Parkplatz, Straße, Fahrradweg oder Baugründung – wir sind Tiefbauer mit Herz, Leidenschaft und Können.
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
              Warum Diker?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Kompetenz & Erfahrung
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Vertrauen Sie uns Ihre Herausforderung rund um den Tiefbau an. Wir bieten ein modernes Equipment, 
              ein kompetentes Team und vor allem eine Leidenschaft zur Sache.
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
                Lassen Sie uns Ihr Projekt gemeinsam realisieren
              </h2>
              <p className="text-[hsl(var(--text-light))/80%] text-lg mb-8">
                Rufen Sie uns an, gleichgültig um welches Tiefbau-Projekt es sich bei Ihnen handelt. 
                Wir begutachten Ihre Baustelle professionell und erarbeiten gemeinsam mit Ihnen einen Maßnahmenplan.
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
