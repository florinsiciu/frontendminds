import type {
  ScoredAnswers,
  QualifyingAnswers,
  DimensionId,
  DimensionPercentages,
  TriggeredPattern,
  LeadScore,
  LeadBucket,
  SeesawScript,
  DiagnosticResult,
} from "@/types/assessment";
import { DIAGNOSTIC_PATTERNS } from "@/lib/data/diagnostic-patterns";
import { DIMENSION_MAP } from "@/lib/data/questions";

// ─── Pattern Matching ───────────────────────────────────────────────────────

const PRIORITY_SCORES: Record<string, number> = {
  critical: 3,
  warning: 2,
  insight: 1,
};

const CROSS_DIMENSION_BONUS = 1;

export function matchPatterns(answers: ScoredAnswers): TriggeredPattern[] {
  const triggered: TriggeredPattern[] = [];

  for (const pattern of DIAGNOSTIC_PATTERNS) {
    const allMatch = pattern.triggers.every(
      (trigger) => answers[trigger.questionId] === trigger.expectedAnswer,
    );

    if (allMatch) {
      const score =
        PRIORITY_SCORES[pattern.priority] +
        (pattern.isCrossDimension ? CROSS_DIMENSION_BONUS : 0);

      triggered.push({ pattern, score });
    }
  }

  return triggered;
}

// ─── Ranking & Deduplication ────────────────────────────────────────────────

export function rankPatterns(
  triggered: TriggeredPattern[],
): TriggeredPattern[] {
  return [...triggered].sort((a, b) => b.score - a.score);
}

/**
 * Select top 3 patterns, ensuring at least one cross-dimension pattern
 * if any exist, and deduplicating overlapping triggers.
 *
 * Deduplication: when a less-specific pattern's triggers are a subset of
 * an already-selected more-specific pattern, the less-specific one is skipped.
 */
export function selectTopPatterns(
  ranked: TriggeredPattern[],
): TriggeredPattern[] {
  const selected: TriggeredPattern[] = [];
  const usedQuestionIds = new Set<string>();

  // First pass: try to include a cross-dimension pattern
  const crossDimension = ranked.find((tp) => tp.pattern.isCrossDimension);
  if (crossDimension) {
    selected.push(crossDimension);
    for (const t of crossDimension.pattern.triggers) {
      usedQuestionIds.add(t.questionId);
    }
  }

  // Second pass: fill remaining slots
  for (const tp of ranked) {
    if (selected.length >= 3) break;
    if (selected.some((s) => s.pattern.id === tp.pattern.id)) continue;

    // Skip if this pattern's triggers are a subset of already-selected patterns
    const isSubset = tp.pattern.triggers.every((t) =>
      usedQuestionIds.has(t.questionId),
    );
    if (isSubset && tp.pattern.triggers.length === 1) continue;

    selected.push(tp);
    for (const t of tp.pattern.triggers) {
      usedQuestionIds.add(t.questionId);
    }
  }

  return selected;
}

// ─── Lead Scoring ───────────────────────────────────────────────────────────

const ROLE_MULTIPLIERS: Record<string, number> = {
  cto_vp: 1.5,
  eng_manager: 1.3,
  tech_lead: 1.0,
  senior_dev: 0.8,
  other: 0.7,
};

const STAGE_MULTIPLIERS: Record<string, number> = {
  yes_budget: 2.0,
  yes_building_case: 1.5,
  exploring: 1.0,
  not_yet: 0.5,
};

function getBucket(score: number): LeadBucket {
  if (score >= 15) return "hot";
  if (score >= 7) return "warm";
  return "nurture";
}

export function calculateLeadScore(
  triggered: TriggeredPattern[],
  role: string,
  stage: string,
): LeadScore {
  const patternScore = triggered.reduce((sum, tp) => {
    return sum + PRIORITY_SCORES[tp.pattern.priority];
  }, 0);

  const roleMultiplier = ROLE_MULTIPLIERS[role] ?? 1.0;
  const stageMultiplier = STAGE_MULTIPLIERS[stage] ?? 1.0;

  const score = Math.round(patternScore * roleMultiplier * stageMultiplier);
  return { score, bucket: getBucket(score) };
}

// ─── Seesaw Script ──────────────────────────────────────────────────────────

export function generateSeesawScript(
  dimensionPercentages: DimensionPercentages,
): SeesawScript {
  const entries = Object.entries(dimensionPercentages) as [
    DimensionId,
    number,
  ][];

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const strongMeta = DIMENSION_MAP[strongest[0]];
  const weakMeta = DIMENSION_MAP[weakest[0]];

  return {
    strongestDimension: {
      id: strongest[0],
      label: strongMeta.label,
      percentage: strongest[1],
    },
    weakestDimension: {
      id: weakest[0],
      label: weakMeta.label,
      percentage: weakest[1],
    },
    openingLine: `I noticed your ${strongMeta.label} scored ${strongest[1]}% — that's strong. ${getStrengthComment(strongest[1])}`,
    pivotLine: `But your ${weakMeta.label} is at ${weakest[1]}%. That's a significant gap. What's driving that?`,
  };
}

function getStrengthComment(percentage: number): string {
  if (percentage >= 90)
    return "That puts you ahead of most Angular teams I work with.";
  if (percentage >= 75)
    return "Your team is doing well in this area.";
  return "You've got solid foundations there.";
}

// ─── Main Orchestrator ──────────────────────────────────────────────────────

export function generateDiagnostic(
  answers: ScoredAnswers,
  qualifyingAnswers: QualifyingAnswers,
  dimensionPercentages: DimensionPercentages,
): DiagnosticResult {
  const allTriggered = matchPatterns(answers);
  const ranked = rankPatterns(allTriggered);
  const topPatterns = selectTopPatterns(ranked);
  const leadScore = calculateLeadScore(
    allTriggered,
    qualifyingAnswers.role,
    qualifyingAnswers.planning,
  );
  const seesawScript = generateSeesawScript(dimensionPercentages);

  const hasCriticalOrWarning = allTriggered.some(
    (tp) =>
      tp.pattern.priority === "critical" ||
      tp.pattern.priority === "warning",
  );
  const isStrongPosition = !hasCriticalOrWarning;

  return {
    allTriggered: ranked,
    topPatterns,
    leadScore,
    seesawScript,
    isStrongPosition,
  };
}
