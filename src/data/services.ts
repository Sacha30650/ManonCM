export type Service = {
  id: string;
  title: string;
  icon: "palette" | "instagram" | "growth";
  items: string[];
  price: string;
};

export const services: Service[] = [
  {
    id: "visuels",
    title: "Création de visuels",
    icon: "palette",
    items: [
      "Affiches événementielles",
      "Flyers promotionnels",
      "Menus et grilles tarifaires",
      "Ebooks & supports digitaux",
    ],
    price: "À partir de 15€",
  },
  {
    id: "instagram",
    title: "Contenus Instagram",
    icon: "instagram",
    items: [
      "Posts (visuels et carrousels)",
      "Stories animées",
      "Templates personnalisés",
      "Calendrier de publications",
    ],
    price: "À partir de 15€/post",
  },
  {
    id: "gestion",
    title: "Gestion Instagram",
    icon: "growth",
    items: [
      "Publication des contenus",
      "Organisation du feed",
      "Planning de contenu",
      "Optimisation du profil",
    ],
    price: "Sur devis",
  },
];
