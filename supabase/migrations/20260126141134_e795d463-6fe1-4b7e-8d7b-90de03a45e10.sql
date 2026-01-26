-- Create a table for service sections with 4 images support
CREATE TABLE public.kanalbau_sections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    paragraphs TEXT[] NOT NULL DEFAULT '{}',
    icon TEXT NOT NULL DEFAULT 'Wrench',
    image_url TEXT,
    image_url_2 TEXT,
    image_url_3 TEXT,
    image_url_4 TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.kanalbau_sections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active kanalbau sections" 
ON public.kanalbau_sections 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage kanalbau sections" 
ON public.kanalbau_sections 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE admin_profiles.user_id = auth.uid() 
    AND admin_profiles.is_admin = true
));

-- Insert the existing content
INSERT INTO public.kanalbau_sections (title, paragraphs, icon, display_order) VALUES
(
    'Probleme und Gefahren durch undichte Leitungen',
    ARRAY[
        'Wenn eine Wasserleitung undicht ist, kann es durch austretendes Wasser zu Schäden kommen. Es kann unter anderem die Bausubstanz nachhaltig beschädigt werden, aber auch Möbel und Wertgegenstände können von einem Wasserschaden betroffen sein.',
        'Noch unangenehmer wird es, wenn es sich um eine defekte Abwasserleitung handelt – verschmutztes Abwasser beschädigt nicht nur Ihr Eigentum, sondern bringt oftmals unangenehme Gerüche mit sich und ist aus hygienischer Sicht bedenklich.',
        'Sie können solchen Schäden vorbeugen: Durch eine sachkundige Überprüfung der Leitungen kann ein sachkundiger Prüfer häufig schon sehr früh Schwachstellen erkennen und Sie dabei unterstützen, diese rechtzeitig zu reparieren.'
    ],
    'AlertTriangle',
    1
),
(
    'Dichtheitsprüfungen vom fachkundigen Partner',
    ARRAY[
        'Die professionelle Überprüfung von Rohren und Leitungen sollte stets in die Hände eines seriösen und sachverständigen Partners gegeben werden.',
        'Denn nur so kann garantiert werden, dass das Ergebnis der Prüfung zuverlässig ist und nicht zugunsten eines unseriösen Anbieters geschönt wurde.',
        'Mit unserer Erfahrung und modernen Prüfgeräten bieten wir Ihnen eine transparente und zuverlässige Dienstleistung.'
    ],
    'Shield',
    2
),
(
    'Dichtheitsprüfung Abwasser- und Wasserleitungen',
    ARRAY[
        'Ein Wasserschaden ist etwas, vor dem sich jeder Immobilienbesitzer graut. Denn auch wenn er relativ schnell entdeckt wird, kann er hohe Kosten und aufwendige Baumaßnahmen nach sich ziehen. Leckagen können zum Beispiel das Mauerwerk beschädigen, sodass teure und aufwändige Sanierungsarbeiten notwendig werden.',
        'Eine Dichtigkeitsprüfung dient dazu, den Zustand der Rohrleitungen zu ermitteln. Durch die Prüfung kann ein Sachverständiger herausfinden, ob das Rohrnetz noch dicht ist oder ob sich im Laufe der Zeit Schwachstellen oder Leckagen gebildet haben.',
        'Die Dichtheitsprüfung für Kanal, Wasser- und Abwasserleitungen dient übrigens nicht nur dazu, Ihr Eigentum vor einem Wasserschaden zu bewahren. Auch der Umwelt kommt eine fachgerechte Prüfung und Wartung von Kanalisation und Abwasserrohren zugute.'
    ],
    'Droplets',
    3
),
(
    'Dichtheitsprüfung für Gas- und Flüssiggasleitungen',
    ARRAY[
        'Viele Haushalte nutzen eine Gastherme für warmes Wasser oder heizen ihre Räume mit einer Gasheizung. Über die Gasleitung werden diese Haushalte mit dem nötigen Rohstoff versorgt. Dabei ist es sehr wichtig, dass die gesamte Gasanlage jederzeit einwandfrei dicht ist.',
        'Denn wenn durch ein Leck Gas austritt, kann dies schwere Folgen haben. Das Gas könnte sich z. B. durch einen Funken oder durch eine offene Flamme spontan entzünden und zu einer Explosion führen.',
        'Die Dichtheitsprüfung für Gas kann fällig werden bei: Neuinstallation einer Gasanlage (z.B. im Neubau), Erweiterung einer Gasanlage (z.B. durch einen Anbau) oder Erneuerung einer Gasanlage (z.B. im Rahmen von Wartung und Instandhaltung).'
    ],
    'Flame',
    4
),
(
    'Zuverlässige Prüfung mit professionellem Dichtheitsprüfgerät',
    ARRAY[
        'Mit einem professionellen Dichtheitsprüfgerät kann eine Leitung effizient und zuverlässig geprüft werden. Bei der Prüfung können solche Geräte mit geringem Aufwand mögliche Lecks in der Leitung aufdecken, ohne dass die gesamte Leitung manuell inspiziert werden muss.',
        'Außerdem eignen sich die Geräte, um eine Belastungsprüfung zu machen. Mit einer solchen Prüfung lässt sich zum Beispiel feststellen, ob eine ältere Leitung noch immer stabil genug ist, um den erforderlichen Druck auszuhalten.',
        'Professionelle Dichtheitsprüfgeräte gibt es für alle Arten von Leitungen und Rohren: Gasleitungen und Flüssiggasleitungen, Nutz- und Trinkwasserleitungen, Heizungsrohre und Abwasserleitungen.'
    ],
    'Settings',
    5
),
(
    'Pflicht zur Dichtheitsprüfung: das steht im Gesetz',
    ARRAY[
        'Die Dichtheitsprüfung ist im Gesetz verankert: Die Dichtheitsprüfung ist in NRW Pflicht und betraf damit lange Zeit auch alle privaten Hausbesitzer. Bisher bedeutete das, dass der Gesetzgeber alle 30 Jahre bestimmte Tests für die Abwasserrohre vorsah.',
        'Der Landtag diskutierte deshalb immer wieder darüber, ob die Vorschriften für Privathaushalte gelockert werden sollten. Man entschloss sich nun dazu, die Pflichten für private Eigentümer stark zu lockern.',
        'In einigen Ausnahmefällen besteht die Pflicht jedoch weiterhin. Das ist zum Beispiel der Fall, wenn ein konkreter Verdacht darauf besteht, dass undichte Rohre vorliegen könnten. Gerne beraten wir Sie jederzeit zur aktuellen Gesetzeslage.'
    ],
    'Scale',
    6
),
(
    'Was wird die Dichtheitsprüfung kosten?',
    ARRAY[
        'Die exakten Kosten für eine professionelle Dichtigkeitsprüfung lassen sich schwer verallgemeinern. Es kommt immer darauf an, wie viel Aufwand bei der Prüfung entsteht. Und das hängt davon ab, wie die jeweiligen baulichen Eigenschaften vor Ort aussehen.',
        'Dazu zählt unter anderem die Länge der zu prüfenden Leitungen. Ganz grob bewegen sich die Kosten für die professionelle Dichtigkeitsprüfung bei einem Einfamilienhaus zwischen 300 und 500 Euro.',
        'In manchen Fällen können die Kosten aber auch deutlich höher oder niedriger ausfallen. Gerne unterbreiten wir Ihnen unverbindlich ein individuelles Angebot für Ihre Immobilie.'
    ],
    'Calculator',
    7
);