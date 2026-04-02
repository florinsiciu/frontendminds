# FrontendMinds.com Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **CRITICAL:** Before writing ANY Next.js code, read the relevant guide in `node_modules/next/dist/docs/` — this is Next.js 16 which has breaking changes from training data. Heed deprecation notices.

**Goal:** Evolve the existing Angular Modernization Scorecard codebase into the FrontendMinds.com content platform — rebranding, adding blog (MDX), newsletter (Resend), services, and supporting pages.

**Architecture:** Additive evolution of the existing Next.js 16 App Router project. All scorecard infrastructure (Supabase, scoring engine, quiz flow, email) stays intact. New pages and features are added alongside. Brand identity shifts from Angular Red to Indigo + Emerald. Blog uses MDX files parsed at build/request time via `next-mdx-remote`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Supabase, Resend (transactional + audiences), PostHog, MDX (`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`), pnpm

**Spec:** `docs/superpowers/specs/2026-03-30-frontendminds-platform-design.md`

---

## File Structure

### New files

```
content/
  blog/
    hello-frontendminds.mdx              # Sample blog post

src/
  app/
    blog/
      page.tsx                           # Blog index with category filter
    blog/[slug]/
      page.tsx                           # Blog post (MDX rendered)
    newsletter/
      page.tsx                           # Newsletter landing + signup
    services/
      page.tsx                           # Services overview
    about/
      page.tsx                           # About FrontendMinds
    contact/
      page.tsx                           # Contact form
    author/[slug]/
      page.tsx                           # Author page
    resources/
      page.tsx                           # Lead magnets index
    feed.xml/
      route.ts                           # RSS feed generation

  actions/
    subscribe.ts                         # Newsletter subscribe server action
    contact.ts                           # Contact form server action

  components/
    blog/
      post-card.tsx                      # Blog post card for index
      mdx-components.tsx                 # Custom MDX components (callouts, etc.)
      table-of-contents.tsx              # Auto-generated TOC
    newsletter-form.tsx                  # Reusable newsletter signup form
    landing/
      content-pillars.tsx                # Homepage: topic area cards
      featured-articles.tsx              # Homepage: latest blog posts
      scorecard-spotlight.tsx            # Homepage: scorecard promo section
      newsletter-cta.tsx                 # Homepage: newsletter signup section
      founder-section.tsx                # Homepage: "Built by Florin Siciu"

  lib/
    blog.ts                             # Blog data layer (read/parse MDX)
    content/
      services.ts                       # Services page content
      about.ts                          # About page content
      newsletter.ts                     # Newsletter page content
      contact.ts                        # Contact page content
      resources.ts                      # Resources page content

supabase/
  migrations/
    002_contact_submissions.sql          # Contact form table + RLS
```

### Modified files

```
src/app/globals.css                      # New color palette (Indigo + Emerald)
src/app/layout.tsx                       # Font swap (Outfit → Inter), updated JSON-LD
src/app/page.tsx                         # New homepage sections
src/lib/config/site.ts                   # FrontendMinds branding
src/lib/content/navigation.ts            # Expanded nav items
src/lib/content/seo.ts                   # New page metadata + updated existing
src/lib/content/footer.ts                # Updated branding + nav links
src/lib/content/email.ts                 # FrontendMinds branding in emails
src/lib/content/landing.ts              # New homepage content structure
src/lib/content/assessment.ts            # Updated branding references
src/lib/content/results.ts              # Updated branding references
src/components/landing/navigation.tsx    # Expanded nav UI with hamburger menu
src/components/landing/footer.tsx        # Updated links for new pages
src/components/ui/button-variants.ts     # Add "brand" variant for indigo CTA
src/types/assessment.ts                  # Add blog/newsletter/contact types
.env.example                             # Add RESEND_AUDIENCE_ID
package.json                             # New dependencies
```

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install blog + newsletter dependencies**

```bash
pnpm add next-mdx-remote gray-matter rehype-pretty-code shiki remark-gfm reading-time feed
```

- [ ] **Step 2: Verify installation**

```bash
pnpm build
```

Expected: Build succeeds (no code changes yet, just new deps).

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add MDX, RSS, and syntax highlighting dependencies"
```

---

## Task 2: Brand Identity — Color Palette & Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update CSS custom properties in globals.css**

Replace the color values in the `:root` block. Keep the structure identical — only change values.

```css
:root {
  --radius: 0.625rem;

  /* Always dark — no light mode */
  --background: #0F172A;
  --foreground: #F1F5F9;

  --card: #1E293B;
  --card-foreground: #F1F5F9;

  --popover: #1E293B;
  --popover-foreground: #F1F5F9;

  --primary: #6366F1;
  --primary-foreground: #FFFFFF;

  --secondary: #1E293B;
  --secondary-foreground: #34D399;

  --muted: #1E293B;
  --muted-foreground: #94A3B8;

  --accent: #818CF8;
  --accent-foreground: #FFFFFF;

  --destructive: #F87171;
  --destructive-foreground: #FFFFFF;

  --border: #253349;
  --input: #253349;
  --ring: #6366F1;

  /* Custom tokens */
  --surface: #1E293B;
  --subtle: #7A8CA3;
  --warning: #FBBF24;
  --warning-foreground: #0F172A;

  /* Dimension colors */
  --dim-migration: #93C5FD;
  --dim-architecture: #5EEAD4;
  --dim-modern: #FBBF24;
  --dim-ai: #C4B5FD;
  --dim-delivery: #F87171;

  /* Chart colors using new palette */
  --chart-1: #6366F1;
  --chart-2: #34D399;
  --chart-3: #818CF8;
  --chart-4: #FBBF24;
  --chart-5: #94A3B8;

  /* Sidebar (unused in MVP, but shadcn expects them) */
  --sidebar: #1E293B;
  --sidebar-foreground: #F1F5F9;
  --sidebar-primary: #6366F1;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #253349;
  --sidebar-accent-foreground: #F1F5F9;
  --sidebar-border: #253349;
  --sidebar-ring: #6366F1;
}
```

Also update the comment block above `:root` to reflect the new palette:

```css
/*
 * Dark-only theme: Navy + Indigo/Emerald palette
 * Source: FrontendMinds design spec
 *
 * Background: #0F172A (main bg)
 * Surface:    #1E293B (cards, elevated)
 * Border:     #253349 (borders, dividers)
 * Primary:    #6366F1 (Indigo — CTAs, links)
 * Accent:     #818CF8 (Light Indigo — highlights, hover)
 * Secondary:  #34D399 (Emerald — success, growth)
 * Warning:    #FBBF24 (medium scores, alerts)
 * Danger:     #F87171 (critical scores)
 * Text:       #F1F5F9 (primary text)
 * Muted:      #94A3B8 (secondary text)
 * Subtle:     #7A8CA3 (tertiary text, labels)
 */
