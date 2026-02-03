-- Ajouter un type 'notification_email' pour l'email de réception des formulaires
INSERT INTO public.contact_info (type, value, icon, display_order)
VALUES ('notification_email', 'info@dikerstrassenbau.de', 'Bell', 5)
ON CONFLICT DO NOTHING;