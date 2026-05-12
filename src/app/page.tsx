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

export default function HomePage() {
  const hero = getHero();
  return (
    <>
      <Hero data={hero} />
      <About />
      <Services />
      <PortfolioPreview />
      <Method />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
