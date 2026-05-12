import type { Metadata } from "next";

import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Sélection de projets Make my visu : affiches événementielles, flyers, contenus Instagram pour clubs, coachs sportifs, restaurants et commerces.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <section className="section-padding pt-36 md:pt-44">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          kicker="Portfolio"
          title="Tous les projets, toutes les marques."
          description="Filtre par secteur pour voir le travail réalisé. Clique sur un projet pour plus de détails."
        />
        <PortfolioGallery projects={projects} />
      </div>
    </section>
  );
}
