import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const Strassenbau = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Mit Kraft und Kompetenz: Ihr Straßenbauunternehmen
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Wir von Diker Straßenbau sind Ihre Straßenbauer in Solingen und Umgebung. Durch Kompetenz, Motivation und einem moderne Equipment haben wir Ihre Herausforderungen rund um den Straßenbau im Griff. Wir kommen mit Manpower und High-Tech. Lassen Sie sich begeistern.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Kompetente Straßenbauer */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Kompetente Straßenbauer für Ihre Projekte
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Unser Team besteht aus ausgebildeten Tiefbau-Facharbeitern und hausintern angelernten Hilfskräften. Darüber hinaus steht uns ein großer Pool an Spezialisten zur Seite, mit denen wir auch besonderen Herausforderungen begegnen können. Damit sichern wir uns für Ihre Projekte rund um Straßenbau und Tiefbau stets die größte Kompetenz. Durch eine faire Behandlung, familiären Umgang und übertarifliche Bezahlung halten wir unser hoch kompetentes Team in unserem Straßenbauunternehmen. Das macht uns nicht nur jederzeit einsatzbereit. Vor allem erreichen wir damit, dass jeder aus unserem Team einen immer größeren Schatz an Erfahrungen ansammeln kann. Wir verfolgen bei unseren Mitarbeitern ein klares Ziel: Jeder sollte alles können. Das macht uns für Ihre Projekte besonders flexibel. Gleichgültig, wer zur Bewältigung Ihrer Herausforderungen antritt, Sie erhalten eine Ausführung in zuverlässiger und gleichbleibender Qualität. Dies unterstützen wir zusätzlich, indem wir unsere Straßenbauer mit dem besten Equipment ausstatten.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Moderne Maschinen */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Moderne Maschinen und Fahrzeuge für Ihren Vorteil
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Bei uns bleibt eine Maschine nur so lange im Einsatz, bis es eine bessere gibt. Wir fahren nicht jedes einzelne Gerät auf Verschleiß, sondern nutzen stets die Möglichkeiten neuester Technologie voll aus. Damit sind wir eine der schnellsten Unternehmen für Straßenbau und Tiefbau der Umgebung. Hocheffiziente Werkzeuge, leistungsstarke Fahrzeuge und innovative Hilfsmittel machen jedes Bauprojekt in kürzester Zeit umsetzbar. Neben einer maximalen Effizienz achten wir bei unserem Equipment auch auf den Umweltschutz. Die von uns verwendeten im Straßenbau Fahrzeuge und Maschinen erfüllen alle Anforderungen an den Emissionsschutz. Superleise Kompressoren und Stromaggregate sind für uns ebenso selbstverständlich, wie Baufahrzeuge mit den neuesten Abgas-Reinigungssystemen.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Umfassende Beratung */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Umfassende Beratung für Straßenbau und Tiefbau
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Kommen Sie zu uns, wenn Sie sich einer Herausforderung im Straßenbau stellen müssen. Unser Straßenbauunternehmen kann Ihnen nicht nur bei der Ausführung bestmöglich helfen. Wir bieten Ihnen darüber hinaus auch unsere umfassende Kompetenz bei Beratung und Begutachtung Ihrer Projekte an. Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau oder Sanierung anbieten. Wir entwickeln auf Grundlage der festgestellten Notwendigkeiten die bestmögliche Lösung für Ihr Projekt. Sie erhalten damit eine hohe Sicherheit, was die termingerechte Ausführung und das Einhalten Ihres Budgets angeht. Wir haben alles, um Ihr Projekt fristgerecht und unter Einhaltung des Kostenrahmens fertig zu stellen. Das gibt Ihnen Planungssicherheit und eine maximal zuverlässige Kalkulation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Für kleine wie große Projekte */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Für kleine wie große Projekte bereit
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Rufen Sie uns an, gleichgültig, wie klein, groß, eilig oder langfristig Ihr Bauvorhaben sein soll. Wir kommen zur Ausbesserung von Schlaglöchern ebenso gerne, wie zur Sanierung ganzer Straßen. Die fristgerechte, schnelle und professionelle Ausführung aller Aufträge ist Teil unserer Firmenphilosophie, denn wir wissen: „Wer nicht in kleinen Dingen zuverlässig ist, der ist es auch nicht in großen". Wenn wir kommen, dann ist die professionelle, sachgerechte und effiziente Ausführung Ihres Bauvorhabens garantiert. Zuverlässigkeit für Ihre Planungssicherheit gehört bei uns zur Firmenphilosophie.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Jetzt Kontakt aufnehmen
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Lassen Sie uns über Ihr Projekt sprechen. Wir freuen uns auf Ihre Anfrage.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg"
                  asChild
                >
                  <a href="tel:02122266393">
                    <Phone className="mr-2 h-5 w-5" />
                    Anrufen
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <a href="/#kontakt">
                    <Mail className="mr-2 h-5 w-5" />
                    Kontaktformular
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-primary-foreground/10 rounded-2xl p-8 lg:p-10">
              <h3 className="text-xl font-bold mb-6">
                Kontaktdaten
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="opacity-80">Wittkuller Str. 161, 42719 Solingen</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a href="tel:02122266393" className="opacity-80 hover:opacity-100 transition-opacity">
                      0212 22 66 39 31
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <a href="mailto:info@dikerstrassenbau.de" className="opacity-80 hover:opacity-100 transition-opacity">
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
