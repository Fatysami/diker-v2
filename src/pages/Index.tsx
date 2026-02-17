import { useSEOHead } from "@/hooks/useSEOHead";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useSEOHead({
    title: "Diker Bau | Straßenbau & Tiefbau in Solingen",
    description: "Ihr Bauunternehmen in Solingen ✓ Straßenbau ✓ Tiefbau ✓ Kanalbau ✓ Garten- & Landschaftsbau. Über 15 Jahre Erfahrung. Jetzt kostenloses Angebot anfordern!",
    canonical: "https://www.diker-bau.de/",
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
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
