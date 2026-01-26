-- Create testimonials table for client reviews
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can view active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid()
  AND admin_profiles.is_admin = true
));

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create about_stats table for statistics (years, projects, etc.)
CREATE TABLE public.about_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  stat_value TEXT NOT NULL,
  stat_suffix TEXT DEFAULT '',
  label TEXT NOT NULL,
  icon TEXT DEFAULT 'Award',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.about_stats ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can view active about stats"
ON public.about_stats
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage about stats"
ON public.about_stats
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid()
  AND admin_profiles.is_admin = true
));

-- Create trigger for updated_at
CREATE TRIGGER update_about_stats_updated_at
BEFORE UPDATE ON public.about_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default statistics
INSERT INTO public.about_stats (stat_key, stat_value, stat_suffix, label, icon, display_order) VALUES
('years_experience', '25', '+', 'Jahre Erfahrung', 'Award', 1),
('completed_projects', '500', '+', 'Abgeschlossene Projekte', 'CheckCircle', 2),
('team_members', '20', '+', 'Fachkräfte im Team', 'Users', 3),
('satisfied_clients', '98', '%', 'Zufriedene Kunden', 'ThumbsUp', 4);

-- Add about section image to site_content
INSERT INTO public.site_content (section, key, value)
SELECT 'about', 'image_url', ''
WHERE NOT EXISTS (SELECT 1 FROM public.site_content WHERE section = 'about' AND key = 'image_url');

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, company, role, content, rating, is_featured, display_order) VALUES
('Stefan M.', 'Privathaushalt', 'Hausbesitzer', 'Hervorragende Arbeit bei unserer Einfahrt. Das Team war pünktlich, professionell und das Ergebnis übertrifft unsere Erwartungen. Absolute Empfehlung!', 5, true, 1),
('Thomas K.', 'Hausverwaltung Weber', 'Geschäftsführer', 'Wir arbeiten seit Jahren mit Diker zusammen. Zuverlässig, kompetent und immer termingerecht. Ein echter Partner für alle Tiefbauarbeiten.', 5, true, 2),
('Maria S.', 'Stadt Solingen', 'Projektleiterin', 'Professionelle Ausführung der Kanalbauarbeiten in unserem Bezirk. Saubere Arbeit und exzellente Kommunikation während des gesamten Projekts.', 5, true, 3);