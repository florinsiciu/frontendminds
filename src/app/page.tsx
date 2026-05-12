import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { Hero } from "@/components/landing/hero";
import { ProblemFraming } from "@/components/landing/problem-framing";
import { StatsBar } from "@/components/landing/stats-bar";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ScorecardSpotlight } from "@/components/landing/scorecard-spotlight";
import { ContentPillars } from "@/components/landing/content-pillars";
import { FeaturedArticles } from "@/components/landing/featured-articles";
import { LeadMagnet } from "@/components/landing/lead-magnet";
import { FounderSection } from "@/components/landing/founder-section";
import { ExitIntentPopup } from "@/components/landing/exit-intent-popup";
import { StickyMobileCta } from "@/components/landing/sticky-mobile-cta";

export const metadata: Metadata = {
  title: pageSeo.home.title,
  description: pageSeo.home.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemFraming />
      <StatsBar />
      <HowItWorks />
      <ScorecardSpotlight />
      <ContentPillars />
      <FeaturedArticles />
      <LeadMagnet />
      <FounderSection />
      <ExitIntentPopup />
      <StickyMobileCta />
    </>
  );
}
