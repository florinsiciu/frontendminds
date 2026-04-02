# Angular Assessment Redesign — Progressive Risk Reveal

## Context

The current assessment (18 questions, 3 categories: Audit/Upgrade/Modernization) is functional but generic. It doesn't leverage the deep market research from the personal-brand strategy, and the questions don't create the "further behind than they think" aha moment that Daniel Priestley's ScoreApp methodology requires.

**Goal:** Redesign the assessment into a world-class diagnostic that:
- Makes engineering managers/tech leads realize their Angular project has compounding problems across multiple dimensions
- Segments prospects into risk-based tiers that create urgency
- Provides personalized, specific diagnoses based on answer combinations
- Builds progressive tension through category-by-category risk reveals
- Aligns every question with services Florin can deliver (version upgrades, AngularJS rewrites, Nx setup, Signals modernization)

## Design Decisions (All Approved)

- **Target:** Engineering Managers / Tech Leads (champion buyers)
- **Length:** 16 scored + 2 qualifying questions (~3 minutes)
- **Categories:** 3 merged categories (Infrastructure Health, Code Modernization, Team & Delivery Impact)
- **Tiers:** Risk-based (Critical Risk / Moderate Risk / Low Risk)
- **Flow:** Progressive Risk Reveal — mini risk verdicts between each category section
- **Scoring:** 80 points max, personalized diagnosis engine based on answer combinations

---

## Implementation Plan

### Step 1: Rewrite `src/data/scorecard.ts` — Questions, Scoring & Diagnosis Engine

**What changes:**
- Replace `ScorecardCategory` type: `'audit' | 'upgrade' | 'modernization'` → `'infrastructure' | 'modernization' | 'delivery'`
- Replace all 15 scored questions with 16 new questions (6 + 5 + 5)
- Replace 3 qualifying questions with 2 qualifying questions
- Update `categoryMeta` with new labels and descriptions
- Update `scorecardTiers` with risk-based naming and thresholds
- Rewrite `computeCategoryScores()` for new max scores (30/25/25 instead of 25/25/25)
- Rewrite `generateDiagnosis()` into answer-combination-aware diagnosis engine
- Add new `generateCompoundRiskStatement()` function
- Add new `generateCategoryVerdict()` function for inter-section mini-reveals
- Update `getTierCta()` for new tier IDs and CTAs
- Update `STORAGE_KEY` to `'angular_scorecard_v2'` (fresh state for redesign)

**New Questions:**

#### Category 1: Infrastructure Health (6 questions, 30 max)

| ID | Prompt | Options (5→1 pts) |
|----|--------|-------------------|
| infra_1 | What Angular version is your primary application running? | v18+ (latest) · v16-17 · v14-15 · v10-13 · v9 or below / AngularJS |
| infra_2 | Do you still have AngularJS (v1.x) code running in production? | No AngularJS anywhere · Small utilities only · Some apps, actively migrating · Major AngularJS apps active · Most frontend is still AngularJS |
| infra_3 | How is your codebase organized? | Nx monorepo with shared libraries · Monorepo (non-Nx) with sharing · Multiple repos, manual coordination · Single large monolith SPA · Scattered repos with duplicated code |
| infra_4 | How would you describe your build and CI/CD pipeline? | Fast, reliable, automated deployment · Mostly automated, occasional issues · Builds work but slow (10+ min) · Fragile, frequent failures · Manual or no pipeline |
| infra_5 | How current are your third-party dependencies? | Regularly updated (quarterly+) · Updated 1-2x/year · Some outdated, nothing critical · Significantly outdated · Locked to old versions, afraid to update |
| infra_6 | When was the last time someone reviewed your architecture holistically? | Within 6 months · 6-12 months ago · 1-2 years ago · Over 2 years ago · Never / not sure |

#### Category 2: Code Modernization (5 questions, 25 max)

