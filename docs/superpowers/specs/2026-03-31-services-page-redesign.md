# Services Page Redesign

> Full rethink of `/services` to align with homepage design language, apply Daniel Priestley's Scorecard Marketing methodology, and serve as a conversion page for an early-stage consultant with no audience, clients, or testimonials.

## Context

The current services page is a plain `max-w-4xl` container with basic bordered cards. It uses none of the homepage design system (GlassCard, Section, Tagline, Fraunces headings, Reveal animations, pill buttons, dot-grid backgrounds). It also displays pricing, which is premature at this stage.

This redesign:
- Aligns the page with the homepage's visual language
- Applies Priestley's Emotion → Logic → Urgency arc
- Positions the free assessment (scorecard) as the primary CTA (product-for-prospects)
- Replaces social proof with competence signals (methodology, self-selection, process transparency)
- Removes pricing — CTAs go to Calendly or the assessment

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Page flow | Problem-led (B) | Leads with pain visitors already feel; builds trust through recognition |
| Hero angle | Pain-focused | "Stuck Between Legacy Code and a Full Rewrite?" — names the frustration |
| Pain points | Hybrid (2 from homepage + 2 new) | Familiar points create continuity; new ones deepen understanding |
| Service detail | Full sections per service | At this stage, depth signals competence when there's no pricing/testimonials |
| FAQ scope | Trust + practical (6 Qs) | Trust Qs do heavy lifting for credibility; practical Qs set expectations |
| Primary CTA | Free Assessment (not discovery call) | Priestley: scorecard is the product-for-prospects — low friction, collects data |
| Pricing | Removed | Too early to anchor pricing with no track record |

## Page Structure

8 sections following **Emotion → Logic → Urgency**:

### Section 1: Hero (EMOTION)

**Background:** Default (dot-grid + indigo glow orb top-right)
**Components:** Section, Tagline, Reveal

| Element | Detail |
|---------|--------|
| Tagline | `CONSULTING SERVICES` |
| Heading | `Stuck Between Legacy Code and a Full Rewrite?` (Fraunces, `text-4xl md:text-5xl`) |
| Subtitle | "You don't need to rebuild everything. Targeted modernization, smarter tooling, and a clear roadmap can get your Angular app where it needs to be — without the risk of a rewrite." |
| Primary CTA | `Take the Free Assessment` → `/assessment` (pill button with glow) |
| Secondary CTA | `Book a Discovery Call` → Calendly (outline button) |
| Visual | Dot-grid background, indigo glow orb top-right |
| Animation | Reveal on load |

### Section 2: Problem → Solution Mapping (EMOTION → LOGIC)

**Background:** Muted (`#131C2E`)
**Components:** Section, Tagline, GlassCard, Reveal

| Element | Detail |
|---------|--------|
| Tagline | `SOUND FAMILIAR?` |
| Heading | `The Problems That Bring Teams to Us` (Fraunces) |
| Layout | 2×2 grid of GlassCards (stacks to 1-col on mobile) |

**Cards** (each with colored left border, icon, quote, explanation, service link):

| Card | Pain Point (quote) | Border Color | Maps To |
|------|--------------------|--------------|---------|
| 1 | "We've been on Angular 12 for two years" | `#93C5FD` (blue) | → Angular Modernization Audit |
| 2 | "We bought 5 AI tools but none stuck" | `#C4B5FD` (purple) | → AI Tool Stack Rationalization |
| 3 | "Nobody wants to touch the legacy module" | `#FBBF24` (amber) | → Consulting & Implementation |
| 4 | "We need a plan but don't know where to start" | `#34D399` (emerald) | → Start with the Free Assessment |

Cards 1 and 2 are familiar from the homepage Problem Framing section. Cards 3 and 4 are new and service-specific. Card 4 funnels undecided visitors to the assessment.

**Animation:** Reveal with staggered delay per card.

### Section 3: Scorecard Bridge (LOGIC — Product-for-Prospects)

**Background:** Default
**Components:** Section, Tagline, GlassCard (highlight variant), Reveal

This is the Priestley-inspired "product-for-prospects" section. It positions the free assessment as Step 0 — the diagnostic that comes before any paid service.

