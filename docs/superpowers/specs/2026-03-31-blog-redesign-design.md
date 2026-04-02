# Blog Redesign — Full Homepage Alignment

**Date:** 2026-03-31
**Status:** Design approved
**Scope:** Blog index page (`/blog`) + Individual blog post page (`/blog/[slug]`)

## Context

The homepage has been redesigned with a rich, cohesive visual language: dot-grid backgrounds, gradient glows, GlassCards, Reveal animations, Fraunces headings, Tagline eyebrows, and Section wrappers with alternating backgrounds. The assessment pages were similarly aligned.

The blog pages still use the earlier flat design — no background texture, no Section wrappers, smaller typography, flat surface pills, and no scroll animations. Visitors moving from the homepage to the blog experience a jarring visual disconnect.

This spec brings both blog pages into full alignment with the established homepage design language, using the existing component library (Section, GlassCard, Tagline, Reveal) wherever possible.

**Reference:** AstroWind template at `/home/fsiciu/development/astrowind` was used as design inspiration, particularly its horizontal blog list layout and consistent cross-page design language.

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Blog index layout | Horizontal list (astrowind-style) | Works from 1 to many posts; no empty grid gaps with few posts |
| Blog post layout | Minimal / content-first | Zero friction writing; content speaks for itself |
| Featured post distinction | None | All posts treated equally — appropriate for 0-audience launch |
| Category filter styling | Dimension-colored pills | Matches homepage dimension color system |
| Post footer sections | Related posts + Newsletter CTA | Conversion without overwhelming |
| Image requirement | Optional everywhere | No image pressure for rapid content publishing |

---

## Blog Index Page (`/blog`)

### Hero Zone

Wrap in `Section` component (default background) with dot-grid and indigo gradient glow (top-right, matching homepage hero).

**Elements (top to bottom):**
1. `Tagline`: "INSIGHTS & GUIDES" — indigo, uppercase, `tracking-[0.2em]`, `text-[0.7rem]`
2. Heading: "The Blog" — `font-heading text-[2.5rem] md:text-[3rem] font-bold text-foreground`
3. Subtitle: "Practical articles on AI integration, Angular modernization, and developer workflows." — `text-muted-foreground text-[1.05rem]`, max-w-lg centered
4. Category filter pills (see below)

Entire hero wrapped in `Reveal` with staggered delays (0ms, 100ms, 200ms, 300ms).

### Category Filter Pills

Replace current flat surface pills (`bg-surface text-muted-foreground`) with dimension-colored pills matching the homepage's dimension pill pattern.

**Category → Color mapping:**
| Category | Color | Token |
|----------|-------|-------|
| AI for Frontend | Blue | #93C5FD / rgba(147,197,253) |
| Angular + AI | Teal | #5EEAD4 / rgba(94,234,212) |
| Dev Workflow & Tooling | Indigo | #818CF8 / rgba(129,140,248) |
| Tutorials | Amber | #FBBF24 / rgba(251,191,36) |
| Case Studies | Purple | #C4B5FD / rgba(196,181,253) |
| Strategy & Opinions | Red | #F87171 / rgba(248,113,113) |

**Pill styling:**
- Inactive: `bg-[color]/[0.06] border border-[color]/[0.12] text-[color] rounded-full px-4 py-1.5 text-sm`
- Active (selected): `bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium`
- "All" pill uses primary solid style when active

### Post List (Horizontal Rows)

Each post rendered as a horizontal row card with image left, content right. Max-width container: `max-w-4xl mx-auto`.

**Row card structure:**
```
┌─────────────┬──────────────────────────────────┐
│             │ [Category badge]  [Reading time]  │
│   Image     │ Title (font-semibold, text-lg)    │
│  (160px     │ Excerpt (text-muted, line-clamp-2)│
│   wide)     │ Date            [Read →]          │
│             │                                    │
└─────────────┴──────────────────────────────────┘
```

