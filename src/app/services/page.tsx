import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { services } from "@/lib/content/services";
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
};

export default function ServicesPage() {
  return (
    <>
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