| Element | Detail |
|---------|--------|
| Tagline | `NOT SURE WHERE YOU STAND?` |
| Heading | `Start With a Free Diagnostic` (Fraunces) |
| Subtitle | "Score your Angular app across 5 dimensions in under 3 minutes. Get a personalized action plan — then decide if you need help executing it." |
| GlassCard | Highlight variant (indigo tint) containing: |
| — Stats row | `20 Questions` · `5 Dimensions` · `3 min` · `Free` (same pattern as homepage StatsBar but inline) |
| — Dimension preview | 5 colored pills: Version Health, Architecture, Dependencies, AI Readiness, Delivery |
| — CTA | `Take the Free Assessment →` (pill button with glow) |
| Trust signal | "No signup required until you see your results" |

**Animation:** Reveal on the card.

### Section 4a: Angular Modernization Audit (LOGIC)

**Background:** Muted
**Components:** Section, Tagline, IconCircle, GlassCard, Reveal

**Layout:** Two-column — text left, deliverables card right.

| Element | Detail |
|---------|--------|
| Left column | |
| — Label | IconCircle (`Search` icon) + `SERVICE 01` tagline |
| — Heading | `Angular Modernization Audit` (Fraunces, `text-2xl md:text-3xl`) |
| — Problem | "You suspect your Angular codebase is slowing the team down — but you don't know where the biggest risks are or where to start." (italic, muted) |
| — Description | From `services.ts` — deep-dive covering version health, architecture patterns, modern API adoption, delivery readiness |
| — CTA | `Book a Discovery Call →` (pill button) → Calendly with `services-angular-audit` UTM |
| Right column | |
| — GlassCard | "WHAT YOU GET" header + 5 deliverables with emerald checkmarks |
| — Deliverables | Full assessment across 5 dimensions · Prioritized technical debt and risks · Actionable roadmap with quick wins · Written report within 14 days · 60-min debrief call |

**Animation:** Reveal with slight delay on the card.

### Section 4b: AI Tool Stack Rationalization (LOGIC)

**Background:** Default
**Components:** Same as 4a

**Layout:** Two-column — deliverables card LEFT, text RIGHT (alternating).

| Element | Detail |
|---------|--------|
| Right column | |
| — Label | IconCircle (`Bot` icon) + `SERVICE 02` tagline |
| — Heading | `AI Tool Stack Rationalization` (Fraunces) |
| — Problem | "Your team is adopting AI tools ad hoc — different devs using different tools with no governance, inconsistent output quality, and growing security concerns." |
| — Description | From `services.ts` — audit of AI tooling landscape, standardization recommendation |
| — CTA | `Book a Discovery Call →` → Calendly with `services-ai-rationalization` UTM |
| Left column | |
| — GlassCard | "WHAT YOU GET" + 5 deliverables: Tool inventory & usage patterns · Security & governance risk assessment · Recommended standard stack · Implementation guide & rollout plan · Team onboarding playbook |

### Section 4c: Consulting & Implementation (LOGIC)

**Background:** Muted
**Components:** Same as 4a

**Layout:** Two-column — text left, deliverables card right (same as 4a).

| Element | Detail |
|---------|--------|
| Left column | |
| — Label | IconCircle (`Puzzle` icon) + `SERVICE 03` tagline |
| — Heading | `Consulting & Implementation` (Fraunces) |
| — Problem | "You need a senior Angular expert on hand for a specific challenge — whether that's leading a migration, unblocking an architectural decision, or mentoring your team." |
| — Description | From `services.ts` — flexible support from one-off sessions to multi-week embedded work |
| — CTA | `Book a Discovery Call →` → Calendly with `services-consulting` UTM |
| Right column | |
| — GlassCard | "WHAT YOU GET" + 5 deliverables: Hands-on migration/refactoring support · Architecture reviews & decision facilitation · Team workshops & pair programming · Code review & PR guidance · Flexible scope — single sessions to multi-week sprints |

### Section 5: Who This Is For (LOGIC — Cinderella Clients)

**Background:** Default
**Components:** Section, Tagline, GlassCard, Reveal

Priestley's "Cinderella client" self-selection. Helps visitors qualify themselves — builds trust through honesty about fit.

