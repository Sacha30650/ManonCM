import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { getHero } from "@/data/hero";
import { getPricing } from "@/data/pricing";
import { getProjects } from "@/data/projects";

export default async function HomePage() {
  const [hero, pricing, projects] = await Promise.all([
    getHero(),
    getPricing(),
    getProjects(),
  ]);
  return (
    <>
      <Hero data={hero} />
      <About />
      <Services />
      <PortfolioPreview projects={projects} />
      <Method />
      <Pricing data={pricing} />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
