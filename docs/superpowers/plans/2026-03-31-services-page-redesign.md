# Services Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain `/services` page with a Priestley-informed, 8-section conversion page using the homepage's design system (GlassCard, Section, Tagline, Reveal, pill buttons, Fraunces headings).

**Architecture:** Content data lives in `src/lib/content/services.ts`. Eight new components in `src/components/services/` compose the page. The page file (`src/app/services/page.tsx`) imports and stacks them. All components are server components except `ServicesFaq` (needs expand/collapse state).

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, Lucide React icons, existing UI primitives (Section, GlassCard, Tagline, Reveal, IconCircle, Button).

**Spec:** `docs/superpowers/specs/2026-03-31-services-page-redesign.md`

---

### Task 1: Extend content data in services.ts

**Files:**
- Modify: `src/lib/content/services.ts`

- [ ] **Step 1: Add icon imports and new data exports**

Replace the entire file contents with:

```typescript
import { siteConfig } from "@/lib/config/site";

// ─── Page Copy ──────────────────────────────────────────────────────────────

export const servicesHero = {
  tagline: "Consulting Services",
  headline: "Stuck Between Legacy Code and a Full Rewrite?",
  subtitle:
    "You don't need to rebuild everything. Targeted modernization, smarter tooling, and a clear roadmap can get your Angular app where it needs to be — without the risk of a rewrite.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
  secondaryCta: {
    text: "Book a Discovery Call",
    href: siteConfig.calendly.buildUrl("services-hero"),
  },
} as const;

// ─── Problem → Solution Cards ───────────────────────────────────────────────

export const painPoints = [
  {
    quote: "We've been on Angular 12 for two years",
    explanation: "Each version you skip makes the next upgrade harder.",
    icon: "RefreshCw",
    borderColor: "#93C5FD",
    service: "Angular Modernization Audit",
    serviceHref: "#angular-audit",
  },
  {
    quote: "We bought 5 AI tools but none stuck",
    explanation: "Tool sprawl without workflow integration wastes budget.",
    icon: "Bot",
    borderColor: "#C4B5FD",
    service: "AI Tool Stack Rationalization",
    serviceHref: "#ai-rationalization",
  },
  {
    quote: "Nobody wants to touch the legacy module",
    explanation: "Fear of breakage slows every feature that touches old code.",
    icon: "Puzzle",
    borderColor: "#FBBF24",
    service: "Consulting & Implementation",
    serviceHref: "#consulting",
  },
  {
    quote: "We need a plan but don't know where to start",
    explanation: "Without a diagnostic, modernization efforts are guesswork.",
    icon: "Compass",
    borderColor: "#34D399",
    service: "Start with the Free Assessment",
    serviceHref: "/assessment",
  },
] as const;

// ─── Scorecard Bridge ───────────────────────────────────────────────────────

export const scorecardBridge = {
  tagline: "Not sure where you stand?",
  headline: "Start With a Free Diagnostic",
  subtitle:
    "Score your Angular app across 5 dimensions in under 3 minutes. Get a personalized action plan — then decide if you need help executing it.",
  stats: [
    { value: "20", label: "Questions" },
    { value: "5", label: "Dimensions" },
    { value: "3 min", label: "To complete" },
    { value: "Free", label: "No commitment", accent: "emerald" },
  ],
  dimensions: [
    { label: "Version Health", color: "#93C5FD" },
    { label: "Architecture", color: "#5EEAD4" },
    { label: "Dependencies", color: "#FBBF24" },
    { label: "AI Readiness", color: "#C4B5FD" },
    { label: "Delivery", color: "#F87171" },
  ],
  cta: { text: "Take the Free Assessment", href: "/assessment" },
  trustSignal: "No signup required until you see your results",
} as const;

// ─── Service Definitions ─────────────────────────────────────────────────────

export interface Service {
  id: string;
  icon: string;
  label: string;
  title: string;
  problem: string;
  description: string;
  outcomes: string[];
  pricing: string;
  timeline: string;
  ctaText: string;
  ctaHref: string;
}

export const services: Service[] = [
  {
    id: "angular-audit",
    icon: "Search",
    label: "Service 01",
    title: "Angular Modernization Audit",
    problem:
      "You suspect your Angular codebase is slowing the team down — but you don't know where the biggest risks are or where to start.",
    description:
      "A deep-dive into your Angular project covering version health, architecture patterns, modern API adoption, and delivery readiness. You leave with a prioritized modernization roadmap your team can act on immediately.",
    outcomes: [
      "Full assessment across 5 modernization dimensions",
      "Prioritized list of technical debt and risks",
      "Actionable roadmap with quick wins and long-term milestones",
      "Written report delivered within 14 days",
      "60-minute debrief call with recommendations",
    ],
    pricing: "EUR 2,000 – 4,000",
    timeline: "14 days",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-angular-audit"),
  },
  {
    id: "ai-rationalization",
    icon: "Bot",
    label: "Service 02",
    title: "AI Tool Stack Rationalization",
    problem:
      "Your team is adopting AI tools ad hoc — different devs using different tools with no governance, inconsistent output quality, and growing security concerns.",
    description:
      "An audit of your current AI tooling landscape followed by a structured recommendation for standardizing your stack. Covers IDE integrations, code review automation, documentation generation, and developer workflow tooling.",
    outcomes: [
      "Inventory of current AI tools and usage patterns",
      "Security and governance risk assessment",
      "Recommended standard stack with rationale",
      "Implementation guide and rollout plan",
      "Team onboarding playbook",
    ],
    pricing: "EUR 2,500 – 4,000",
    timeline: "10 – 14 days",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-ai-rationalization"),
  },
  {
    id: "consulting",
    icon: "Puzzle",
    label: "Service 03",
    title: "Consulting & Implementation",
    problem:
      "You need a senior Angular expert on hand for a specific challenge — whether that's leading a migration, unblocking an architectural decision, or mentoring your team.",
    description:
      "Flexible consulting and hands-on implementation support tailored to your situation. Engagements range from one-off advisory sessions to multi-week embedded work alongside your team.",
    outcomes: [
      "Hands-on support for Angular migration or refactoring",
      "Architecture reviews and decision facilitation",
      "Team workshops and pair programming sessions",
      "Code review and pull request guidance",
      "Flexible scope — from single sessions to multi-week sprints",
    ],
    pricing: "Custom",
    timeline: "Flexible",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-consulting"),
  },
];

// ─── Fit Check (Cinderella Clients) ─────────────────────────────────────────

export const fitCheck = {
  tagline: "Is this a good fit?",
  headline: "Who These Services Are For",
  goodFit: [
    "You lead or work on an Angular team at a mid-size company",
    "Your app is 2+ major versions behind",
    "You've tried upgrading but it stalled or felt too risky",
    "You want a structured roadmap, not just opinions",
    "You're evaluating AI tools but need a clear strategy",
  ],
  notFit: [
    "You need a full ground-up rewrite (not modernization)",
    "You're looking for a staff-augmentation developer",
    "Your team is already on the latest Angular version",
    "You need React or Vue migration (this is Angular-focused)",
  ],
} as const;

// ─── Process Steps ──────────────────────────────────────────────────────────

export const processSteps = {
  tagline: "How it works",
  headline: "From First Call to Action Plan",
  steps: [
    {
      number: 1,
      title: "Discovery Call",
      description:
        "Free 30-min call. We discuss your codebase, pain points, and goals. No commitment.",
      color: "#6366F1",
    },
    {
      number: 2,
      title: "Proposal & Scope",
      description:
        "I send a tailored proposal with scope, timeline, and investment. You decide if it fits.",
      color: "#34D399",
    },
    {
      number: 3,
      title: "Deliver & Walk Through",
      description:
        "I deliver the work, walk you through findings, and leave you with clear next steps.",
      color: "#FBBF24",
    },
  ],
} as const;

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const faqItems = [
  {
    question: "Why isn't pricing listed on the page?",
    answer:
      "Every project is different. Scope, complexity, and timeline vary. I send a transparent proposal after the discovery call so the investment reflects what you actually need — not a one-size-fits-all package.",
  },
  {
    question: "What if I'm not sure which service I need?",
    answer:
      "That's exactly what the free assessment and discovery call are for. The assessment scores your app across 5 dimensions, and the call helps us figure out the right engagement together.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Audits take 10–14 days. Consulting engagements are flexible — from single advisory sessions to multi-week embedded work. We agree on timeline before starting.",
  },
  {
    question: "What do I need to prepare before we start?",
    answer:
      "For audits: repository access and a brief on your team's pain points. For consulting: a clear description of the challenge. I'll send a prep checklist after we agree on scope.",
  },
  {
    question: "Can you work alongside my existing team?",
    answer:
      "Yes. Consulting engagements are designed for collaboration — code reviews, pair programming, architecture sessions. I work with your team, not in isolation.",
  },
  {
    question: "What happens if we keep delaying the upgrade?",
    answer:
      "Each Angular version you skip compounds the upgrade cost. Dependencies drift, patterns become unsupported, and security patches stop. Teams that wait 3+ versions often face a rewrite conversation they could have avoided with incremental modernization.",
  },
] as const;

// ─── Final CTA ──────────────────────────────────────────────────────────────

export const servicesCta = {
  tagline: "Ready to start?",
  headline: "Every Version You Skip Makes the Next Upgrade Harder",
  subtitle:
    "Find out where your app stands in 3 minutes — or book a free call to talk through your situation. No pitch, no commitment.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
  secondaryCta: {
    text: "Or Book a Discovery Call",
    href: siteConfig.calendly.buildUrl("services-cta"),
  },
} as const;
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/lib/content/services.ts 2>&1 | head -20`
Expected: No errors (or only unrelated pre-existing warnings).

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/services.ts
git commit -m "feat(services): extend content data with all section copy"
```

---

### Task 2: Create ServicesHero component

**Files:**
- Create: `src/components/services/services-hero.tsx`

- [ ] **Step 1: Create the component**

```typescript
import Link from "next/link";
import { servicesHero } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";

