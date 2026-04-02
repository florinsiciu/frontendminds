import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { AboutHero } from "@/components/about/about-hero";
import { AboutOrigin } from "@/components/about/about-origin";
import { AboutFramework } from "@/components/about/about-framework";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutContentPillars } from "@/components/about/about-content-pillars";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOrigin />
      <AboutFramework />
      <AboutExperience />
      <AboutContentPillars />
      <AboutCta />
    </>
  );
}
