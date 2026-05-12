# Angular Modernization Scorecard — Full Rewrite Design Spec

## Context

Florin is rewriting his Angular modernization assessment website (`C:\Development\personal-website`) from scratch. The current site is an Astro 6 + Tailwind static site with client-side scoring and localStorage persistence. The rewrite moves to a database-backed Next.js application with server-side scoring, lead capture, email automation, and analytics — following the Daniel Priestley scorecard methodology for lead generation.

**Why:** The current site has no backend, no lead persistence, no email automation, and a cluttered UI. The rewrite creates a scalable foundation with proper data capture, server-side scoring, and a clean Priestley-informed assessment funnel. Florin is starting from zero (no audience, no clients) and needs the site to build credibility and generate leads.

**Target:** Separate new repo (the existing Astro site at `C:\Development\personal-website` is preserved).

---

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | Next.js (App Router) | Full-stack React, SSR, Server Actions |
| UI | Tailwind CSS + shadcn/ui | Utility-first styling + component library |
| Forms | React Hook Form + Zod | Multi-step quiz with validation |
| Database | Supabase (Postgres) | Lead storage, assessment data, email events |
| Email | Resend + React Email | Transactional results email |
| Scheduling | Calendly (existing account) | Strategy call booking |
| Analytics | PostHog | Funnel analytics, event tracking |
| Package Manager | pnpm | Fast installs, strict dependency resolution |
| Deployment | Vercel | Hosting, previews, edge functions |

---

## Architecture: Hybrid Progressive

Client-side quiz for snappy UX, server-side scoring and storage via Server Actions.

- Quiz runs fully client-side (React Hook Form + Zod, state in memory)
- Email gate triggers a single Server Action that: creates lead → stores answers → scores server-side → triggers email → returns result ID
- Results page is a Server Component that fetches from Supabase by result ID

---

## Page Structure & Funnel Flow

```
/                      → Landing Page (SEO, hero, proof, CTA)
/assessment            → Assessment Intro (what you'll learn, methodology)
/assessment/quiz       → Quiz Wizard (client-side, 20 yes/no questions)
/assessment/unlock     → Email Gate (name + email to unlock results)
/assessment/results    → Results Page (score, breakdown, diagnosis, CTA → Calendly)
/privacy               → Privacy Policy
/terms                 → Terms of Service
```

**Flow:** Landing → Intro → Quiz (public, zero friction) → Email Gate (post-quiz, sunk cost conversion) → Results → Calendly

**Email gate placement:** After quiz completion, before results. User has invested ~2.5 minutes answering questions — sunk cost makes them highly motivated to give email for their personalized results.

**Data flow at each step:**
1. **Quiz start → completion:** Client-side only. No server calls. PostHog tracks anonymously.
2. **Email gate submit (single Server Action):** Create lead in Supabase → store all 20 quiz answers + qualifying answers → score server-side (5 dimensions) → store scores + tier → trigger Resend email → return result ID → redirect to `/assessment/results?id=xxx`
3. **Results page load:** Server Component fetches result by ID from Supabase → renders personalized diagnosis.

---

## Assessment Framework (Priestley-Informed)

### Format
- **20 scored yes/no questions** across 5 dimensions (4 questions each)
- **2 qualifying questions** (Cinderella Client strategy — radio buttons, not scored)
- **~2.5 minutes** completion time
- Simple "Do you...?" / "Have you...?" / "Can you...?" format
- **All questions: Yes = 1 point (healthy), No = 0 points (gap) — no reversed polarity**
- Every "No" click accumulates tension — this IS the Priestley aha moment

### 5 Dimensions

**1. Migration & Version Health** — "We're running on borrowed time"
*Services: Angular upgrades, AngularJS migration*

| # | Question | 1pt = |
|---|----------|-------|
| Q1 | Is your app running Angular 16 or newer? | Yes |
| Q2 | Have you fully migrated away from AngularJS (v1.x)? | Yes |
| Q3 | Are your third-party dependencies updated at least annually? | Yes |
| Q4 | Can your team complete an Angular major version upgrade within 2 weeks? | Yes |

**2. Codebase Architecture** — "Our codebase is fighting against us"
*Services: NX adoption, architecture reviews*

| # | Question | 1pt = |
|---|----------|-------|
| Q5 | Is your codebase organized in a monorepo or with clear feature boundaries? | Yes |
| Q6 | Do you have documented architectural standards your team follows? | Yes |
| Q7 | Have you had a codebase architecture review in the past year? | Yes |
| Q8 | Can your modules or libraries be developed and tested independently? | Yes |