export function ServicesHero() {
  return (
    <Section className="relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60"
        aria-hidden="true"
      />
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-indigo-500/[0.15] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative text-center">
        <Reveal>
          <Tagline>{servicesHero.tagline}</Tagline>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mx-auto mb-5 max-w-[720px] font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl">
            {servicesHero.headline}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mb-8 max-w-[580px] text-[1.15rem] leading-[1.7] text-[#94A3B8]">
            {servicesHero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={servicesHero.primaryCta.href}
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)]"
            >
              {servicesHero.primaryCta.text}
            </Link>
            <Link
              href={servicesHero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-[#334155] px-6 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
            >
              {servicesHero.secondaryCta.text}
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/services-hero.tsx
git commit -m "feat(services): add ServicesHero component"
```

---

### Task 3: Create ProblemSolutionMap component

**Files:**
- Create: `src/components/services/problem-solution-map.tsx`

- [ ] **Step 1: Create the component**

```typescript
import Link from "next/link";
import { RefreshCw, Bot, Puzzle, Compass } from "lucide-react";
import { painPoints } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Bot,
  Puzzle,
  Compass,
};

export function ProblemSolutionMap() {
  return (
    <Section bg="muted">
      <Reveal>
        <Tagline>Sound familiar?</Tagline>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mb-10 font-heading text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          The Problems That Bring Teams to Us
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {painPoints.map((point, i) => {
          const Icon = iconMap[point.icon];
          const isExternal = point.serviceHref.startsWith("/");
          return (
            <Reveal key={point.quote} delay={(i + 1) * 100}>
              <GlassCard
                className="flex flex-col gap-3 border-l-[3px] px-6 py-5"
                style={{ borderLeftColor: point.borderColor }}
              >
                <div className="flex items-start gap-3">
                  <IconCircle
                    className="shrink-0"
                    style={{
                      backgroundColor: `${point.borderColor}1A`,
                      color: point.borderColor,
                    }}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </IconCircle>
                  <div>
                    <p className="text-[0.9rem] font-semibold leading-[1.4] text-foreground">
                      &ldquo;{point.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-[1.5] text-[#8B9DB8]">
                      {point.explanation}
                    </p>
                  </div>
                </div>
                <Link
                  href={point.serviceHref}
                  className="self-start text-[0.75rem] font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  → {point.service}
                </Link>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/problem-solution-map.tsx
git commit -m "feat(services): add ProblemSolutionMap component"
```

---

### Task 4: Create ScorecardBridge component

**Files:**
- Create: `src/components/services/scorecard-bridge.tsx`

- [ ] **Step 1: Create the component**

```typescript
import Link from "next/link";
import { scorecardBridge } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ScorecardBridge() {
  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>{scorecardBridge.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-3 font-heading text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            {scorecardBridge.headline}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mb-10 max-w-[580px] text-[1.05rem] leading-[1.7] text-[#94A3B8]">
            {scorecardBridge.subtitle}
          </p>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <GlassCard
          variant="highlight"
          className="mx-auto max-w-2xl p-8 lg:p-10"
        >
          {/* Stats row */}
          <div className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {scorecardBridge.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span
                  className={`text-[1.5rem] font-bold ${
                    stat.accent === "emerald"
                      ? "text-emerald-400"
                      : "bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text text-transparent"
                  }`}
                >
                  {stat.value}
                </span>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#7A8CA3]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dimension pills */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {scorecardBridge.dimensions.map((dim) => (
              <span
                key={dim.label}
                className="rounded-full px-3 py-1 text-[0.7rem] font-medium"
                style={{
                  backgroundColor: `${dim.color}0F`,
                  border: `1px solid ${dim.color}1F`,
                  color: dim.color,
                }}
              >
                {dim.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={scorecardBridge.cta.href}
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)]"
            >
              {scorecardBridge.cta.text} →
            </Link>
            <p className="mt-3 text-[0.75rem] text-[#7A8CA3]">
              {scorecardBridge.trustSignal}
            </p>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/scorecard-bridge.tsx
git commit -m "feat(services): add ScorecardBridge component"
```

---

### Task 5: Create ServiceDeepDive component

**Files:**
- Create: `src/components/services/service-deep-dive.tsx`

- [ ] **Step 1: Create the component**

```typescript
import Link from "next/link";
import { Search, Bot, Puzzle } from "lucide-react";
import type { Service } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";
import { CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Bot,
  Puzzle,
};

interface ServiceDeepDiveProps {
  service: Service;
  reversed?: boolean;
  bg?: "default" | "muted";
}

export function ServiceDeepDive({
  service,
  reversed = false,
  bg = "default",
}: ServiceDeepDiveProps) {
  const Icon = iconMap[service.icon];

  const textColumn = (
    <div className="flex flex-1 flex-col justify-center">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <IconCircle>
            {Icon && <Icon className="h-5 w-5" />}
          </IconCircle>
          <Tagline className="mb-0">{service.label}</Tagline>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2
          id={service.id}
          className="mb-3 scroll-mt-24 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-3xl"
        >
          {service.title}
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p className="mb-4 text-[0.9rem] italic leading-[1.6] text-[#8B9DB8]">
          {service.problem}
        </p>
      </Reveal>

      <Reveal delay={300}>
        <p className="mb-6 text-[0.9rem] leading-[1.65] text-foreground/80">
          {service.description}
        </p>
      </Reveal>

      <Reveal delay={400}>
        <Link
          href={service.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 w-fit items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)]"
        >
          {service.ctaText} →
        </Link>
      </Reveal>
    </div>
  );

  const cardColumn = (
    <div className="flex flex-1 items-center">
      <Reveal delay={200}>
        <GlassCard className="w-full p-6 lg:p-8">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#7A8CA3]">
            What you get
          </p>
          <ul className="space-y-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-[0.85rem] leading-[1.5] text-foreground/80">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>
    </div>
  );

  return (
    <Section bg={bg}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {reversed ? (
          <>
            {cardColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {cardColumn}
          </>
        )}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/service-deep-dive.tsx
git commit -m "feat(services): add ServiceDeepDive component"
```

---

### Task 6: Create FitCheck component

**Files:**
- Create: `src/components/services/fit-check.tsx`

- [ ] **Step 1: Create the component**

```typescript
import { CheckCircle, XCircle } from "lucide-react";
import { fitCheck } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function FitCheck() {
  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>{fitCheck.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-10 font-heading text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            {fitCheck.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        <Reveal delay={200}>
          <GlassCard className="p-6 lg:p-8">
            <p className="mb-5 text-[0.9rem] font-semibold text-emerald-400">
              This is for you if&hellip;
            </p>
            <ul className="space-y-3">
              {fitCheck.goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-[0.85rem] leading-[1.5] text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={300}>
          <GlassCard className="p-6 lg:p-8">
            <p className="mb-5 text-[0.9rem] font-semibold text-red-400">
              This probably isn&apos;t for you if&hellip;
            </p>
            <ul className="space-y-3">
              {fitCheck.notFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/60" />
                  <span className="text-[0.85rem] leading-[1.5] text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/fit-check.tsx
git commit -m "feat(services): add FitCheck component"
```

---

### Task 7: Create ProcessSteps component

**Files:**
- Create: `src/components/services/process-steps.tsx`

- [ ] **Step 1: Create the component**

```typescript
import { processSteps } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ProcessSteps() {
  return (
    <Section bg="muted">
      <div className="text-center">
        <Reveal>
          <Tagline>{processSteps.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-10 font-heading text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            {processSteps.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
        {processSteps.steps.map((step, i) => (
          <Reveal key={step.number} delay={(i + 1) * 100}>
            <GlassCard className="p-6 text-center">
              {/* Numbered circle */}
              <div
                className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: `${step.color}1A`,
                  color: step.color,
                }}
              >
                {step.number}
              </div>
              <h3 className="mb-2 text-[0.95rem] font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-[0.8rem] leading-[1.6] text-[#8B9DB8]">
                {step.description}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/process-steps.tsx
git commit -m "feat(services): add ProcessSteps component"
```

---

### Task 8: Create ServicesFaq component (client component)

**Files:**
- Create: `src/components/services/services-faq.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>Questions</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-10 font-heading text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            Frequently Asked
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.question} delay={(i + 1) * 50}>
              <GlassCard className="overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="pr-4 text-[0.9rem] font-semibold text-foreground">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-indigo-400" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-indigo-400" />
                  )}
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[0.85rem] leading-[1.65] text-[#8B9DB8]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/services-faq.tsx
git commit -m "feat(services): add ServicesFaq accordion component"
```

---

### Task 9: Create ServicesCta component

**Files:**
- Create: `src/components/services/services-cta.tsx`

- [ ] **Step 1: Create the component**

```typescript
import Link from "next/link";
import { servicesCta } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ServicesCta() {
  return (
    <Section bg="muted">
      <Reveal>
        <GlassCard
          variant="highlight"
          className="relative mx-auto max-w-xl overflow-hidden p-10 text-center lg:p-12"
        >
          {/* Subtle glow */}
          <div
            className="pointer-events-none absolute -top-[80px] left-1/2 h-[160px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-[80px]"
            aria-hidden="true"
          />

          <div className="relative">
            <Tagline className="mx-auto">{servicesCta.tagline}</Tagline>

            <h2 className="mb-3 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-3xl">
              {servicesCta.headline}
            </h2>

            <p className="mx-auto mb-8 max-w-[440px] text-[0.95rem] leading-[1.65] text-[#94A3B8]">
              {servicesCta.subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={servicesCta.primaryCta.href}
                className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)]"
              >
                {servicesCta.primaryCta.text}
              </Link>
              <Link
                href={servicesCta.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#334155] px-6 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
              >
                {servicesCta.secondaryCta.text}
              </Link>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/services-cta.tsx
git commit -m "feat(services): add ServicesCta component"
```

---

### Task 10: Rewrite the services page

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Replace the page with the new component composition**

Replace the entire file contents with:

```typescript
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

const sectionBgs: Array<"muted" | "default"> = ["muted", "default", "muted"];

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
          bg={sectionBgs[i]}
        />
      ))}
      <FitCheck />
      <ProcessSteps />
      <ServicesFaq />
      <ServicesCta />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat(services): rewrite page with 8-section Priestley-informed layout"
```

---

### Task 11: Visual verification and polish

**Files:**
- Possibly modify: any component from Tasks 2–9 based on review findings

- [ ] **Step 1: Start dev server and check the page**

Run: `npm run dev`
Open: `http://localhost:3000/services`

Check:
- All 8 sections render without errors
- Alternating backgrounds create visual rhythm (default → muted → default → muted → default → muted → default → muted → default → muted)
- Reveal animations trigger on scroll
- FAQ accordion expands/collapses (one at a time)
- All links work: assessment CTAs → `/assessment`, Calendly CTAs → external calendly.com
- Hash links in problem-solution cards (#angular-audit etc.) scroll to service sections
- Responsive: check 375px, 768px, 1280px

- [ ] **Step 2: Fix any visual issues found**

Common things to check:
- Heading sizes feel balanced across sections
- Spacing between sections is consistent
- GlassCard hover effects work on all cards
- Pill button glow is visible
- Text is readable (contrast with dark backgrounds)

- [ ] **Step 3: Run build to confirm no errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix(services): visual polish and responsive adjustments"
```

(Only if changes were made in Step 2. Skip if everything was clean.)
