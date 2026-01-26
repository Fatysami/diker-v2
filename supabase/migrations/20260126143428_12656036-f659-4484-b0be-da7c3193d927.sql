-- Add features and link columns to services table
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS link TEXT;

-- Update existing services with correct data
UPDATE public.services SET
  description = 'Parkplätze, Straßen und Fahrradwege – professionell geplant und termingerecht umgesetzt.',
  features = ARRAY['Asphaltierung', 'Pflasterarbeiten', 'Fahrradwege'],
  link = '/strassenbau'
WHERE title = 'Straßenbau';

UPDATE public.services SET
  title = 'Straßentiefbau',
  description = 'Fundamente und Erdarbeiten bilden die Basis für jedes erfolgreiche Bauprojekt.',
  features = ARRAY['Erdarbeiten', 'Fundamente', 'Baugründung'],
  link = '/tiefbau'
WHERE title = 'Tiefbau';

UPDATE public.services SET
  description = 'Spezialisierte Infrastrukturarbeiten für Entwässerung und unterirdische Systeme.',
  features = ARRAY['Entwässerung', 'Rohrleitungen', 'Schachtbau'],
  link = '/kanalbau'
WHERE title = 'Kanalbau';

UPDATE public.services SET
  description = 'Gestaltung von Außenanlagen mit Naturstein, Bepflanzung und modernem Design.',
  features = ARRAY['Naturstein', 'Bepflanzung', 'Terrassen'],
  link = '/garten-landschaftsbau'
WHERE title = 'Garten- & Landschaftsbau';