| Element | Detail |
|---------|--------|
| Tagline | `IS THIS A GOOD FIT?` |
| Heading | `Who These Services Are For` (Fraunces) |
| Layout | Two GlassCards side by side (stack on mobile) |

**Left card (emerald accent):**
- Header: "This is for you if..."
- Items (emerald checkmarks):
  - You lead or work on an Angular team at a mid-size company
  - Your app is 2+ major versions behind
  - You've tried upgrading but it stalled or felt too risky
  - You want a structured roadmap, not just opinions
  - You're evaluating AI tools but need a clear strategy

**Right card (red accent):**
- Header: "This probably isn't for you if..."
- Items (red X marks):
  - You need a full ground-up rewrite (not modernization)
  - You're looking for a staff-augmentation developer
  - Your team is already on the latest Angular version
  - You need React or Vue migration (this is Angular-focused)

### Section 6: How I Work (LOGIC)

**Background:** Muted
**Components:** Section, Tagline, GlassCard, IconCircle, Reveal

| Element | Detail |
|---------|--------|
| Tagline | `HOW IT WORKS` |
| Heading | `From First Call to Action Plan` (Fraunces) |
| Layout | 3-column GlassCard grid (stacks on mobile) |

**Cards:**

| Step | Icon Color | Title | Description |
|------|-----------|-------|-------------|
| 1 | Indigo (`#6366F1`) | Discovery Call | Free 30-min call. We discuss your codebase, pain points, and goals. No commitment. |
| 2 | Emerald (`#34D399`) | Proposal & Scope | I send a tailored proposal with scope, timeline, and investment. You decide if it fits. |
| 3 | Amber (`#FBBF24`) | Deliver & Walk Through | I deliver the work, walk you through findings, and leave you with clear next steps. |

Each card: numbered IconCircle + title + description. Staggered Reveal animation.

### Section 7: FAQ (LOGIC + URGENCY)

**Background:** Default
**Components:** Section, Tagline, GlassCard (accordion), Reveal

| Element | Detail |
|---------|--------|
| Tagline | `QUESTIONS` |
| Heading | `Frequently Asked` (Fraunces, centered) |
| Layout | Centered column (max-w-2xl), GlassCard accordion items |

**Questions (6 total):**

**Trust questions:**
1. **Why isn't pricing listed on the page?** — Every project is different. Scope, complexity, and timeline vary. I send a transparent proposal after the discovery call so the investment reflects what you actually need — not a one-size-fits-all package.
2. **What if I'm not sure which service I need?** — That's exactly what the free assessment and discovery call are for. The assessment scores your app across 5 dimensions, and the call helps us figure out the right engagement together.

**Practical questions:**
3. **How long does a typical engagement take?** — Audits take 10–14 days. Consulting engagements are flexible — from single advisory sessions to multi-week embedded work. We agree on timeline before starting.
4. **What do I need to prepare before we start?** — For audits: repository access and a brief on your team's pain points. For consulting: a clear description of the challenge. I'll send a prep checklist after we agree on scope.
5. **Can you work alongside my existing team?** — Yes. Consulting engagements are designed for collaboration — code reviews, pair programming, architecture sessions. I work with your team, not in isolation.

**Urgency question:**
6. **What happens if we keep delaying the upgrade?** — Each Angular version you skip compounds the upgrade cost. Dependencies drift, patterns become unsupported, and security patches stop. Teams that wait 3+ versions often face a rewrite conversation they could have avoided with incremental modernization.

**Behavior:** Click to expand/collapse. Smooth height transition. Only one open at a time. Indigo `+`/`-` toggle icon.

### Section 8: Final CTA (URGENCY)

**Background:** Muted
**Components:** Section, Tagline, GlassCard (highlight), Reveal

| Element | Detail |
|---------|--------|
| Tagline | `READY TO START?` |
| Heading | `Every Version You Skip Makes the Next Upgrade Harder` (Fraunces) |
| Subtitle | "Find out where your app stands in 3 minutes — or book a free call to talk through your situation. No pitch, no commitment." |
| Primary CTA | `Take the Free Assessment` → `/assessment` (pill with glow) |
| Secondary CTA | `Or Book a Discovery Call` → Calendly (outline) |
| Container | Centered highlight GlassCard with subtle indigo glow |

