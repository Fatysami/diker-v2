-- Ensure permissive policy for public read access on projects
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;

CREATE POLICY "Anyone can view active projects" 
ON public.projects 
FOR SELECT 
TO public
USING (is_active = true);