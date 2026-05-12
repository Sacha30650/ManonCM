import "server-only";
import fs from "node:fs";
import path from "node:path";

import type { HeroData } from "./hero-types";

export type { HeroData } from "./hero-types";

export function getHero(): HeroData {
  const file = path.join(process.cwd(), "content/hero.json");
  return JSON.parse(fs.readFileSync(file, "utf8")) as HeroData;
}
