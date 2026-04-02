import {
  Document,
  Page,
  View,
  Text,
  Svg,
  Rect,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DimensionPercentages, TierId } from "@/types/assessment";
import { DIMENSION_ORDER, DIMENSION_COLORS, getDimensionTier } from "@/lib/config/scoring";
import { TIER_MAP } from "@/lib/config/scoring";
import { dimensionDisplay } from "@/lib/content/results";
import { dimensionRecommendations } from "@/lib/content/dimension-recommendations";
import { tierCtaCards } from "@/lib/content/results";
import { siteConfig } from "@/lib/config/site";

// ─── Styles ──────────────────────────────────────────────────────────────────

const colors = {
  background: "#0F172A",
  card: "#1E293B",
  foreground: "#F1F5F9",
  muted: "#94A3B8",
  subtle: "#64748B",
  accent: "#818CF8",
  border: "#334155",
  destructive: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 48,
    fontFamily: "Helvetica",
  },
  // Cover page
  coverCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: colors.accent,
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 48,
  },
  coverName: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 4,
  },
  coverDate: {
    fontSize: 11,
    color: colors.subtle,
    marginBottom: 32,
  },
  scoreValue: {
    fontSize: 64,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
  },
  scorePercent: {
    fontSize: 24,
    color: colors.muted,
    marginLeft: 4,
  },
  tierBadge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  tierDiagnosis: {
    marginTop: 16,
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 400,
  },
  // Section headers
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
    marginBottom: 20,
  },
  // Dimension bars
  dimRow: {
    marginBottom: 16,
  },
  dimHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  dimLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
  },
  dimPct: {
    fontSize: 11,
    color: colors.muted,
  },
  // Recommendations
  recCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  recDimRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  recDimName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
  },
  recHeadline: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
    marginBottom: 4,
  },
  recSummary: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  recActionItem: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 1.5,
    marginBottom: 3,
    paddingLeft: 12,
  },
  // Next steps
  nextStepsCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  nextStepsHeadline: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: colors.foreground,
    marginBottom: 8,
    textAlign: "center",
  },
  nextStepsBody: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 16,
    maxWidth: 400,
  },
  nextStepsLink: {
    fontSize: 11,
    color: colors.accent,
    textDecoration: "underline",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: colors.subtle,
  },
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function tierBadgeColor(tier: TierId) {
  switch (tier) {
    case "critical_risk":
      return { backgroundColor: "#7F1D1D", color: colors.destructive };
    case "modernization_ready":
      return { backgroundColor: "#78350F", color: colors.warning };
    case "well_positioned":
      return { backgroundColor: "#064E3B", color: colors.success };
  }
}

function scoreColor(pct: number): string {
  if (pct <= 40) return colors.destructive;
  if (pct <= 74) return colors.warning;
  return colors.success;
}

// ─── Document ──────────────────────────────────────────────────────────────

interface ReportDocumentProps {
  firstName: string;
  completedAt: string;
  totalPercentage: number;
  dimensionPercentages: DimensionPercentages;
  tier: TierId;
}

export function ReportDocument({
  firstName,
  completedAt,
  totalPercentage,
  dimensionPercentages,
  tier,
}: ReportDocumentProps) {
  const tierDef = TIER_MAP[tier];
  const badgeColor = tierBadgeColor(tier);
  const dateStr = new Date(completedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document title={`Angular Modernization Report — ${firstName}`} author={siteConfig.name}>
      {/* Page 1 — Cover */}
      <Page size="A4" style={s.page}>
        <View style={s.coverCenter}>
          <Text style={s.brand}>{siteConfig.name}</Text>
          <Text style={s.coverSubtitle}>Angular Modernization Assessment</Text>

          <Text style={s.coverName}>{firstName}</Text>
          <Text style={s.coverDate}>{dateStr}</Text>

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={s.scoreValue}>{totalPercentage}</Text>
            <Text style={s.scorePercent}>%</Text>
          </View>

          <View style={[s.tierBadge, badgeColor]}>
            <Text>{tierDef.label}</Text>
          </View>

          <Text style={s.tierDiagnosis}>{tierDef.shortDiagnosis}</Text>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>{siteConfig.name}</Text>
          <Text style={s.footerText}>Page 1</Text>
        </View>
      </Page>

      {/* Page 2 — Dimension Breakdown */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Dimension Breakdown</Text>

        {DIMENSION_ORDER.map((dimId) => {
          const pct = dimensionPercentages[dimId];
          const display = dimensionDisplay[dimId];
          const barWidth = Math.max(pct, 2); // minimum visible width

          return (
            <View key={dimId} style={s.dimRow}>
              <View style={s.dimHeader}>
                <Text style={s.dimLabel}>{display.label}</Text>
                <Text style={[s.dimPct, { color: scoreColor(pct) }]}>
                  {pct}%
                </Text>
              </View>
              <Svg width="500" height="10">
                <Rect x="0" y="0" width="500" height="10" rx="5" fill={colors.border} />
                <Rect
                  x="0"
                  y="0"
                  width={String(barWidth * 5)}
                  height="10"
                  rx="5"
                  fill={DIMENSION_COLORS[dimId]}
                />
              </Svg>
            </View>
          );
        })}

        <View style={s.footer}>
          <Text style={s.footerText}>{siteConfig.name}</Text>
          <Text style={s.footerText}>Page 2</Text>
        </View>
      </Page>

      {/* Pages 3-4 — Per-Dimension Recommendations */}
      <Page size="A4" style={s.page} wrap>
        <Text style={s.sectionTitle}>Your Recommendations</Text>

        {DIMENSION_ORDER.map((dimId) => {
          const pct = dimensionPercentages[dimId];
          const dimTier = getDimensionTier(pct);
          const display = dimensionDisplay[dimId];
          const rec = dimensionRecommendations[dimId][dimTier];

          return (
            <View key={dimId} style={s.recCard} wrap={false}>
              <View style={s.recDimRow}>
                <View style={[s.recDot, { backgroundColor: DIMENSION_COLORS[dimId] }]} />
                <Text style={s.recDimName}>
                  {display.label} — {pct}%
                </Text>
              </View>
              <Text style={s.recHeadline}>{rec.headline}</Text>
              <Text style={s.recSummary}>{rec.summary}</Text>
              {rec.actionItems.map((item, i) => (
                <Text key={i} style={s.recActionItem}>
                  {"\u2022"} {item}
                </Text>
              ))}
            </View>
          );
        })}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>{siteConfig.name}</Text>
          <Text style={s.footerText} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </View>
      </Page>

      {/* Final page — Next Steps */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Recommended Next Step</Text>

        <View style={s.nextStepsCard}>
          <Text style={s.nextStepsHeadline}>
            {tierCtaCards[tier].headline}
          </Text>
          <Text style={s.nextStepsBody}>
            {tierCtaCards[tier].body}
          </Text>
          <Text style={s.nextStepsLink}>
            {siteConfig.calendly.buildUrl("pdf-report")}
          </Text>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>{siteConfig.name}</Text>
          <Text style={s.footerText} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </View>
      </Page>
    </Document>
  );
}
