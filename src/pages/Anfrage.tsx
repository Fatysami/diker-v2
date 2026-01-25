import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/quote/QuoteForm";
import { Button } from "@/components/ui/button";

const Anfrage = () => {
  useSEOHead({
    title: "Kostenloses Angebot anfordern | Diker Straßenbau",
    description: "Fordern Sie jetzt ein kostenloses und unverbindliches Angebot für Ihr Bauprojekt an. Straßenbau, Tiefbau, Kanalbau in Solingen. Antwort innerhalb 24-48h!",
    canonical: "https://www.dikerstrassenbau.de/anfrage",
    keywords: "Angebot Straßenbau, kostenlose Beratung, Bauanfrage Solingen, Tiefbau Angebot",
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Pre-fill work type from URL parameter
  const prefilledWorkType = searchParams.get("leistung") || "";

  const handleSuccess = () => {
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom section-padding">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vielen Dank für Ihre Anfrage!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24-48 Stunden bei Ihnen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/")} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zur Startseite
                </Button>
                <Button onClick={() => setIsSuccess(false)}>
                  Neue Anfrage stellen
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Kostenlose Anfrage
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Jetzt Angebot anfordern
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Füllen Sie das Formular aus und erhalten Sie ein unverbindliches Angebot für Ihr Projekt. 
              Wir melden uns innerhalb von 24-48 Stunden bei Ihnen.
            </p>
          </div>

          {/* Form */}
          <QuoteForm 
            defaultWorkType={prefilledWorkType} 
            onSuccess={handleSuccess}
          />

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-primary mb-1">24h</div>
              <div className="text-sm text-muted-foreground">Schnelle Antwort</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Unverbindlich</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Anfrage;
