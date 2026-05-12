import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { intro, scoringExplainer } from "@/lib/content/assessment";
import { pageSeo, faqJsonLd } from "@/lib/content/seo";
import { DIMENSION_COLORS, DIMENSION_ORDER } from "@/lib/config/scoring";
import { DIMENSIONS } from "@/lib/data/questions";

export const metadata: Metadata = {
  title: pageSeo.assessment.title,
  description: pageSeo.assessment.description,
};

export default function AssessmentIntro() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <Section bg="muted" width="narrow">
        <div className="text-center">
          <Tagline>Free Assessment</Tagline>
          <h1 className="text-3xl font-bold font-heading leading-tight text-foreground lg:text-4xl">
            Angular Modernization{" "}
            <em className="not-italic font-heading text-indigo-400">
              Assessment
            </em>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {intro.methodology}
          </p>

          <div className="mt-8">
            <Link
              href={intro.ctaHref}
              className={cn(
                buttonVariants({ shape: "pill", size: "lg" }),
                "h-auto gap-2 px-[2.75rem] py-[1.1rem] text-base font-semibold"
              )}
            >
              {intro.ctaText}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="mt-5 text-[0.8rem] text-muted-foreground">
            {intro.microStats.map((stat, i) => (
              <span key={stat}>
                {i > 0 && (
                  <span className="mx-2 text-muted-foreground/50">|</span>
                )}
                {stat}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* Benefits + Dimensions */}
      <Section bg="default" width="narrow">
        <div className="flex flex-col items-center">
          <Reveal>
            <GlassCard className="w-full max-w-xl p-6 text-center lg:p-8">
              <h2 className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-indigo-400">What you&apos;ll discover</h2>
              <ul className="mt-4 space-y-3 text-left">
                {intro.benefitList.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 text-center">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {intro.dimensionLabel}
              </p>
              <div className="flex flex-wrap justify-center gap-[0.625rem]">
                {DIMENSION_ORDER.map((dimId) => {
                  const dim = DIMENSIONS.find((d) => d.id === dimId);
                  const color = DIMENSION_COLORS[dimId];
                  if (!dim) return null;
                  return (
                    <div
                      key={dimId}
                      className="rounded-full px-4 py-[0.35rem] text-[0.78rem] font-medium"
                      style={{
                        backgroundColor: `${color}0F`,
                        borderWidth: 1,
                        borderColor: `${color}1F`,
                        color,
                      }}
                    >
                      {dim.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-subtle">
          <Clock className="size-4" />
          <span>{intro.credibility}</span>
        </div>
      </Section>

      {/* How Scoring Works */}
      <Section bg="muted" width="narrow">
        <Reveal>
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-center font-heading text-xl font-semibold text-foreground">
              {scoringExplainer.heading}
            </h2>
            {scoringExplainer.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <div className="mt-6 space-y-3">
              {scoringExplainer.tiers.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-baseline gap-3 text-sm"
                >
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {tier.range}
                  </span>
                  <span>
                    <span className="font-medium text-foreground">
                      {tier.label}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}— {tier.description}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground/70">
              {scoringExplainer.footnote}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
