# FrontendMinds.com Platform Design Spec

**Date:** 2026-03-30
**Status:** Draft
**Author:** Florin Siciu + Claude

---

## Context

Florin Siciu is an Angular modernization consultant building a lead-generation and authority platform. He has already built a production-ready Angular Modernization Scorecard at `florinsiciu.com` using Next.js, Supabase, Resend, and PostHog (7 phases complete).

His roadmap defines a two-domain brand architecture:
- **FrontendMinds.com** = primary content/SEO/conversion platform
- **FlorinSiciu.com** = personal identity hub (future, out of scope here)

This spec covers the design of **FrontendMinds.com** by evolving the existing `florinsiciu` codebase: rebranding it, migrating the scorecard, and adding blog, newsletter, services, and supporting pages.

---

## Approach

**Evolve the existing codebase.** The current project has clean architecture (externalized content, typed config, server-only scoring, component separation). Adding a content platform on top of this is additive work, not a rewrite.

**What stays:** Supabase schema, scoring engine, quiz components, server actions, PostHog integration, email template, deployment config.

**What changes:** Brand identity (colors, logo, metadata), navigation, homepage, and the addition of new page types (blog, newsletter, services, about, contact, author, resources).

---

## Route Structure

```
/                           Homepage (platform intro, featured content, scorecard CTA, newsletter CTA)
/blog                       Blog index (filterable by category, paginated)
/blog/[slug]                Blog post (MDX rendered)
/newsletter                 Newsletter landing page + signup
/services                   Services overview (audit offers, consulting)
/about                      About FrontendMinds + founder section
/contact                    Contact form + booking link
/author/florin-siciu        Author page (bio, articles, social links)
/resources                  Lead magnets / free tools index
/assessment                 Scorecard intro (migrated, rebranded)
/assessment/quiz            Quiz wizard (existing, rebranded)
/assessment/unlock          Email gate (existing)
/assessment/results         Results page (existing, rebranded)
/privacy                    Privacy policy (existing)
/terms                      Terms of service (existing)
/feed.xml                   RSS feed (auto-generated from blog)
```

---

## Brand Identity

### Color Palette

Moving from Angular Red to FrontendMinds' own identity. Indigo + Emerald on dark navy.

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0F172A` | Main background (dark navy, kept) |
| Surface | `#1E293B` | Card backgrounds (kept) |
| Border | `#253349` | Borders (kept) |
| **Primary/CTA** | `#6366F1` (Indigo 500) | Main CTAs, links, interactive elements |
| **Accent** | `#818CF8` (Indigo 400) | Highlights, hover states |
| **Secondary** | `#34D399` (Emerald 400) | Success states, positive scores, growth signals |
| Warning | `#FBBF24` (Amber 400) | Medium scores (kept) |
| Danger | `#F87171` (Red 400) | Critical scores, alerts |
| Text | `#F1F5F9` (Slate 100) | Primary text (kept) |
| Muted | `#94A3B8` (Slate 400) | Secondary text |

**Rationale:** Indigo signals tech/intelligence without framework bias. Emerald signals growth/improvement — fits the "modernization readiness" positioning. Score tier indicators (red/amber/green) remain contextual, not brand colors.

### Typography

- **Primary font:** Inter (400, 500, 600, 700) — all UI, body text, navigation
- **Editorial font:** Newsreader or Fraunces — blog post headings only, creating an editorial contrast
- **Code font:** JetBrains Mono or Fira Code — code blocks in blog posts

### Logo

"FrontendMinds" typographic wordmark in Inter Bold or a clean sans-serif. Primary color (indigo) on dark background, dark version for light contexts. No icon initially.

---

## Homepage

**Section flow:**

### 1. Hero
- Headline: positioning statement (e.g., "Where AI meets frontend excellence")
- Subhead: "Practical insights, tools, and systems for developers building smarter web products."
- Two CTAs: "Take the Angular Scorecard" (primary/indigo) + "Read the Blog" (secondary/outline)

### 2. Content Pillars
- 3-4 cards representing topic areas: AI for Frontend / Angular Modernization / Dev Workflows / Practical Tooling
- Each links to its blog category page
- Clean icon + title + one-line description

### 3. Featured Articles
- 3 latest or hand-picked blog posts
- Card layout: category badge, title, excerpt, date, read time

### 4. Scorecard Spotlight
- Dedicated section promoting the Angular Modernization Scorecard
- Brief explanation: what it measures, who it's for, what you get
- CTA to start at `/assessment`

### 5. Newsletter CTA
- "Get practical AI + frontend insights. No noise."
- Inline form: name + email
- Powered by Resend Audiences

### 6. Founder Section
- "Built by Florin Siciu" — short bio, photo placeholder, link to `/author/florin-siciu`
- Establishes the personal brand connection per roadmap strategy

### 7. Footer
- Navigation links to all main pages
- Social icons (LinkedIn, X, GitHub)
- Legal links (Privacy, Terms)
- Copyright: "FrontendMinds"

