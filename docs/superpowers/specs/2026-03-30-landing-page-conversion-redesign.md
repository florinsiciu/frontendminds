# Landing Page Conversion Redesign — Design Spec

## Context

FrontendMinds is launching with zero audience, zero clients, and no social proof. The current homepage uses a vague hero ("Where AI Meets Frontend Excellence"), buries the scorecard at section 4, and lacks the conversion elements needed to turn cold LinkedIn/SEO traffic into scorecard completions. This redesign restructures the homepage to lead with curiosity and value, adds 4 new conversion elements, and refines the visual styling — all while keeping the existing dark theme and color palette.

## Goals

- Increase scorecard assessment starts from homepage visitors
- Capture emails from visitors not ready for the full 20-question quiz
- Recover exiting visitors with exit-intent popup
- Reduce friction by showing exactly what the scorecard involves before visitors click

## Constraints

- Zero audience — no client testimonials, no "19 apps migrated" claims, no social proof stats
- Credibility comes from tool quality and content quality, not past achievements
- Keep existing dark theme (`#0F172A` bg, `#1E293B` surface, `#253349` border)
- Keep existing color palette (indigo `#6366F1` primary, emerald `#34D399` secondary)
- Keep existing tech stack (Next.js, Tailwind CSS 4, shadcn/ui patterns)
- Preserve all existing functionality — assessment flow, blog, newsletter, services pages

## Design Direction

**Approach: Value-First Authority** — lead with the free assessment as a curiosity hook, not with pain/fear. The scorecard IS the credibility.

**Visual style:** Existing dark palette + refined element styling from reference designs:
- From Design 1 (Finpay SaaS): floating elevated cards, generous padding, rounded corners (12-16px), subtle drop shadows, clean grids, pill-shaped badges
- From Design 2 (Enterprise): feature grid layouts, data visualization elements, rounded pill CTA buttons, section structure (eyebrow -> heading -> content -> CTA), dark card elevation

---

## Section-by-Section Specification

### Section 1: Hero (MODIFIED)

**Current:** "Where AI Meets Frontend Excellence" — vague, doesn't mention the scorecard.

**New:**
- **Eyebrow:** Pill-shaped badge (rounded, `bg-primary/10`, `border border-primary/20`, `rounded-full`, `px-4 py-1.5`) with text: "Free Assessment · 20 Questions · 3 Minutes"
- **Headline:** "How Modern Is Your Angular App?"
- **Subheadline:** "Get a personalized score across 5 dimensions — migration health, architecture, modern patterns, AI readiness, and delivery — with a clear action plan."
- **CTAs:** Primary "Take the Free Assessment →" (indigo filled, rounded-xl, `box-shadow: 0 4px 14px rgba(99,102,241,0.25)` glow) + Secondary "Read the Blog" (outline, `border-border`)
- **Floating dimension cards:** 5 small cards below CTAs, each showing dimension icon + label with dimension-specific background tint and border. Cards use the existing dimension colors from `scoring.ts` (Migration: `#93C5FD`, Architecture: `#5EEAD4`, Modern: `#FBBF24`, AI: `#C4B5FD`, Delivery: `#F87171`). Each card: `rounded-xl`, `bg-{color}/5`, `border border-{color}/10`, `px-3.5 py-2.5`
- **Background:** Subtle radial gradient glow (indigo, 7% opacity) in top-right corner

**Layout:** Centered, max-w-3xl. Generous vertical padding: `pt-32 pb-20 lg:pt-40 lg:pb-24`.

**Styling from references:**
- Pill badge styling from Design 1's tab/pill navigation pattern
- Floating cards inspired by Design 1's hero dashboard preview cards — small, elevated, with color-coded borders
- Button glow shadow from Design 2's CTA styling
- Generous hero padding from both designs

**Files to modify:**
- `src/lib/content/landing.ts` — update hero copy (headline, subheadline, CTA labels)
- `src/components/landing/hero.tsx` — add pill badge, floating dimension cards, update layout

### Section 2: Problem Framing (NEW)

**Purpose:** Create the knowledge gap that makes visitors want the scorecard. Empathetic framing, not fear-based.