| ID | Prompt | Options (5→1 pts) |
|----|--------|-------------------|
| mod_1 | How far along is your migration to standalone components? | Fully standalone, no NgModules · Mostly standalone, few modules left · Started, mixed codebase · Still entirely NgModule-based · Not aware of standalone components |
| mod_2 | How does your application handle reactive state? | Signals for UI, RxJS for async only · Started adopting Signals alongside RxJS · RxJS everywhere with proper subscriptions · Heavy RxJS, subscription leaks known · Mostly imperative, minimal reactive patterns |
| mod_3 | How would you describe your forms architecture? | Typed reactive forms with reusable patterns · Reactive forms, some shared components · Mix of reactive and template-driven · Mostly template-driven or inconsistent · Forms are a constant source of bugs |
| mod_4 | Do you have a shared component library or design system? | Mature design system, documented · Library used across apps · Some shared, not organized · Per-app components, lots of duplication · No shared components |
| mod_5 | What does your testing strategy look like? | Comprehensive unit + e2e, high confidence · Good unit coverage, some e2e · Some tests but gaps · Minimal tests, mostly manual QA · No automated tests |

#### Category 3: Team & Delivery Impact (5 questions, 25 max)

| ID | Prompt | Options (5→1 pts) |
|----|--------|-------------------|
| del_1 | How is technical debt affecting your team's delivery speed? | Minimal impact, we ship fast · Occasional slowdowns · Noticeably slower than we should be · Significant drag, hard to estimate · Every feature takes 2-3x longer |
| del_2 | How long does it take a new developer to become productive? | Under 2 weeks · 2-4 weeks · 1-2 months · 2-3 months · 3+ months or struggled to onboard |
| del_3 | How confident is your team deploying to production on a Friday? | Very confident, we do regularly · Fairly confident with testing · Nervous but would if needed · Avoid it at all costs · Avoid deploying at any time unless necessary |
| del_4 | Does your team have budget and stakeholder support for modernization? | Budget approved, stakeholders aligned · Budget likely, need to build case · Interested stakeholders, no committed budget · Hard to get approval · No budget or leadership awareness |
| del_5 | How confident are you in your modernization plan? | Clear, prioritized roadmap · Know what to change, not the order · Some ideas, no formal plan · Know there are problems, don't know where to start · Completely lost / no plan |

#### Qualifying Questions (non-scored)

| ID | Prompt | Options |
|----|--------|---------|
| qual_role | What is your role? | CTO / VP Engineering · Eng Manager / Director · Tech Lead / Principal · Senior Developer / Architect · Other |
| qual_team | How large is your frontend team? | Solo developer · 2-5 developers · 6-15 developers · 16-50 developers · 50+ |

**New Tier Definitions:**

| Tier ID | Label | Range (of 80) | Short Diagnosis | CTA |
|---------|-------|---------------|-----------------|-----|
| critical | Critical Risk | 16-34 | Multiple foundational gaps compounding. Structured expert assessment needed before action. | Book Your Clarity Sprint → Calendly |
| moderate | Moderate Risk | 35-54 | Functional but fragile. Blind spots will become blockers. A prioritized plan unlocks momentum. | Book Your Clarity Sprint → Calendly |
| low | Low Risk | 55-80 | Solid foundation. Focus on optimization, not overhaul. | Get a Quick Architecture Check → Calendly (free 30-min) |

**Per-Category Risk Thresholds:**

| Risk Level | Infrastructure (of 30) | Modernization (of 25) | Delivery (of 25) |
|------------|----------------------|----------------------|------------------|
| Critical | 6-13 | 5-11 | 5-11 |
| Moderate | 14-21 | 12-17 | 12-17 |
| Low | 22-30 | 18-25 | 18-25 |

**Personalized Diagnosis Engine:**
New `generateDetailedDiagnosis(categories, answers, questions)` function that:
1. Identifies which specific questions scored ≤2 in each category
2. Generates 2-3 sentences per category referencing the specific issues found
3. Falls back to generic tier diagnosis if no specific low-score patterns match

