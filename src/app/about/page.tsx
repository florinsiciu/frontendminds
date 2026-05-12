import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { siteConfig } from "@/lib/config/site";
import { AboutHero } from "@/components/about/about-hero";
import { AboutOrigin } from "@/components/about/about-origin";
import { AboutFramework } from "@/components/about/about-framework";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutContentPillars } from "@/components/about/about-content-pillars";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author,
  url: `${siteConfig.baseUrl}/about`,
  jobTitle: "Angular Modernization Consultant",
  worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.baseUrl },
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.twitter],
  knowsAbout: [
    "Angular migration",
    "Angular modernization",
    "Frontend architecture",
    "AI-assisted development",
    "Enterprise Angular consulting",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.baseUrl}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutHero />
      <AboutOrigin />
      <AboutFramework />
      <AboutExperience />
      <AboutContentPillars />
      <AboutCta />
    </>
  );
}