```

- [ ] **Step 2: Swap Outfit font for Inter in layout.tsx**

In `src/app/layout.tsx`, change the font imports. The file currently imports `Outfit` and `Fraunces` from `next/font/google`. Replace `Outfit` with `Inter`, keep `Fraunces`:

```typescript
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
```

Update the `<body>` className to use `inter.variable` instead of `outfit.variable` (keeping `fraunces.variable` as-is).

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds, new colors applied.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: rebrand to FrontendMinds — Indigo/Emerald palette + Inter font"
```

---

## Task 3: Site Config & Content Rebrand

**Files:**
- Modify: `src/lib/config/site.ts`
- Modify: `src/lib/content/footer.ts`
- Modify: `src/lib/content/email.ts`
- Modify: `src/lib/content/seo.ts`
- Modify: `src/types/assessment.ts`
- Modify: `.env.example`

- [ ] **Step 1: Update site config**

In `src/lib/config/site.ts`, update all branding:

```typescript
export const siteConfig = {
  name: "FrontendMinds",
  shortName: "FrontendMinds",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "Florin Siciu",
  description: "Practical insights, tools, and systems for developers building smarter web products.",
  calendly: {
    baseUrl: "https://calendly.com/florinsiciu",
    eventSlug: "strategy-call",
    buildUrl(utmSource?: string) {
      const url = `${this.baseUrl}/${this.eventSlug}`;
      return utmSource ? `${url}?utm_source=${utmSource}` : url;
    },
  },
  social: {
    linkedin: "https://linkedin.com/in/florinsiciu",
    github: "https://github.com/florinsiciu",
    twitter: "https://x.com/nicusorsiciu",
  },
} as const;
```

- [ ] **Step 2: Update footer content**

In `src/lib/content/footer.ts`, update copyright and add navigation links:

```typescript
export const copyright = `© ${new Date().getFullYear()} FrontendMinds. All rights reserved.`;

export const footerNav = [
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/resources" },
  { label: "Scorecard", href: "/assessment" },
] as const;

// socialLinks and legalLinks stay the same
```

- [ ] **Step 3: Update email content**

In `src/lib/content/email.ts`, update `emailFooter.companyName`:

```typescript
export const emailFooter = {
  companyName: "FrontendMinds — Angular Modernization & AI Consulting",
  unsubscribe:
    "You received this email because you completed the Angular Modernization Scorecard on FrontendMinds.",
} as const;
```

- [ ] **Step 4: Update default SEO**

In `src/lib/content/seo.ts`, update `defaultSeo` and `organizationJsonLd`:

```typescript
export const defaultSeo: PageSeo = {
  title: "FrontendMinds — Where AI Meets Frontend Excellence",
  description:
    "Practical insights, tools, and systems for developers building smarter web products. Angular modernization, AI workflows, and developer tooling.",
};
```

Update `organizationJsonLd` name to `"FrontendMinds"`, description to match `defaultSeo.description`, and `url` to `"https://frontendminds.com"`.

Add new `pageSeo` entries for the new pages:

```typescript
blog: {
  title: "Blog | FrontendMinds",
  description: "Practical articles on AI for frontend, Angular modernization, dev workflows, and tooling.",
},
newsletter: {
  title: "Newsletter | FrontendMinds",
  description: "Get practical AI + frontend insights delivered weekly. No hype, no spam.",
},
services: {
  title: "Services | FrontendMinds",
  description: "Angular modernization audits, AI tool stack rationalization, and consulting for dev teams.",
},
about: {
  title: "About | FrontendMinds",
  description: "FrontendMinds is a knowledge hub built by Florin Siciu for developers exploring practical AI in frontend work.",
},
contact: {
  title: "Contact | FrontendMinds",
  description: "Get in touch with FrontendMinds for consulting, partnerships, or general inquiries.",
},
resources: {
  title: "Resources | FrontendMinds",
  description: "Free tools, checklists, and guides for Angular modernization and AI-powered frontend workflows.",
},
```

Also update the existing `pageSeo.home` entry:

```typescript
home: {
  title: "FrontendMinds — Where AI Meets Frontend Excellence",
  description: "Practical insights, tools, and systems for developers building smarter web products.",
},
```

- [ ] **Step 5: Add blog/newsletter types to assessment.ts**

Append to `src/types/assessment.ts`:

```typescript
// ── Blog types ──────────────────────────────────────────────────────────────

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image?: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

// ── Contact types ───────────────────────────────────────────────────────────

export interface ContactSubmission {
  name: string;
  email: string;
  reason: "general" | "service" | "speaking" | "partnership";
  message: string;
}
```

- [ ] **Step 6: Update .env.example**

Add the new env var:

```
# Resend Audience (newsletter)
RESEND_AUDIENCE_ID=your-audience-id
```

- [ ] **Step 7: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Some pages may show updated branding.

- [ ] **Step 8: Commit**

```bash
git add src/lib/config/site.ts src/lib/content/footer.ts src/lib/content/email.ts src/lib/content/seo.ts src/types/assessment.ts .env.example
git commit -m "feat: rebrand site config, SEO, email, and footer to FrontendMinds"
```

---

## Task 4: Navigation Expansion

**Files:**
- Modify: `src/lib/content/navigation.ts`
- Modify: `src/components/landing/navigation.tsx`

- [ ] **Step 1: Update navigation content**

In `src/lib/content/navigation.ts`:

```typescript
export const logoText = "FrontendMinds";

export const navItems: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
];

export const navCta = {
  text: "Take the Scorecard",
  href: "/assessment",
} as const;

export const mobileMenuItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/resources" },
  { label: "Scorecard", href: "/assessment" },
];
```

- [ ] **Step 2: Rewrite navigation component**

Rewrite `src/components/landing/navigation.tsx` to support the expanded nav. Key changes:

- Display `navItems` as horizontal links on desktop (`hidden md:flex`)
- Add hamburger button for mobile (`md:hidden`)
- Mobile menu: slide-down panel with `mobileMenuItems`
- Keep the scroll-aware backdrop blur behavior
- Keep the CTA button on the right
- Use `usePathname()` from `next/navigation` to highlight active link
- Add state: `const [mobileOpen, setMobileOpen] = useState(false)`

Desktop layout:
```
[FrontendMinds]  Blog  Services  Newsletter  About  [Take the Scorecard →]
```

