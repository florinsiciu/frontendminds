# Angular Modernization Scorecard — Implementation Plan

> Finalized: 2026-03-26
> Reference: `design-spec.md` (authoritative spec), `docs/` (research & methodology)

---

## Context

Florin is rewriting his Angular modernization assessment website from scratch. The current site (`C:\Development\personal-website`) is an Astro 6 + Tailwind static site with client-side scoring and localStorage persistence. The rewrite moves to a database-backed Next.js application with server-side scoring, lead capture, email automation, and analytics — following the Daniel Priestley scorecard methodology for lead generation.

**Key decisions from brainstorming session:**
- 5 dimensions × 4 questions = 20 scored + 2 qualifying (~2.5 minutes)
- All questions: Yes = 1pt (healthy), No = 0pt (gap) — no reversed polarity
- New dimension: AI & Development Governance (maps to AI guardrails service)
- Separate new repo (existing Astro site preserved)
- Legal pages: generate reasonable defaults
- Scoring: 20 points max, tiers: 0-7 / 8-13 / 14-20
- Package manager: pnpm (enforced via `packageManager` field in package.json)
- Repo: https://github.com/florinsiciu/florinsiciu.git

---

## Finalized Assessment Questions

### D1: Migration & Version Health
*Dormant tension: "We're running on borrowed time"*
*Services: Angular upgrades, AngularJS migration*

| # | Question | 1pt = |
|---|----------|-------|
| Q1 | Is your app running Angular 16 or newer? | Yes |
| Q2 | Have you fully migrated away from AngularJS (v1.x)? | Yes |
| Q3 | Are your third-party dependencies updated at least annually? | Yes |
| Q4 | Can your team complete an Angular major version upgrade within 2 weeks? | Yes |

### D2: Codebase Architecture
*Dormant tension: "Our codebase is fighting against us"*
*Services: NX adoption, architecture reviews*

| # | Question | 1pt = |
|---|----------|-------|
| Q5 | Is your codebase organized in a monorepo or with clear feature boundaries? | Yes |
| Q6 | Do you have documented architectural standards your team follows? | Yes |
| Q7 | Have you had a codebase architecture review in the past year? | Yes |
| Q8 | Can your modules or libraries be developed and tested independently? | Yes |

### D3: Modern Angular Adoption
*Dormant tension: "We're writing yesterday's Angular"*
*Services: Standalone migration, Signals/RxJS audit, Forms & CVA review*

| # | Question | 1pt = |
|---|----------|-------|
| Q9 | Have you adopted standalone components? | Yes |
| Q10 | Do you have a consistent strategy for reactive state (Signals, RxJS, or both)? | Yes |
| Q11 | Are your forms maintainable and free of repetitive boilerplate? | Yes |
| Q12 | Does your team trust the test suite enough to refactor with confidence? | Yes |

### D4: AI & Development Governance
*Dormant tension: "AI is writing code with no guardrails"*
*Services: AI guardrails setup, MCP configuration*

| # | Question | 1pt = |
|---|----------|-------|
| Q13 | Does your team have clear guidelines for using AI in Angular development? | Yes |
| Q14 | Are AI-generated code changes held to the same review standards as human code? | Yes |
| Q15 | Have you configured AI tools to follow your project's architectural patterns? | Yes |
| Q16 | Is your team using AI to accelerate modernization (not just feature work)? | Yes |

### D5: Delivery & Talent Readiness
*Dormant tension: "This is already costing us"*
*Services: Strategy call (creates urgency, justifies budget)*

| # | Question | 1pt = |
|---|----------|-------|
| Q17 | Can you fill an open Angular developer position within 8 weeks? | Yes |
| Q18 | Can your team deploy with confidence and without fear of breaking changes? | Yes |
| Q19 | Can your team ship new features without getting blocked by legacy Angular patterns? | Yes |
| Q20 | Does leadership understand and budget for modernization needs? | Yes |

### Qualifying Questions (radio buttons, not scored)

**Q21 — "What's your role on this project?"**
- CTO / VP Engineering
- Engineering Manager / Director
- Tech Lead / Principal Engineer
- Senior Developer / Architect
- Other

**Q22 — "Are you actively planning a modernization initiative?"**
- Yes, with budget and timeline
- Yes, building the business case
- Exploring options, no formal plan
- Not yet, but aware it's needed

---

## Scoring Model

- **20 points maximum** (5 dimensions × 4 questions × 1 point)
- Per-dimension score: 0-4 each
- Overall score determines tier

### Result Tiers

| Tier | Score | Meaning | CTA |
|------|-------|---------|-----|
| **Critical Risk** | 0-7 | Significant gaps across multiple areas | "Book Your Free Modernization Strategy Call" (urgency) |
| **Modernization Ready** | 8-13 | Solid foundations, clear improvement areas | "Book Your Free Strategy Session" (opportunity) |
| **Well-Positioned** | 14-20 | Strong across the board | "Book a Quick Architecture Review" (optimization) |

