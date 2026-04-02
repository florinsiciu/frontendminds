# Assessment Pages Redesign — Design Spec

## Context

The FrontendMinds assessment flow (/assessment → /assessment/quiz → /assessment/unlock → /assessment/results) has solid logic, scoring, and content but looks visually disconnected from the homepage. The homepage was recently redesigned with rich design primitives (GlassCard, Section, Tagline, IconCircle, pill buttons with glow, reveal animations, alternating section backgrounds) — the assessment pages use none of these.

**Goal:** Align all 4 assessment pages with the homepage design language and add 3 key UX improvements: slide transitions on quiz, blurred score teaser on email gate, and dashboard layout on results.

**Approach:** Skin deep + key UX wins — modify existing components, don't rewrite. Existing quiz logic, scoring, analytics, and server actions remain untouched.

## Constraints

- Reuse existing design primitives: `GlassCard`, `Section`, `Tagline`, `IconCircle`, `buttonVariants` (pill + glow)
- Keep existing component structure — wrap and restyle, don't rewrite
- Preserve all quiz logic, sessionStorage flow, scoring, PostHog analytics, server actions
- Dark theme, same color palette, same fonts (Inter + Fraunces)
- Dimension colors unchanged: Migration `#93C5FD`, Architecture `#5EEAD4`, Modern `#FBBF24`, AI `#C4B5FD`, Delivery `#F87171`

---

## Page 1: Assessment Intro (`/assessment`)

**File:** `src/app/assessment/page.tsx`

### Changes

1. **Wrap in Section** — use `<Section bg="muted" width="narrow">` for hero area, default bg for benefits area
2. **Add Tagline** — `<Tagline>Free Assessment</Tagline>` above heading
3. **Fraunces heading with italic accent** — "Angular Modernization *Assessment*" with `<em className="text-accent">` on "Assessment"
4. **Pill button with glow** — change CTA to `shape="pill"` with glow shadow, matching homepage hero CTA
5. **Micro stats bar** — add "20 Questions | ~3 Minutes | Free" below CTA in muted text with pipe separators
6. **GlassCard benefits** — wrap "What you'll discover" list in `<GlassCard>` with `<Tagline>` label. Center the card and its content.
7. **Dimension preview badges** — add colored pill badges for all 5 dimensions below benefits card, with "5 Scored Dimensions" micro-label above. Reuse dimension colors from `scoring.ts`
8. **Reveal animations** — wrap benefits card and dimension badges in `<Reveal>` with staggered delays
9. **Trust line** — keep existing "Built by FrontendMinds" line

### Content updates in `src/lib/content/assessment.ts`

- Heading: "Angular Modernization Assessment" (keep as-is, already uses Fraunces)
- Add `microStats` array: `["20 Questions", "~3 Minutes", "Free"]`
- Add `dimensionLabel`: "5 Scored Dimensions"

---

## Page 2: Quiz (`/assessment/quiz`)

**Files:** `src/app/assessment/quiz/page.tsx`, `src/components/quiz/progress-bar.tsx`, `src/components/quiz/question-card.tsx`

### Progress Bar (`progress-bar.tsx`)

1. **Dimension-colored segments** — each of the 5 progress segments gets its dimension color: Migration blue, Architecture teal, Modern amber, AI purple, Delivery red. Active segment is vivid, inactive segments are at 12% opacity of their color
2. **Dimension label color** — the current dimension name text matches its dimension color (not uniform indigo)

### Question Card (`question-card.tsx`)

1. **GlassCard wrapper** — wrap the entire question area in `<GlassCard>` to ground it visually
2. **Dimension pill badge** — replace plain uppercase label with a colored pill badge matching the current dimension color (same style as homepage hero dimension badges): `bg-{color}/8 border border-{color}/15 rounded-full px-3 py-1 text-{color}`
3. **Answer button polish** — add `bg-white/[0.03]` background fill, brighter text color (`text-foreground` instead of `text-muted-foreground`), hover state: `border-primary bg-primary/10`
4. **Selected state** — chosen answer gets `border-primary bg-primary/10` highlight for 250ms before auto-advance
5. **Question counter** — add "Question X of 22" in muted text below the answer buttons inside the card
6. **Question dot indicators** — 4 small dots below the card showing progress within the current dimension (filled = answered, empty = remaining)

### Slide Transitions