**3. Modern Angular Adoption** — "We're writing yesterday's Angular"
*Services: Standalone migration, Signals/RxJS audit, Forms & CVA review*

| # | Question | 1pt = |
|---|----------|-------|
| Q9 | Have you adopted standalone components? | Yes |
| Q10 | Do you have a consistent strategy for reactive state (Signals, RxJS, or both)? | Yes |
| Q11 | Are your forms maintainable and free of repetitive boilerplate? | Yes |
| Q12 | Does your team trust the test suite enough to refactor with confidence? | Yes |

**4. AI & Development Governance** — "AI is writing code with no guardrails"
*Services: AI guardrails setup, MCP configuration*

| # | Question | 1pt = |
|---|----------|-------|
| Q13 | Does your team have clear guidelines for using AI in Angular development? | Yes |
| Q14 | Are AI-generated code changes held to the same review standards as human code? | Yes |
| Q15 | Have you configured AI tools to follow your project's architectural patterns? | Yes |
| Q16 | Is your team using AI to accelerate modernization (not just feature work)? | Yes |

**5. Delivery & Talent Readiness** — "This is already costing us"
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

### Service Coverage Map

| Service | Questions that surface the need |
|---------|-------------------------------|
| Angular version upgrades | Q1, Q3, Q4 |
| AngularJS migration | Q2 |
| NX monorepo adoption | Q5, Q8 |
| Architecture reviews | Q6, Q7 |
| Standalone migration | Q9 |
| Signals/RxJS audit | Q10 |
| Forms & CVA review | Q11 |
| AI guardrails setup | Q13, Q14, Q15, Q16 |
| Strategy call (entry point) | Q17-Q20 (urgency) |

### Scoring Model
- **20 points maximum** (5 dimensions × 4 questions × 1 point)
- Per-dimension score: 0-4 each
- Overall score determines tier

### Result Tiers (based on total score)
| Tier | Score | Meaning | CTA |
|------|-------|---------|-----|
| **Critical Risk** | 0-7 | Significant gaps across multiple areas | "Book Your Free Modernization Strategy Call" (urgency) |
| **Modernization Ready** | 8-13 | Solid foundations, clear improvement areas | "Book Your Free Strategy Session" (opportunity) |
| **Well-Positioned** | 14-20 | Strong across the board | "Book a Quick Architecture Review" (optimization) |

**Priestley sweet spot:** Ideal clients land in "Modernization Ready" (8-13) — strong enough to take action, room to improve.

### Results Visualization
- **5 per-dimension score bars** (0-4 each, color-coded: red/amber/blue)
- Overall score bar with tier indicator (0-20 scale)
- Personalized diagnosis highlighting weakest dimension
- Tier-specific CTA card

---

## Offer Structure: Free-to-Paid Funnel

All tiers route to Calendly for a free strategy call — just with different messaging:
- **Critical Risk** → urgency framing: "Book Your Free Modernization Strategy Call"
- **Modernization Ready** → opportunity framing: "Book Your Free Strategy Session"
- **Well-Positioned** → optimization framing: "Book a Quick Architecture Review"

No payment integration in MVP. Monetization happens in the strategy call with custom proposals.

---

## Database Schema (Supabase Postgres)

### Table: `leads`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | auto-generated |
| first_name | text | from email gate |
| email | text UNIQUE | from email gate |
| created_at | timestamptz | auto |
| utm_source | text NULL | from URL params |
| utm_medium | text NULL | from URL params |
| utm_campaign | text NULL | from URL params |

### Table: `assessments`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | used in results URL |
| lead_id | uuid FK → leads.id | |
| answers | jsonb | `{"q1": true, "q2": false, ..., "q20": true}` |
| qualifying_answers | jsonb | `{"role": "tech_lead", "planning": "exploring_options"}` |
| total_score | int | 0-20 |
| dimension_scores | jsonb | `{"migration_health": 2, "architecture": 3, "modern_adoption": 1, "ai_governance": 2, "delivery_readiness": 2}` |
| tier | text | "critical_risk" / "modernization_ready" / "well_positioned" |
| completed_at | timestamptz | |
| email_sent_at | timestamptz NULL | set after Resend send |

