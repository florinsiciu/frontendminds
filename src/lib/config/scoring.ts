import type { DimensionId, DimensionTier, TierDefinition, TierId } from "@/types/assessment";

// ─── Tier Definitions (percentage-based, Priestley-aligned) ─────────────────

export const TIERS: readonly TierDefinition[] = [
  {
    id: "critical_risk",
    label: "Critical Risk",
    scoreRange: { min: 0, max: 40 },
    shortDiagnosis:
      "Significant gaps across multiple areas — your Angular stack is actively holding you back.",
    ctaLabel: "Book Your Free Modernization Strategy Call",
    ctaHint: "Get a concrete action plan to address your most urgent gaps",
  },
  {
    id: "modernization_ready",
    label: "Modernization Ready",
    scoreRange: { min: 41, max: 74 },
    shortDiagnosis:
      "Solid foundations with clear improvement areas — you're well-positioned to modernize effectively.",
    ctaLabel: "Book Your Free Strategy Session",
    ctaHint:
      "Turn your strengths into a competitive advantage with a focused roadmap",
  },
  {
    id: "well_positioned",
    label: "Well-Positioned",
    scoreRange: { min: 75, max: 100 },
    shortDiagnosis:
      "Strong across the board — a few targeted optimizations could set you apart.",
    ctaLabel: "Book a Quick Architecture Review",
    ctaHint:
      "Fine-tune what's already working and identify your next competitive edge",
  },
] as const;

export const TIER_MAP: Record<TierId, TierDefinition> = Object.fromEntries(
  TIERS.map((t) => [t.id, t]),
) as Record<TierId, TierDefinition>;

// ─── Dimension Risk Thresholds ──────────────────────────────────────────────

/** A dimension is "at risk" when its percentage falls in the Critical Risk tier */
export const DIMENSION_RISK_THRESHOLD = 40;

export function isDimensionAtRisk(percentage: number): boolean {
  return percentage <= DIMENSION_RISK_THRESHOLD;
}

// ─── Score-to-Color Mapping ─────────────────────────────────────────────────

export type ScoreColor = "destructive" | "warning" | "secondary";

export function getDimensionScoreColor(percentage: number): ScoreColor {
  if (percentage <= 40) return "destructive";
  if (percentage <= 74) return "warning";
  return "secondary";
}

export function getTierFromPercentage(percentage: number): TierId {
  for (const tier of TIERS) {
    if (
      percentage >= tier.scoreRange.min &&
      percentage <= tier.scoreRange.max
    ) {
      return tier.id;
    }
  }
  return "critical_risk";
}

// ─── Dimension Label (3-tier, matches overall tiers) ────────────────────────

export function getDimensionTier(percentage: number): DimensionTier {
  if (percentage <= 40) return "low";
  if (percentage <= 74) return "medium";
  return "high";
}

export function getDimensionLabel(percentage: number): string {
  const tier = getTierFromPercentage(percentage);
  return TIER_MAP[tier].label;
}

export const DIMENSION_ORDER: readonly DimensionId[] = [
  "migration_health",
  "architecture",
  "modern_adoption",
  "ai_governance",
  "delivery_readiness",
] as const;

// ─── Dimension Colors ──────────────────────────────────────────────────────

export const DIMENSION_COLORS: Record<DimensionId, string> = {
  migration_health: "#93C5FD",
  architecture: "#5EEAD4",
  modern_adoption: "#FBBF24",
  ai_governance: "#C4B5FD",
  delivery_readiness: "#F87171",
};
