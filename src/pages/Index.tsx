import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useSEOHead({
    title: "Diker Straßenbau | Straßenbau & Tiefbau in Solingen",
    description: "Ihr Straßenbauunternehmen in Solingen ✓ Straßenbau ✓ Tiefbau ✓ Kanalbau ✓ Garten- & Landschaftsbau. Über 15 Jahre Erfahrung. Jetzt kostenloses Angebot anfordern!",
    canonical: "https://diker-v2.lovable.app/",
    keywords: "Straßenbau Solingen, Tiefbau Solingen, Kanalbau NRW, Pflasterarbeiten, Asphaltierung, Bauunternehmen Solingen",
  });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <GalleryPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
