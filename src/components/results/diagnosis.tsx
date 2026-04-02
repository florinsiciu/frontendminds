import {
  DIMENSION_ORDER,
  DIMENSION_COLORS,
  isDimensionAtRisk,
} from "@/lib/config/scoring";
import { DIMENSION_MAP } from "@/lib/data/questions";
import {
  diagnosisTemplates,
  compoundRiskIntro,
  compoundRiskStatements,
} from "@/lib/content/results";
import { GlassCard } from "@/components/ui/glass-card";
import type { DimensionId, DimensionPercentages, TierId } from "@/types/assessment";

interface DiagnosisProps {
  tier: TierId;
  dimensionPercentages: DimensionPercentages;
}

function getWeakestDimension(
  dimensionPercentages: DimensionPercentages,
): DimensionId | null {
  let weakest: DimensionId | null = null;
  let lowestPct = Infinity;

  for (const dimId of DIMENSION_ORDER) {
    const pct = dimensionPercentages[dimId];
    if (pct < lowestPct) {
      lowestPct = pct;
      weakest = dimId;
    }
  }

  return weakest;
}

function getAtRiskDimensions(dimensionPercentages: DimensionPercentages): DimensionId[] {
  return DIMENSION_ORDER.filter((dimId) =>
    isDimensionAtRisk(dimensionPercentages[dimId]),
  );
}

function getApplicableCompoundRisks(atRisk: DimensionId[]): string[] {
  if (atRisk.length < 2) return [];

  const risks: string[] = [];

  for (let i = 0; i < atRisk.length; i++) {
    for (let j = i + 1; j < atRisk.length; j++) {
      const key = `${atRisk[i]}+${atRisk[j]}`;
      const reverseKey = `${atRisk[j]}+${atRisk[i]}`;
      const statement =
        compoundRiskStatements[key] ?? compoundRiskStatements[reverseKey];
      if (statement) {
        risks.push(statement);
      }
    }
  }

  return risks;
}

export function Diagnosis({ tier, dimensionPercentages }: DiagnosisProps) {
  const weakest = getWeakestDimension(dimensionPercentages);
  const atRisk = getAtRiskDimensions(dimensionPercentages);
  const compoundRisks = getApplicableCompoundRisks(atRisk);

  return (
    <GlassCard className="p-6 lg:p-8">
      <p className="text-muted-foreground">
        {diagnosisTemplates[tier]}
      </p>

      {/* Weakest dimension highlight with dormant tension */}
      {weakest && dimensionPercentages[weakest] < 100 && (
        <div
          className="mt-4 rounded-lg border border-border bg-background p-4 border-l-[3px]"
          style={{ borderLeftColor: DIMENSION_COLORS[weakest] }}
        >
          <p className="text-sm font-medium text-foreground">
            Biggest gap: {DIMENSION_MAP[weakest].label}
          </p>
          <p className="mt-1 text-sm italic text-accent">
            &ldquo;{DIMENSION_MAP[weakest].dormantTension}&rdquo;
          </p>
        </div>
      )}

      {/* Compound risk statements */}
      {compoundRisks.length > 0 && (
        <div className="mt-4 bg-destructive/[0.04] border border-destructive/10 rounded-xl p-4">
          <p className="text-sm font-medium text-foreground">
            {compoundRiskIntro}
          </p>
          <ul className="mt-2 space-y-2">
            {compoundRisks.map((risk) => (
              <li
                key={risk}
                className="text-sm text-muted-foreground before:mr-2 before:content-['•']"
              >
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}
