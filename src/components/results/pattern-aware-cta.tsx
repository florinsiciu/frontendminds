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
import { resultsPage } from "@/lib/content/results";
import type { TriggeredPattern } from "@/types/assessment";

interface PatternAwareCtaProps {
  topPatterns: TriggeredPattern[];
  assessmentId: string;
}

interface CtaConfig {
  headline: string;
  body: string;
  buttonLabel: string;
  hint: string;
  ctaType: "calendly" | "download" | "internal-link";
  ctaHref?: string;
}

function getCtaFromPatterns(topPatterns: TriggeredPattern[]): CtaConfig {
  const criticalCount = topPatterns.filter(
    (tp) => tp.pattern.priority === "critical",
  ).length;
  const warningCount = topPatterns.filter(
    (tp) => tp.pattern.priority === "warning",
  ).length;

  if (criticalCount >= 2) {
    return {
      headline: "Your Assessment Flagged Critical Risks",
      body: "Multiple critical patterns were detected in your Angular stack. A focused strategy call will help you prioritize the most urgent issues and build a concrete action plan.",
      buttonLabel: "Book a 30-Minute Strategy Call",
      hint: "We'll review your specific findings together and identify your top 3 priorities",
      ctaType: "calendly",
    };
  }

  if (criticalCount >= 1) {
    return {
      headline: "Your Codebase Has Clear Improvement Areas",
      body: "Your assessment identified specific patterns that are holding your team back. An architecture review will map these findings to a modernization roadmap tailored to your situation.",
      buttonLabel: "Book a Free Architecture Review",
      hint: "We'll walk through your results and outline a focused improvement plan",
      ctaType: "calendly",
    };
  }

  if (warningCount > 0) {
    return {
      headline: "You're Well-Positioned to Level Up",
      body: "Your foundations are solid with a few areas to sharpen. Download the modernization checklist to turn your specific findings into actionable improvements.",
      buttonLabel: "Get Your Modernization Checklist",
      hint: "Actionable checklist based on your specific findings — delivered instantly",
      ctaType: "download",
      ctaHref: "/resources/modernization-checklist.pdf",
    };
  }

  return {
    headline: "Strong Foundations — Stay Ahead of the Curve",
    body: "Your Angular stack is in great shape. Subscribe to The Frontend Signal for advanced optimization strategies, modern patterns, and AI tooling insights.",
    buttonLabel: "Subscribe to The Frontend Signal",
    hint: "Weekly insights for teams that are already ahead",
    ctaType: "internal-link",
    ctaHref: "/newsletter",
  };
}

const buttonClassName = cn(
  buttonVariants({ size: "lg", shape: "pill" }),
  "h-12 gap-2 px-6 text-base",
);

export function PatternAwareCta({
  topPatterns,
  assessmentId,
}: PatternAwareCtaProps) {
  const cta = getCtaFromPatterns(topPatterns);

  function trackClick(ctaType: string) {
    posthog.capture(EVENTS.CTA_CLICKED, {
      cta_type: ctaType,
      pattern_count: topPatterns.length,
      critical_count: topPatterns.filter(
        (tp) => tp.pattern.priority === "critical",
      ).length,
    });
  }

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
              onClick={() => trackClick("calendly")}
              className={buttonClassName}
            >
              {cta.buttonLabel}
              <ArrowRight className="size-4" />
            </a>
          )}

          {cta.ctaType === "download" && (
            <a
              href={cta.ctaHref}
              onClick={() => trackClick("download")}
              className={buttonClassName}
            >
              {cta.buttonLabel}
              <ArrowRight className="size-4" />
            </a>
          )}

          {cta.ctaType === "internal-link" && (
            <Link
              href={cta.ctaHref!}
              onClick={() => trackClick("newsletter")}
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
          onClick={() =>
            posthog.capture(EVENTS.CTA_CLICKED, {
              cta_type: "pdf_download",
              pattern_count: topPatterns.length,
            })
          }
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
