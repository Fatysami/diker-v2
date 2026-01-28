-- Create strassenbau_service_tags table
CREATE TABLE public.strassenbau_service_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tiefbau_service_tags table
CREATE TABLE public.tiefbau_service_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create kanalbau_service_tags table
CREATE TABLE public.kanalbau_service_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.strassenbau_service_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiefbau_service_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanalbau_service_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies for strassenbau_service_tags
CREATE POLICY "Anyone can view active strassenbau service tags"
ON public.strassenbau_service_tags
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage strassenbau service tags"
ON public.strassenbau_service_tags
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
));

-- RLS policies for tiefbau_service_tags
CREATE POLICY "Anyone can view active tiefbau service tags"
ON public.tiefbau_service_tags
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage tiefbau service tags"
ON public.tiefbau_service_tags
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
));

-- RLS policies for kanalbau_service_tags
CREATE POLICY "Anyone can view active kanalbau service tags"
ON public.kanalbau_service_tags
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage kanalbau service tags"
ON public.kanalbau_service_tags
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
));