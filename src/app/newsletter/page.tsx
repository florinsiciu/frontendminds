import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/content/seo";
import { newsletterPage } from "@/lib/content/newsletter";
import { NewsletterForm } from "@/components/newsletter-form";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: pageSeo.newsletter.title,
  description: pageSeo.newsletter.description,
};

const dimensionColors: Record<string, string> = {
  migration: "#93C5FD",
  architecture: "#5EEAD4",
  ai: "#C4B5FD",
  modern: "#FBBF24",
};

const formatTagColors: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-[#818CF8]" },
  emerald: { bg: "bg-[#34D399]/10", text: "text-[#34D399]" },
  amber: { bg: "bg-[#FBBF24]/10", text: "text-[#FBBF24]" },
  purple: { bg: "bg-[#C4B5FD]/10", text: "text-[#C4B5FD]" },
};

export default function Newsletter() {
  return (
    <>
      {/* Section 1: Hero */}
      <Section className="bg-dot-grid relative overflow-hidden">
        {/* Gradient glows */}
        <div className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-indigo-500/[0.15] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <Tagline>Newsletter</Tagline>
            <h1 className="mb-4 font-heading text-[2.5rem] font-bold leading-[1.1] text-foreground md:text-[3rem]">
              The Frontend{" "}
              <em className="font-heading italic text-[#818CF8]">Signal</em>
            </h1>
            <p className="mx-auto mb-6 max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground">
              {newsletterPage.subheading}
            </p>
          </Reveal>

          <Reveal delay={100}>
            {/* Expertise badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 sm:px-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-surface text-[0.7rem] font-medium text-muted-foreground">
                {newsletterPage.author.initials}
              </div>
              <span className="text-[0.75rem] text-muted-foreground sm:text-[0.8rem]">
                By{" "}
                <span className="font-medium text-foreground">
                  {newsletterPage.author.name}
                </span>{" "}
                · {newsletterPage.author.credential}
              </span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <NewsletterForm variant="compact" />
            <p className="mt-3 text-[0.75rem] text-subtle">
              {newsletterPage.frequency}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 2: Content Preview */}
      <Section bg="muted">
        <Reveal>
          <div className="text-center">
            <Tagline>What to expect</Tagline>
            <h2 className="mb-8 font-heading text-[1.75rem] font-bold text-foreground md:text-[2rem]">
              Here&apos;s What a Typical Issue Looks Like
            </h2>
          </div>

          <GlassCard className="mx-auto max-w-2xl p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                <span className="text-[0.75rem] uppercase tracking-wider text-muted-foreground">
                  Sample Issue
                </span>
              </div>
              <span className="text-[0.75rem] text-subtle">
                {newsletterPage.sampleIssue.readTime}
              </span>
            </div>

            <h3 className="mb-2 text-[1.1rem] font-semibold text-foreground">
              {newsletterPage.sampleIssue.title}
            </h3>
            <p className="mb-4 text-[0.9rem] leading-relaxed text-muted-foreground">
              {newsletterPage.sampleIssue.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {newsletterPage.sampleIssue.formatTags.map((tag) => {
                const colors = formatTagColors[tag.color];
                return (
                  <span
                    key={tag.label}
                    className={`rounded-md px-2.5 py-1 text-[0.7rem] ${colors.bg} ${colors.text}`}
                  >
                    {tag.label}
                  </span>
                );
              })}
            </div>
          </GlassCard>

          <p className="mt-6 text-center text-[0.85rem] text-muted-foreground">
            Each issue follows a consistent format: problem → pattern → code →
            results
          </p>
        </Reveal>
      </Section>

      {/* Section 3: Topic Roadmap */}
      <Section>
        <div className="text-center">
          <Tagline>Topics</Tagline>
          <h2 className="mb-8 font-heading text-[1.75rem] font-bold text-foreground md:text-[2rem]">
            What You&apos;ll Learn About
          </h2>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {newsletterPage.topics.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 100}>
              <GlassCard
                className="p-5"
                style={{
                  borderLeft: `3px solid ${dimensionColors[topic.color]}`,
                }}
              >
                <h3 className="mb-1 text-[0.95rem] font-semibold text-foreground">
                  {topic.title}
                </h3>
                <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 4: Closing CTA */}
      <Section bg="muted">
        <Reveal>
          <div className="text-center">
            <h2 className="mb-3 font-heading text-[1.75rem] font-bold text-foreground md:text-[2rem]">
              {newsletterPage.closingCta.heading}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-[1rem] text-muted-foreground">
              {newsletterPage.closingCta.subheading}
            </p>

            <GlassCard className="mx-auto max-w-md p-6 text-left md:p-8">
              <NewsletterForm variant="full" />
              <p className="mt-3 text-center text-[0.75rem] text-subtle">
                {newsletterPage.closingCta.finePrint}
              </p>
            </GlassCard>

            <div className="mt-6 border-t border-white/[0.04] pt-4">
              <p className="text-[0.85rem] text-muted-foreground">
                {newsletterPage.crossSell.text}
              </p>
              <Link
                href={newsletterPage.crossSell.href}
                className="text-[0.85rem] font-medium text-primary transition-colors hover:text-primary/80"
              >
                {newsletterPage.crossSell.linkText}
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
