# Results Page: Full Priestley Scorecard Alignment

## Context

The Angular Modernization Assessment results page currently shows an overall score, dimension bars, tier-specific diagnosis, and a CTA. However, Daniel Priestley's Scorecard Marketing methodology prescribes richer personalization: **per-dimension dynamic recommendations**, **a branded PDF report**, and **enhanced email delivery with recommendations**. This spec addresses those gaps.

Social proof (tier-matched testimonials) is intentionally deferred — the project is early-stage with no testimonial content yet.

## Scope

Three enhancements:

1. **Per-dimension dynamic recommendations** on the results page
2. **Branded PDF report** generated on-demand via API route
3. **Enhanced results email** with recommendation headlines + PDF download link

## 1. Per-Dimension Dynamic Recommendations

### Content Model

New file: `src/lib/content/dimension-recommendations.ts`

```typescript
type DimensionTier = "low" | "medium" | "high";

interface DimensionRecommendation {
  headline: string;       // e.g., "Your migration health needs urgent attention"
  summary: string;        // 2-3 sentence assessment
  actionItems: string[];  // 2-3 specific next steps
}

// 5 dimensions x 3 tiers = 15 entries
type AllRecommendations = Record<DimensionId, Record<DimensionTier, DimensionRecommendation>>;
```

Tier boundaries reuse existing thresholds from `src/lib/config/scoring.ts`:
- **low**: 0-40% (maps to `critical_risk`)
- **medium**: 41-74% (maps to `modernization_ready`)
- **high**: 75-100% (maps to `well_positioned`)

### Type Addition

Add to `src/types/assessment.ts`:
```typescript
export type DimensionTier = "low" | "medium" | "high";
```

### Helper Function

Add to `src/lib/config/scoring.ts`:
```typescript
export function getDimensionTier(percentage: number): DimensionTier {
  if (percentage <= 40) return "low";
  if (percentage <= 74) return "medium";
  return "high";
}
```

### Component

New file: `src/components/results/dimension-recommendations.tsx`

Server Component that:
1. Iterates `DIMENSION_ORDER` from `src/lib/config/scoring.ts`
2. Calls `getDimensionTier(dimensionPercentages[dimId])` per dimension
3. Looks up recommendation from content config
4. Renders a card per dimension with:
   - Dimension label + color-coded score badge (reuses `getDimensionScoreColor`)
   - Headline + summary paragraph
   - Action items as a checklist
5. Uses existing `GlassCard`, `Badge`, `Reveal` patterns

### Page Integration

Add as Section 3 in `src/app/assessment/results/page.tsx`:

```
Section 1: Score Overview (existing)
Section 2: Diagnosis (existing)
Section 3: Recommendations (NEW)
Section 4: CTA (existing, enhanced with PDF download)
```

Add `sectionTaglines.recommendations` to `src/lib/content/results.ts`.

### Files

| File | Action |
|------|--------|
| `src/types/assessment.ts` | Add `DimensionTier` type |
| `src/lib/config/scoring.ts` | Add `getDimensionTier()` helper |
| `src/lib/content/dimension-recommendations.ts` | **Create** — 15 recommendation entries |
| `src/components/results/dimension-recommendations.tsx` | **Create** — Server Component |
| `src/app/assessment/results/page.tsx` | Add Section 3 |
| `src/lib/content/results.ts` | Add `sectionTaglines.recommendations` |

---

## 2. Branded PDF Report

### Approach

`@react-pdf/renderer` — React components rendered to PDF server-side. No headless browser needed. Same mental model as the existing React Email setup. On-demand generation via API route (no storage).

### PDF Structure (3-4 pages)

**Page 1 — Cover:**
- FrontendMinds logo/branding
- User's first name + assessment date
- Overall score percentage + tier badge
- Tier short diagnosis text

**Page 2 — Dimension Breakdown:**
- 5 dimension bars drawn with SVG rectangles
- Each bar shows: dimension label, percentage, tier label
- Color-coded using `DIMENSION_COLORS` from `src/lib/config/scoring.ts`

**Pages 3-4 — Per-Dimension Recommendations:**
- Same content from `dimension-recommendations.ts`
- Each dimension gets: headline, summary, action items
- Grouped by dimension, styled for readability

**Final Section — Next Steps:**
- Tier-specific CTA text from `tierCtaCards` in `src/lib/content/results.ts`
- Calendly booking link
- Contact info

### API Route

New file: `src/app/api/assessment/report/[id]/route.ts`

```typescript
// GET /api/assessment/report/[id]
// 1. Validate id param
// 2. Fetch assessment + lead (join for firstName) from Supabase
// 3. Render PDF via @react-pdf/renderer renderToBuffer
// 4. Return Response with Content-Type: application/pdf
//    Content-Disposition: attachment; filename="angular-modernization-report.pdf"
```

The Supabase query joins `assessments` with `leads` to get the user's `first_name`:
```sql
select a.id, a.total_percentage, a.dimension_percentages, a.tier, a.completed_at,
       l.first_name
from assessments a
join leads l on a.lead_id = l.id
where a.id = $1
```

### Download Button

