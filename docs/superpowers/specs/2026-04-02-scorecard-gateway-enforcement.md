# Scorecard Gateway Enforcement

**Date:** 2026-04-02
**Methodology:** Daniel Priestley's Scorecard Marketing
**Principle:** The scorecard is the only gateway to a sales conversation.

---

## Context

The current website has direct "Book a Discovery Call" Calendly links on the Services page (hero, 3 service cards, closing CTA) and About page that allow visitors to bypass the Angular Modernization Scorecard entirely. Additionally, all three result tiers on the assessment results page push to Calendly booking, when Priestley's methodology says only high-urgency (low-scoring) leads should be directed to a call.

This design enforces strict alignment with Priestley's Scorecard Marketing: every visitor must complete the assessment before seeing a booking option, and only the most urgent tier gets a direct call CTA.

---

## Changes

### 1. Remove Direct Booking CTAs

All Calendly links outside the assessment results page are removed and replaced with assessment-driving copy.

#### Services Page

| Location | Current | New |
|---|---|---|
| Services Hero secondary CTA | "Book a Discovery Call" -> Calendly | "See Where You Stand" -> `/assessment` |
| Service Card 1 (Angular Audit) | "Book a Discovery Call" -> Calendly | "Start With Your Free Assessment" -> `/assessment` |
| Service Card 2 (AI Rationalization) | "Book a Discovery Call" -> Calendly | "Start With Your Free Assessment" -> `/assessment` |
| Service Card 3 (Consulting) | "Book a Discovery Call" -> Calendly | "Start With Your Free Assessment" -> `/assessment` |
| Services CTA secondary | "Or Book a Discovery Call" -> Calendly | Remove button; add trust signal text: "Free - No signup until results" |
| Services CTA subtitle | "...or book a free call to talk through your situation. No pitch, no commitment." | "Find out where your app stands in 3 minutes - then get a personalized next step." |
| Process Steps, Step 1 | "Discovery Call" / "Free 30-min call..." | "Take the Assessment" / "Score your app across 5 dimensions in 3 minutes. Your results tell us exactly where to focus." |

**File:** `src/lib/content/services.ts`
- `servicesHero.secondaryCta` -> `{ text: "See Where You Stand", href: "/assessment" }`
- `services[0].ctaText` -> `"Start With Your Free Assessment"`, `ctaHref` -> `"/assessment"`
- `services[1].ctaText` -> `"Start With Your Free Assessment"`, `ctaHref` -> `"/assessment"`
- `services[2].ctaText` -> `"Start With Your Free Assessment"`, `ctaHref` -> `"/assessment"`
- `servicesCta.subtitle` -> updated copy (no mention of booking)
- `servicesCta.secondaryCta` -> remove property entirely (make optional in type)
- `processSteps.steps[0]` -> title: "Take the Assessment", description: updated

**File:** `src/components/services/services-hero.tsx`
- Remove `target="_blank"` and `rel="noopener noreferrer"` from secondary CTA (now internal link)

**File:** `src/components/services/services-cta.tsx`
- Remove secondary CTA button; replace with trust signal `<p>` element

#### About Page

| Location | Current | New |
|---|---|---|
| About CTA secondary | "Book a Discovery Call" -> Calendly | Remove entirely - single CTA only |
| About CTA subtitle | "...or book a call to talk through your modernization challenges." | "Take the free 3-minute assessment across 5 dimensions and get your personalized action plan." |

**File:** `src/lib/content/about.ts`
- `aboutCta.subtitle` -> updated copy
- `aboutCta.secondaryCta` -> remove property

**File:** `src/components/about/about-cta.tsx`
- Remove secondary CTA button and its container; single centered primary CTA

### 2. Differentiate Results Page CTAs by Tier

Only the `critical_risk` tier (lowest score) gets a Calendly booking CTA. Other tiers get value-driven next steps.

| Tier | Current CTA | New CTA | Destination |
|---|---|---|---|
| `critical_risk` | "Book Your Free Modernization Strategy Call" | **No change** | Calendly |
| `modernization_ready` | "Book Your Free Strategy Session" | "Get Your Free Modernization Checklist" | Direct download (no gate - they already gave email) |
| `well_positioned` | "Book a Quick Architecture Review" | "Subscribe to The Frontend Signal" | `/newsletter` |

