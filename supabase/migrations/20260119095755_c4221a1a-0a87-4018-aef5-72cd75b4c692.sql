-- Table pour le contenu du site (textes modifiables)
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);

-- Table pour les services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Wrench',
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour la galerie de projets
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les informations de contact
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les admins (profils)
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for content (visitors can see the site)
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view contact info" ON public.contact_info FOR SELECT USING (true);

-- Admin write access (only admins can modify)
CREATE POLICY "Admins can manage site content" ON public.site_content 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can manage services" ON public.services 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can manage projects" ON public.projects 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can manage contact info" ON public.contact_info 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

-- Admin profiles policies
CREATE POLICY "Admins can view admin profiles" ON public.admin_profiles 
  FOR SELECT USING (auth.uid() = user_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.site_content (section, key, value) VALUES
  ('hero', 'title', 'DIKER Straßenbau'),
  ('hero', 'subtitle', 'Ihr Partner für professionellen Straßen- und Tiefbau'),
  ('hero', 'description', 'Mit über 25 Jahren Erfahrung bieten wir erstklassige Bauleistungen für Kommunen, Unternehmen und Privatpersonen.'),
  ('about', 'title', 'Über Uns'),
  ('about', 'description', 'DIKER Straßenbau ist seit über zwei Jahrzehnten Ihr verlässlicher Partner im Bereich Straßen- und Tiefbau. Unser erfahrenes Team realisiert Projekte jeder Größenordnung mit höchster Präzision und Qualität.'),
  ('contact', 'phone', '+49 123 456789'),
  ('contact', 'email', 'info@dikerstrassenbau.de'),
  ('contact', 'address', 'Musterstraße 123, 12345 Musterstadt');

-- Insert default services
INSERT INTO public.services (title, description, icon, display_order) VALUES
  ('Straßenbau', 'Professioneller Neubau und Sanierung von Straßen, Wegen und Plätzen mit modernster Technik.', 'Road', 1),
  ('Tiefbau', 'Fachgerechte Erdarbeiten, Fundamentarbeiten und unterirdische Infrastruktur.', 'HardHat', 2),
  ('Kanalbau', 'Installation und Sanierung von Abwasser- und Regenwassersystemen.', 'Droplets', 3),
  ('Garten- & Landschaftsbau', 'Gestaltung von Außenanlagen, Pflasterarbeiten und Grünflächen.', 'TreeDeciduous', 4);

-- Insert default contact info
INSERT INTO public.contact_info (type, value, icon, display_order) VALUES
  ('phone', '+49 123 456789', 'Phone', 1),
  ('email', 'info@dikerstrassenbau.de', 'Mail', 2),
  ('address', 'Musterstraße 123, 12345 Musterstadt', 'MapPin', 3);

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies
CREATE POLICY "Anyone can view site images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'site-images' AND 
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update site images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'site-images' AND 
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete site images" ON storage.objects FOR DELETE USING (
  bucket_id = 'site-images' AND 
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_admin = true)
);