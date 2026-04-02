import "server-only";

import type {
  DimensionId,
  DimensionPercentages,
  ScoredAnswers,
  ScoringResult,
} from "@/types/assessment";
import {
  SCORED_QUESTIONS,
  getMaxDimensionWeight,
  getMaxTotalWeight,
} from "@/lib/data/questions";
import { getTierFromPercentage } from "@/lib/config/scoring";

/**
 * Computes weighted dimension percentages, total percentage, and tier
 * from 20 yes/no answers. Server-only — never shipped to the client bundle.
 *
 * Each question has a weight (1–5). The percentage is the ratio of
 * earned weight to max possible weight, per dimension and overall.
 */
export function scoreAssessment(answers: ScoredAnswers): ScoringResult {
  const dimensionWeights: Record<DimensionId, number> = {
    migration_health: 0,
    architecture: 0,
    modern_adoption: 0,
    ai_governance: 0,
    delivery_readiness: 0,
  };

  for (const question of SCORED_QUESTIONS) {
    if (answers[question.id] === true) {
      dimensionWeights[question.dimensionId as DimensionId] += question.weight;
    }
  }

  const dimensionPercentages: DimensionPercentages = {
    migration_health: Math.round(
      (dimensionWeights.migration_health /
        getMaxDimensionWeight("migration_health")) *
        100,
    ),
    architecture: Math.round(
      (dimensionWeights.architecture /
        getMaxDimensionWeight("architecture")) *
        100,
    ),
    modern_adoption: Math.round(
      (dimensionWeights.modern_adoption /
        getMaxDimensionWeight("modern_adoption")) *
        100,
    ),
    ai_governance: Math.round(
      (dimensionWeights.ai_governance /
        getMaxDimensionWeight("ai_governance")) *
        100,
    ),
    delivery_readiness: Math.round(
      (dimensionWeights.delivery_readiness /
        getMaxDimensionWeight("delivery_readiness")) *
        100,
    ),
  };

  const totalEarned = Object.values(dimensionWeights).reduce(
    (sum, w) => sum + w,
    0,
  );
  const totalPercentage = Math.round((totalEarned / getMaxTotalWeight()) * 100);

  return {
    totalPercentage,
    dimensionPercentages,
    tier: getTierFromPercentage(totalPercentage),
  };
}
