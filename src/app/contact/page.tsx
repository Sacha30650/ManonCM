import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Contact — Réserver un bilan stratégique offert",
  description:
    "Réserve ton bilan stratégique offert avec Make my visu : 30 min en visio pour faire le point sur ta com et repartir avec un plan d'action.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <ContactCTA />
    </div>
  );
}
