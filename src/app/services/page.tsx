import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { siteConfig } from "@/lib/config/site";
import { services, faqItems } from "@/lib/content/services";
import { ServicesHero } from "@/components/services/services-hero";
import { ProblemSolutionMap } from "@/components/services/problem-solution-map";
import { ScorecardBridge } from "@/components/services/scorecard-bridge";
import { ServiceDeepDive } from "@/components/services/service-deep-dive";
import { FitCheck } from "@/components/services/fit-check";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServicesFaq } from "@/components/services/services-faq";
import { ServicesCta } from "@/components/services/services-cta";

export const metadata: Metadata = {
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  alternates: { canonical: "/services" },
};

const serviceSchemas = services.map((s) => ({
  "@type": "Service",
  name: s.title,
  description: s.description,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  },
}));

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.baseUrl}/services` },
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: `${siteConfig.baseUrl}/services`,
  description: pageSeo.services.description,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Angular Modernization Services",
    itemListElement: serviceSchemas,
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesHero />
      <ProblemSolutionMap />
      <ScorecardBridge />
      {services.map((service, i) => (
        <ServiceDeepDive
          key={service.id}
          service={service}
          reversed={i % 2 !== 0}
          bg={i % 2 === 0 ? "muted" : "default"}
        />
      ))}
      <FitCheck />
      <ProcessSteps />
      <ServicesFaq />
      <ServicesCta />
    </>
  );
}
