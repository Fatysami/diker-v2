import { useSEOHead } from "@/hooks/useSEOHead";
import { ArrowRight, Warehouse, Map, Grid3X3, Flower2, LayoutGrid, DoorOpen, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gartenImg from "@/assets/service-garten.jpg";

const projects = [
  {
    icon: Warehouse,
    title: "Geräteschuppen mit Pflaster- und Terrassenbau",
    paragraphs: [
      "Für den Kunden wurde ein Geräteschuppen errichtet, den Bereich davor mit Pflastersteinen gestaltet und seitlich eine Fläche mit Terrassenplatten angelegt.",
      "So ist ein klar strukturierter Gartenbereich mit Stauraum, Wegführung und zusätzlicher Nutzfläche entstanden. Alles fügt sich optisch sauber in das Gesamtbild des Gartens ein.",
    ],
  },
  {
    icon: Map,
    title: "Wegegestaltung mit Trittplatten und Granitmauer",
    paragraphs: [
      "Bei diesem Projekt wurde ein Großteil der Außenanlage aufgewertet. Die Wege sind mit hochwertigen Naturstein-Trittplatten ausgelegt und verbinden die Bereiche ansprechend.",
      "Zwischen Weg und Rasen sorgt eine Mauer aus Granitplatten für eine klare und stabile Trennung. Die Grünflächen wurden überarbeitet und aufgewertet, so entstand eine pflegeleichte und harmonische Außenanlage, die lange Freude macht.",
    ],
  },
  {
    icon: Grid3X3,
    title: "Terrassenbau mit harmonischer Treppe",
    paragraphs: [
      "In diesem Projekt wurde zunächst eine Terrasse mit großformatigen Terrassenplatten im Maß 100×100 cm realisiert. Die gleichen Platten kamen anschließend bei der Treppe in Kombination mit Blockstufen zum Einsatz.",
      "Dadurch entsteht ein einheitliches Gesamtbild zwischen Aufenthaltsfläche und Treppe. Die Ausführung ist robust, präzise und auf eine lange Nutzungsdauer ausgelegt.",
    ],
  },
  {
    icon: Flower2,
    title: "Gartenumgestaltung mit Rollrasen, Wintergarten und Pflasterarbeiten",
    paragraphs: [
      "Der Garten erhielt eine komplette Neugestaltung mit frischem Rollrasen, der sofort für ein gepflegtes Erscheinungsbild sorgt. Ergänzt wird die Anlage durch einen neuen Wintergarten, der Haus und Garten harmonisch verbindet.",
      "Struktur und klare Übergänge schaffen Kantsteine, während neue Betonpflasterwege für stabile und langlebige Wege sorgen.",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Neugestaltung der vorderen Außenanlage",
    paragraphs: [
      "Die Außenanlage erstrahlt nun in einem komplett neuen Look. Nach dem Aufnehmen der alten Pflasterflächen wurde der Untergrund sorgfältig vorbereitet und das Pflaster neu verlegt, sodass eine stabile und optisch ansprechende Fläche entstanden ist.",
      "Klare Linien schaffen gesetzte Kant- und Rasenkantensteine, während frisch verlegter Rollrasen und Mulchflächen aus Rindermulch der Anlage ein gepflegtes, lebendiges Gesamtbild verleihen.",
    ],
  },
  {
    icon: DoorOpen,
    title: "Erneuerung des Hauseingangs und Zugangsbereichs",
    paragraphs: [
      "Die alte Treppe wich neuen, massiven Blockstufen, die Stabilität und Sicherheit bieten. Ergänzend wurden sämtliche Plattenflächen durch hochwertiges Betonpflaster ersetzt, wodurch ein harmonischer Übergang vom Zugangsweg bis direkt vor die Haustür entstanden ist.",
      "Das Ergebnis ist ein langlebiger, funktionaler und optisch stimmiger Eingangsbereich, der den ersten Eindruck deutlich aufwertet.",
    ],
  },
];

const services = [
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
              Ihre Garten- und Landschaftsprojekte
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Entdecken Sie unsere erfolgreich abgeschlossenen Projekte – von der Planung bis zur Pflege
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={index}
                  className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    {project.title}
                  </h3>

                  {/* Paragraphs */}
                  <div className="space-y-3">
                    {project.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
