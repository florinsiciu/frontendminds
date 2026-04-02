import type { TierId } from "@/types/assessment";

// ─── Subject & Preheader ────────────────────────────────────────────────────

export function getEmailSubject(tierLabel: string): string {
  return `Your Angular Modernization Score: ${tierLabel}`;
}

export const preheaderByTier: Record<TierId, string> = {
  critical_risk:
    "Your assessment reveals critical gaps — see your full breakdown and next steps.",
  modernization_ready:
    "Solid foundations with clear improvement areas — see your dimension-by-dimension results.",
  well_positioned:
    "Strong score across the board — see where you can fine-tune your advantage.",
};

// ─── Greeting ───────────────────────────────────────────────────────────────

export function getGreeting(firstName: string): string {
  return `Hi ${firstName},`;
}

// ─── Section Headers ────────────────────────────────────────────────────────

export const sectionHeaders = {
  overallScore: "Your Overall Score",
  dimensionBreakdown: "Score by Dimension",
  recommendations: "Your Recommendations",
  diagnosis: "What This Means",
  nextSteps: "Your Next Step",
} as const;

// ─── CTAs ───────────────────────────────────────────────────────────────────

export const emailCta = {
  primaryLabel: "View Your Full Results",
  secondaryLabel: "Book a Free Strategy Session",
  pdfLabel: "Download Your PDF Report",
} as const;

// ─── Footer ─────────────────────────────────────────────────────────────────

export const emailFooter = {
  companyName: "FrontendMinds — Angular Modernization & AI Consulting",
  unsubscribe:
    "You received this email because you completed the Angular Modernization Scorecard on FrontendMinds.",
} as const;
