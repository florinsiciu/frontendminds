# Website Workflow Design: Content-First → Assessment → Book Call

## Context

FrontendMinds is launching from 0 audience and 0 clients. The website has a mature assessment funnel (quiz → email gate → results → Calendly) but no strategy for getting warm traffic into that funnel. The site currently pushes cold visitors directly to a 22-question quiz — a high-commitment ask from a stranger.

This spec redesigns the website workflow to support a **Content-First** approach: LinkedIn posts drive traffic to blog articles, blog articles build trust and guide readers to the assessment, and the newsletter captures visitors who aren't ready to assess yet.

## Strategy: Content-First → Assessment

**Traffic plan:** LinkedIn posts first (Phase 1), then SEO/blog content (Phase 2).

**Core insight:** At 0 audience, trust is the bottleneck — not conversion mechanics. The assessment funnel works; the problem is getting people to the top of it with enough confidence to take a 22-question quiz.

**The flow:**

```
LinkedIn Post → Blog Article → Assessment CTA → Quiz → Email Gate → Results → Book Call
                            └→ Newsletter (backup) → Nurture Emails → Assessment
```

**Page roles:**
- **Attract:** Blog posts, About page (build trust, prove expertise)
- **Bridge:** Newsletter (captures low-intent visitors, warms them over time)
- **Convert:** Assessment funnel (quiz → email gate → results)
- **Close:** Results page tier-specific CTAs → Calendly booking

## Changes Required

### Sprint 1 — Unblock the Content-First Flow

#### 1.1 Assessment CTA Component for Blog Posts

Create a reusable component that promotes the scorecard within blog articles. Two variants:

**Inline variant** — Embeddable mid-article via MDX shortcode. Compact banner style.
- Copy: *"Wondering where your Angular app stands? Take the free 3-minute modernization scorecard →"*
- Links to `/assessment`
- Visually distinct from body text (card/banner style) but not disruptive

**End-of-article variant** — Appears after blog content, ABOVE the existing newsletter LeadMagnet.
- Larger, more prominent than inline
- Copy: *"See where your app stands"* with brief value prop + CTA button
- Links to `/assessment`

**Files to modify/create:**
- Create: `src/components/blog/assessment-cta.tsx` (the component with both variants)
- Modify: `src/app/blog/[slug]/page.tsx` — add end-of-article assessment CTA above LeadMagnet
- The inline variant is available as an MDX component for manual placement in articles

#### 1.2 Dual CTA Layout on Blog Posts

Restructure the bottom of every blog post to present two clear paths:

1. **Primary CTA (assessment):** More prominent, larger, above
2. **Secondary CTA (newsletter):** Smaller, below — *"Not ready yet? Get weekly insights →"*

This replaces the current newsletter-only bottom CTA. The existing `LeadMagnet` component stays but becomes secondary.

**Files to modify:**
- `src/app/blog/[slug]/page.tsx` — restructure bottom CTA area

#### 1.3 Write 2-3 Blog Articles

Content that maps to assessment dimensions and supports LinkedIn posting:

- *"5 Signs Your Angular App Is Falling Behind"* (maps to scorecard dimensions)
- *"Why Most Angular Migrations Fail (And How to Avoid It)"* (pain-focused)
- *"The Real Cost of Staying on AngularJS in 2026"* (urgency)

Each article includes the inline assessment CTA mid-article and the dual CTA at bottom.

**Files to create:**
- `content/blog/angular-falling-behind.mdx`
- `content/blog/angular-migrations-fail.mdx`
- `content/blog/cost-of-angularjs-2026.mdx`

### Sprint 2 — Newsletter as Safety Net

#### 2.1 Newsletter Confirmation State

After subscribing via any newsletter form, show a confirmation with assessment cross-sell instead of just setting a localStorage flag silently.

- Show: *"You're in! Check your inbox for a welcome email."*
- Cross-sell: *"In the meantime, see where your Angular app stands →"* linking to `/assessment`

**Files to modify:**
- `src/components/newsletter-form.tsx` — enhance success state with assessment CTA

#### 2.2 Email Nurture Sequence

5 emails over 14 days that warm newsletter subscribers toward the assessment:

