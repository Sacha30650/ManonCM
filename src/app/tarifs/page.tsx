import type { Metadata } from "next";

import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tarifs des packs et créations à l'unité de Manon Almu. Affiches, flyers, posts et carrousels Instagram, packs complets pour TPE, coachs et restaurants.",
  alternates: { canonical: "/tarifs" },
};

export default function TarifsPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Pricing />
      <FAQ />
    </div>
  );
}
