-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;

-- Create a PERMISSIVE policy for public read access
CREATE POLICY "Anyone can view active services" 
ON public.services 
FOR SELECT 
TO public
USING (is_active = true);