| Email | Day | Purpose | Content |
|-------|-----|---------|---------|
| 1 | 0 | Welcome | Welcome + link to best article |
| 2 | 3 | Value | Quick insight/tip (pure value, no pitch) |
| 3 | 7 | Soft pitch | *"Most teams don't know where their gaps are"* + assessment link |
| 4 | 10 | Social proof | Case study or real-world example (placeholder until you have one) |
| 5 | 14 | Direct CTA | *"Take the scorecard — it's 3 minutes"* + assessment link |

**Implementation:** Resend Audiences + broadcast API or a scheduled job. The exact mechanism depends on Resend's sequence capabilities.

**Files to create:**
- Email templates in `src/lib/email/` for each nurture email
- Scheduling logic (server action or cron) to trigger the sequence

### Sprint 3 — Polish & Cleanup

#### 3.1 Services Page CTA Reorder

Reorder hero CTAs so assessment comes before "Book a Discovery Call." At 0 clients, every lead should go through the assessment first for qualification.

**Files to modify:**
- `src/app/services/page.tsx` or the relevant content file — swap CTA priority in hero section

#### 3.2 Remove `/resources` Page

The resources page has 1 item (the scorecard) which is already accessible from 15+ CTAs across the site. It's completely redundant.

**Files to delete:**
- `src/app/resources/page.tsx`
- `src/lib/content/resources.ts`

**Files to modify:**
- `src/lib/content/navigation.ts` — remove from `mobileMenuItems`
- `src/lib/content/footer.ts` — remove from `footerNav`
- `src/components/landing/footer.tsx` — remove hardcoded Resources link
- `src/app/sitemap.ts` — remove `/resources` entry

#### 3.3 Remove `/author/florin-siciu` Page

Duplicate of `/about`. Same story, same credibility. Not linked from nav, footer, or blog posts.

**Files to delete:**
- `src/app/author/[slug]/page.tsx` (and directory)

**Files to modify:**
- `src/app/feed.xml/route.ts` — change author link to `/about`
- `src/app/sitemap.ts` — remove `/author/florin-siciu` entry

#### 3.4 Post-Assessment Follow-Up Emails

For people who got results but didn't book a call — follow-up emails at Day 3 and Day 7 with tier-specific content.

**Files to create:**
- Email templates for follow-up emails
- Tracking logic to detect non-booking (may require a flag in Supabase assessments table)

## What's NOT Changing

- **Assessment funnel** (`/assessment/*`) — works well, don't touch
- **Home page** — works for both cold and LinkedIn traffic
- **About page** — strong trust builder, works as-is
- **Contact page** — hidden from main nav, catches edge cases, leave it
- **Privacy/Terms** — legal pages, keep
- **Newsletter page** (`/newsletter`) — useful as direct link from LinkedIn bio

## What's NOT in Scope

- Gated content / PDF downloads — premature without audience
- Payment integration — invoice manually until 5+ monthly clients
- Post-booking prep page — nice to have, zero urgency at 0 bookings
- Resources page overhaul — removing it entirely instead

## Phased Launch Strategy

**Weeks 1-3 (before articles):** LinkedIn posts with insights written directly in the post. No link or soft CTA (*"Building a free Angular modernization scorecard — DM for early access"*). Site works as-is for anyone who finds it.

**Week 3-4 (first articles published):** LinkedIn posts tease an insight → link to full blog article. Blog article has assessment CTA at bottom. Content-First flow is live.

**Week 5+ (5+ articles, newsletter subscribers):** Full workflow running. SEO starts indexing. Nurture sequence converts subscribers. Assessment gets warm, trust-built traffic.

## Verification

1. **Blog → Assessment flow:** Visit a blog article → verify assessment CTA appears above newsletter CTA → click through to assessment → complete quiz → verify results page loads
2. **Blog → Newsletter flow:** Visit a blog article → subscribe via secondary newsletter CTA → verify confirmation shows assessment cross-sell → verify welcome email received
3. **Nurture sequence:** Subscribe → verify emails arrive at Day 0, 3, 7, 10, 14 with correct content and working assessment links
4. **Removed pages:** Verify `/resources` returns 404, `/author/florin-siciu` returns 404, no broken links in nav/footer/sitemap/RSS
5. **Services CTA order:** Verify assessment CTA appears before "Book Call" on services page hero