**Card styling:**
- Outer: `GlassCard` (rounded-2xl, `bg-white/[0.02]`, `border-white/[0.06]`, `backdrop-blur-[16px]`)
- Layout: `grid grid-cols-[160px_1fr]` on md+, single column stack on mobile
- Image area: 160px wide, aspect-ratio auto. If post has a featured image, show it with `object-cover`. If no image, show category-colored gradient background (`linear-gradient(135deg, [category-color]/0.08, indigo/0.05)`). Always show 3px top accent stripe in category color.
- Hover: `-translate-y-[3px]`, `border-white/[0.12]`, enhanced shadow (existing GlassCard hover)
- Category badge: same color as the pill for that category, `rounded-md text-xs uppercase font-semibold`
- "Read →" link: `text-primary text-sm font-medium`, appears on right side of date row

**Animation:** Each row wrapped in `Reveal` with staggered delay (index * 100ms, capped at 500ms).

**Mobile (< md):** Image stacks above content. Full-width card.

**Empty state:** When only 1 post exists, the single row fills width gracefully. No empty grid cells.

**Pagination:** Below the post list when > 10 posts. Simple "← Older / Newer →" links, styled with `text-muted-foreground hover:text-foreground`.

### Newsletter CTA

Placed after all posts, before footer. Gradient card matching homepage lead magnet pattern.

**Structure:**
- Background: `linear-gradient(135deg, rgba(99,102,241,0.08), rgba(52,211,153,0.06))`
- Border: `border border-primary/15 rounded-2xl`
- Content: centered
  - Tagline: "NEWSLETTER" (indigo)
  - Heading: "Get insights delivered weekly" — `font-heading text-xl font-semibold`
  - Subtitle: "Join developers modernizing their Angular apps with AI." — `text-muted-foreground text-sm`
  - Form: email input + subscribe button (horizontal on desktop, stacked on mobile)

**Form behavior:** Uses Resend Audiences API (existing integration). Success state: replace form with "You're in! Check your inbox."

---

## Individual Blog Post Page (`/blog/[slug]`)

### Post Header (Minimal / Content-first)

Dot-grid background applied to the full page (matching homepage). No gradient glow in the header — keeps it clean.

**Elements (top to bottom):**
1. Back navigation: "← Back to blog" — `text-primary text-sm`, links to `/blog`
2. Category badge + reading time + date: inline row
   - Category: colored badge matching the dimension color map
   - Reading time: `text-muted-foreground text-sm`
   - Date: `text-muted-foreground text-sm`
3. Title: `font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight`
4. Author row: avatar (gradient circle with initials) + name — `text-foreground text-sm` + divider line below

**Spacing:** `max-w-3xl mx-auto`, generous padding-top (`pt-16 md:pt-20`), `pb-6` before the divider.

**Animation:** `Reveal` on the header block (single animation, no stagger needed).

### Article Body

**Container:** `max-w-3xl mx-auto px-4`

**Typography:** Tailwind prose with dark mode overrides:
- `prose prose-lg dark:prose-invert`
- Headings: `font-heading` (Fraunces), with subtle `border-top border-white/[0.04] pt-6 mt-10` divider above each h2
- Links: `text-primary hover:text-accent`
- Code inline: `bg-surface px-1.5 py-0.5 rounded text-accent font-mono text-[0.9em]`
- Line height: `leading-relaxed` (~1.75)

**Keep existing MDX components** (no changes):
- Syntax highlighting (rehype-pretty-code, one-dark-pro)
- Callout boxes (info/warning/tip/danger)
- Image with captions
- Code blocks with colored backgrounds

**Code blocks:** May optionally break out slightly wider than prose for readability: `max-w-[calc(100%+2rem)] -mx-4` on md+.

### Tags

Below the article body, separated by a border.

**Styling:** `flex flex-wrap gap-2`, each tag: `bg-surface text-muted-foreground px-3 py-1 rounded-md text-sm`

### Related Articles Section

