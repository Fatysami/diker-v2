import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import strassenbauImg from "@/assets/service-strassenbau.jpg";

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
              Wir von Diker Straßenbau sind Ihre Straßenbauer in Solingen und Umgebung. Durch Kompetenz, Motivation und einem modernen Equipment haben wir Ihre Herausforderungen rund um den Straßenbau im Griff. Wir kommen mit Manpower und High-Tech. Lassen Sie sich begeistern.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 w-5 h-5" />
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
          <div className="max-w-4xl mx-auto">
            {/* Section 1 */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Kompetente Straßenbauer für Ihre Projekte
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Unser Team besteht aus ausgebildeten Tiefbau-Facharbeitern und hausintern angelernten Hilfskräften. Darüber hinaus steht uns ein großer Pool an Spezialisten zur Seite, mit denen wir auch besonderen Herausforderungen begegnen können. Damit sichern wir uns für Ihre Projekte rund um Straßenbau und Tiefbau stets die größte Kompetenz.
                </p>
                <p>
                  Durch eine faire Behandlung, familiären Umgang und übertarifliche Bezahlung halten wir unser hoch kompetentes Team in unserem Straßenbauunternehmen. Das macht uns nicht nur jederzeit einsatzbereit. Vor allem erreichen wir damit, dass jeder aus unserem Team einen immer größeren Schatz an Erfahrungen ansammeln kann.
                </p>
                <p>
                  Wir verfolgen bei unseren Mitarbeitern ein klares Ziel: Jeder sollte alles können. Das macht uns für Ihre Projekte besonders flexibel. Gleichgültig, wer zur Bewältigung Ihrer Herausforderungen antritt, Sie erhalten eine Ausführung in zuverlässiger und gleichbleibender Qualität. Dies unterstützen wir zusätzlich, indem wir unsere Straßenbauer mit dem besten Equipment ausstatten.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Moderne Maschinen und Fahrzeuge für Ihren Vorteil
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Bei uns bleibt eine Maschine nur so lange im Einsatz, bis es eine bessere gibt. Wir fahren nicht jedes einzelne Gerät auf Verschleiß, sondern nutzen stets die Möglichkeiten neuester Technologie voll aus. Damit sind wir eine der schnellsten Unternehmen für Straßenbau und Tiefbau der Umgebung.
                </p>
                <p>
                  Hocheffiziente Werkzeuge, leistungsstarke Fahrzeuge und innovative Hilfsmittel machen jedes Bauprojekt in kürzester Zeit umsetzbar. Neben einer maximalen Effizienz achten wir bei unserem Equipment auch auf den Umweltschutz. Die von uns verwendeten im Straßenbau Fahrzeuge und Maschinen erfüllen alle Anforderungen an den Emissionsschutz.
                </p>
                <p>
                  Superleise Kompressoren und Stromaggregate sind für uns ebenso selbstverständlich, wie Baufahrzeuge mit den neuesten Abgas-Reinigungssystemen.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Umfassende Beratung für Straßenbau und Tiefbau
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Kommen Sie zu uns, wenn Sie sich einer Herausforderung im Straßenbau stellen müssen. Unser Straßenbauunternehmen kann Ihnen nicht nur bei der Ausführung bestmöglich helfen. Wir bieten Ihnen darüber hinaus auch unsere umfassende Kompetenz bei Beratung und Begutachtung Ihrer Projekte an.
                </p>
                <p>
                  Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau oder Sanierung anbieten. Wir entwickeln auf Grundlage der festgestellten Notwendigkeiten die bestmögliche Lösung für Ihr Projekt.
                </p>
                <p>
                  Sie erhalten damit eine hohe Sicherheit, was die termingerechte Ausführung und das Einhalten Ihres Budgets angeht. Wir haben alles, um Ihr Projekt fristgerecht und unter Einhaltung des Kostenrahmens fertig zu stellen. Das gibt Ihnen Planungssicherheit und eine maximal zuverlässige Kalkulation.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Für kleine wie große Projekte bereit
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Rufen Sie uns an, gleichgültig, wie klein, groß, eilig oder langfristig Ihr Bauvorhaben sein soll. Wir kommen zur Ausbesserung von Schlaglöchern ebenso gerne, wie zur Sanierung ganzer Straßen.
                </p>
                <p>
                  Die fristgerechte, schnelle und professionelle Ausführung aller Aufträge ist Teil unserer Firmenphilosophie, denn wir wissen: „Wer nicht in kleinen Dingen zuverlässig ist, der ist es auch nicht in großen".
                </p>
                <p>
                  Wenn wir kommen, dann ist die professionelle, sachgerechte und effiziente Ausführung Ihres Bauvorhabens garantiert. Zuverlässigkeit für Ihre Planungssicherheit gehört bei uns zur Firmenphilosophie.
                </p>
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
