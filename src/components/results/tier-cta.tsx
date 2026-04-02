"use client";

import Link from "next/link";
import { ArrowRight, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { GlassCard } from "@/components/ui/glass-card";
import { Tagline } from "@/components/ui/tagline";
import { posthog } from "@/lib/posthog";
import { EVENTS } from "@/lib/config/analytics";
import { siteConfig } from "@/lib/config/site";
import { tierCtaCards, resultsPage } from "@/lib/content/results";
import type { TierId } from "@/types/assessment";

interface TierCtaProps {
  tier: TierId;
  assessmentId: string;
}

const buttonClassName = cn(
  buttonVariants({ size: "lg", shape: "pill" }),
  "h-12 gap-2 px-6 text-base",
);

function trackClick(tier: TierId, ctaType: string) {
  posthog.capture(EVENTS.CTA_CLICKED, { tier, cta_type: ctaType });
}

export function TierCta({ tier, assessmentId }: TierCtaProps) {
  const cta = tierCtaCards[tier];

  return (
    <div>
      <GlassCard variant="highlight" className="p-6 lg:p-8 text-center">
        <Tagline>Recommended Next Step</Tagline>

        <h2 className="text-xl font-bold text-foreground">{cta.headline}</h2>
        <p className="mt-2 text-muted-foreground">{cta.body}</p>

        <div className="mt-6">
          {cta.ctaType === "calendly" && (
            <a
              href={siteConfig.calendly.buildUrl("results")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(tier, "calendly")}
              className={buttonClassName}
            >
              {cta.buttonLabel}
              <ArrowRight className="size-4" />
            </a>
          )}

          {cta.ctaType === "download" && (
            <a
              href={cta.ctaHref}
              onClick={() => trackClick(tier, "download")}
              className={buttonClassName}
            >
              {cta.buttonLabel}
              <ArrowRight className="size-4" />
            </a>
          )}

          {cta.ctaType === "internal-link" && (
            <Link
              href={cta.ctaHref!}
              onClick={() => trackClick(tier, "newsletter")}
              className={buttonClassName}
            >
              {cta.buttonLabel}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <p className="mt-3 text-sm text-subtle">{cta.hint}</p>
      </GlassCard>

      {/* PDF Download */}
      <div className="mt-4 text-center">
        <a
          href={`/api/assessment/report/${assessmentId}`}
          onClick={() => posthog.capture(EVENTS.CTA_CLICKED, { tier, cta_type: "pdf_download" })}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg", shape: "pill" }),
            "h-12 gap-2 px-6 text-base",
          )}
        >
          <Download className="size-4" />
          Download Your Full Report
        </a>
      </div>

      {/* Retake link */}
      <div className="mt-6 text-center">
        <Link
          href={resultsPage.retakeHref}
          className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm"
        >
          <RotateCcw className="size-3.5" />
          {resultsPage.retakeText}
        </Link>
      </div>
    </div>
  );
}
