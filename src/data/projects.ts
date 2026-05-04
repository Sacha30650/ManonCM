export type ProjectCategory = "event" | "fitness" | "food" | "coaching";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  description: string;
  cover: string;
  size?: "wide" | "tall" | "square";
};

export const categoryLabels: Record<ProjectCategory, string> = {
  event: "Événementiel",
  fitness: "Fitness",
  food: "Food",
  coaching: "Coaching",
};

export const projects: Project[] = [
  {
    slug: "711-club-rock-vs-sbk",
    title: "Soirée Rock vs SBK",
    client: "711 Club",
    category: "event",
    categoryLabel: "Événementiel",
    year: "2025",
    description:
      "Affiche d'une soirée à thème — codes nightlife, contraste fort, hiérarchie info ultra lisible.",
    cover: "/projects/711-rock-vs-sbk.svg",
    size: "tall",
  },
  {
    slug: "711-beach-rose",
    title: "Beach Rose",
    client: "711 Club",
    category: "event",
    categoryLabel: "Événementiel",
    year: "2025",
    description:
      "Beach party signature — palette pastel, ambiance estivale et identité club préservée.",
    cover: "/projects/711-beach-rose.svg",
    size: "wide",
  },
  {
    slug: "fit-and-dance-sejour",
    title: "Fit & Dance — Séjour fitness",
    client: "Fit & Dance",
    category: "fitness",
    categoryLabel: "Fitness",
    year: "2025",
    description:
      "Communication d'un séjour fitness all-in : flyer, posts Instagram, programme détaillé.",
    cover: "/projects/fit-and-dance.svg",
    size: "square",
  },
  {
    slug: "level-up-8-semaines",
    title: "Level Up — Programme 8 semaines",
    client: "Level Up Coaching",
    category: "fitness",
    categoryLabel: "Fitness",
    year: "2024",
    description:
      "Carrousels Instagram + ebook PDF complet pour un programme de transformation 8 semaines.",
    cover: "/projects/level-up.svg",
    size: "wide",
  },
  {
    slug: "manon-coach-sportif",
    title: "Carte de visite & flyer",
    client: "Manon Coach Sportif",
    category: "coaching",
    categoryLabel: "Coaching",
    year: "2024",
    description: "Identité d'une coach indépendante : carte de visite, flyer et premiers posts.",
    cover: "/projects/manon-coach.svg",
    size: "tall",
  },
  {
    slug: "eat-fit-restaurant",
    title: "Eat Fit",
    client: "Eat Fit Restaurant",
    category: "food",
    categoryLabel: "Food",
    year: "2024",
    description:
      "Menus, grille tarifaire et contenus Instagram pour un restaurant healthy en ouverture.",
    cover: "/projects/eat-fit.svg",
    size: "square",
  },
  {
    slug: "cardio-sculpt-programme",
    title: "Séances Cardio Sculpt",
    client: "Level Up Coaching",
    category: "coaching",
    categoryLabel: "Coaching",
    year: "2024",
    description: "Mise en page de séances détaillées : tableaux d'exercices, repères de séries.",
    cover: "/projects/cardio-sculpt.svg",
    size: "tall",
  },
  {
    slug: "711-club-summer-vibes",
    title: "Summer Vibes",
    client: "711 Club",
    category: "event",
    categoryLabel: "Événementiel",
    year: "2024",
    description: "Série de visuels Stories pour la saison estivale — déclinaisons rapides.",
    cover: "/projects/711-summer.svg",
    size: "wide",
  },
];
