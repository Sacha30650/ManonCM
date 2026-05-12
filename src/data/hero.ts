import "server-only";

import { CONTENT_TAGS, loadJson } from "@/lib/content-loader";
import type { HeroData } from "./hero-types";

export type { HeroData } from "./hero-types";

const FALLBACK: HeroData = {
  kicker: "Make my visu",
  headlinePrimary: "DES VISUELS QUI",
  headlineAccent: "CONVERTISSENT.",
  subheadline: "VOS PROSPECTS EN CLIENTS.",
  description: "",
  ctaPrimaryLabel: "Contact",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Portfolio",
  ctaSecondaryHref: "#portfolio",
  specialitiesLabel: "Spécialités",
  specialities: [],
  tagline: "",
  stats: [],
};

export async function getHero(): Promise<HeroData> {
  const data = await loadJson<HeroData>("content/hero.json", [CONTENT_TAGS.hero]);
  return data ?? FALLBACK;
}
