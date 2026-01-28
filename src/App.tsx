import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LightboxProvider } from "@/hooks/useImageLightbox";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { useFavicon } from "@/hooks/useFavicon";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import Strassenbau from "./pages/Strassenbau";
import Tiefbau from "./pages/Tiefbau";
import Kanalbau from "./pages/Kanalbau";
import GartenLandschaftsbau from "./pages/GartenLandschaftsbau";
import Projekte from "./pages/Projekte";
import Anfrage from "./pages/Anfrage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Inner component to use hooks inside providers
const AppContent = () => {
  useFavicon(); // Apply dynamic favicon
  
  return (
    <>
      <Toaster />
      <Sonner />
      <ImageLightbox />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/strassenbau" element={<Strassenbau />} />
          <Route path="/tiefbau" element={<Tiefbau />} />
          <Route path="/kanalbau" element={<Kanalbau />} />
          <Route path="/garten-landschaftsbau" element={<GartenLandschaftsbau />} />
          <Route path="/projekte" element={<Projekte />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LightboxProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </LightboxProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
