import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
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
