import { z } from "zod";

export const projectTypes = [
  "Affiche / Flyer",
  "Posts Instagram",
  "Pack complet",
  "Gestion Instagram",
  "Autre",
] as const;

export const budgetRanges = [
  "< 100€",
  "100€ — 250€",
  "250€ — 500€",
  "500€ — 1000€",
  "> 1000€",
  "Pas encore défini",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Indique au moins 2 caractères").max(80),
  email: z.string().email("Adresse email invalide"),
  projectType: z.enum(projectTypes, { message: "Choisis un type de projet" }),
  budget: z.enum(budgetRanges).optional(),
  message: z
    .string()
    .min(20, "Décris ton projet en au moins 20 caractères")
    .max(4000, "Message trop long"),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