Mobile layout when open:
```
[FrontendMinds]                               [X]
──────────────────────────────────────────────────
Home
Blog
Services
Newsletter
About
Contact
Resources
──────────────────────────────────────────────────
[Take the Scorecard →]
```

Close the mobile menu on route change using `usePathname()` in a `useEffect`.

- [ ] **Step 3: Verify build and test navigation**

```bash
pnpm build && pnpm dev
```

Visit `http://localhost:3000` — verify desktop nav shows all items and mobile menu toggles.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/navigation.ts src/components/landing/navigation.tsx
git commit -m "feat: expand navigation with blog, services, newsletter, about links"
```

---

## Task 5: Blog Data Layer

**Files:**
- Create: `src/lib/blog.ts`
- Create: `content/blog/hello-frontendminds.mdx`

- [ ] **Step 1: Create the blog data module**

Create `src/lib/blog.ts`:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostMeta } from "@/types/assessment";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const CATEGORIES = {
  "ai-for-frontend": "AI for Frontend",
  "angular-ai": "Angular + AI",
  "dev-workflow": "Dev Workflow & Tooling",
  tutorials: "Tutorials",
  "case-studies": "Case Studies",
  strategy: "Strategy & Opinions",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

function parseMdxFile(filePath: string, slug: string): BlogPostMeta & { content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    author: data.author ?? "florin-siciu",
    image: data.image,
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { content: _, ...meta } = parseMdxFile(path.join(BLOG_DIR, file), slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = parseMdxFile(filePath, slug);
  return parsed;
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
```

- [ ] **Step 2: Create content directory and sample blog post**

Create the directory `content/blog/` at the project root.

Create `content/blog/hello-frontendminds.mdx`:

```mdx
---
title: "Welcome to FrontendMinds"
description: "Introducing FrontendMinds — practical insights on AI, Angular modernization, and developer workflows."
date: "2026-03-30"
category: "strategy"
author: "florin-siciu"
tags: ["announcement", "ai", "frontend"]
featured: true
---

# Welcome to FrontendMinds

FrontendMinds is where AI meets frontend excellence. This is the home for practical insights, tutorials, and systems for developers building smarter web products.

## What You'll Find Here

We cover three main areas:

- **AI for Frontend** — practical integration of AI into frontend workflows and products
- **Angular Modernization** — strategies for upgrading, migrating, and modernizing Angular applications
- **Developer Workflows** — tooling, automation, and processes that make teams faster

## Why This Exists

Most AI content is either hype or research. Most Angular content is outdated tutorials. FrontendMinds bridges the gap with content based on real implementation experience.

> The goal is not to chase every new tool. It's to find what actually works and share it clearly.

## What's Coming

- Deep dives into AI tool stack evaluation for frontend teams
- Angular modernization case studies and frameworks
- Practical guides for developer workflow automation
- The Angular Modernization Scorecard — a free diagnostic tool

Stay tuned. Subscribe to the newsletter to get updates.
```

- [ ] **Step 3: Verify the data layer works**

```bash
pnpm build
```

Expected: Build succeeds. The blog module is server-only (uses `fs`), so it won't be bundled for client.

- [ ] **Step 4: Commit**

```bash
git add src/lib/blog.ts content/blog/hello-frontendminds.mdx
git commit -m "feat: add blog data layer with MDX parsing and sample post"
```

---

## Task 6: Blog MDX Components

**Files:**
- Create: `src/components/blog/mdx-components.tsx`
- Create: `src/components/blog/table-of-contents.tsx`
- Create: `src/components/blog/post-card.tsx`

- [ ] **Step 1: Create custom MDX components**

Create `src/components/blog/mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip" | "danger"; children: React.ReactNode }) {
  const styles = {
    info: "border-l-primary/60 bg-primary/5",
    warning: "border-l-warning/60 bg-warning/5",
    tip: "border-l-secondary-foreground/60 bg-secondary-foreground/5",
    danger: "border-l-destructive/60 bg-destructive/5",
  };

  const labels = { info: "Note", warning: "Warning", tip: "Tip", danger: "Danger" };

  return (
    <div className={`my-6 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
      <p className="mb-1 text-sm font-semibold text-foreground">{labels[type]}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function ImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full rounded-lg border border-border" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="mt-12 mb-4 font-heading text-3xl font-bold text-foreground" {...props} />,
  h2: (props) => <h2 className="mt-10 mb-3 font-heading text-2xl font-semibold text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-2 font-heading text-xl font-semibold text-foreground" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-muted-foreground" {...props} />,
  ul: (props) => <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-primary/40 pl-4 italic text-muted-foreground" {...props} />
  ),
  a: (props) => <a className="text-primary underline underline-offset-4 hover:text-accent" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-accent" {...props} />,
  hr: () => <hr className="my-8 border-border" />,
  Callout,
  ImageWithCaption,
};
```

- [ ] **Step 2: Create table of contents component**

Create `src/components/blog/table-of-contents.tsx`:

```tsx
interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav className="mb-8 rounded-lg border border-border bg-surface p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">Table of Contents</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function extractHeadings(mdxContent: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}
```

- [ ] **Step 3: Create blog post card component**

Create `src/components/blog/post-card.tsx`:

```tsx
import Link from "next/link";
import type { BlogPostMeta } from "@/types/assessment";
import { CATEGORIES, type CategorySlug } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPostMeta }) {
  const categoryLabel = CATEGORIES[post.category as CategorySlug] ?? post.category;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
          {categoryLabel}
        </span>
        <span className="text-xs text-muted-foreground">{post.readingTime}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {post.description}
      </p>
      <time className="text-xs text-subtle">{formatDate(post.date)}</time>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/
git commit -m "feat: add blog MDX components, table of contents, and post card"
```

---

## Task 7: Blog Pages + RSS Feed

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/feed.xml/route.ts`
- Modify: `src/lib/content/seo.ts` (if not already done in Task 3)

- [ ] **Step 1: Create blog index page**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getAllPosts, CATEGORIES, type CategorySlug } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
};

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const allPosts = getAllPosts();
  const posts = category ? allPosts.filter((p) => p.category === category) : allPosts;

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">Blog</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Practical articles on AI, Angular modernization, and developer workflows.
      </p>

      {/* Category filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        <CategoryTab slug={undefined} label="All" active={!category} />
        {Object.entries(CATEGORIES).map(([slug, label]) => (
          <CategoryTab key={slug} slug={slug} label={label} active={category === slug} />
        ))}
      </div>

      {/* Post grid */}
      {posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}