## Design System Components Used

All components from the existing homepage design system:

| Component | File | Usage |
|-----------|------|-------|
| Section | `src/components/ui/section.tsx` | Every section wrapper (alternating default/muted) |
| GlassCard | `src/components/ui/glass-card.tsx` | Pain point cards, deliverables, process steps, FAQ items, CTA container |
| Tagline | `src/components/ui/tagline.tsx` | Section eyebrows (indigo uppercase) |
| Reveal | `src/components/ui/reveal.tsx` | Scroll animations on every section |
| IconCircle | `src/components/ui/icon-circle.tsx` | Service labels, process step numbers |
| Button (pill variant) | `src/components/ui/button-variants.ts` | All CTAs (pill shape + glow for primary) |

**Typography:**
- All section headings: Fraunces (`font-heading`)
- Body text: Inter (`font-sans`)
- Taglines: `text-xs uppercase tracking-[0.2em] font-bold text-indigo-400`

**Backgrounds:** Alternating `default` and `muted` (#131C2E) across sections. Dot-grid on hero section.

## Content Data Structure

Extend `src/lib/content/services.ts`:

- Keep `pricing` and `timeline` in the `Service` interface but do not render them (useful for future use)
- Add `icon` field per service — use Lucide icon components (`Search`, `Bot`, `Puzzle`) matching the homepage's icon style
- Add new exports: `servicesHero`, `painPoints`, `fitCriteria`, `processSteps`, `faqItems`
- Keep existing `services` array for the deep-dive data

## New Components to Create

| Component | Path | Purpose |
|-----------|------|---------|
| ServicesHero | `src/components/services/services-hero.tsx` | Hero with pain-focused headline + dual CTAs |
| ProblemSolutionMap | `src/components/services/problem-solution-map.tsx` | 2×2 pain-point card grid |
| ScorecardBridge | `src/components/services/scorecard-bridge.tsx` | Product-for-prospects assessment pitch |
| ServiceDeepDive | `src/components/services/service-deep-dive.tsx` | Reusable alternating text/deliverables layout (accepts `reversed` prop) |
| FitCheck | `src/components/services/fit-check.tsx` | "For you / Not for you" two-column cards |
| ProcessSteps | `src/components/services/process-steps.tsx` | 3-step horizontal card grid |
| ServicesFaq | `src/components/services/services-faq.tsx` | Accordion with expand/collapse |
| ServicesCta | `src/components/services/services-cta.tsx` | Final urgency CTA |

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | All grids stack to 1 column. Service deep-dives stack text above deliverables card. FAQ full-width. CTAs stack vertically. |
| Tablet (640-1024px) | Pain point grid: 2×2. Service deep-dives: side by side. Process steps: 3-col. |
| Desktop (1024px+) | Full layouts as designed. Max-width containers per Section component. |

## Accessibility

- FAQ accordion: `button` elements with `aria-expanded`, `aria-controls`, linked `id`s
- Pain point cards: semantic `article` elements
- Service sections: `aria-labelledby` linking to headings
- All CTAs: proper `<a>` or `<Link>` elements (not `<div>` with onClick)
- Color contrast: all text meets WCAG AA on dark backgrounds
- Reveal animations: respect `prefers-reduced-motion`

## Verification

1. **Visual alignment:** Compare services page side-by-side with homepage — should feel like the same site
2. **Component reuse:** Confirm all sections use GlassCard, Section, Tagline, Reveal (no raw divs with ad-hoc styles)
3. **Responsive:** Test at 375px, 768px, 1280px breakpoints
4. **CTA flow:** Primary CTA (assessment) links to `/assessment`, secondary (call) links to Calendly with correct UTM params
5. **FAQ behavior:** Accordion expands/collapses correctly, one item at a time
6. **Animations:** Reveal triggers on scroll, respects `prefers-reduced-motion`
7. **No pricing visible:** Confirm pricing/timeline are not rendered anywhere
8. **Lighthouse:** Aim for 90+ on Performance, Accessibility, Best Practices
