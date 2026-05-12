import type { Metadata } from "next";

import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";
import { getPricing } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tarifs des packs et créations à l'unité Make my visu. Affiches, flyers, posts et carrousels Instagram, packs complets pour TPE, coachs et restaurants.",
  alternates: { canonical: "/tarifs" },
};

export default async function TarifsPage() {
  const pricing = await getPricing();
  return (
    <div className="pt-32 md:pt-40">
      <Pricing data={pricing} />
      <FAQ />
    </div>
  );
}