function CategoryTab({
  slug,
  label,
  active,
}: {
  slug: string | undefined;
  label: string;
  active: boolean;
}) {
  const href = slug ? `/blog?category=${slug}` : "/blog";
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-surface text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </a>
  );
}
```

- [ ] **Step 2: Create blog post page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getAllSlugs, getRelatedPosts, CATEGORIES, type CategorySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PostCard } from "@/components/blog/post-card";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | FrontendMinds`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Florin Siciu"],
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);
  const categoryLabel = CATEGORIES[post.category as CategorySlug] ?? post.category;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href={`/blog?category=${post.category}`}
            className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
          >
            {categoryLabel}
          </Link>
          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-sm text-muted-foreground">{post.readingTime}</span>
        </div>
        <h1 className="mb-4 font-heading text-4xl font-bold leading-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <Link href="/author/florin-siciu" className="text-sm font-medium text-foreground hover:text-primary">
            Florin Siciu
          </Link>
        </div>
      </div>

      {/* Table of contents */}
      <TableOfContents content={post.content} />

      {/* Article body */}
      <article className="prose-custom">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
            },
          }}
        />
      </article>

      {/* Newsletter CTA */}
      <div className="mt-12 rounded-lg border border-border bg-surface p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">Enjoyed this article?</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Get practical AI + frontend insights delivered to your inbox.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Subscribe to the Newsletter
        </Link>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
```

- [ ] **Step 3: Create RSS feed route**

Create `src/app/feed.xml/route.ts`:

```typescript
import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config/site";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "FrontendMinds",
    description: siteConfig.description,
    id: siteConfig.baseUrl,
    link: siteConfig.baseUrl,
    language: "en",
    copyright: `© ${new Date().getFullYear()} FrontendMinds`,
    author: {
      name: "Florin Siciu",
      link: `${siteConfig.baseUrl}/author/florin-siciu`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.baseUrl}/blog/${post.slug}`,
      link: `${siteConfig.baseUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: "Florin Siciu" }],
      category: [{ name: post.category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
```

- [ ] **Step 4: Verify build and test**

```bash
pnpm build && pnpm dev
```

- Visit `http://localhost:3000/blog` — verify index renders with sample post
- Visit `http://localhost:3000/blog/hello-frontendminds` — verify MDX renders with styled headings
- Visit `http://localhost:3000/feed.xml` — verify valid RSS XML

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/ src/app/feed.xml/ content/blog/
git commit -m "feat: add blog index, blog post page, and RSS feed"
```

---

## Task 8: Newsletter Integration

**Files:**
- Create: `src/actions/subscribe.ts`
- Create: `src/components/newsletter-form.tsx`
- Create: `src/lib/content/newsletter.ts`
- Create: `src/app/newsletter/page.tsx`

- [ ] **Step 1: Create newsletter content**

Create `src/lib/content/newsletter.ts`:

```typescript
export const newsletterPage = {
  heading: "The FrontendMinds Newsletter",
  subheading:
    "Practical AI + frontend insights, delivered weekly. Tools that work, patterns that scale, and lessons from real implementation work.",
  features: [
    "AI integration patterns for frontend teams",
    "Angular modernization strategies and case studies",
    "Developer workflow and tooling reviews",
    "No hype — only what actually works",
  ],
  frequency: "Weekly, every Tuesday.",
  formCta: "Subscribe",
  successMessage: "You're in! Check your inbox for a welcome email.",
} as const;

export const newsletterFormDefaults = {
  placeholder: {
    firstName: "First name",
    email: "you@company.com",
  },
  submitText: "Subscribe",
  submittingText: "Subscribing...",
} as const;
```

- [ ] **Step 2: Create subscribe server action**

Create `src/actions/subscribe.ts`:

```typescript
"use server";

import { z } from "zod";
import { Resend } from "resend";

const subscribeSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  email: z.string().email("Invalid email address").max(320),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubscribeResult =
  | { success: true }
  | { success: false; error: string };

export async function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  const parsed = subscribeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not set");
    return { success: false, error: "Newsletter signup is temporarily unavailable." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.contacts.create({
      audienceId,
      email: parsed.data.email,
      firstName: parsed.data.firstName,
    });
  } catch (error) {
    console.error("Failed to add newsletter subscriber:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Send welcome email (non-blocking)
  resend.emails
    .send({
      from: "FrontendMinds <newsletter@frontendminds.com>",
      to: parsed.data.email,
      subject: "Welcome to FrontendMinds",
      html: `<p>Hi ${parsed.data.firstName},</p><p>Thanks for subscribing to FrontendMinds. You'll get practical AI + frontend insights every week.</p><p>— Florin</p>`,
    })
    .catch((err) => console.error("Welcome email failed:", err));

  return { success: true };
}
```

- [ ] **Step 3: Create reusable newsletter form component**

Create `src/components/newsletter-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { subscribe, type SubscribeInput } from "@/actions/subscribe";
import { newsletterFormDefaults } from "@/lib/content/newsletter";

export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const input: SubscribeInput = {
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
    };

    const result = await subscribe(input);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <p className="text-sm font-medium text-secondary-foreground">
          You&apos;re in! Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="firstName"
          type="text"
          required
          placeholder={newsletterFormDefaults.placeholder.firstName}
          className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          name="email"
          type="email"
          required
          placeholder={newsletterFormDefaults.placeholder.email}
          className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === "submitting"
            ? newsletterFormDefaults.submittingText
            : newsletterFormDefaults.submitText}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
      )}
    </form>
  );
}
```

- [ ] **Step 4: Create newsletter landing page**

Create `src/app/newsletter/page.tsx`:

```tsx
import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { newsletterPage } from "@/lib/content/newsletter";
import { NewsletterForm } from "@/components/newsletter-form";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: pageSeo.newsletter.title,
  description: pageSeo.newsletter.description,
};