**Priestley sweet spot:** Ideal clients land in "Modernization Ready" (8-13).

### Service Coverage Map

| Service | Questions |
|---------|-----------|
| Angular version upgrades | Q1, Q3, Q4 |
| AngularJS migration | Q2 |
| NX monorepo adoption | Q5, Q8 |
| Architecture reviews | Q6, Q7 |
| Standalone migration | Q9 |
| Signals/RxJS audit | Q10 |
| Forms & CVA review | Q11 |
| AI guardrails setup | Q13, Q14, Q15, Q16 |
| Strategy call (entry point) | Q17-Q20 (urgency) |

---

## Database Schema Updates

**`assessments.dimension_scores` jsonb — 5 dimensions:**
```json
{
  "migration_health": 2,
  "architecture": 3,
  "modern_adoption": 1,
  "ai_governance": 2,
  "delivery_readiness": 2
}
```

**`assessments.total_score`:** 0-20
**`assessments.answers`:** 20 entries (`{"q1": true, ..., "q20": true}`)

All other schema (leads, email_events) unchanged from design-spec.md.

---

## Phase 1: Foundation & Project Setup ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Create Next.js project | App Router, new directory (separate from existing Astro repo) | ✅ |
| Configure Tailwind CSS + shadcn/ui | Dark theme tokens matching Navy + Angular Red palette | ✅ |
| Set up Inter font | Single font family, 400/600/700 weights | ✅ |
| Create project structure | Full file tree per design-spec.md (`app/`, `components/`, `lib/`, `actions/`, `types/`) | ✅ |
| TypeScript types | `types/assessment.ts` — Question, Dimension, Tier, Assessment, Lead interfaces | ✅ |
| Environment config | `.env.example` with `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `POSTHOG_KEY`, `NEXT_PUBLIC_SITE_URL` | ✅ |

**Key files:** `package.json`, `tailwind.config.ts`, `app/layout.tsx`, `types/assessment.ts`

---

## Phase 2: Data, Content & Config Layer ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Question definitions | `lib/data/questions.ts` — all 20 scored questions with dimension IDs, text, polarity + 2 qualifying with radio options | ✅ |
| Landing content | `lib/content/landing.ts` — hero, proof strip (51,737 companies, 47% job growth stats), how it works, benefits, final CTA | ✅ |
| Assessment content | `lib/content/assessment.ts` — intro page copy, email gate copy, trust signals | ✅ |
| Results content | `lib/content/results.ts` — 5 dimension display config, tier CTA cards, diagnosis templates, compound risk statements | ✅ |
| Email content | `lib/content/email.ts` — subject template, greeting, 5-dimension summary, CTAs, footer | ✅ |
| Navigation + footer + SEO + errors | `lib/content/navigation.ts`, `footer.ts`, `seo.ts`, `errors.ts` | ✅ |
| Site config | `lib/config/site.ts` — site name, base URL, Calendly URL, social URLs | ✅ |
| Scoring config | `lib/config/scoring.ts` — 3 tier definitions (0-7 / 8-13 / 14-20), 5 dimension risk thresholds, color mapping | ✅ |
| Analytics config | `lib/config/analytics.ts` — event name constants | ✅ |
| Legal content | Privacy policy + terms of service (generated, reasonable defaults) + `lib/content/legal.ts` | ✅ |

**Key files:** `lib/data/questions.ts`, `lib/content/*.ts`, `lib/config/scoring.ts`

---

## Phase 3: Landing Page ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Navigation | Responsive: hamburger on mobile, horizontal on desktop. Sticky. CTA button in nav. | ✅ |
| Hero section | Problem-focused headline, subheadline, single CTA -> `/assessment` | ✅ |
| Proof strip | Research-backed stats (51,737 Angular companies, 47% job growth, Fortune 500 usage) | ✅ |
| How it works | 3-step visual: Take Assessment -> Get Your Score -> Book Strategy Call | ✅ |
| What you discover | Benefit cards for each dimension | ✅ |
| Final CTA | Repeat CTA block | ✅ |
| Footer | Links, social, copyright. 3-column on desktop, stacked on mobile. | ✅ |
| Sticky mobile CTA | Fixed bottom bar, landing page only | ✅ |

**Key files:** `app/page.tsx`, `components/landing/*.tsx`

---

## Phase 4: Assessment Flow (Client-Side) ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Assessment intro | `app/assessment/page.tsx` — what you'll learn, methodology, benefit list, CTA -> quiz | ✅ |
| Quiz wizard | `app/assessment/quiz/page.tsx` — **client component**, React Hook Form + Zod | ✅ |
| — Question display | One question at a time, full-screen, distraction-free | ✅ |
| — Progress bar | Dimension labels, "4/20" counter, advances through 5 dimensions | ✅ |
| — Navigation | Previous question back button, click-to-advance yes/no buttons | ✅ |
| — Qualifying questions | Q21-Q22 as radio buttons after scored questions | ✅ |
| — State management | All answers in React Hook Form state (client memory, no server calls) | ✅ |
| Email gate | `app/assessment/unlock/page.tsx` — first name + email, Zod validation, trust signals | ✅ |

**Key files:** `app/assessment/quiz/page.tsx`, `components/quiz/*.tsx`, `app/assessment/unlock/page.tsx`

---

## Phase 5: Backend Integration ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Supabase clients | `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (server) | ✅ |
| Database tables | `leads` (uuid, name, email, UTM), `assessments` (uuid, answers, scores, tier), `email_events` (optional) | ✅ |
| Scoring engine | `lib/scoring.ts` — server-only. Takes 20 answers -> computes 5 dimension scores (0-4 each) -> total (0-20) -> tier | ✅ |
| Server Action | `actions/submit-assessment.ts` — single action: create/find lead -> store answers -> score -> store result -> trigger email -> return result ID | ✅ |
| Email trigger | `lib/email.tsx` — Resend + React Email template. Subject: "Your Angular Modernization Score: [Tier]". Body: greeting, X/20 score, 5 dimension bars, diagnosis, 2 CTAs | ✅ |

**Key files:** `lib/scoring.ts`, `actions/submit-assessment.ts`, `lib/email.tsx`

**⚠️ Before end-to-end testing:**
- [ ] Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor
- [ ] Set env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`

---

## Phase 6: Results Page ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| Server Component | `app/assessment/results/page.tsx` — fetches from Supabase by `?id=xxx` | ✅ |
| Score visualization | 5 dimension bars (0-4 each, color-coded red/amber/blue) + overall score bar (0-20) with tier indicator | ✅ |
| Personalized diagnosis | Highlights weakest dimension, uses dormant tension tagline, compound risk statement if 2+ dimensions weak | ✅ |
| Tier CTA card | Tier-specific headline + body + button label -> Calendly link | ✅ |
| Error handling | Invalid/missing ID -> redirect to `/assessment` | ✅ |

**Key files:** `app/assessment/results/page.tsx`, `components/results/*.tsx`

---

## Phase 7: Polish & Analytics ✅ Completed 2026-03-26

| Task | Details | Status |
|------|---------|--------|
| PostHog | All events: `assessment_started`, `question_answered` (x20), `quiz_completed`, `email_submitted`, `results_viewed`, `cta_clicked`, `quiz_abandoned` | ✅ |
| SEO | Per-page metadata, JSON-LD structured data (Organization, FAQ) | ✅ |
| Legal pages | `app/privacy/page.tsx`, `app/terms/page.tsx` with generated content | ✅ |
| Responsive pass | Mobile-first check at 375px, 768px, 1024px+ per the responsive table in design-spec | ✅ |
| Error handling | 404 page, invalid results ID, form validation messages | ✅ |
| Accessibility | 48px touch targets, focus states, screen reader, 16px min input font | ✅ |

**Key files:** `app/privacy/page.tsx`, `app/terms/page.tsx`, `lib/posthog.ts`, `components/posthog-provider.tsx`, `app/not-found.tsx`, `app/error.tsx`

---

## Verification (End-to-End)

1. `/` — hero renders, CTA -> `/assessment`
2. `/assessment` — intro renders, CTA -> `/assessment/quiz`
3. Quiz — 20 yes/no + 2 qualifying, progress bar advances through 5 dimensions
4. Email gate — name + email submitted
5. Supabase — `leads` row created, `assessments` row with correct `total_score` (0-20), `dimension_scores` (5), `tier`
6. Resend — email delivered with score, 5 dimensions, tier
7. `/assessment/results?id=xxx` — 5 bars, tier, diagnosis, CTA render
8. Calendly — CTA opens popup
9. PostHog — all events firing
10. Retake — same email -> new assessment, same lead
11. Invalid ID -> redirects to `/assessment`
12. Responsive — 375px, 768px, 1024px+

---

## What remains unchanged from design-spec.md

- Tech stack (Next.js, Tailwind, shadcn/ui, Supabase, Resend, PostHog, Vercel)
- Architecture (hybrid progressive: client quiz + server scoring)
- Page structure and funnel flow
- Visual design (Navy + Angular Red palette, Inter font, clean flat cards)
- Content architecture (separation of content/config/data from components)
- Project structure (file tree)
- Email template structure
- Analytics events (adapted for 20 questions)
- Responsive design specifications
- MVP scope exclusions