1. **Direction-aware slide** — CSS-only animation using `translateX` + `opacity`:
   - Forward (next question): current exits `translateX(-100%) opacity(0)`, new enters from `translateX(100%) opacity(0)` to `translateX(0) opacity(1)`
   - Backward (previous): reverse direction
   - Duration: 250ms ease-out
2. **Implementation** — track `direction` state (`"forward" | "backward"`), apply CSS class to the question card container. Use `onAnimationEnd` to swap content after exit animation completes
3. **No new dependencies** — pure CSS transitions with React state

### Qualifying Questions (`qualifying-card.tsx`)

- Apply same GlassCard wrapper and dimension pill badge (use `#818CF8` indigo for qualifying questions since they don't belong to a scored dimension)
- Multi-option buttons get same polish as Yes/No buttons

---

## Page 3: Email Gate (`/assessment/unlock`)

**File:** `src/app/assessment/unlock/page.tsx`

### Changes

1. **Tagline + Fraunces heading** — `<Tagline>Assessment Complete</Tagline>` + "Your Score Is *Ready*" with italic accent
2. **Blurred score teaser** — new `<ScoreTeaser>` component above the form:
   - `<GlassCard>` containing a mock score preview: total score "??/20", 5 dimension bars with correct dimension colors, tier badge placeholder
   - CSS `filter: blur(6px)` + `pointer-events: none` + `opacity: 0.5` on the content
   - Absolute-positioned lock overlay: pill badge with "🔒 Enter your email to unlock" centered over the blurred content
   - Bar widths are randomized (40-90%) — purely visual, not based on actual answers
3. **GlassCard form** — wrap form in `<GlassCard>` matching homepage newsletter form pattern
4. **Proper labels** — add `<label>` elements above inputs (not just placeholders)
5. **Pill button with glow** — "Unlock My Results →" with `shape="pill"` and glow shadow
6. **Trust signal** — "🔒 Your data stays private. No spam, ever." below submit button

### New Component

- `src/components/quiz/score-teaser.tsx` — the blurred preview. Self-contained, no props needed (uses static placeholder data + dimension colors from `scoring.ts`)

---

## Page 4: Results Dashboard (`/assessment/results`)

**File:** `src/app/assessment/results/page.tsx`, `src/components/results/score-overview.tsx`, `src/components/results/dimension-bars.tsx`, `src/components/results/diagnosis.tsx`, `src/components/results/tier-cta.tsx`

### Layout Restructure

Change from single-column stack to **3 distinct sections with alternating backgrounds**:

**Section 1: Score Hero** — `<Section bg="muted">`
- Tagline: "Your Results"
- Fraunces heading: "Angular Modernization *Score*"
- Subtitle: "Here's how your Angular application scored across 5 critical dimensions."
- **Two-column grid** (`grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6`):
  - Left: Score overview in `<GlassCard>` — total score (large Fraunces number), score progress bar (indigo gradient), tier badge (color-coded pill)
  - Right: Dimension breakdown in `<GlassCard>` — 5 dimension bars with dimension colors, score fractions color-coded by severity (4/4 green, 2-3/4 amber, 0-1/4 red)
- Responsive: stacks vertically on mobile

**Section 2: Diagnosis** — `<Section bg="default">`
- Tagline: "Your Diagnosis"
- Diagnosis text in `<GlassCard>` — tier-based personalized copy (existing content from `results.ts`)
- Weakest dimension highlight: colored left-border card (`border-l-[3px]`) using the weakest dimension's color, with italic "dormant tension" quote
- Compound risk callout (when applicable): subtle red-tinted card (`bg-destructive/4 border-destructive/10`)

**Section 3: CTA** — `<Section bg="muted">`
- `<GlassCard variant="highlight">` (indigo-tinted)
- Tagline: "Recommended Next Step"
- Fraunces heading: tier-specific CTA heading from `results.ts`
- Description + Calendly pill button with glow
- Retake link below: "← Retake the Assessment" in accent color

### Component Changes

**`score-overview.tsx`:**
- Wrap in GlassCard
- Total score in large Fraunces font
- Score bar with indigo gradient fill
- Tier badge as colored pill (not plain text)

**`dimension-bars.tsx`:**
- Wrap in GlassCard
- Add Tagline "Dimension Breakdown"
- Score fraction text color-coded: green (4/4, 3/4), amber (2/4), red (1/4, 0/4)
- Bars use dimension colors (already do — keep as-is)

**`diagnosis.tsx`:**
- Wrap diagnosis text in GlassCard
- Weakest dimension highlight: left-border card with dimension color
- Compound risk: tinted card instead of plain text

**`tier-cta.tsx`:**
- Wrap in `<GlassCard variant="highlight">`
- Add Tagline "Recommended Next Step"
- Pill button with glow for Calendly link
- Retake link styled as accent text link

### Reveal Animations

- Each Section gets `<Reveal>` on its content
- Within the score hero, the two GlassCards get staggered delays (0ms, 150ms)
- Diagnosis cards get staggered delays (0ms, 150ms, 300ms)

---

## Shared Changes

### Reveal Animations

All assessment pages should use `<Reveal>` from `src/components/ui/reveal.tsx` on key content blocks. The component already exists and is used on the homepage.

### CSS — No Changes Needed

All required CSS custom properties, utility classes (`.bg-dot-grid`), and design tokens already exist in `globals.css` from the homepage redesign.

### Content File

Minor updates to `src/lib/content/assessment.ts`:
- Add `microStats` for intro page
- Add `dimensionLabel` for intro page
- Add `unlockHeading` / `unlockTagline` for email gate
- Add `resultsHeading` / `resultsSubtitle` for results hero

### Content File — Results

Minor updates to `src/lib/content/results.ts`:
- Add `sectionTaglines` object: `{ score: "Your Results", diagnosis: "Your Diagnosis", cta: "Recommended Next Step" }`

---

## Files Summary

**New files (1):**
- `src/components/quiz/score-teaser.tsx` — blurred score preview for email gate

**Modified files (11):**
- `src/app/assessment/page.tsx` — Section wrappers, Tagline, pill button, micro stats, dimension badges, Reveal
- `src/app/assessment/quiz/page.tsx` — slide transition state + CSS classes
- `src/app/assessment/unlock/page.tsx` — Tagline, heading, ScoreTeaser, GlassCard form, trust signal
- `src/app/assessment/results/page.tsx` — 3-section layout with Section wrappers, two-column grid
- `src/components/quiz/progress-bar.tsx` — dimension-colored segments
- `src/components/quiz/question-card.tsx` — GlassCard wrapper, dimension pill badge, button polish, dot indicators
- `src/components/quiz/qualifying-card.tsx` — GlassCard wrapper, button polish
- `src/components/results/score-overview.tsx` — GlassCard, Fraunces score, gradient bar, tier pill
- `src/components/results/dimension-bars.tsx` — GlassCard, color-coded fractions
- `src/components/results/diagnosis.tsx` — GlassCard, left-border weakest card, compound risk card
- `src/components/results/tier-cta.tsx` — highlight GlassCard, Tagline, pill button, retake link

**Content files (2):**
- `src/lib/content/assessment.ts` — micro stats, dimension label, unlock copy
- `src/lib/content/results.ts` — section taglines

**Unchanged:**
- `src/lib/data/questions.ts` — quiz questions
- `src/lib/config/scoring.ts` — scoring tiers and thresholds
- `src/lib/scoring.ts` — server-side scoring logic
- `src/lib/config/analytics.ts` — PostHog events
- `src/actions/submit-assessment.ts` — server action
- `src/types/assessment.ts` — TypeScript types
- All shared layout, navigation, footer

---

## Verification

1. **Visual consistency:** Run `pnpm dev`, navigate through all 4 assessment pages. Verify GlassCards, Taglines, pill buttons, and Section backgrounds match homepage treatment.
2. **Intro page:** Tagline, Fraunces heading with italic, pill CTA with glow, micro stats, centered GlassCard benefits, dimension badges with correct colors, Reveal animations.
3. **Quiz page:** Dimension-colored progress segments, GlassCard question area, colored dimension pill badge, polished answer buttons with selected state, slide transitions forward/backward, dot indicators.
4. **Email gate:** Tagline + Fraunces heading, blurred score teaser with lock overlay, GlassCard form with labels, pill button, trust signal. Verify sessionStorage validation still works (redirect to quiz if not completed).
5. **Results page:** Two-column dashboard grid on desktop, stacks on mobile. Three sections with muted/default/muted rhythm. GlassCards on all cards. Color-coded score fractions. Weakest dimension left-border card. Compound risk card. CTA highlight card with pill button. Reveal animations. Verify PostHog tracking still fires.
6. **Responsive:** Check all pages at mobile (375px), tablet (768px), desktop (1024px+). Two-column results grid must stack cleanly.
7. **Functional:** Complete the full assessment flow end-to-end (intro → quiz → unlock → results). Verify no regressions in quiz logic, form validation, server action, scoring, or analytics.