#### Updated Content (`src/lib/content/results.ts`)

```typescript
tierCtaCards: {
  critical_risk: {
    // No changes - keeps Calendly booking CTA
    headline: "Your Angular Stack Needs Immediate Attention",
    body: "Your score reveals significant gaps...",
    buttonLabel: "Book Your Free Modernization Strategy Call",
    hint: "30-minute call - we'll review your results together and identify your top 3 priorities",
  },
  modernization_ready: {
    headline: "You're Ready to Modernize - Here's Your Roadmap",
    body: "Your foundations are solid. Download the modernization checklist to prioritize the improvements that will deliver the biggest impact for your team.",
    buttonLabel: "Get Your Free Modernization Checklist",
    hint: "Actionable checklist based on your score - delivered instantly",
  },
  well_positioned: {
    headline: "Strong Score - Stay Ahead of the Curve",
    body: "Your Angular stack is in great shape. Subscribe to The Frontend Signal for advanced optimization strategies, modern patterns, and AI tooling insights.",
    buttonLabel: "Subscribe to The Frontend Signal",
    hint: "Weekly insights for teams that are already ahead",
  },
}
```

#### Updated TierCtaCard Type

Add a `ctaType` field to distinguish rendering behavior:

```typescript
export interface TierCtaCard {
  headline: string;
  body: string;
  buttonLabel: string;
  hint: string;
  ctaType: "calendly" | "download" | "internal-link";
  ctaHref?: string; // For download URL or internal link
}
```

- `critical_risk`: `ctaType: "calendly"` (renders external Calendly link)
- `modernization_ready`: `ctaType: "download"`, `ctaHref: "/resources/modernization-checklist.pdf"` (direct download link)
- `well_positioned`: `ctaType: "internal-link"`, `ctaHref: "/newsletter"` (internal Next.js link)

#### Updated Component (`src/components/results/tier-cta.tsx`)

Refactor to conditionally render based on `ctaType`:
- `"calendly"` -> external `<a>` with `target="_blank"` and PostHog tracking (existing behavior)
- `"download"` -> `<a>` with `download` attribute and PostHog tracking
- `"internal-link"` -> Next.js `<Link>` with PostHog tracking

### 3. New Assets Required

- **Modernization Checklist PDF** (or page): Content to be created separately. The implementation sets up the link/route. Placeholder path: `/resources/modernization-checklist.pdf` or `/public/resources/modernization-checklist.pdf`

### 4. Analytics Updates

Update PostHog `CTA_CLICKED` events to include the new CTA types:
- `cta_type: "calendly"` (critical_risk)
- `cta_type: "download"` (modernization_ready)
- `cta_type: "newsletter"` (well_positioned)

---

## What Stays the Same

- Homepage funnel (already assessment-first)
- Navigation "Take the Scorecard" CTA
- Blog assessment CTAs
- Newsletter page and forms
- Exit intent popup
- Sticky mobile CTA
- Email follow-up sequences (Day 0, 3, 7)
- Assessment quiz flow and email gate
- Contact page

---

## Files Modified

1. `src/lib/content/services.ts` - Remove all Calendly references, update copy
2. `src/lib/content/about.ts` - Remove secondaryCta, update subtitle
3. `src/lib/content/results.ts` - Add ctaType/ctaHref to TierCtaCard, update mid/high tier content
4. `src/components/services/services-hero.tsx` - Remove external link attributes from secondary CTA
5. `src/components/services/services-cta.tsx` - Remove secondary CTA button, add trust signal text
6. `src/components/about/about-cta.tsx` - Remove secondary CTA button, single CTA layout
7. `src/components/results/tier-cta.tsx` - Conditional rendering by ctaType

---

## Verification

1. Run `npm run build` to confirm no broken imports or type errors
2. Navigate to `/services` - confirm no Calendly links, all CTAs point to `/assessment`
3. Navigate to `/about` - confirm single CTA pointing to `/assessment`
4. Complete assessment with a low score - confirm Calendly booking CTA on results
5. Complete assessment with a mid score - confirm checklist download CTA on results
6. Complete assessment with a high score - confirm newsletter CTA on results
7. Check PostHog events fire correctly with new cta_type values
8. Grep codebase for remaining Calendly references - should only exist in results tier-cta (critical_risk) and siteConfig