---

## Blog System

### Content Storage

MDX files in `content/blog/<slug>.mdx` at the repo root (outside `src/`).

### Frontmatter Schema

```yaml
---
title: "How to Evaluate an AI Tool Stack for a Frontend Team"
description: "A practical framework for choosing and standardizing AI tools..."
date: "2026-04-01"
category: "ai-for-frontend"
author: "florin-siciu"
image: "/blog/ai-tool-stack.jpg"
tags: ["ai", "tooling", "frontend"]
featured: false
---
```

### Categories

- `ai-for-frontend` — AI for Frontend
- `angular-ai` — Angular + AI
- `dev-workflow` — Dev Workflow & Tooling
- `tutorials` — Tutorials
- `case-studies` — Case Studies
- `strategy` — Strategy & Opinions

### Blog Index (`/blog`)

- Category filter tabs
- Post cards: title, excerpt, date, category badge, read time
- Paginated (10-12 per page)

### Blog Post (`/blog/[slug]`)

- Editorial heading font (Newsreader/Fraunces) + Inter body
- Author byline linking to author page
- Category badge + date + estimated read time
- Auto-generated table of contents for posts with 3+ headings
- Newsletter CTA embedded after article content
- Related posts section (same category, max 3)
- JSON-LD `Article` schema

### MDX Components

Available in blog posts:
- Code blocks with syntax highlighting (`rehype-pretty-code` + `shiki`)
- Callout boxes (info, warning, tip, danger)
- Image with caption
- Embedded newsletter signup form
- Custom components as needed

### RSS Feed

Auto-generated at `/feed.xml` from MDX frontmatter. Include title, description, date, link, and full content or excerpt.

---

## Newsletter

### Landing Page (`/newsletter`)

- What subscribers get
- Frequency and topics
- What to expect
- Signup form (name + email)
- Optional: past issue archive (future addition)

### Technical Integration

- **Resend Audiences API** for subscriber list management
- **Server Action** for subscribe:
  1. Validate email with Zod
  2. Add contact to Resend audience
  3. Send welcome email via Resend
  4. Return success/error state
- Signup form embedded on: homepage, blog posts, author page, newsletter page
- No additional database table needed — Resend manages the subscriber list

---

## Services Page (`/services`)

Three service offerings, structured consistently:

### Service 1: Angular Modernization Audit
- Problem: teams stuck on old Angular, accumulating risk
- What you do: 14-day audit, score + roadmap + implementation plan
- Who it's for: CTOs, engineering managers, tech leads
- Outcomes: clear modernization path, prioritized risks, cost estimates
- Pricing indication: EUR 2,000-4,000
- CTA: Book a discovery call (Calendly)

### Service 2: AI Tool Stack Rationalization
- Problem: teams drowning in AI tool subscriptions without a strategy
- What you do: evaluate, standardize, and implement one coherent AI workflow
- Outcomes: reduced tool costs, clear guidelines, team alignment
- Pricing indication: EUR 2,500-4,000
- CTA: Book a discovery call (Calendly)

### Service 3: Consulting & Implementation
- For teams that need ongoing hands-on support
- Custom scope and pricing
- CTA: Book a discovery call (Calendly)

Each service section: problem statement, what's included, who it's for, outcomes, timeline, CTA.

---

## Supporting Pages

### About (`/about`)
- What FrontendMinds is
- Why it was created (mission statement)
- Who it helps (CTOs, engineering managers, tech leads at Angular-heavy companies)
- Florin's background and expertise
- Links to social profiles and author page

### Author Page (`/author/florin-siciu`)
- Photo (or placeholder)
- Full bio: Angular consultant background, expertise areas
- Areas of expertise badges
- Social links: LinkedIn, X, GitHub, florinsiciu.com
- All articles by Florin (filtered blog index)
- JSON-LD `Person` schema

### Contact (`/contact`)
- Form fields: name, email, reason (dropdown), message
- Reason options: "General inquiry", "Service inquiry", "Speaking", "Partnership"
- Server Action → sends email to Florin via Resend
- Stores submission in `contact_submissions` table

### Resources (`/resources`)
- Index page listing lead magnets and free tools
- Each resource: title, description, type badge, CTA
- Some email-gated (enter email to download), some direct
- Start with 1-2 items, designed to grow

---

## Scorecard Migration

### What stays unchanged
- Quiz questions (20 scored + 2 qualifying)
- Scoring engine (`lib/scoring.ts`)
- Supabase schema (`leads`, `assessments`, `email_events`)
- Server Action (`submitAssessment`)
- Quiz flow UX (client-side state, auto-advance, sessionStorage persistence)
- Email template structure

