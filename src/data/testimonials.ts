export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Manon a transformé notre com'. Les flyers ont enfin une vraie identité, et nos remplissages de soirées ont décollé.",
    name: "Direction 711 Club",
    role: "Bar / Club événementiel",
  },
  {
    id: "2",
    quote:
      "Travailler avec Manon, c'est rapide, carré et toujours dans la stratégie. Mes carrousels Instagram convertissent enfin.",
    name: "Coach Léa",
    role: "Coach sportive indépendante",
  },
  {
    id: "3",
    quote:
      "Le menu, les visuels, la grille tarifaire : tout est cohérent. Mes clients trouvent enfin l'image de mon resto pro.",
    name: "Eat Fit",
    role: "Restaurant healthy",
  },
];
