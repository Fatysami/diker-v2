import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Wrench, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import tiefbauImg from "@/assets/service-tiefbau.jpg";

const features = [
  {
    icon: Users,
    title: "Unser kompetentes Team steht für Sie bereit",
    paragraphs: [
      "Wir beschäftigen in unserer Tiefbaufirma ausschließlich ausgebildete Tiefbauer und hausintern angelernte Hilfskräfte. Wir schulen unsere Mitarbeiter auf eine umfassende Kompetenz – kurz gesagt: Bei uns muss jeder alles können.",
      "Um das zu gewährleisten, halten wir unsere Mitarbeiter durch Motivation in unserem Unternehmen. So sammelt sich in unserem Team immer mehr Erfahrung an – eine Erfahrung die Sie nutzen können.",
      "Gleichgültig, wie komplex die Herausforderung auch ist, wir haben schon alles gesehen und bekommen alles in den Griff. Damit unser Team auch so gut wie möglich arbeiten kann, haben wir einen umfassenden Fuhr- und Maschinenpark in unserem Tiefbauunternehmen in Solingen bereitstehen."
    ]
  },
  {
    icon: Wrench,
    title: "Maximale Effizienz durch modernes Equipment",
    paragraphs: [
      "Um unsere Mitarbeiter bestmöglich zum Erreichen Ihrer Ziele zu unterstützen, halten wir unseren Fuhr- und Maschinenpark immer auf dem neuesten Stand.",
      "Moderne Werkzeuge, leistungsstarke Maschinen und innovative, effiziente Verfahren erledigen Ihre Bauvorhaben in einer gleich bleibend hohen Qualität.",
      "Darüber hinaus genügen unsere Baufahrzeuge auch immer den neuesten Abgasvorschriften. Verzögerungen wegen Rechtsverstößen finden mit uns als Tiefbauunternehmen nicht statt."
    ]
  },
  {
    icon: MessageSquare,
    title: "Umfassende Beratung vor Baubeginn",
    paragraphs: [
      "Rufen Sie uns an, gleichgültig um welches Tiefbau-Projekt es sich bei Ihnen handelt. Wir begutachten Ihre Baustelle professionell und erarbeiten gemeinsam mit Ihnen einen Maßnahmenplan.",
      "Profitieren Sie von unserer hohen Erfahrung und lassen Sie sich bei Ihrer Bauplanung und Bauausführung umfassend durch uns beraten. Wir kennen nicht nur die modernsten Verfahren, Werkstoffe und Maschinen.",
      "Auch sind wir stets auf dem neuesten Stand, was den Rechtsrahmen angeht. Vermeiden Sie teure Folgekosten, indem sie mit uns Ihre Baustelle vom ersten Tag an richtig bearbeiten."
    ]
  },
  {
    icon: Settings,
    title: "Reparatur von Bauschäden",
    paragraphs: [
      "Wir sind auch Ihr Tiefbauunternehmen in Solingen wenn es um die Reparatur von Bauschäden geht. Ob Beseitigung von kleinen Frostschäden oder Instandsetzung massiver Schäden: Wir stehen bereit.",
      "Vertrauen Sie unserer Kompetenz und lassen Sie sich bei der Wahl der Reparaturverfahren durch uns beraten. Der Baubereich ist sehr dynamisch und bringt ständig innovative Produkte hervor.",
      "Wir halten unsere Tiefbaufirma stets auf dem neuesten Stand und können Sie mit dem aktuellsten Wissen unterstützen."
    ]
  }
];

const services = [
  "Erdarbeiten",
  "Fundamente",
  "Baugründung",
  "Kanalbau",
  "Reparaturen",
  "Beratung"
];

const Tiefbau = () => {
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

export default Tiefbau;