New client component: `src/components/results/download-report.tsx`

- Renders a "Download Your Full Report" button
- Links to `/api/assessment/report/${assessmentId}`
- Tracks `PDF_DOWNLOADED` event via PostHog

Integrated into the CTA section. The `assessmentId` needs to be passed from the results page to the CTA components.

### Files

| File | Action |
|------|--------|
| `src/lib/pdf/report-document.tsx` | **Create** — React PDF document component (~200 lines) |
| `src/app/api/assessment/report/[id]/route.ts` | **Create** — API route handler (~50 lines) |
| `src/components/results/download-report.tsx` | **Create** — Client component for download button |
| `src/app/assessment/results/page.tsx` | Pass `assessmentId` to CTA section |
| `src/lib/content/results.ts` | Add PDF-related copy |
| `src/lib/config/analytics.ts` | Add `PDF_DOWNLOADED` event (if analytics config exists) |

### Dependency

```
pnpm add @react-pdf/renderer
```

Note: Verify React 19 / Next.js compatibility before installing. If peer dependency conflict, check `@react-pdf/renderer@canary` or use `--legacy-peer-deps`.

---

## 3. Enhanced Results Email

### Changes to `src/lib/email.tsx`

1. **Add recommendation headlines section** after the dimension breakdown:
   - For each dimension, show the headline from the matching recommendation tier
   - Keep it scannable — just headlines, not full action items
   - Drives recipients back to the results page for full details

2. **Add PDF download CTA** as a third button in the next steps section:
   - "Download Your PDF Report"
   - Links to `/api/assessment/report/${resultId}`

### Files

| File | Action |
|------|--------|
| `src/lib/email.tsx` | Add recommendations section + PDF CTA |
| `src/lib/content/email.ts` | Add recommendation section header text |

---

## Enhanced Results Page Layout (Final)

```
Section 1: Score Overview
  - Tagline: "Your Results"
  - Overall percentage + tier badge
  - 5 dimension bars

Section 2: Diagnosis
  - Tagline: "Your Diagnosis"
  - Tier-specific copy
  - Weakest dimension highlight
  - Compound risk statements (if applicable)

Section 3: Recommendations (NEW)
  - Tagline: "Your Recommendations" (or similar)
  - 5 dimension cards, each with:
    - Dimension name + score badge
    - Headline + summary
    - 2-3 action items

Section 4: CTA (enhanced)
  - Tagline: "Recommended Next Step"
  - Tier-specific CTA card (existing)
  - PDF download button (NEW)
  - Retake assessment link (existing)
```

---

## Implementation Phases

```
Phase 1: Content & types (no UI changes)
  - DimensionTier type
  - getDimensionTier() helper
  - dimension-recommendations.ts content file

Phase 2: Results page recommendations
  - DimensionRecommendations component
  - Add Section 3 to results page

Phase 3: PDF report
  - Install @react-pdf/renderer
  - Report document component
  - API route handler
  - Download button component
  - Wire into results page CTA section

Phase 4: Enhanced email
  - Add recommendation headlines to email
  - Add PDF download CTA to email
```

Phases 1+2 can ship together. Phase 3 is a separate unit (new dependency). Phase 4 depends on Phases 1+3.

---

## Verification

1. **Per-dimension recommendations**: Complete assessment with varied scores (use different answers to get low/medium/high across dimensions). Verify each dimension shows the correct tier-specific headline, summary, and action items.

2. **PDF report**: Hit `/api/assessment/report/[id]` with a valid assessment ID. Verify:
   - PDF downloads with correct filename
   - Cover page shows correct name, date, score, tier
   - Dimension bars render with correct colors and percentages
   - Recommendations match what the results page shows
   - Next steps CTA matches the user's tier

3. **Download button**: Click "Download Your Full Report" on results page. Verify PDF downloads. Check PostHog for `PDF_DOWNLOADED` event.

4. **Enhanced email**: Trigger a new assessment submission. Check the received email for:
   - Recommendation headlines per dimension (after dimension bars)
   - PDF download button links to correct URL
   - All links work

5. **Edge cases**:
   - Assessment with all dimensions at 0% (all low)
   - Assessment with all dimensions at 100% (all high)
   - Assessment with mixed tiers across dimensions
   - Invalid/missing assessment ID on PDF route returns appropriate error

---

## Key Existing Utilities to Reuse

- `getDimensionScoreColor(percentage)` — `src/lib/config/scoring.ts:54`
- `DIMENSION_ORDER` — `src/lib/config/scoring.ts:79`
- `DIMENSION_COLORS` — `src/lib/config/scoring.ts:89`
- `dimensionDisplay` — `src/lib/content/results.ts:11` (labels, descriptions, services)
- `TIER_MAP` — `src/lib/config/scoring.ts:37`
- `diagnosisTemplates` — `src/lib/content/results.ts:87`
- `tierCtaCards` — `src/lib/content/results.ts:59`
- `GlassCard`, `Badge`, `Reveal`, `Section`, `Tagline` — existing UI components
- `siteConfig` — `src/lib/config/site.ts` (baseUrl, calendly, branding)