**Content:**
- **Eyebrow:** "Sound familiar?"
- **Headline:** "You're shipping features — but something feels off"
- **4 situation cards:**
  1. "Upgrades keep getting postponed" / "Because nobody's sure what will break"
  2. "New patterns exist but adoption is scattered" / "Standalone components, signals — started but not systematic"
  3. "AI tools everywhere but no guardrails" / "Copilot suggestions merged without clear standards"
  4. "You're not sure how you compare" / "Is your app behind, on track, or ahead?"
- **Closing line:** "The scorecard gives you a clear picture in 3 minutes." (italic, muted)

**Layout:** Single column stack, max-w-3xl. Each card is a flex row with icon badge + text.

**Card styling (from references):**
- Each card: `bg-surface`, `border border-border`, `rounded-xl`, `p-4`, `shadow-sm` (subtle `box-shadow: 0 2px 8px rgba(0,0,0,0.15)`)
- Icon badge: `w-7 h-7 rounded-lg bg-primary/10 border border-primary/20` with centered "?" in `text-primary/80 font-bold text-sm`
- Card has title in `text-foreground font-medium text-sm` + description in `text-muted text-xs`
- Card grid: vertical stack with `gap-3`
- Card styling inspired by Design 1's feature cards — clean, elevated, generous inner padding
- Icon badge pattern from Design 2's feature grid cards

**Files to create:**
- `src/components/landing/problem-framing.tsx` — new component
- Update `src/lib/content/landing.ts` — add problem framing copy
- Update `src/app/page.tsx` — add section after hero

### Section 3: Scorecard Spotlight (MODIFIED)

**Current:** Basic centered card with copy and single CTA.

**New:** Elevated card with more detail.
- **Container:** `bg-surface border border-border rounded-2xl p-8 lg:p-12 shadow-lg` (elevated card from Design 1)
- **Eyebrow:** "Free Assessment" in primary color
- **Headline:** "Angular Modernization Scorecard"
- **Copy:** "20 yes-or-no questions. A personalized score across 5 critical dimensions — with specific recommendations for your app."
- **CTA:** "Take the Free Assessment →" (primary filled with glow shadow)
- **Trust signal:** "Free · No signup until results" in muted text next to CTA

**Styling from references:**
- Elevated card with larger `rounded-2xl` and `shadow-lg` from Design 1's card aesthetic
- More generous internal padding (`p-8 lg:p-12`) matching Design 1's whitespace
- Button glow from Design 2

**Files to modify:**
- `src/components/landing/scorecard-spotlight.tsx` — expand with trust signal, refine card styling
- `src/lib/content/landing.ts` — update copy

### Section 4: How It Works (NEW)

**Purpose:** Show the 3-step process to reduce friction and set expectations.

**Content:**
- **Eyebrow:** "How it works"
- **Headline:** "Three minutes to clarity"
- **3 step cards** in a horizontal grid (stack on mobile):
  1. (1) "Answer 20 questions" / "Yes or no. Covers version health, architecture, patterns, AI governance, and delivery."
  2. (2) "See your score" / "Get a breakdown across all 5 dimensions — see exactly where you're strong and where gaps are."
  3. (3) "Get your action plan" / "Personalized recommendations based on your tier — specific next steps, not generic advice."

**Layout:** 3-column grid on desktop (`grid-cols-3`), single column on mobile.

**Card styling (from references):**
- Each card: `bg-surface border border-border rounded-2xl p-5 lg:p-6 shadow-sm text-center`
- Step number: `w-9 h-9 rounded-full bg-primary/10 border border-primary/20 mx-auto` with number in `text-primary font-bold`
- Title: `text-foreground font-semibold text-sm`
- Description: `text-muted text-xs`
- 3-column grid inspired by Design 1's feature card layout — equal-width cards, generous padding, centered content
- Step number circle from Design 2's numbered timeline pattern

**Files to create:**
- `src/components/landing/how-it-works.tsx` — new component
- Update `src/lib/content/landing.ts` — add how-it-works copy
- Update `src/app/page.tsx` — add section after scorecard spotlight

### Section 5: Content Pillars (UNCHANGED content, REPOSITIONED)

Moves from position 2 to position 5. No content changes.

**Styling refinement:** Update cards to match new card aesthetic:
- `rounded-xl` (from current `rounded-lg`)
- Add `shadow-sm` (`box-shadow: 0 2px 8px rgba(0,0,0,0.15)`)
- Keep hover effect (border/text color shift to primary)

**Files to modify:**
- `src/components/landing/content-pillars.tsx` — update card border-radius and shadow
- `src/app/page.tsx` — reorder section

