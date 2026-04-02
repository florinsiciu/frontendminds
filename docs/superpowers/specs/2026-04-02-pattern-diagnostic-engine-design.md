# Pattern Diagnostic Engine + Business Impact Translation

## Context

The Angular Modernization Assessment (22 questions, 5 dimensions, 3 tiers) collects good data but produces generic results. A Tech Lead scoring 46% on Architecture gets the same paragraph as every other 46%. This fails Priestley's Scorecard Marketing principle: results should feel like "you're talking directly to them."

**Primary persona:** The Champion (Tech Lead / Senior Developer) who takes the scorecard, gets a specific diagnosis, and shares it with their CTO to build the internal case for modernization.

**Goal:** Auto-generate personalized diagnostics that serve three purposes:
1. **Assessment Report** — technical depth for the Champion
2. **Executive Summary** — business impact framing the Champion shares with their CTO
3. **Sales Prep Brief** — call playbook for Florin with seesaw script and talk tracks

## Architecture Overview

```
Raw Answers (20 scored + 2 qualifying)
    │
    ▼
Pattern Matcher (20 defined patterns)
    │
    ▼
Pattern Ranker (priority + cross-dimension bonus)
    │
    ├──▶ Top 3 Patterns → Assessment Report (Champion view)
    ├──▶ All Patterns → Sales Prep Brief (Florin view)
    ├──▶ Top 3 Patterns (CTO voice) → Executive Summary (shareable)
    └──▶ Lead Score → Priority bucket (hot/warm/nurture)
```

## Pattern Catalog (20 Patterns)

### Within-Dimension Patterns

#### Migration & Version Health (q1-q4)

| # | Name | Trigger | Priority |
|---|---|---|---|
| 1 | Legacy Trapped | q1=no AND q2=no | Critical |
| 2 | Upgrade Fragility | q1=yes AND q4=no | Warning |
| 3 | AngularJS Debt | q2=no | Critical |
| 4 | Dependency Rot | q3=no AND q4=no | Warning |

#### Codebase Architecture (q5-q8)

| # | Name | Trigger | Priority |
|---|---|---|---|
| 5 | Monolith Trap | q5=no AND q8=no | Critical |
| 6 | Paper Standards | q6=yes AND q7=no | Insight |
| 7 | Boundaries Without Independence | q5=yes AND q8=no | Warning |

#### Modern Angular Adoption (q9-q12)

| # | Name | Trigger | Priority |
|---|---|---|---|
| 8 | Piecemeal Modernization | q9=yes AND q10=no | Warning |
| 9 | Refactoring Paralysis | q12=no | Warning |
| 10 | Legacy Lock | q9=no AND q12=no | Critical |

#### AI & Development Governance (q13-q16)

| # | Name | Trigger | Priority |
|---|---|---|---|
| 11 | AI Wild West | q14=no | Warning |
| 12 | AI Guidelines Without Teeth | q13=yes AND q15=no | Insight |

#### Delivery & Talent Readiness (q17-q20)

| # | Name | Trigger | Priority |
|---|---|---|---|
| 13 | Talent & Leadership Gap | q17=no AND q20=no | Critical |
| 14 | Delivery Gridlock | q18=no AND q19=no | Critical |
| 15 | Invisible Tech Debt | q19=no AND q20=no | Warning |

**Note on pattern overlap:** Pattern #3 (AngularJS Debt, q2=no) is a subset of Pattern #1 (Legacy Trapped, q1=no AND q2=no). When both trigger, the ranker should select #1 (more specific) and suppress #3. Similarly, Pattern #9 (Refactoring Paralysis, q12=no) overlaps with #10 (Legacy Lock, q9=no AND q12=no) and #19 (Change Anxiety, q12=no AND q18=no). The deduplication rule in Step 2 handles this: when patterns share a trigger question, keep the higher-priority or more-specific pattern.

### Cross-Dimension Patterns

| # | Name | Trigger | Priority |
|---|---|---|---|
| 16 | Foundational Instability | q4=no AND q18=no | Critical |
| 17 | Untestable Monolith | q8=no AND q12=no | Critical |
| 18 | AngularJS Anchor | q2=no AND q19=no | Critical |
| 19 | Change Anxiety | q12=no AND q18=no | Critical |
| 20 | Modernization Hiring Paradox | q17=no AND q9=no | Warning |

### Pattern Data Shape

Each pattern stores:

```typescript
interface DiagnosticPattern {
  id: string;                    // e.g., "change_anxiety"
  name: string;                  // e.g., "Change Anxiety"
  trigger: PatternTrigger[];     // array of {questionId, expectedAnswer}
  priority: 'critical' | 'warning' | 'insight';
  isCrossDimension: boolean;
  championSummary: string;       // Technical voice for Tech Lead
  ctoSummary: string;            // Business impact voice for CTO
  salesTalkTrack: string;        // Florin's call script (ends with open question)
  recommendedAction: string;     // Actionable next step
}
```

## Diagnostic Generation Algorithm

### Step 1: Pattern Matching

Run all 20 triggers against scored answers. Typical respondent triggers 3-7 patterns.

### Step 2: Prioritization

```
Score each triggered pattern:
  Critical        = 3 points
  Warning         = 2 points
  Insight         = 1 point
  Cross-dimension = +1 bonus

Sort descending. Select top 3 for Key Findings:
  - At least 1 cross-dimension pattern if any triggered
  - Deduplicate: if a question appears in multiple selected patterns, keep higher priority
  - If all triggered patterns are insights only → "Strong Position" variant:
    heading "Your Angular Stack Is in Strong Shape", body acknowledges their
    discipline, highlights the 1-2 insight-level refinements, CTA shifts to
    newsletter/community rather than sales call
```

