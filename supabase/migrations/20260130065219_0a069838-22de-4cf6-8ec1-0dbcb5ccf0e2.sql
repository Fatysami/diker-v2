-- Add focal point columns to all image tables
-- Focal point is stored as a string: 'center' (default), 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'

-- Add to garten_projects
ALTER TABLE public.garten_projects 
ADD COLUMN IF NOT EXISTS image_focal_point text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_2 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_3 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_4 text DEFAULT 'center';

-- Add to kanalbau_sections
ALTER TABLE public.kanalbau_sections 
ADD COLUMN IF NOT EXISTS image_focal_point text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_2 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_3 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_4 text DEFAULT 'center';

-- Add to tiefbau_sections
ALTER TABLE public.tiefbau_sections 
ADD COLUMN IF NOT EXISTS image_focal_point text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_2 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_3 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_4 text DEFAULT 'center';

-- Add to strassenbau_sections
ALTER TABLE public.strassenbau_sections 
ADD COLUMN IF NOT EXISTS image_focal_point text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_2 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_3 text DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_focal_point_4 text DEFAULT 'center';

-- Add to projects table as well for the main gallery
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS image_focal_point text DEFAULT 'center';