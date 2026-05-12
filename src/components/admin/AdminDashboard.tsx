"use client";

import { useState } from "react";

import { HeroEditor } from "./HeroEditor";
import { PortfolioEditor } from "./PortfolioEditor";
import { PricingEditor } from "./PricingEditor";
import type { HeroData } from "@/data/hero-types";
import type { Pack, UnitItem } from "@/data/pricing-types";
import type { Project } from "@/data/project-types";

type Section = "portfolio" | "hero" | "pricing";

type Props = {
  hero: HeroData;
  projects: Project[];
  pricing: { packs: Pack[]; unitItems: UnitItem[] };
};

const TABS: { id: Section; label: string; hint: string }[] = [
  { id: "portfolio", label: "Portfolio", hint: "Photos et titres de tes projets" },
  { id: "hero", label: "Accueil", hint: "Titre principal, sous-titre, stats" },
  { id: "pricing", label: "Tarifs", hint: "Packs et créations à l'unité" },
];

export function AdminDashboard({ hero, projects, pricing }: Props) {
  const [section, setSection] = useState<Section>("portfolio");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="container-page flex flex-col gap-10">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-eyebrow text-accent-soft">Make my visu</span>
          <h1 className="text-display mt-2 text-4xl text-text-primary md:text-5xl">Admin</h1>
          <p className="mt-2 max-w-xl text-sm text-text-secondary md:text-base">
            Mets à jour les contenus du site. Tes modifications sont enregistrées sur GitHub,
            puis Vercel redéploie automatiquement (~1 minute).
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start rounded-full border border-border bg-transparent px-5 py-2.5 text-eyebrow text-text-secondary transition-colors hover:border-accent hover:text-accent md:self-auto"
        >
          Se déconnecter
        </button>
      </header>

      <nav
        aria-label="Sections"
        className="flex flex-wrap items-center gap-2 border-y border-border py-3"
      >
        {TABS.map((tab) => {
          const isActive = section === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSection(tab.id)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-transparent text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      <section>
        {section === "portfolio" && <PortfolioEditor initialProjects={projects} />}
        {section === "hero" && <HeroEditor initial={hero} />}
        {section === "pricing" && <PricingEditor initial={pricing} />}
      </section>
    </div>
  );
}
