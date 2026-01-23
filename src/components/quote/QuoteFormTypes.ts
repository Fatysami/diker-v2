import { z } from "zod";

export const quoteFormSchema = z.object({
  // Step 1 - Client info
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  phone: z.string().min(6, "Bitte geben Sie eine gültige Telefonnummer ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  city: z.string().min(2, "Bitte geben Sie die Stadt/Ort des Projekts ein"),
  
  // Step 2 - Work type
  workType: z.string().min(1, "Bitte wählen Sie eine Leistung"),
  
  // Step 3 - Project details
  description: z.string().min(10, "Bitte beschreiben Sie Ihr Projekt (mind. 10 Zeichen)"),
  surface: z.string().optional(),
  deadline: z.string().optional(),
  
  // Step 5 - Consent
  consent: z.boolean().refine(val => val === true, "Bitte stimmen Sie der Datenschutzerklärung zu"),
  
  // Honeypot
  website: z.string().max(0).optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const workTypes = [
  { value: "strassenbau", label: "Straßenbau" },
  { value: "tiefbau", label: "Tiefbau" },
  { value: "kanalbau", label: "Kanalbau" },
  { value: "garten-landschaftsbau", label: "Garten- & Landschaftsbau" },
  { value: "andere", label: "Andere" },
];
