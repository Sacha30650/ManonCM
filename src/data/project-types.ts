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
  order?: number;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  event: "Événementiel",
  fitness: "Fitness",
  food: "Food",
  coaching: "Coaching",
};