### Step 3: Lead Priority Score

```
Pattern Score = critical_count * 3 + warning_count * 2 + insight_count * 1

Role Multiplier:
  cto_vp         = 1.5
  eng_manager     = 1.3
  tech_lead       = 1.0
  senior_dev      = 0.8

Stage Multiplier:
  yes_budget          = 2.0
  yes_building_case   = 1.5
  exploring           = 1.0
  not_yet             = 0.5

Lead Score = Pattern Score * Role Multiplier * Stage Multiplier

Buckets:
  Hot     (>= 15): Immediate follow-up
  Warm    (7-14):  Follow up within 48h
  Nurture (< 7):   Email sequence
```

## Output 1: Enhanced Results Page (Champion View)

Existing results page sections remain unchanged. New "Key Findings" section inserted between dimension breakdown and tier recommendations.

### Key Findings Section

Displays top 3 detected patterns, each as a card:
- Priority badge (Critical / Warning / Insight with color)
- Pattern name as heading
- Champion summary (2-3 sentences, technical, empathetic)
- Recommended action (1-2 sentences)

Below the cards: "Share these findings with your team" button → triggers Executive Summary generation.

### Pattern-Aware CTAs

Replace static tier-based CTAs:

| Condition | CTA |
|---|---|
| 2+ critical patterns | "Your assessment flagged critical risks. Book a 30-minute strategy call to review your findings and identify immediate priorities." |
| 1 critical + warnings | "Your codebase has clear improvement areas. Book a free architecture review to discuss your modernization roadmap." |
| Warnings + insights only | "You're well-positioned to level up. Download our modernization checklist based on your specific findings." |
| Mostly insights | "Strong foundations. Join our newsletter for advanced Angular modernization insights." |

## Output 2: Executive Summary (Shareable CTO View)

Generated when Champion clicks "Share with Your Team." Presented as a clean, unique shareable URL (public page, noindex). PDF export is a stretch goal — the shareable URL is the v1 deliverable.

Content:
- **Health Grade** (A-F letter grade instead of raw percentage)
- **Top 3 Business Risks** (CTO voice versions of the Champion's key findings)
- **Delivery Impact Statement** (one paragraph connecting patterns to shipping velocity, cost, and talent implications)
- **Recommended Next Steps** (2-3 actionable items)
- **Subtle CTA**: "Want expert guidance? Book a call with the assessment team"

No Angular jargon. Framed entirely in business outcomes.

## Output 3: Sales Prep Brief (Florin View)

Per-lead card in an admin dashboard or email notification for hot leads.

Content:
1. **Lead header** — name, role, stage, score, tier, date, priority bucket
2. **Seesaw script** — auto-generated from highest and lowest dimension scores:
   - Open with strength: reference their best dimension
   - Pivot to gap: reference their weakest dimension + ask what's causing it
3. **All detected patterns** — each with a talk track ending in an open question
4. **Qualifying intel summary** — connects role + stage + patterns into an approach recommendation (e.g., "Tech Lead building business case → help them build internal case, position as external expert validation")
5. **Raw answers** — compact grid for on-call reference

## Data Model Changes

### New: `diagnostic_patterns` table (or inline data file)

Stores the 20 pattern definitions. Can be a static TypeScript data file since patterns don't change frequently.

### Enhanced: `assessments` table

Add columns:
- `triggered_patterns`: JSON array of pattern IDs with their priority
- `top_patterns`: JSON array of the top 3 selected patterns
- `lead_score`: numeric
- `lead_bucket`: enum (hot/warm/nurture)
- `seesaw_script`: JSON with highest/lowest dimension data

### New: `executive_summaries` table

- `assessment_id`: FK
- `share_token`: unique URL token
- `content`: generated summary JSON
- `created_at`: timestamp

## Files to Modify

**Pattern definitions (new):**
- `src/lib/data/diagnostic-patterns.ts` — pattern catalog with all 20 patterns and their 3 output texts

**Diagnostic engine (new):**
- `src/lib/quiz/diagnostic-engine.ts` — pattern matching, ranking, lead scoring, output generation

**Results page (modify):**
- Results page component — add Key Findings section, pattern-aware CTAs, share button

**Executive summary (new):**
- Shareable page/route for CTO view
- PDF generation (stretch goal, not v1)

**Admin/sales prep (new):**
- Admin dashboard page showing leads with sales prep briefs
- Optional: email notification for hot leads

**Database (modify):**
- Migration to add columns to assessments table
- New executive_summaries table

## Verification Plan

1. **Unit tests** — diagnostic engine: test each pattern trigger, ranking algorithm, lead scoring formula with known answer sets
2. **Integration test** — complete flow: submit answers → verify triggered patterns → verify results page shows correct key findings
3. **Manual QA scenarios:**
   - All-yes answers (should trigger few/no patterns, "Strong Position" variant)
   - All-no answers (should trigger maximum patterns, multiple critical)
   - Mixed answers designed to trigger specific cross-dimension patterns
   - Verify seesaw script correctly identifies highest/lowest dimensions
   - Verify executive summary contains no Angular jargon
   - Verify lead scoring produces correct buckets for different role/stage combos
4. **Browser test** — results page renders key findings cards correctly, share button generates accessible summary
