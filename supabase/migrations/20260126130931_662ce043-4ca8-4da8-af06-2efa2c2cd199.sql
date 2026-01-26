-- Add additional image columns to garten_projects for multi-image layout
ALTER TABLE public.garten_projects 
ADD COLUMN image_url_2 TEXT,
ADD COLUMN image_url_3 TEXT,
ADD COLUMN image_url_4 TEXT;