### Table: `email_events` (optional for MVP)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| assessment_id | uuid FK | |
| resend_id | text | Resend message ID |
| type | text | "results" |
| status | text | "sent" / "delivered" / "opened" |
| created_at | timestamptz | |

**Key decisions:**
- JSONB for answers (flexible if questions change)
- UNIQUE email on leads (retakes create new assessment, not duplicate lead)
- Pre-computed dimension_scores (no recalculation on results page load)
- UTM tracking on leads (attribute traffic sources)

---

## Visual Design: Clean Navy + Angular Red

**Color palette (from existing site, proven to work):**
| Token | Value | Use |
|-------|-------|-----|
| Background | `#0F172A` | Main background |
| Surface | `#1E293B` | Cards, elevated elements |
| Border | `#253349` | Borders, dividers |
| Accent | `#FF5370` | Highlights, category labels |
| Secondary | `#93C5FD` | Strong dimension scores, links |
| Warning | `#FBBF24` | Medium scores, alerts |
| CTA | `#DD0031` | Angular Red — buttons, primary actions |
| Text | `#F1F5F9` | Primary text |
| Muted | `#A8B7CC` | Secondary text |
| Subtle | `#7A8CA3` | Tertiary text, labels |

**Design principles (what's NEW vs old site):**
- Remove glass-morphism / backdrop blur
- Remove staggered reveal animations
- Clean flat cards, no inset shadows
- More whitespace, less decoration
- Font: Inter (replacing DM Sans + IBM Plex)
- Icons: Lucide (matches shadcn/ui)
- **Key rule: restraint is the upgrade**

**Typography:**
- Font: Inter (single family, clean, universal)
- Headings: 600-700 weight
- Body: 400 weight
- Border radius: 8-12px
- Shadows: subtle glow effects, not drop shadows

### Responsive Design

**Mobile-first approach** — build for mobile, enhance for desktop. Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) handle breakpoints.

**Breakpoints (Tailwind defaults):**
| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | 0-639px | Mobile phones |
| `sm` | 640px+ | Large phones / small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Desktop |

**Per-component responsive behavior:**

| Component | Mobile (default) | Desktop (lg+) |
|-----------|-----------------|----------------|
| **Navigation** | Hamburger menu, sticky. CTA hidden in menu. | Horizontal nav, CTA button visible in bar. |
| **Landing hero** | Single column, smaller heading (text-2xl), stacked proof items | Centered layout, larger heading (text-4xl), inline proof items |
| **Proof strip** | Vertical stack, 1 stat per row | Horizontal row, 3-4 stats inline |
| **Quiz** | Full-width yes/no buttons stacked vertically, large touch targets (min 48px height) | Side-by-side yes/no buttons, centered max-width container (480px) |
| **Progress bar** | Compact: dimension label above, "4/20" right-aligned | Same but with more horizontal space |
| **Email gate form** | Full-width inputs, stacked layout | Centered max-width (400px), same stacked layout |
| **Results score bar** | Full width, tier labels below (small text) | Centered max-width (520px), tier labels inline |
| **Dimension bars** | Full width, label above bar | Label and score on same line, bar below |
| **CTA card** | Full width, padded | Centered max-width, same layout |
| **Calendly** | Popup widget (Calendly handles mobile responsiveness) | Popup widget |
| **Footer** | Stacked: links, then social, then copyright | 3-column grid |
| **Sticky mobile CTA** | Fixed bottom bar with CTA button, visible on landing page only | Hidden (desktop nav CTA is sufficient) |

**Key mobile UX rules:**
- Minimum touch target: 48px height for all interactive elements (buttons, radio options, links)
- No horizontal scrolling — all content fits within viewport
- Quiz question text: minimum 18px font size for readability
- Form inputs: 16px minimum font size (prevents iOS zoom on focus)
- Sticky mobile CTA bar on landing page only (not during quiz — would distract)

---

## Results Email (Resend)

Single transactional email triggered on quiz completion.

- **Subject:** "Your Angular Modernization Score: [Tier Name]"
- **Body:**
  - Personalized greeting (first name)
  - Overall score (X/20) and tier label
  - Per-dimension summary (5 dimensions, text-based bars)
  - One-line diagnosis of weakest dimension
  - Primary CTA: "View Your Full Results" → `/assessment/results?id=xxx`
  - Secondary CTA: "Book a Free Strategy Session" → Calendly link
- **Built with:** React Email (component-based, same DX as the app)
- **Triggered by:** `submit-assessment` Server Action

---