export default function Newsletter() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
        {newsletterPage.heading}
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        {newsletterPage.subheading}
      </p>

      <div className="mb-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          What you get
        </h2>
        <ul className="space-y-3">
          {newsletterPage.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{newsletterPage.frequency}</p>
      </div>

      <NewsletterForm />
    </main>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Newsletter page renders at `/newsletter`.

- [ ] **Step 6: Commit**

```bash
git add src/actions/subscribe.ts src/components/newsletter-form.tsx src/lib/content/newsletter.ts src/app/newsletter/
git commit -m "feat: add newsletter with Resend Audiences integration and signup form"
```

---

## Task 9: Services Page

**Files:**
- Create: `src/lib/content/services.ts`
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create services content**

Create `src/lib/content/services.ts`:

```typescript
import { siteConfig } from "@/lib/config/site";

export interface Service {
  id: string;
  title: string;
  problem: string;
  description: string;
  outcomes: string[];
  pricing: string;
  timeline: string;
  ctaText: string;
  ctaHref: string;
}

export const servicesPage = {
  heading: "Services",
  subheading:
    "Focused engagements for teams modernizing Angular applications and adopting AI workflows.",
} as const;

export const services: Service[] = [
  {
    id: "angular-audit",
    title: "Angular Modernization Audit",
    problem:
      "Your Angular app is aging. Upgrades are getting harder, the team is slower, and technical debt compounds every sprint.",
    description:
      "A structured 14-day assessment of your Angular codebase — version health, architecture quality, modern feature adoption, and upgrade readiness. You get a scored report, prioritized risk map, and a phased modernization roadmap.",
    outcomes: [
      "Scored assessment across 5 dimensions",
      "Prioritized risk and debt map",
      "Phased modernization roadmap",
      "Effort and cost estimates for each phase",
      "Executive summary for stakeholder buy-in",
    ],
    pricing: "EUR 2,000 – 4,000",
    timeline: "14 days",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-audit"),
  },
  {
    id: "ai-rationalization",
    title: "AI Tool Stack Rationalization",
    problem:
      "Your team has five AI subscriptions, no shared workflow, and nobody knows which tools actually help.",
    description:
      "An evaluation of your team's AI tool landscape — what's useful, what overlaps, what's missing. You get a standardized tool stack, clear usage guidelines, and an implementation plan to reduce cost and confusion.",
    outcomes: [
      "Current tool inventory and usage audit",
      "Recommended standardized stack",
      "Configuration and workflow guidelines",
      "Cost reduction analysis",
      "Team adoption playbook",
    ],
    pricing: "EUR 2,500 – 4,000",
    timeline: "10–14 days",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-ai"),
  },
  {
    id: "consulting",
    title: "Consulting & Implementation",
    problem:
      "You need hands-on help — not just a report. Someone who can work alongside your team to execute the plan.",
    description:
      "Ongoing consulting for teams executing modernization or AI adoption work. Flexible scope: architecture reviews, implementation support, team mentoring, or sprint-based delivery.",
    outcomes: [
      "Direct implementation support",
      "Architecture review and guidance",
      "Team mentoring and knowledge transfer",
      "Sprint-aligned delivery",
    ],
    pricing: "Custom",
    timeline: "Flexible",
    ctaText: "Book a Discovery Call",
    ctaHref: siteConfig.calendly.buildUrl("services-consulting"),
  },
];
```

- [ ] **Step 2: Create services page**

Create `src/app/services/page.tsx`:

```tsx
import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { servicesPage, services } from "@/lib/content/services";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: pageSeo.services.title,
  description: pageSeo.services.description,
};

export default function Services() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
        {servicesPage.heading}
      </h1>
      <p className="mb-12 text-lg text-muted-foreground">{servicesPage.subheading}</p>

      <div className="space-y-12">
        {services.map((service) => (
          <section
            key={service.id}
            className="rounded-lg border border-border bg-card p-6 sm:p-8"
          >
            <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
              {service.title}
            </h2>
            <p className="mb-4 text-sm italic text-muted-foreground">{service.problem}</p>
            <p className="mb-6 leading-relaxed text-muted-foreground">{service.description}</p>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What you get
            </h3>
            <ul className="mb-6 space-y-2">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" />
                  <span className="text-sm text-foreground">{outcome}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{service.pricing}</strong>
              </span>
              <span className="text-sm text-muted-foreground">
                Timeline: <strong className="text-foreground">{service.timeline}</strong>
              </span>
              <a
                href={service.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {service.ctaText}
              </a>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/services.ts src/app/services/
git commit -m "feat: add services page with Angular audit, AI rationalization, and consulting"
```

---

## Task 10: About & Author Pages

**Files:**
- Create: `src/lib/content/about.ts`
- Create: `src/app/about/page.tsx`
- Create: `src/app/author/[slug]/page.tsx`

- [ ] **Step 1: Create about content**

Create `src/lib/content/about.ts`:

```typescript
export const aboutPage = {
  heading: "About FrontendMinds",
  mission:
    "FrontendMinds is a knowledge hub for developers exploring practical AI in frontend work. Not hype. Not theory. Tools, patterns, and strategies that actually ship.",
  whoItsFor: [
    "CTOs and VPs of Engineering evaluating modernization paths",
    "Engineering managers standardizing AI workflows for their teams",
    "Tech leads navigating Angular upgrades and modern architecture",
    "Frontend developers who want to work smarter, not just harder",
  ],
  founder: {
    name: "Florin Siciu",
    title: "Founder & Angular Modernization Consultant",
    bio: "I'm an Angular architect who has shipped modernization work across enterprise codebases. I started FrontendMinds because most AI content is hype and most Angular content is outdated tutorials. This is the resource I wish I had — practical, specific, and built on real implementation experience.",
    expertise: [
      "Angular modernization & upgrades",
      "AI workflow integration for dev teams",
      "Enterprise frontend architecture",
      "Tool stack evaluation & standardization",
    ],
  },
} as const;
```

- [ ] **Step 2: Create about page**

Create `src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/content/seo";
import { aboutPage } from "@/lib/content/about";
import { siteConfig } from "@/lib/config/site";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
};

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
        {aboutPage.heading}
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
        {aboutPage.mission}
      </p>

      {/* Who it's for */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-semibold text-foreground">Who This Is For</h2>
        <ul className="space-y-3">
          {aboutPage.whoItsFor.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Founder */}
      <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 className="mb-1 font-heading text-2xl font-semibold text-foreground">
          {aboutPage.founder.name}
        </h2>
        <p className="mb-4 text-sm text-primary">{aboutPage.founder.title}</p>
        <p className="mb-6 leading-relaxed text-muted-foreground">{aboutPage.founder.bio}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {aboutPage.founder.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            LinkedIn
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            GitHub
          </a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            X (Twitter)
          </a>
          <Link href="/author/florin-siciu" className="text-sm text-primary hover:text-accent">
            All articles →
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Create author page**

Create `src/app/author/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { aboutPage } from "@/lib/content/about";
import { siteConfig } from "@/lib/config/site";
import { NewsletterForm } from "@/components/newsletter-form";

const AUTHOR_SLUG = "florin-siciu";

export async function generateStaticParams() {
  return [{ slug: AUTHOR_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== AUTHOR_SLUG) return {};

  return {
    title: `${aboutPage.founder.name} | FrontendMinds`,
    description: aboutPage.founder.bio,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== AUTHOR_SLUG) notFound();

  const posts = getAllPosts().filter((p) => p.author === AUTHOR_SLUG);
  const founder = aboutPage.founder;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.title,
    url: `${siteConfig.baseUrl}/author/${AUTHOR_SLUG}`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.twitter],
    worksFor: {
      "@type": "Organization",
      name: "FrontendMinds",
      url: siteConfig.baseUrl,
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Author info */}
      <div className="mb-12">
        <h1 className="mb-1 font-heading text-3xl font-bold text-foreground">{founder.name}</h1>
        <p className="mb-4 text-primary">{founder.title}</p>
        <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">{founder.bio}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {founder.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            LinkedIn
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            GitHub
          </a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent">
            X (Twitter)
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mb-12 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Get updates from Florin</h2>
        <p className="mb-4 text-sm text-muted-foreground">Practical AI + frontend insights, weekly.</p>
        <NewsletterForm />
      </div>

      {/* Articles */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Articles ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/about.ts src/app/about/ src/app/author/
git commit -m "feat: add about page and author page with JSON-LD Person schema"
```

---

## Task 11: Contact Page & Database Migration

**Files:**
- Create: `supabase/migrations/002_contact_submissions.sql`
- Create: `src/actions/contact.ts`
- Create: `src/lib/content/contact.ts`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create database migration**

Create `supabase/migrations/002_contact_submissions.sql`:

```sql
-- Contact form submissions

create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  reason text not null check (reason in ('general', 'service', 'speaking', 'partnership')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

create policy "Allow anonymous contact submissions"
  on contact_submissions for insert
  to anon
  with check (true);
```

Run this migration in the Supabase SQL Editor or via CLI.

- [ ] **Step 2: Create contact content**

Create `src/lib/content/contact.ts`:

```typescript
export const contactPage = {
  heading: "Contact",
  subheading: "Have a question, want to discuss a project, or interested in a partnership? Get in touch.",
  reasons: [
    { value: "general", label: "General inquiry" },
    { value: "service", label: "Service inquiry" },
    { value: "speaking", label: "Speaking" },
    { value: "partnership", label: "Partnership" },
  ] as const,
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    reasonLabel: "Reason",
    messageLabel: "Message",
    messagePlaceholder: "Tell me more about what you need...",
    submitText: "Send Message",
    submittingText: "Sending...",
  },
  successMessage: "Message sent! I'll get back to you within 1–2 business days.",
} as const;
```

- [ ] **Step 3: Create contact server action**

Create `src/actions/contact.ts`:

```typescript
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(320),
  reason: z.enum(["general", "service", "speaking", "partnership"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    reason: parsed.data.reason,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Contact submission failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Send notification email to Florin (non-blocking)
  const resend = new Resend(process.env.RESEND_API_KEY);
  resend.emails
    .send({
      from: "FrontendMinds <contact@frontendminds.com>",
      to: "florin@frontendminds.com",
      subject: `[FrontendMinds] ${parsed.data.reason}: ${parsed.data.name}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nReason: ${parsed.data.reason}\n\n${parsed.data.message}`,
    })
    .catch((err) => console.error("Contact notification email failed:", err));

  return { success: true };
}
```

- [ ] **Step 4: Create contact page**

Create `src/app/contact/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { submitContact, type ContactInput } from "@/actions/contact";
import { contactPage } from "@/lib/content/contact";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const fd = new FormData(e.currentTarget);
    const input: ContactInput = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      reason: fd.get("reason") as ContactInput["reason"],
      message: fd.get("message") as string,
    };

    const result = await submitContact(input);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  const f = contactPage.form;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
        {contactPage.heading}
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">{contactPage.subheading}</p>

      {status === "success" ? (
        <div className="rounded-lg border border-secondary-foreground/20 bg-secondary-foreground/5 p-6">
          <p className="text-secondary-foreground">{contactPage.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
              {f.nameLabel}
            </label>
            <input
              id="name" name="name" type="text" required
              placeholder={f.namePlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              {f.emailLabel}
            </label>
            <input
              id="email" name="email" type="email" required
              placeholder={f.emailPlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-foreground">
              {f.reasonLabel}
            </label>
            <select
              id="reason" name="reason" required
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {contactPage.reasons.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              {f.messageLabel}
            </label>
            <textarea
              id="message" name="message" required rows={5}
              placeholder={f.messagePlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <button
            type="submit" disabled={status === "submitting"}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors sm:w-auto"
          >
            {status === "submitting" ? f.submittingText : f.submitText}
          </button>
        </form>
      )}
    </main>
  );
}
```

Note: This is a client component because of form state. The `metadata` export for SEO must go in a separate `layout.tsx` file in the same directory, or use a `generateMetadata` pattern. Since the page is `"use client"`, create a layout:

Create `src/app/contact/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

- [ ] **Step 6: Commit**

```bash
git add supabase/migrations/002_contact_submissions.sql src/actions/contact.ts src/lib/content/contact.ts src/app/contact/
git commit -m "feat: add contact page with form, Supabase storage, and email notification"
```

---

## Task 12: Resources Page

**Files:**
- Create: `src/lib/content/resources.ts`
- Create: `src/app/resources/page.tsx`

- [ ] **Step 1: Create resources content**

Create `src/lib/content/resources.ts`:

```typescript
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "checklist" | "guide" | "template" | "tool";
  href: string;
  gated: boolean;
}

export const resourcesPage = {
  heading: "Resources",
  subheading:
    "Free tools, checklists, and guides for Angular modernization and AI-powered frontend workflows.",
} as const;

export const resources: Resource[] = [
  {
    id: "angular-scorecard",
    title: "Angular Modernization Scorecard",
    description:
      "20 yes-or-no questions to assess your Angular app's modernization readiness across 5 dimensions. Get a personalized score and action plan.",
    type: "tool",
    href: "/assessment",
    gated: false,
  },
];
```

- [ ] **Step 2: Create resources page**

Create `src/app/resources/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/content/seo";
import { resourcesPage, resources } from "@/lib/content/resources";

export const metadata: Metadata = {
  title: pageSeo.resources.title,
  description: pageSeo.resources.description,
};

const typeBadgeColors: Record<string, string> = {
  checklist: "bg-secondary-foreground/10 text-secondary-foreground",
  guide: "bg-primary/10 text-primary",
  template: "bg-warning/10 text-warning",
  tool: "bg-accent/10 text-accent",
};

export default function Resources() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
        {resourcesPage.heading}
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">{resourcesPage.subheading}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            href={resource.href}
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ${typeBadgeColors[resource.type] ?? "bg-surface text-muted-foreground"}`}
              >
                {resource.type}
              </span>
              {resource.gated && (
                <span className="text-xs text-muted-foreground">Email required</span>
              )}
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {resource.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {resource.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/resources.ts src/app/resources/
git commit -m "feat: add resources page with scorecard as first resource"
```

---

## Task 13: Homepage Redesign

**Files:**
- Modify: `src/lib/content/landing.ts`
- Create: `src/components/landing/content-pillars.tsx`
- Create: `src/components/landing/featured-articles.tsx`
- Create: `src/components/landing/scorecard-spotlight.tsx`
- Create: `src/components/landing/newsletter-cta.tsx`
- Create: `src/components/landing/founder-section.tsx`
- Modify: `src/components/landing/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite landing content**

Replace the entire contents of `src/lib/content/landing.ts` with the new homepage content structure:

```typescript
export const hero = {
  headline: "Where AI Meets Frontend Excellence",
  subheadline:
    "Practical insights, tools, and systems for developers building smarter web products.",
  primaryCta: { text: "Take the Angular Scorecard", href: "/assessment" },
  secondaryCta: { text: "Read the Blog", href: "/blog" },
} as const;

export const contentPillars = {
  eyebrow: "What We Cover",
  items: [
    {
      title: "AI for Frontend",
      description: "Practical integration of AI into frontend workflows and products.",
      href: "/blog?category=ai-for-frontend",
    },
    {
      title: "Angular Modernization",
      description: "Strategies for upgrading, migrating, and modernizing Angular applications.",
      href: "/blog?category=angular-ai",
    },
    {
      title: "Dev Workflows",
      description: "Tooling, automation, and processes that make teams faster.",
      href: "/blog?category=dev-workflow",
    },
    {
      title: "Practical Tooling",
      description: "Reviews and evaluations of tools that actually work.",
      href: "/blog?category=tutorials",
    },
  ],
} as const;

export const scorecardSpotlight = {
  eyebrow: "Free Assessment",
  heading: "Angular Modernization Scorecard",
  description:
    "20 yes-or-no questions. 5 dimensions. A personalized modernization score and action plan for your Angular application — in under 3 minutes.",
  ctaText: "Take the Scorecard",
  ctaHref: "/assessment",
} as const;

export const newsletterCta = {
  heading: "Get Practical AI + Frontend Insights",
  subheading: "Weekly. No hype. No spam. Just what works.",
} as const;

export const founderSection = {
  eyebrow: "Built by",
  name: "Florin Siciu",
  title: "Angular Modernization Consultant",
  description:
    "I help dev teams modernize Angular applications and adopt AI workflows practically. FrontendMinds is where I share what I learn.",
  ctaText: "Learn more",
  ctaHref: "/about",
} as const;
```

- [ ] **Step 2: Create content pillars component**

Create `src/components/landing/content-pillars.tsx`:

```tsx
import Link from "next/link";
import { contentPillars } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";

export function ContentPillars() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          {contentPillars.eyebrow}
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contentPillars.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <Link
              href={item.href}
              className="group block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create featured articles component**

Create `src/components/landing/featured-articles.tsx`:

```tsx
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedArticles() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Latest Articles</h2>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 100}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create scorecard spotlight component**

Create `src/components/landing/scorecard-spotlight.tsx`:

```tsx
import Link from "next/link";
import { scorecardSpotlight } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";

export function ScorecardSpotlight() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="rounded-xl border border-border bg-card p-8 sm:p-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            {scorecardSpotlight.eyebrow}
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
            {scorecardSpotlight.heading}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            {scorecardSpotlight.description}
          </p>
          <Link
            href={scorecardSpotlight.ctaHref}
            className="inline-flex items-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {scorecardSpotlight.ctaText}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 5: Create newsletter CTA section**

Create `src/components/landing/newsletter-cta.tsx`:

```tsx
import { newsletterCta } from "@/lib/content/landing";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function NewsletterCtaSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center">
          <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
            {newsletterCta.heading}
          </h2>
          <p className="mb-6 text-muted-foreground">{newsletterCta.subheading}</p>
          <NewsletterForm className="mx-auto max-w-xl" />
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 6: Create founder section component**

Create `src/components/landing/founder-section.tsx`:

```tsx
import Link from "next/link";
import { founderSection } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";

export function FounderSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-8">
          {/* Photo placeholder */}
          <div className="mb-6 h-24 w-24 shrink-0 rounded-full bg-surface border border-border sm:mb-0" />
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
              {founderSection.eyebrow}
            </p>
            <h2 className="mb-1 text-xl font-semibold text-foreground">{founderSection.name}</h2>
            <p className="mb-3 text-sm text-muted-foreground">{founderSection.title}</p>
            <p className="mb-4 text-muted-foreground">{founderSection.description}</p>
            <Link
              href={founderSection.ctaHref}
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              {founderSection.ctaText} →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 7: Simplify the hero component**

Rewrite `src/components/landing/hero.tsx` to match the new platform homepage. Remove the ScoreGauge pentagon visualization and complex mesh gradient. Replace with a clean text-focused hero:

```tsx
import Link from "next/link";
import { hero } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 text-center">
      <Reveal>
        <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {hero.subheadline}
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={hero.primaryCta.href}
            className={cn(buttonVariants({ size: "lg" }), "px-8")}
          >
            {hero.primaryCta.text}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8")}
          >
            {hero.secondaryCta.text}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 8: Update homepage page.tsx**

Replace `src/app/page.tsx`:

```tsx
import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { Hero } from "@/components/landing/hero";
import { ContentPillars } from "@/components/landing/content-pillars";
import { FeaturedArticles } from "@/components/landing/featured-articles";
import { ScorecardSpotlight } from "@/components/landing/scorecard-spotlight";
import { NewsletterCtaSection } from "@/components/landing/newsletter-cta";
import { FounderSection } from "@/components/landing/founder-section";
import { StickyMobileCta } from "@/components/landing/sticky-mobile-cta";

export const metadata: Metadata = {
  title: pageSeo.home.title,
  description: pageSeo.home.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <ContentPillars />
      <FeaturedArticles />
      <ScorecardSpotlight />
      <NewsletterCtaSection />
      <FounderSection />
      <StickyMobileCta />
    </>
  );
}
```

- [ ] **Step 9: Remove unused landing components**

Delete these files that are no longer imported:
- `src/components/landing/proof-strip.tsx`
- `src/components/landing/audience.tsx`
- `src/components/landing/how-it-works.tsx`
- `src/components/landing/benefits.tsx`
- `src/components/landing/final-cta.tsx`

Verify no other file imports them first.

- [ ] **Step 10: Verify build**

```bash
pnpm build
```

- [ ] **Step 11: Commit**

```bash
git add src/lib/content/landing.ts src/components/landing/ src/app/page.tsx
git commit -m "feat: redesign homepage as FrontendMinds platform with pillars, articles, scorecard spotlight"
```

---

## Task 14: Scorecard & Email Rebrand

**Files:**
- Modify: `src/lib/content/assessment.ts`
- Modify: `src/lib/content/results.ts`
- Modify: `src/lib/email.tsx`
- Modify: `src/components/landing/footer.tsx`

- [ ] **Step 1: Update assessment content**

In `src/lib/content/assessment.ts`, update branding references:

- Change `intro.credibility` from "Built by an Angular architect..." to "Built by FrontendMinds — practical Angular modernization expertise from real enterprise projects."
- Keep all other assessment content as-is (questions, methodology, etc. are brand-agnostic)

- [ ] **Step 2: Update results content**

In `src/lib/content/results.ts`:
- No branding-specific strings to change (tier cards, diagnoses, and recommendations are already brand-agnostic)
- Verify `tierCtaCards` point to Calendly (they do via `siteConfig.calendly.buildUrl()` — this was already updated in Task 3)

- [ ] **Step 3: Update email template branding**

In `src/lib/email.tsx`, update the email styles and branding:

- Change the header background from `#DD0031` to `#6366F1` (indigo)
- Change `siteConfig.name` is already "FrontendMinds" from Task 3
- Update the `from` address to use FrontendMinds: `FrontendMinds <contact@frontendminds.com>` (or keep the current domain until DNS is configured)
- Update `companyName` reference in footer (already done in Task 3 via `emailFooter`)

The key CSS color changes in the email template:
- Primary/CTA buttons: `#DD0031` → `#6366F1`
- Any accent highlights: `#FF5370` → `#818CF8`
- Keep score-tier contextual colors (red/amber/green) for the dimension bars

- [ ] **Step 4: Update footer component**

In `src/components/landing/footer.tsx`, add the new `footerNav` links from `src/lib/content/footer.ts`:

- Import `footerNav` alongside existing `socialLinks` and `legalLinks`
- Add a navigation section with the `footerNav` items
- Keep social icons and legal links
- Update the copyright to use the new `copyright` string from footer.ts

- [ ] **Step 5: Verify build and test scorecard flow**

```bash
pnpm build && pnpm dev
```

- Walk through the full scorecard flow: `/assessment` → quiz → email gate → results
- Verify all CTAs show indigo (not red)
- Verify score tier colors are still contextual (red/amber/green for scores)
- Verify email template sends with updated branding

- [ ] **Step 6: Commit**

```bash
git add src/lib/content/assessment.ts src/lib/content/results.ts src/lib/email.tsx src/components/landing/footer.tsx
git commit -m "feat: rebrand scorecard, email template, and footer to FrontendMinds"
```

---

## Task 15: SEO Structured Data & Final Polish

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/content/seo.ts`

- [ ] **Step 1: Update organization JSON-LD**

In `src/lib/content/seo.ts`, update `organizationJsonLd` (if not already done in Task 3):

```typescript
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Practical insights, tools, and systems for developers building smarter web products.",
  founder: {
    "@type": "Person",
    name: "Florin Siciu",
  },
  sameAs: [
    "https://linkedin.com/in/florinsiciu",
    "https://github.com/florinsiciu",
    "https://x.com/nicusorsiciu",
  ],
};
```

Add a `WebSite` schema:

```typescript
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Practical insights, tools, and systems for developers building smarter web products.",
  publisher: {
    "@type": "Organization",
    name: "FrontendMinds",
  },
};
```

- [ ] **Step 2: Update layout.tsx JSON-LD and RSS link**

In `src/app/layout.tsx`:

- Replace the FAQ JSON-LD with the `websiteJsonLd` (FAQ was scorecard-specific)
- Keep `organizationJsonLd`
- Add RSS feed discovery link in `<head>`:

```tsx
<link rel="alternate" type="application/rss+xml" title="FrontendMinds" href="/feed.xml" />
```

- [ ] **Step 3: Update all existing pageSeo entries**

In `src/lib/content/seo.ts`, update all existing entries to use "FrontendMinds" instead of "Florin Siciu":

- `assessment`: `"Angular Modernization Assessment | FrontendMinds"`
- `quiz`: `"Assessment Quiz | FrontendMinds"` (noindex: true)
- `unlock`: `"Unlock Results | FrontendMinds"` (noindex: true)
- `results`: `"Your Results | FrontendMinds"` (noindex: true)
- `privacy`: `"Privacy Policy | FrontendMinds"`
- `terms`: `"Terms of Service | FrontendMinds"`

- [ ] **Step 4: Add sitemap and robots.txt**

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.baseUrl}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.baseUrl}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.baseUrl}/assessment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.baseUrl}/author/florin-siciu`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteConfig.baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
```

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/assessment/quiz", "/assessment/unlock", "/assessment/results"] },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Final build verification**

```bash
pnpm build
```

Expected: Zero errors, all routes compile.

- [ ] **Step 5: Verify all routes**

Start dev server and verify each route renders:

```bash
pnpm dev
```

- [ ] `/` — Homepage with hero, pillars, articles, scorecard, newsletter, founder
- [ ] `/blog` — Blog index with sample post
- [ ] `/blog/hello-frontendminds` — Blog post with MDX rendering
- [ ] `/newsletter` — Newsletter signup page
- [ ] `/services` — Three service offerings
- [ ] `/about` — About FrontendMinds + founder
- [ ] `/author/florin-siciu` — Author page with articles
- [ ] `/contact` — Contact form
- [ ] `/resources` — Resources with scorecard listed
- [ ] `/assessment` — Scorecard intro (rebranded)
- [ ] `/assessment/quiz` — Quiz flow works
- [ ] `/feed.xml` — Valid RSS XML
- [ ] `/privacy` and `/terms` — Legal pages render

Verify navigation links work on both desktop and mobile.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/lib/content/seo.ts src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: update SEO structured data, sitemap, robots.txt to FrontendMinds branding"
```

---

## Parallelization Notes

Tasks that can run in parallel (no dependencies between them):

- **Group A** (after Task 3): Tasks 4, 5, 8, 9, 10, 11, 12
- **Group B** (after Task 5): Tasks 6, 7
- **Task 13** depends on: Tasks 5 (blog data layer), 8 (newsletter form), and the new landing content
- **Task 14** depends on: Task 2 (brand colors) and Task 3 (site config)
- **Task 15** depends on: all other tasks complete

Recommended execution order for sequential execution:
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15
