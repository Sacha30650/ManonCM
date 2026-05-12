import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const PROJECT_CATEGORIES = ["event", "fitness", "food", "coaching"] as const;
const PROJECT_SIZES = ["wide", "tall", "square"] as const;

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "project",
        label: "Projets (portfolio)",
        path: "content/projects",
        format: "json",
        defaultItem: () => ({
          year: String(new Date().getFullYear()),
          category: "event",
          categoryLabel: "Événementiel",
          size: "square",
          order: 100,
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values.slug ?? values.title ?? "nouveau-projet")
                .toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            description:
              "Identifiant unique du projet, en minuscules avec des tirets. Ex: 711-rock-vs-sbk",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Titre du projet",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "client",
            label: "Client",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Catégorie",
            options: [...PROJECT_CATEGORIES],
            required: true,
          },
          {
            type: "string",
            name: "categoryLabel",
            label: "Catégorie (étiquette affichée)",
            description: "Ex: Événementiel, Fitness, Food, Coaching",
            required: true,
          },
          {
            type: "string",
            name: "year",
            label: "Année",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "image",
            name: "cover",
            label: "Image de couverture",
            required: true,
          },
          {
            type: "string",
            name: "size",
            label: "Taille dans la grille",
            options: [...PROJECT_SIZES],
            description:
              "wide = large (2 colonnes), tall = haute (2 lignes), square = carré (1×1)",
          },
          {
            type: "number",
            name: "order",
            label: "Ordre d'affichage",
            description:
              "Plus le nombre est petit, plus le projet apparaît en premier. Les 6 premiers projets s'affichent sur la home.",
          },
        ],
      },
    ],
  },
});