## Analytics (PostHog)

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Auto (PostHog) | route, utm_* |
| `assessment_started` | Quiz page load | source |
| `question_answered` | Each yes/no click | dimension, question_id, answer |
| `quiz_completed` | Last question answered | total_time |
| `email_submitted` | Email gate submit | — |
| `results_viewed` | Results page load | tier, total_score |
| `cta_clicked` | CTA button click | tier, cta_type |
| `quiz_abandoned` | Tab close / navigate away | last_question, dimension |

**Key metrics:** quiz start rate, step drop-off, completion rate, email conversion rate, score distribution, booking rate by tier.

---

## Content Architecture

### Content separation rule

**No user-facing string** (headline, body copy, button label, error message, email subject, SEO title, analytics event name, or external URL) may be defined inside a component file or page file. All text content lives in `lib/content/` files. All configuration values live in `lib/config/` files. Components import and render; they never define copy.

### Content boundary

| Layer | Location | What goes here | Example |
|-------|----------|---------------|---------|
| **Environment** | `.env` | API keys, secrets, service URLs | `SUPABASE_URL`, `RESEND_API_KEY`, `POSTHOG_KEY` |
| **Config** | `lib/config/` | Business logic values that change per decision, not per deploy | Calendly URL, analytics event names, tier score ranges |
| **Content** | `lib/content/` | All user-facing text that changes when copy is updated | Headlines, CTA labels, email subject, error messages |
| **Data** | `lib/data/` | Assessment question/dimension definitions | Questions, dimensions, qualifying questions |

### Content files

**`lib/content/landing.ts`** — All landing page copy:
- Hero: label, headline, subheadline, CTA text, mini-proof items
- Proof strip: eyebrow, stats (label + value + description), upsell text
- How it works: step definitions (title, description, icon)
- What you discover: benefit cards
- Final CTA: eyebrow, headline, subheadline, CTA text

**`lib/content/assessment.ts`** — Assessment intro + email gate copy:
- Intro page: heading, methodology description, benefit list, credibility statement
- Email gate: heading, subheading, trust signals, submit button text, form labels

**`lib/content/results.ts`** — Results page content:
- Tier-specific CTA cards (headline, body, button label, hint)
- Dimension display config (label, description, color token)
- Diagnosis templates per tier
- Compound risk statement templates (when multiple dimensions are weak)
- Score-level descriptors

**`lib/content/email.ts`** — Email template copy:
- Subject line template
- Greeting template
- Section headers
- CTA labels (primary + secondary)
- Footer copy (unsubscribe, company info)
- Preheader text per tier

**`lib/content/navigation.ts`** — Nav and layout:
- Site name / logo text
- Nav items (label + href)
- Nav CTA button text
- Mobile menu items

**`lib/content/seo.ts`** — Per-page metadata:
- Default site title, description, OG image
- Per-page overrides (title, description, noindex flag)
- JSON-LD structured data (FAQ, Organization)

**`lib/content/footer.ts`** — Footer:
- Copyright text template
- Social links (label + URL + icon)
- Legal links (Privacy, Terms)

**`lib/content/errors.ts`** — Error states:
- Form validation messages (Zod error map)
- 404 page copy
- Invalid results ID message
- Generic error message

### Config files

**`lib/config/site.ts`** — Site-wide constants:
- Site name, base URL, social URLs
- Calendly base URL, event slug, UTM builder function

**`lib/config/scoring.ts`** — Scoring configuration (imported by `lib/scoring.ts`):
- Tier definitions: id, label, score range (min/max), short diagnosis, CTA label, urgency framing
- Per-dimension risk thresholds
- Score-to-color mapping

**`lib/config/analytics.ts`** — Analytics event constants:
- Event name constants (`EVENTS.ASSESSMENT_STARTED`, `EVENTS.QUIZ_COMPLETED`, etc.)
- Property type definitions
- PostHog track calls must only reference these constants, never inline strings

### Type safety

All content and config objects must have TypeScript interfaces, so that adding a tier, renaming a dimension, or updating CTA text is type-checked across the entire app:

