import "server-only";
import fs from "node:fs";
import path from "node:path";

import type { Pack, UnitItem } from "./pricing-types";

export type { Pack, UnitItem } from "./pricing-types";

type PricingData = {
  packs: Pack[];
  unitItems: UnitItem[];
};

function loadPricing(): PricingData {
  const file = path.join(process.cwd(), "content/pricing.json");
  if (!fs.existsSync(file)) return { packs: [], unitItems: [] };
  return JSON.parse(fs.readFileSync(file, "utf8")) as PricingData;
}

const data = loadPricing();
export const packs: Pack[] = data.packs;
export const unitItems: UnitItem[] = data.unitItems;
