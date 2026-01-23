import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Droplets, Flame, Settings, Scale, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import kanalbauImg from "@/assets/service-kanalbau.jpg";

const features = [
  {
    icon: AlertTriangle,
    title: "Probleme und Gefahren durch undichte Leitungen",
    paragraphs: [
      "Wenn eine Wasserleitung undicht ist, kann es durch austretendes Wasser zu Schäden kommen. Es kann unter anderem die Bausubstanz nachhaltig beschädigt werden, aber auch Möbel und Wertgegenstände können von einem Wasserschaden betroffen sein.",
      "Noch unangenehmer wird es, wenn es sich um eine defekte Abwasserleitung handelt – verschmutztes Abwasser beschädigt nicht nur Ihr Eigentum, sondern bringt oftmals unangenehme Gerüche mit sich und ist aus hygienischer Sicht bedenklich.",
      "Sie können solchen Schäden vorbeugen: Durch eine sachkundige Überprüfung der Leitungen kann ein sachkundiger Prüfer häufig schon sehr früh Schwachstellen erkennen und Sie dabei unterstützen, diese rechtzeitig zu reparieren."
    ]
  },
  {
    icon: Shield,
    title: "Dichtheitsprüfungen vom fachkundigen Partner",
    paragraphs: [
      "Die professionelle Überprüfung von Rohren und Leitungen sollte stets in die Hände eines seriösen und sachverständigen Partners gegeben werden.",
      "Denn nur so kann garantiert werden, dass das Ergebnis der Prüfung zuverlässig ist und nicht zugunsten eines unseriösen Anbieters geschönt wurde.",
      "Mit unserer Erfahrung und modernen Prüfgeräten bieten wir Ihnen eine transparente und zuverlässige Dienstleistung."
    ]
  },
  {
    icon: Droplets,
    title: "Dichtheitsprüfung Abwasser- und Wasserleitungen",
    paragraphs: [
      "Ein Wasserschaden ist etwas, vor dem sich jeder Immobilienbesitzer graut. Denn auch wenn er relativ schnell entdeckt wird, kann er hohe Kosten und aufwendige Baumaßnahmen nach sich ziehen. Leckagen können zum Beispiel das Mauerwerk beschädigen, sodass teure und aufwändige Sanierungsarbeiten notwendig werden.",
      "Eine Dichtigkeitsprüfung dient dazu, den Zustand der Rohrleitungen zu ermitteln. Durch die Prüfung kann ein Sachverständiger herausfinden, ob das Rohrnetz noch dicht ist oder ob sich im Laufe der Zeit Schwachstellen oder Leckagen gebildet haben.",
      "Die Dichtheitsprüfung für Kanal, Wasser- und Abwasserleitungen dient übrigens nicht nur dazu, Ihr Eigentum vor einem Wasserschaden zu bewahren. Auch der Umwelt kommt eine fachgerechte Prüfung und Wartung von Kanalisation und Abwasserrohren zugute."
    ]
  },
  {
    icon: Flame,
    title: "Dichtheitsprüfung für Gas- und Flüssiggasleitungen",
    paragraphs: [
      "Viele Haushalte nutzen eine Gastherme für warmes Wasser oder heizen ihre Räume mit einer Gasheizung. Über die Gasleitung werden diese Haushalte mit dem nötigen Rohstoff versorgt. Dabei ist es sehr wichtig, dass die gesamte Gasanlage jederzeit einwandfrei dicht ist.",
      "Denn wenn durch ein Leck Gas austritt, kann dies schwere Folgen haben. Das Gas könnte sich z. B. durch einen Funken oder durch eine offene Flamme spontan entzünden und zu einer Explosion führen.",
      "Die Dichtheitsprüfung für Gas kann fällig werden bei: Neuinstallation einer Gasanlage (z.B. im Neubau), Erweiterung einer Gasanlage (z.B. durch einen Anbau) oder Erneuerung einer Gasanlage (z.B. im Rahmen von Wartung und Instandhaltung)."
    ]
  },
  {
    icon: Settings,
    title: "Zuverlässige Prüfung mit professionellem Dichtheitsprüfgerät",
    paragraphs: [
      "Mit einem professionellen Dichtheitsprüfgerät kann eine Leitung effizient und zuverlässig geprüft werden. Bei der Prüfung können solche Geräte mit geringem Aufwand mögliche Lecks in der Leitung aufdecken, ohne dass die gesamte Leitung manuell inspiziert werden muss.",
      "Außerdem eignen sich die Geräte, um eine Belastungsprüfung zu machen. Mit einer solchen Prüfung lässt sich zum Beispiel feststellen, ob eine ältere Leitung noch immer stabil genug ist, um den erforderlichen Druck auszuhalten.",
      "Professionelle Dichtheitsprüfgeräte gibt es für alle Arten von Leitungen und Rohren: Gasleitungen und Flüssiggasleitungen, Nutz- und Trinkwasserleitungen, Heizungsrohre und Abwasserleitungen."
    ]
  },
  {
    icon: Scale,
    title: "Pflicht zur Dichtheitsprüfung: das steht im Gesetz",
    paragraphs: [
      "Die Dichtheitsprüfung ist im Gesetz verankert: Die Dichtheitsprüfung ist in NRW Pflicht und betraf damit lange Zeit auch alle privaten Hausbesitzer. Bisher bedeutete das, dass der Gesetzgeber alle 30 Jahre bestimmte Tests für die Abwasserrohre vorsah.",
      "Der Landtag diskutierte deshalb immer wieder darüber, ob die Vorschriften für Privathaushalte gelockert werden sollten. Man entschloss sich nun dazu, die Pflichten für private Eigentümer stark zu lockern.",
      "In einigen Ausnahmefällen besteht die Pflicht jedoch weiterhin. Das ist zum Beispiel der Fall, wenn ein konkreter Verdacht darauf besteht, dass undichte Rohre vorliegen könnten. Gerne beraten wir Sie jederzeit zur aktuellen Gesetzeslage."
    ]
  },
  {
    icon: Calculator,
    title: "Was wird die Dichtheitsprüfung kosten?",
    paragraphs: [
      "Die exakten Kosten für eine professionelle Dichtigkeitsprüfung lassen sich schwer verallgemeinern. Es kommt immer darauf an, wie viel Aufwand bei der Prüfung entsteht. Und das hängt davon ab, wie die jeweiligen baulichen Eigenschaften vor Ort aussehen.",
      "Dazu zählt unter anderem die Länge der zu prüfenden Leitungen. Ganz grob bewegen sich die Kosten für die professionelle Dichtigkeitsprüfung bei einem Einfamilienhaus zwischen 300 und 500 Euro.",
      "In manchen Fällen können die Kosten aber auch deutlich höher oder niedriger ausfallen. Gerne unterbreiten wir Ihnen unverbindlich ein individuelles Angebot für Ihre Immobilie."
    ]
  }
];

const services = [
  "Dichtheitsprüfung Kanal",
  "Abwasserleitungen",
  "Wasserleitungen",
  "Gasleitungen",
  "Flüssiggasleitungen",
  "Heizungsrohre"
];

const Kanalbau = () => {
  useSEOHead({
    title: "Kanalbau & Dichtheitsprüfung Solingen | Rohrleitungen",
    description: "Kanalbau & Dichtheitsprüfung in Solingen ✓ Abwasserleitungen ✓ Gasleitungen ✓ Wasserleitungen. Professionelle Prüfung nach DIN. Jetzt Termin vereinbaren!",
    canonical: "https://diker-v2.lovable.app/kanalbau",
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
