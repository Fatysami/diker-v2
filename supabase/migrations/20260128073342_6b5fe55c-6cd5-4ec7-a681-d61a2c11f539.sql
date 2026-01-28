-- Create table for Garten service tags
CREATE TABLE public.garten_service_tags (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.garten_service_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active garten service tags"
ON public.garten_service_tags
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage garten service tags"
ON public.garten_service_tags
FOR ALL
USING (EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
));

-- Insert default service tags
INSERT INTO public.garten_service_tags (name, display_order) VALUES
('Terrassenbau', 1),
('Pflasterarbeiten', 2),
('Rollrasen', 3),
('Naturstein-Trittplatten', 4),
('Granitmauern', 5),
('Wintergarten', 6),
('Blockstufen', 7),
('Mulchflächen', 8);

-- Insert Google Maps URL in site_content
INSERT INTO public.site_content (section, key, value)
VALUES ('contact', 'google_maps_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.844899285567!2d7.0823!3d51.1657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d683b3e2d9e7%3A0x4e2c1c9c9c9c9c9c!2sWittkuller%20Str.%20161%2C%2042719%20Solingen!5e0!3m2!1sde!2sde!4v1699999999999!5m2!1sde!2sde')
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value;