```typescript
// Example — not exhaustive
interface TierDefinition {
  id: string;
  label: string;
  scoreRange: { min: number; max: number };
  shortDiagnosis: string;
  ctaLabel: string;
  ctaHint: string;
}

interface DimensionMeta {
  id: string;
  label: string;
  description: string;
  dormantTension: string;
  colorToken: string;
}

interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, PostHog, metadata)
│   ├── page.tsx                      # Landing page
│   ├── assessment/
│   │   ├── page.tsx                  # Assessment intro
│   │   ├── quiz/
│   │   │   └── page.tsx              # Quiz wizard (client component)
│   │   ├── unlock/
│   │   │   └── page.tsx              # Email gate
│   │   └── results/
│   │       └── page.tsx              # Results (server component)
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── landing/                      # Landing page sections
│   ├── quiz/                         # Quiz wizard components
│   └── results/                      # Results page components
├── lib/
│   ├── content/                      # All user-facing text (see Content Architecture)
│   │   ├── landing.ts                # Landing page copy
│   │   ├── assessment.ts             # Intro + email gate copy
│   │   ├── results.ts                # Results page + diagnosis templates
│   │   ├── email.ts                  # Email template copy
│   │   ├── navigation.ts             # Nav items, logo, CTA text
│   │   ├── seo.ts                    # Per-page metadata + structured data
│   │   ├── footer.ts                 # Footer copy + social links
│   │   └── errors.ts                 # Validation messages, 404, error states
│   ├── config/                       # Business logic configuration
│   │   ├── site.ts                   # Site name, URLs, Calendly config
│   │   ├── scoring.ts                # Tier definitions, score ranges, thresholds
│   │   └── analytics.ts              # Event name constants + property types
│   ├── data/
│   │   └── questions.ts              # Question + dimension definitions (shared)
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   └── server.ts                 # Server Supabase client
│   ├── scoring.ts                    # Scoring engine (server-only, imports config/scoring.ts)
│   └── email.ts                      # Resend trigger (imports content/email.ts)
├── actions/
│   ├── submit-lead.ts                # Email gate Server Action
│   └── submit-assessment.ts          # Quiz completion Server Action
└── types/
    └── assessment.ts                 # Shared TypeScript types
```

**Key principles:**
- **No hardcoded strings in components** — all copy imported from `lib/content/`
- **No hardcoded config in logic** — all values imported from `lib/config/`
- Scoring logic server-only (never shipped to client bundle)
- Question definitions in `lib/data/` (shared by quiz UI + scoring engine)
- Server Actions in dedicated `actions/` folder
- Components organized by feature, not type
- shadcn/ui for base components, custom components for domain logic
- All content/config objects typed with TypeScript interfaces

---

## Verification Plan

### How to test end-to-end:
1. **Landing page:** Visit `/` — hero renders, CTA links to `/assessment`
2. **Assessment intro:** Visit `/assessment` — content renders, CTA links to `/assessment/quiz`
3. **Quiz:** Complete all 20 yes/no questions — progress bar advances through 5 dimensions, answers stored in form state
4. **Qualifying:** Answer 2 qualifying questions (radio buttons) — stored separately
5. **Email gate:** Submit name + email — Server Action fires, lead appears in Supabase `leads` table
6. **Scoring:** Verify `assessments` row has correct `total_score` (0-20), `dimension_scores` (5 dimensions), and `tier`
7. **Email:** Check Resend dashboard — results email delivered with correct score/tier and 5 dimension summaries
8. **Results page:** Visit `/assessment/results?id=xxx` — 5 score bars, tier, diagnosis, CTA all render correctly
9. **Calendly:** CTA button opens Calendly popup/redirect
10. **Analytics:** Check PostHog — all events firing with correct properties
11. **Retake:** Same email, new assessment — verify new assessment row, same lead row
12. **Invalid results:** Test invalid/missing result ID — redirects to `/assessment`
13. **Responsive:** Mobile check at 375px, 768px, 1024px+

### Key things to verify:
- All 20 questions use consistent polarity (Yes=1pt, No=0pt — no exceptions)
- Dimension scores sum correctly (each dimension 0-4, total 0-20)
- Tier assignment matches updated boundaries (0-7 / 8-13 / 14-20)
- Results page handles invalid/missing ID gracefully (redirect to `/assessment`)
- Email gate rejects invalid emails (Zod validation)
- PostHog events fire on quiz abandonment (beforeunload)
- UTM params persist through the funnel and appear in leads table

---

## What's NOT in MVP scope
- User authentication / accounts
- Admin dashboard (use Supabase dashboard directly)
- Payment integration
- Blog / content pages
- PDF report export
- CRM sync
- A/B testing
- Follow-up email sequences (just the one results email)

All of these can be added in V2 without architectural changes.