### What changes
- **Brand colors:** Angular red CTAs → indigo CTAs throughout scorecard
- **Content strings:** Update `lib/content/` files to reference FrontendMinds, not florinsiciu
- **Navigation:** Scorecard pages use the site-wide FrontendMinds nav
- **Results page:** Add cross-links to relevant blog posts and services page
- **Email template:** FrontendMinds branding, updated footer
- **Metadata/SEO:** Updated titles, descriptions, OG images for FrontendMinds domain

### Score tier colors (contextual, not brand)
- Critical Risk (0-7): Red indicator
- Modernization Ready (8-13): Amber indicator
- Well-Positioned (14-20): Emerald indicator

---

## Database Changes

### Existing tables (no changes)
- `leads` — scorecard lead capture
- `assessments` — quiz answers, scores, tiers
- `email_events` — email delivery tracking

### New table

```sql
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  reason text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS policy for anonymous submission
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous contact submissions"
  ON contact_submissions FOR INSERT
  TO anon WITH CHECK (true);
```

Newsletter subscribers managed via Resend Audiences API (no database table).

---

## SEO Strategy

### Structured Data (JSON-LD)
- `Organization` — on all pages (FrontendMinds entity)
- `WebSite` — on homepage with search action
- `Article` — on blog posts (title, author, date, description, image)
- `Person` — on author page (Florin Siciu, linked to FrontendMinds)
- `Service` — on services page

### Technical SEO
- Auto-generated `sitemap.xml` (Next.js built-in)
- `robots.txt` allowing full crawl
- Canonical URLs on all pages
- Open Graph + Twitter Card meta on every page
- `<link rel="alternate" type="application/rss+xml">` for RSS discovery

### Content SEO
- Blog post URLs: `/blog/<descriptive-slug>`
- Category pages: `/blog?category=<slug>` (filtered index, not separate routes)
- Author page crawlable and linked from all posts
- Internal linking between related blog posts, services, and scorecard

---

## Navigation

### Desktop
```
[FrontendMinds logo]  Blog  Services  Newsletter  About  [Take the Scorecard →]
```

### Mobile
- Hamburger menu with all nav items
- Sticky bottom CTA bar: "Take the Scorecard" (on non-assessment pages)

---

## Config & Content Layer Updates

### `lib/config/site.ts`
- Site name: "FrontendMinds"
- Base URL: `https://frontendminds.com`
- Social links: LinkedIn, X, GitHub
- Calendly URL (kept from existing)

### `lib/content/navigation.ts`
- Expanded nav items: Blog, Services, Newsletter, About
- CTA button: "Take the Scorecard"

### `lib/content/seo.ts`
- Updated metadata for all existing pages
- New metadata for blog, newsletter, services, about, contact, author, resources

### `lib/content/landing.ts`
- Complete rewrite for new homepage structure (hero, pillars, featured articles, scorecard spotlight, newsletter CTA, founder section)

### `lib/content/` (other files)
- Update all references from florinsiciu branding to FrontendMinds
- Add new content files for new pages (services, about, contact, newsletter, resources)

---

## Tech Stack Summary

**Unchanged:**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + shadcn/ui
- Supabase (Postgres + RLS + Auth optional)
- Resend (transactional email + newsletter audiences)
- PostHog (analytics)
- React Hook Form + Zod (forms)
- Vercel (deployment)
- pnpm (package manager)

**Added:**
- MDX processing for blog (`next-mdx-remote` for runtime MDX rendering from `content/blog/` directory + `gray-matter` for frontmatter parsing)
- `rehype-pretty-code` + `shiki` (syntax highlighting in blog posts)
- `remark-gfm` (GitHub-flavored markdown in posts)
- `reading-time` (estimated read time)
- `feed` (RSS generation)
- Editorial font (Newsreader or Fraunces, loaded via `next/font`)

---

## Verification Plan

### Build & Deploy
1. `pnpm build` passes with zero errors
2. All routes render correctly (static and dynamic)
3. MDX blog posts compile and display
4. RSS feed generates valid XML

### Scorecard Flow
5. Quiz flow works end-to-end: quiz → email gate → results
6. Supabase writes succeed (lead + assessment)
7. Email sends via Resend with FrontendMinds branding
8. Results page displays scores and tier CTA
9. All score tier colors render correctly (red/amber/emerald)

### Blog
10. Blog index renders with category filtering
11. Blog post pages render MDX content with syntax highlighting
12. Table of contents generates from headings
13. Related posts appear at bottom

### Newsletter
14. Subscribe form submits successfully
15. Contact added to Resend audience
16. Welcome email sends

### Contact
17. Contact form submits and stores in Supabase
18. Notification email sends to Florin

### SEO
19. All pages have correct meta tags (title, description, OG, Twitter)
20. JSON-LD structured data validates (Google Rich Results Test)
21. Sitemap generates and includes all public routes
22. RSS feed is valid

### Visual
23. New color palette applied consistently (indigo CTAs, no Angular red in non-score contexts)
24. Navigation works on desktop and mobile
25. All pages responsive across breakpoints
26. Footer links to all pages and social profiles