Example combinations:
- infra_1 ≤2 AND infra_5 ≤2 → "Running Angular [version] with outdated dependencies creates compounding security and compatibility risks."
- infra_2 ≤2 → "Active AngularJS code in production is a ticking clock — community support ended years ago."
- mod_1 ≤2 AND mod_2 ≤2 → "Still on NgModules without Signals means 2-3x more boilerplate than teams on modern Angular."
- del_1 ≤2 AND del_2 ≤2 → "Slow delivery combined with long onboarding creates a vicious cycle."
- del_5 ≤2 → "Not having a modernization plan is the most expensive state — accumulating debt without a strategy."

**Compound Risk Statement:**
New `generateCompoundRiskStatement(categories)` function that generates a connecting narrative when 2+ categories are at Critical or Moderate risk:
- "When infrastructure gaps meet outdated patterns and team friction, each problem amplifies the others. A version that's 3 releases behind means Signals adoption is blocked. Blocked modernization means slower delivery. Slower delivery means harder hiring."

---

### Step 2: Update `src/components/Scorecard.astro` — Quiz Flow & Results UI

**Quiz Panel Changes (Panel 2):**

1. **Progress bar redesign:** Change from "Question X of 18" to "Section 1 of 3: Infrastructure Health"
   - Add a section label element above the progress bar
   - Progress bar fills within each section (0→100% per section, not overall)
   - Add overall progress indicator below: "Overall: X of 18 complete"