Wrapped in `Section` with `bg="muted"` (#131C2E).

**Structure:**
1. `Tagline`: "KEEP READING"
2. Heading: "Related Articles" — `font-heading text-2xl font-semibold text-center`
3. 2-column grid of GlassCards (same card style as blog index row, but compact vertical cards here):
   - Category-colored top border
   - Category badge
   - Title (font-semibold, text-sm)
   - Reading time
4. Mobile: single column

**Animation:** `Reveal` on the section.

### Newsletter CTA

Same component as the blog index newsletter CTA. Placed below Related Articles, still within the muted Section background.

---

## New Components

### `BlogHero`
- **Location:** `src/components/blog/blog-hero.tsx`
- **Props:** none (content is static)
- **Contains:** Tagline + heading + subtitle + CategoryPills
- **Wraps in:** Section (default bg) + Reveal

### `CategoryPills`
- **Location:** `src/components/blog/category-pills.tsx`
- **Props:** `categories: string[]`, `activeCategory: string`, `onSelect: (cat: string) => void`
- **Client component** (`'use client'`) — handles click state
- **Uses:** dimension color map, URL search params for category filtering

### `BlogPostRow`
- **Location:** `src/components/blog/blog-post-row.tsx`
- **Props:** `post: BlogPost` (existing type from blog system)
- **Contains:** GlassCard wrapper, image area, content area, category badge, reading time, date, "Read →" link
- **Responsive:** grid on md+, stack on mobile

### `PostHeader`
- **Location:** `src/components/blog/post-header.tsx`
- **Props:** `post: BlogPost`
- **Contains:** back link, category badge, reading time, date, title, author row, divider

### `NewsletterCta`
- **Location:** `src/components/shared/newsletter-cta.tsx`
- **Props:** `variant?: 'default' | 'compact'` (compact for inline-in-post, default for standalone)
- **Contains:** gradient card, tagline, heading, subtitle, email form
- **Client component** — handles form submission via Resend Audiences API

### `RelatedPosts`
- **Location:** `src/components/blog/related-posts.tsx`
- **Props:** `posts: BlogPost[]`, `currentSlug: string`
- **Contains:** Section (muted bg), Tagline, heading, 2-column GlassCard grid

---

## Reused Components (No Changes)

- `Section` — background variants + spacing (`src/components/ui/section.tsx`)
- `GlassCard` — frosted card with hover lift (`src/components/ui/glass-card.tsx`)
- `Tagline` — uppercase indigo eyebrow (`src/components/ui/tagline.tsx`)
- `Reveal` — scroll-triggered fade + translate (`src/components/ui/reveal.tsx`)
- `PostCard` — existing blog card (used by FeaturedArticles on homepage, may be kept for homepage only)

---

## Modified Files

| File | Change |
|------|--------|
| `src/app/blog/page.tsx` | Replace current layout with BlogHero + BlogPostRow list + NewsletterCta |
| `src/app/blog/[slug]/page.tsx` | Replace current header with PostHeader, add RelatedPosts + NewsletterCta after content |
| `src/components/blog/post-card.tsx` | Keep for homepage FeaturedArticles; blog index now uses BlogPostRow instead |
| `src/app/globals.css` | Add category color CSS variables if needed (may use inline Tailwind instead) |

---

## Responsive Behavior

| Breakpoint | Blog Index | Blog Post |
|------------|-----------|-----------|
| < sm (mobile) | Single column, image above content in rows | Full width prose, single column related posts |
| sm-md (tablet) | Single column rows, wider cards | Same as mobile but with more breathing room |
| md+ (desktop) | Horizontal rows (image left, content right) | max-w-3xl prose, 2-column related posts |

---

## What's NOT in Scope

- Blog post featured images (optional, not required)
- Search functionality
- Pagination (add when > 10 posts)
- RSS feed styling
- Individual post SEO changes (JSON-LD, meta tags — already handled)
- Homepage FeaturedArticles section (no changes)
- MDX component restyling (callouts, code blocks already work)
