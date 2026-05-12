import "server-only";

import { CONTENT_TAGS, loadJson } from "@/lib/content-loader";
import type { Pack, UnitItem } from "./pricing-types";

export type { Pack, UnitItem } from "./pricing-types";

type PricingData = {
  packs: Pack[];
  unitItems: UnitItem[];
};

const EMPTY: PricingData = { packs: [], unitItems: [] };

export async function getPricing(): Promise<PricingData> {
  const data = await loadJson<PricingData>("content/pricing.json", [
    CONTENT_TAGS.pricing,
  ]);
  return data ?? EMPTY;
}
