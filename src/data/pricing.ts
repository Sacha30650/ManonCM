export type Pack = {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
  badge?: string;
};

export const packs: Pack[] = [
  {
    id: "essentiel",
    name: "Pack Visuel Essentiel",
    price: "120 — 180€",
    features: ["1 affiche OU 1 flyer", "3 posts Instagram", "Fichiers prêts à diffuser"],
  },
  {
    id: "instagram",
    name: "Pack Instagram",
    price: "150 — 250€",
    features: [
      "8 posts Instagram",
      "Création visuelle + textes",
      "Cohérence du feed assurée",
    ],
  },
  {
    id: "complet",
    name: "Pack Complet",
    price: "250 — 400€",
    highlight: true,
    badge: "Populaire",
    features: [
      "1 affiche ou flyer",
      "8 posts Instagram",
      "Publication incluse",
      "Suivi & ajustements",
    ],
  },
];

export type UnitItem = {
  label: string;
  range: string;
};

export const unitItems: UnitItem[] = [
  { label: "Affiche événementielle", range: "40€ — 80€" },
  { label: "Flyer", range: "50€ — 100€" },
  { label: "Visuel Instagram (post)", range: "15€ — 30€" },
  { label: "Carrousel Instagram (3-5 slides)", range: "40€ — 80€" },
  { label: "Menu / grille tarifaire", range: "60€ — 150€" },
];