### Section 6: Featured Articles (UNCHANGED)

Stays as-is. No changes needed. Position moves from 3 to 6 (follows content pillars naturally).

**Files to modify:**
- `src/app/page.tsx` — reorder section

### Section 7: Lead Magnet — 5-Minute Angular Health Check (NEW, replaces newsletter CTA)

**Purpose:** Capture emails from visitors not ready for the full 20-question quiz. Subscribes them to the newsletter simultaneously.

**Content:**
- **Container:** Accent-tinted card `bg-primary/5 border border-primary/15 rounded-2xl p-8`
- **Eyebrow:** "Free Resource" in primary color
- **Headline:** "5-Minute Angular Health Check"
- **Copy:** "5 questions to ask about your Angular app this week — with explanations and what each answer means."
- **Form:** Email input + "Get the Guide" button (same pattern as existing `NewsletterForm` but different CTA text)
- **Fine print:** "Free. No spam. Also get the weekly newsletter."

**Behavior:**
- Form submits via existing `subscribe()` server action (reuse existing Resend integration)
- On success, show confirmation + trigger PDF download (or link to PDF)
- PDF asset: static file in `/public/resources/angular-health-check.pdf` (to be created separately)

**Styling from references:**
- Accent-tinted card background from Design 2's CTA band sections
- Form layout: flex row on sm+ (input + button), stack on mobile — matching Design 1's CTA form patterns
- Button with glow shadow

**Files to create:**
- `src/components/landing/lead-magnet.tsx` — new component (reuses `NewsletterForm` logic or wraps it)
- Update `src/lib/content/landing.ts` — add lead magnet copy
- Update `src/app/page.tsx` — replace newsletter CTA section

### Section 8: Founder (UNCHANGED)

Stays as-is. No content or styling changes.

### Section 9: Exit-Intent Popup (NEW)

**Purpose:** Last-chance email capture for visitors about to leave. Offers the health check guide.

**Content:**
- **Eyebrow:** "Before you go"
- **Headline:** "Grab the free health check"
- **Copy:** "5 questions to ask about your Angular app this week — with explanations and what each answer means."
- **Form:** Email input + "Get the Guide" button
- **Alternative:** "Or take the full scorecard instead" link to `/assessment`
- **Close:** X button in top-right corner

**Behavior:**
- **Desktop trigger:** Mouse leaves viewport from top edge (`clientY < 10`)
- **Mobile trigger:** 45 seconds of inactivity (no scroll/touch events)
- **Cooldown:** 7-day `localStorage` cooldown after dismissal
- **Skip conditions:** Already subscribed (check localStorage flag set on newsletter/lead magnet success), or already completed scorecard (check sessionStorage)
- **Close triggers:** X button, click outside overlay, Escape key
- **Analytics:** `exit_popup_shown` and `exit_popup_converted` PostHog events

**Visual:**
- Overlay: `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`
- Modal: `bg-surface border border-border rounded-2xl p-8 max-w-sm mx-auto shadow-2xl`
- Entrance animation: scale from 0.95 + fade in (0.2s ease-out)
- Close button: `absolute top-3 right-3 w-7 h-7 rounded-full bg-background/50 border border-border`

**Styling from references:**
- Modal card styling from Design 1's elevated card patterns
- Overlay blur from Design 2's popup patterns
- Pop-in animation inspired by the Angular Authority reference's exit popup

**Files to create:**
- `src/components/landing/exit-intent-popup.tsx` — new "use client" component
- Update `src/app/page.tsx` — add popup component
- Update `src/lib/config/analytics.ts` — add exit popup event names

### Sticky Mobile CTA (MINOR UPDATE)

- Update button text from "Take the Angular Scorecard" to "Take the Free Assessment"

**Files to modify:**
- `src/components/landing/sticky-mobile-cta.tsx` — update CTA text

---

## Section Dividers

Gradient line dividers between all sections:
```
<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
```

This creates subtle visual separation without breaking the dark-on-dark flow. Inspired by Design 2's section separator pattern.

---

## Global Styling Refinements

These apply across all landing page components:

