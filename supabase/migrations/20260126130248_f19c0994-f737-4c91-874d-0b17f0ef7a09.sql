-- Create garten_projects table for editable garden/landscape projects
CREATE TABLE public.garten_projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    icon TEXT NOT NULL DEFAULT 'Warehouse',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.garten_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing
CREATE POLICY "Anyone can view active garten projects" 
ON public.garten_projects 
FOR SELECT 
USING (is_active = true);

-- Create policy for admin management
CREATE POLICY "Admins can manage garten projects" 
ON public.garten_projects 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE admin_profiles.user_id = auth.uid()
    AND admin_profiles.is_admin = true
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_garten_projects_updated_at
BEFORE UPDATE ON public.garten_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data from the existing static content
INSERT INTO public.garten_projects (title, description, icon, display_order) VALUES
('Geräteschuppen mit Pflaster- und Terrassenbau', 
 'Für den Kunden wurde ein Geräteschuppen errichtet, den Bereich davor mit Pflastersteinen gestaltet und seitlich eine Fläche mit Terrassenplatten angelegt. So ist ein klar strukturierter Gartenbereich mit Stauraum, Wegführung und zusätzlicher Nutzfläche entstanden.', 
 'Warehouse', 1),
('Wegegestaltung mit Trittplatten und Granitmauer', 
 'Bei diesem Projekt wurde ein Großteil der Außenanlage aufgewertet. Die Wege sind mit hochwertigen Naturstein-Trittplatten ausgelegt. Zwischen Weg und Rasen sorgt eine Mauer aus Granitplatten für eine klare und stabile Trennung.', 
 'Map', 2),
('Terrassenbau mit harmonischer Treppe', 
 'In diesem Projekt wurde zunächst eine Terrasse mit großformatigen Terrassenplatten im Maß 100×100 cm realisiert. Die gleichen Platten kamen anschließend bei der Treppe in Kombination mit Blockstufen zum Einsatz.', 
 'Grid3X3', 3),
('Gartenumgestaltung mit Rollrasen und Wintergarten', 
 'Der Garten erhielt eine komplette Neugestaltung mit frischem Rollrasen, der sofort für ein gepflegtes Erscheinungsbild sorgt. Ergänzt wird die Anlage durch einen neuen Wintergarten, der Haus und Garten harmonisch verbindet.', 
 'Flower2', 4),
('Neugestaltung der vorderen Außenanlage', 
 'Die Außenanlage erstrahlt nun in einem komplett neuen Look. Nach dem Aufnehmen der alten Pflasterflächen wurde der Untergrund sorgfältig vorbereitet und das Pflaster neu verlegt.', 
 'LayoutGrid', 5),
('Erneuerung des Hauseingangs und Zugangsbereichs', 
 'Die alte Treppe wich neuen, massiven Blockstufen, die Stabilität und Sicherheit bieten. Das Ergebnis ist ein langlebiger, funktionaler und optisch stimmiger Eingangsbereich.', 
 'DoorOpen', 6);