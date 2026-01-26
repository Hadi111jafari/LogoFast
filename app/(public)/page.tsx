import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import WithWithout from "@/components/WithWithout";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Solution from "@/components/Solution";
import Benefits from "@/components/Benefits";
import MakerIntro from "@/components/MakerIntro";
import Logos from "@/components/Logos";
import Lead from "@/components/Lead";
import CTA from "@/components/Cta";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Logos />
        <Problem />
        <Solution />
        <Features />
        <Benefits />
        <HowItWorks />
        <WithWithout />
        <MakerIntro />
        <Testimonials />
        <Lead />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
