import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Contact — Demander un devis",
  description:
    "Décris ton projet en quelques lignes. Manon revient vers toi sous 24h avec un devis personnalisé.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <ContactCTA />
    </div>
  );
}
