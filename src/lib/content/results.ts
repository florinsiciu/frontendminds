import type { DimensionId, TierId } from "@/types/assessment";

// ─── Dimension Display Config ───────────────────────────────────────────────

export interface DimensionDisplay {
  label: string;
  description: string;
  services: string[];
}

export const dimensionDisplay: Record<DimensionId, DimensionDisplay> = {
  migration_health: {
    label: "Migration & Version Health",
    description:
      "How current is your Angular version and how smoothly can you upgrade?",
    services: ["Angular version upgrades", "AngularJS migration"],
  },
  architecture: {
    label: "Codebase Architecture",
    description:
      "Is your codebase structured for scale, maintainability, and team productivity?",
    services: ["NX monorepo adoption", "Architecture reviews"],
  },
  modern_adoption: {
    label: "Modern Angular Adoption",
    description:
      "Are you leveraging standalone components, Signals, and modern patterns?",
    services: [
      "Standalone migration",
      "Signals/RxJS audit",
      "Forms & CVA review",
    ],
  },
  ai_governance: {
    label: "AI & Development Governance",
    description:
      "Does your team have guardrails for AI-assisted development?",
    services: ["AI guardrails setup", "MCP configuration"],
  },
  delivery_readiness: {
    label: "Delivery & Talent Readiness",
    description:
      "Can you hire, ship, and invest in modernization without friction?",
    services: ["Strategy call"],
  },
};

// ─── Tier CTA Cards ─────────────────────────────────────────────────────────

export interface TierCtaCard {
  headline: string;
  body: string;
  buttonLabel: string;
  hint: string;
  ctaType: "calendly" | "download" | "internal-link";
  ctaHref?: string;
}

export const tierCtaCards: Record<TierId, TierCtaCard> = {
  critical_risk: {
    headline: "Your Angular Stack Needs Immediate Attention",
    body: "Your score reveals significant gaps across multiple dimensions. A focused strategy call can help you prioritize the most impactful improvements and build a realistic modernization roadmap.",
    buttonLabel: "Book Your Free Modernization Strategy Call",
    hint: "30-minute call — we'll review your results together and identify your top 3 priorities",
    ctaType: "calendly",
  },
  modernization_ready: {
    headline: "You're Ready to Modernize — Here's Your Roadmap",
    body: "Your foundations are solid. Download the modernization checklist to prioritize the improvements that will deliver the biggest impact for your team.",
    buttonLabel: "Get Your Free Modernization Checklist",
    hint: "Actionable checklist based on your score — delivered instantly",
    ctaType: "download",
    ctaHref: "/resources/modernization-checklist.pdf",
  },
  well_positioned: {
    headline: "Strong Score — Stay Ahead of the Curve",
    body: "Your Angular stack is in great shape. Subscribe to The Frontend Signal for advanced optimization strategies, modern patterns, and AI tooling insights.",
    buttonLabel: "Subscribe to The Frontend Signal",
    hint: "Weekly insights for teams that are already ahead",
    ctaType: "internal-link",
    ctaHref: "/newsletter",
  },
};

// ─── Diagnosis Templates ────────────────────────────────────────────────────

export const diagnosisTemplates: Record<TierId, string> = {
  critical_risk:
    "Your assessment reveals critical gaps that need attention. Teams in this range typically face mounting technical debt, difficulty hiring, and increasing delivery friction.",
  modernization_ready:
    "You've built solid foundations — now it's time to close the remaining gaps. Teams in this range are best positioned to see rapid improvement from targeted modernization efforts.",
  well_positioned:
    "Your Angular stack is well-maintained and modern. Focus on the dimensions where you scored lower to maintain your competitive edge and continue leading in best practices.",
};

// ─── Score Section Labels ───────────────────────────────────────────────────

export const resultsPage = {
  heading: "Angular Modernization Score",
  subtitle:
    "Here's how your Angular application scored across 5 critical dimensions.",
  overallScoreLabel: "Total Score",
  dimensionBreakdownLabel: "Dimension Breakdown",
  diagnosisLabel: "Your Diagnosis",
  nextStepsLabel: "Recommended Next Step",
  retakeText: "Retake the Assessment",
  retakeHref: "/assessment",
} as const;