2. **Category verdict interstitials:** After questions 6 and 11, instead of advancing to the next question, show a verdict card:
   - Verdict card HTML structure: centered card with risk badge (color-coded), category name, score, and 1-sentence diagnosis
   - "Continue to [Next Category Name]" button with a brief animation delay (CSS animation, not JS timeout)
   - Implementation: New `renderCategoryVerdict(categoryIndex)` function that replaces the question area with the verdict card
   - Back button disabled during verdict (can't go back across a verdict)
   - State tracking: add `state.completedCategories` array to track which categories have been locked

3. **Question flow logic update:**
   - Questions 0-5 → Infrastructure Health → verdict → Questions 6-10 → Code Modernization → verdict → Questions 11-15 → qualifying 16-17 → results
   - `renderQuestion()` needs to check if current index is a category boundary and call `renderCategoryVerdict()` instead

**Results Panel Changes (Panel 3):**

1. **Hero verdict redesign:**
   - Replace "You're in the [Tier] stage, [Name]" with "[Name], your Angular project is at **[Tier Label]**"
   - Risk badge: large, color-coded (red/amber/green), with subtle pulse animation
   - Update gauge max from 90 to 80

2. **Tier progress bar:**
   - Rename node labels: Foundational → Critical Risk, Progressing → Moderate Risk, Scale-Ready → Low Risk
   - Update `data-tier` attributes to match new tier IDs

3. **Category cards:**
   - Update max from /25 to /30 for Infrastructure, keep /25 for others
   - Replace generic `description` text with personalized diagnosis from the diagnosis engine
   - Add risk badge (Critical/Moderate/Low) to each card header

4. **New compound risk section:**
   - Insert between category cards and CTA
   - Conditional: only renders if 2+ categories are at Critical or Moderate risk
   - Styled as a highlighted callout with left border accent
   - Content from `generateCompoundRiskStatement()`

5. **CTA updates:**
   - Update button labels and detail text per new tier definitions
   - Low Risk CTA: "Get a Quick Architecture Check" → Calendly free 30-min link

**Start Panel Changes (Panel 1):**
- Update copy: "18 questions" → "16 questions"
- Update heading/subheading to reference "risk score" instead of "readiness score"

---

### Step 3: Update `src/styles/global.css` — Verdict Card Styles

Add styles for:
- `.category-verdict` — centered card with glassmorphism background
- `.verdict-risk-badge` — large color-coded risk label with animation
- `.verdict-score` — prominent score display
- `.verdict-diagnosis` — single-line diagnosis text
- `.verdict-continue-btn` — styled continue button
- `.compound-risk-callout` — highlighted callout for compound risk statement
- Animation: `.verdict-enter` — fade-in + scale-up transition for verdict cards

---

### Step 4: Update `src/components/Scorecard.astro` <script> — Quiz State Machine

Key JS changes:
- Update `totalQuestionCount` calculation (16 scored + 2 qualifying = 18)
- Add `state.completedCategories: boolean[]` to track locked sections
- Add category boundary detection: indices 5→6 and 10→11 trigger verdict
- New `renderCategoryVerdict(catIndex)` function
- Update `nextBtn` handler to check for category boundaries
- Update `backBtn` handler to prevent navigation back across verdicts
- Update `showResult()` for new scoring, max values, tier colors, diagnosis
- Add compound risk section rendering
- Update form submission payload for new field names
- Update analytics events for new tier IDs

---

### Step 5: Update Supporting Components

**`src/pages/assessment.astro`:**
- Update any hardcoded "18 questions" references to "16 questions"

**`src/pages/index.astro` / `src/components/LandingHero.astro`:**
- Update hero copy if it references "18 questions" or "readiness score" → "risk score"

**`src/components/ReadinessChecklist.astro`:**
- Review if still needed — foundational tier now gets Clarity Sprint CTA too
- May need to update or remove if all tiers go to Calendly

**`src/components/Services.astro`:**
- Update any references to old tier names

---

### Step 6: Update Form Submission Payload

Update `submitFormInBackground()` to send new field names:
- `category_infrastructure` instead of `category_audit`
- `category_modernization` (kept)
- `category_delivery` instead of `category_upgrade`
- `readiness_state` → `risk_level` (critical/moderate/low)
- Add `compound_risk` field
- Add `detailed_diagnosis` field with per-category breakdown

---

## Files to Modify

| File | Scope of Changes |
|------|-----------------|
| `src/data/scorecard.ts` | Complete rewrite — questions, types, scoring, diagnosis engine |
| `src/components/Scorecard.astro` | Major — HTML structure, CSS, and JS for verdict flow + results |
| `src/styles/global.css` | Minor — add verdict card and compound risk styles |
| `src/pages/assessment.astro` | Minor — copy updates |
| `src/components/LandingHero.astro` | Minor — copy updates |
| `src/components/Services.astro` | Minor — tier name references |
| `src/components/ReadinessChecklist.astro` | Review — may need updates for new tier flow |

## Existing Code to Reuse

- **3-panel system** (start/quiz/result) in Scorecard.astro — keep this architecture
- **localStorage persistence** pattern — keep, update storage key to v2
- **FormSubmit.co integration** — keep, update field names
- **Calendly lazy-load** — `window.openCalendly()` already works
- **CSS patterns** — `.scorecard-option`, `.cat-card`, `.cat-bar-fill`, `.btn-primary` all stay
- **Animation utilities** — `animateCounter()`, gauge SVG animation, category bar fills
- **Analytics events** — `emitEvent()` pattern, `dataLayer` push
- **`scorecard:complete` custom event** — keep for post-result content reveal

## Verification

1. **Local dev:** Run `pnpm dev` and navigate to `/assessment`
2. **Email gate:** Submit name + email, verify quiz panel shows
3. **Category 1 flow:** Answer 6 Infrastructure questions → verify verdict card appears with risk level
4. **Category 2 flow:** Continue through 5 Modernization questions → verify second verdict appears
5. **Category 3 + qualifying:** Complete remaining questions → verify results page shows
6. **Results validation:**
   - Risk tier label correct for score range
   - Category cards show correct risk levels with personalized diagnosis text
   - Compound risk statement appears when 2+ categories are Critical/Moderate
   - Score gauge shows /80 (not /90)
   - CTA button matches tier (Clarity Sprint for Critical/Moderate, Architecture Check for Low)
7. **Persistence:** Refresh mid-quiz → verify answers are preserved
8. **Back navigation:** Verify can't go back across a category verdict
9. **Responsive:** Test at 375px, 768px, 1440px, 1920px breakpoints
10. **Form submission:** Check email arrives with new field names and diagnosis data
11. **Landing page:** Verify hero copy references correct question count
12. **Playwright:** Use MCP browser tools to take screenshots at each breakpoint for verification