| Element | Current | New | Reference |
|---------|---------|-----|-----------|
| Card border-radius | `rounded-lg` (8px) | `rounded-xl` (12px) or `rounded-2xl` (16px) for featured cards | Design 1 |
| Card shadows | None | `shadow-sm` on cards (`box-shadow: 0 2px 8px rgba(0,0,0,0.15)`) | Design 1 |
| Primary button | Flat fill | Add `shadow-[0_4px_14px_rgba(99,102,241,0.25)]` glow | Design 2 |
| Eyebrow labels | Plain `text-sm uppercase` | Pill badge where appropriate (`rounded-full px-3 py-1 bg-primary/10 border border-primary/20`) | Design 1 |
| Section padding | `py-20` | `py-20 lg:py-24` — slightly more breathing room on desktop | Both |
| Card inner padding | `p-6` | `p-5 lg:p-6` for grid cards, `p-8 lg:p-12` for spotlight cards | Design 1 |
| Grid gaps | `gap-4` | `gap-3 lg:gap-4` for tight grids, `gap-4 lg:gap-5` for feature grids | Both |
| Section headings | Direct h2 | Eyebrow + h2 pattern consistently (`eyebrow: text-xs uppercase tracking-widest text-muted`, `h2: text-2xl lg:text-3xl font-bold`) | Design 2 |

---

## Page Section Order (Final)

```
1. Hero                    (MODIFIED — new copy, pill badge, floating dimension cards)
   --- gradient divider ---
2. Problem Framing         (NEW — "Sound familiar?" + 4 situation cards)
   --- gradient divider ---
3. Scorecard Spotlight     (MODIFIED — expanded card, trust signal)
   --- gradient divider ---
4. How It Works            (NEW — 3-step timeline)
   --- gradient divider ---
5. Content Pillars         (REPOSITIONED from #2, styling refresh)
   --- gradient divider ---
6. Featured Articles       (REPOSITIONED from #3, unchanged)
   --- gradient divider ---
7. Lead Magnet             (NEW — replaces newsletter CTA)
   --- gradient divider ---
8. Founder                 (UNCHANGED)
   --- footer ---
9. Exit-Intent Popup       (NEW — overlay, not a section)
   Sticky Mobile CTA       (MINOR — updated text)
```

---

## Files Summary

**New files (4):**
- `src/components/landing/problem-framing.tsx`
- `src/components/landing/how-it-works.tsx`
- `src/components/landing/lead-magnet.tsx`
- `src/components/landing/exit-intent-popup.tsx`

**Modified files (7):**
- `src/app/page.tsx` — section reorder + add new sections
- `src/lib/content/landing.ts` — all new copy (hero, problem, how-it-works, lead magnet)
- `src/components/landing/hero.tsx` — pill badge, floating cards, new copy
- `src/components/landing/scorecard-spotlight.tsx` — expanded card, trust signal
- `src/components/landing/content-pillars.tsx` — card styling refresh
- `src/components/landing/sticky-mobile-cta.tsx` — CTA text update
- `src/lib/config/analytics.ts` — exit popup events

**Unchanged files:**
- `src/components/landing/featured-articles.tsx`
- `src/components/landing/founder-section.tsx`
- `src/components/landing/navigation.tsx`
- `src/components/landing/footer.tsx`
- All assessment/quiz/results pages
- All blog/services/about/contact pages

---

## Verification Plan

1. **Visual:** Run `npm run dev`, visit `localhost:3000`. Verify all 8 sections render in correct order with gradient dividers. Check mobile (< 640px), tablet (768px), and desktop (1024px+) layouts.
2. **Hero:** Confirm pill badge, headline, CTAs, and floating dimension cards render. Both CTAs link correctly (`/assessment`, `/blog`).
3. **Problem Framing:** 4 cards render with icon badges. Scroll-triggered fade-in animation works.
4. **Scorecard Spotlight:** Expanded card with trust signal. CTA links to `/assessment`.
5. **How It Works:** 3-step grid renders. Responsive: 3-col desktop, 1-col mobile.
6. **Content Pillars:** Cards have updated border-radius and shadows. Links to blog categories work.
7. **Lead Magnet:** Form submits successfully via Resend. Success state shows. Email added to audience.
8. **Exit Popup:** Trigger by moving mouse above viewport on desktop. Verify 7-day cooldown in localStorage. Verify skip if already subscribed. Verify close via X, click-outside, Escape. Verify "take the scorecard" link works.
9. **Sticky Mobile CTA:** Updated text "Take the Free Assessment". Only visible on mobile.
10. **Analytics:** Check PostHog for `exit_popup_shown` and `exit_popup_converted` events.
