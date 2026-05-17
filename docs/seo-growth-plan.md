# SEO Growth Plan — frontendminds.com

**Date:** 2026-05-17
**Source:** Google Search Console analysis + SERP competitive research via Playwright
**Baseline:** 1 click, 598 impressions, 0.2% CTR, avg position 6, 4 indexed pages, 0 backlinks

---

## Current State Snapshot

### Performance (3 months)

| Metric | Value | Assessment |
|--------|-------|------------|
| Total clicks | 1 | Pre-traction |
| Total impressions | 598 | Growing — all recent |
| Average CTR | 0.2% | Critically low (expected 3-5% at position 6) |
| Average position | 6 | On page 1 for some queries |
| Indexed pages | 4 of 18 in sitemap | Most blog posts not yet indexed |
| Backlinks | 0 | Biggest growth blocker |
| Unique queries | 77 | Solid diversity for a 5-week-old site |

### Page Performance Breakdown

| Page | Clicks | Impressions | Best Ranking |
|------|:---:|:---:|---|
| /blog/angular-end-of-life-2026 | 1 | 569 | ~pos 6 for "angular latest version may 2026" |
| /blog/angular-modernization-checklist | 0 | 13 | #1 for "angular modernization checklist" |
| / (homepage) | 0 | 8 | — |
| /terms | 0 | 7 | — |
| /blog/angular-modernization-framework | 0 | 5 | — |
| /blog/angular-migration-business-case | 0 | 4 | #1 for "angular migration business case ROI" |
| /blog | 0 | 4 | — |
| /blog/angular-migrations-fail | 0 | 2 | — |
| /about | 0 | 1 | — |
| /assessment | 0 | 1 | — |

### Indexing Health

- 4 indexed pages
- 5 "not indexed" — all noise (2 junk crawler URLs `/$` `/&`, 1 redirect, 1 font file, 1 favicon)
- Sitemap: 18 pages discovered, last read May 16, status Success
- Structured data: 10 breadcrumbs valid, 9 FAQs valid, 0 errors
- HTTPS: 14 valid, 0 non-HTTPS

---

## Competitor Map

Compiled from SERP analysis across 6 query clusters (May 17, 2026).

### Tier 1 — Dominant competitors (appear in 3+ SERPs)

| Competitor | Angle | Strength | Weakness (our opportunity) |
|---|---|---|---|
| **HeroDevs** (herodevs.com) | Official Angular EOL support, version-specific articles | Brand authority, multiple articles, social presence, appears in 5/6 SERPs | Commercial upsell focus, no enterprise decision-maker angle |
| **Digisoft Solution** (digisoftsolution.com) | "Comprehensive Guide to Angular Migration 2026" | Ranks for migration + enterprise + AngularJS queries | Generic agency content, no unique IP or authority signal |
| **angular.dev** | Official docs — releases, update guide, migrations | Google's own domain, automatic authority | Not opinionated, no business-case framing |

### Tier 2 — Recurring competitors (appear in 2 SERPs)

| Competitor | Angle |
|---|---|
| **endoflife.date** | Clean data tables, wins featured snippets |
| **arc.dev** | Dev hiring platform, "Angular Latest Version" + "Angular vs AngularJS" guides, wins featured snippets |
| **TuxCare** (tuxcare.com) | "Keep secure without panic" — security/patching vendor angle |
| **SCAND** (scand.com) | AngularJS EOL legacy apps, migration strategy |
| **Legacyleap** (legacyleap.ai) | AI-assisted AngularJS-to-Angular migration |
| **Hashbyt** (hashbyt.com) | Legacy-to-Angular frontend modernization |
| **House of Angular** (houseofangular.io) | Angular consultancy, step-by-step modernization + case studies |
| **Medium** (various authors) | Angular 22 signals, migration stories |

### Tier 3 — Single-appearance competitors

Progressive Robot, Avidclan Technologies, Ouranos Technologies, yeou.dev, Codemech Solutions, Spiral Compute, iQuasar Software, MCP Market

### Our Competitive Advantages (not surfaced by competitors)

1. **19 enterprise migration projects** — no competitor claims comparable experience
2. **Compliance framing** (SOC 2, ISO 27001, PCI-DSS, cyber insurance) — unique angle
3. **Decision-maker audience** (CTOs, tech leads) — competitors write for developers
4. **Named framework** (5-Dimension Modernization Framework) — citable IP
5. **Free assessment tool** — linkable interactive asset

---

## Fix Plan — Prioritized by Impact

### Step 1: CTR Optimization (Title & Meta Description) — COMPLETED

**Status:** Done (2026-05-17)

Optimized all 9 blog post titles and descriptions based on SERP competitive analysis:

| Page | Change | Rationale |
|------|--------|-----------|
| angular-end-of-life-2026 | Title: leads with "Angular 19 EOL May 2026", adds "Version Status Table" | Matches top queries, featured-snippet bait, 59 chars (no truncation) |
| angular-modernization-checklist | Dropped "The", expanded description with authority signal | Already #1, minimal-risk refinement |
| angular-upgrade-guide | Added "2026" to title | Freshness signal, matches competitor pattern |
| angular-migration-business-case | Description only: added "ROI", "cost models" | Already #1. Added keywords that match ranking query |
| angular-modernization-framework | Title: "5 Dimensions to Evaluate" (actionable) | More specific than "The 5-Dimension..." |
| angular-signals-enterprise-guide | Title: "Angular Signals Guide 2026: Enterprise Adoption Playbook" | "2026" freshness + "Playbook" signals comprehensive resource |
| angular-migrations-fail | Description expanded from 96 → 188 chars with specific patterns | Too short before, invisible in SERPs |
| cost-of-angularjs-2026 | Title: "AngularJS in 2026: ..." + description 81 → 195 chars | "AngularJS in 2026" matches query patterns, description was too thin |
| angular-falling-behind | Added "in 2026" to title, expanded description with technical specifics | Year signal + longer description for SERP visibility |

**Expected impact:** CTR improvement from 0.2% to 2-4% over 2-4 weeks as Google recrawls. At 598 impressions, that's 12-24 clicks/month vs 1.

---

### Step 2: Get More Pages Indexed

**Status:** Not started
**Priority:** High — only 4 of 9 blog posts are indexed

**Problem:** Five blog posts aren't appearing in search at all. GSC shows 4 indexed pages, but we have 9 blog posts plus other pages. The sitemap discovers 18 URLs but Google has only chosen to index 4.

**Analysis needed:**
- Which specific blog posts are indexed vs not (use URL Inspection in GSC for each)
- Whether "Crawled - currently not indexed" applies to any blog posts (vs just static assets)
- Whether internal linking is sufficient for Google to find and value these pages

**Actions:**
1. Use GSC URL Inspection to check indexing status of each blog post URL
2. Submit non-indexed blog posts for indexing via GSC URL Inspection
3. Verify all blog posts are in sitemap.xml
4. Check that internal links from indexed pages point to non-indexed pages
5. Ensure no `noindex` tags or robots.txt blocks on blog posts

**Expected impact:** Doubling indexed pages from 4 to 8+ should proportionally increase impressions and query coverage.

---

### Step 3: Internal Linking Improvements

**Status:** Not started
**Priority:** High — distributes PageRank from strong pages to weak ones

**Problem:** The EOL article (569 impressions) likely has the most link equity, but it may not be effectively distributing that equity to other blog posts. Similarly, the #1-ranked pages (checklist, business case) should link to each other and to lower-performing pages.

**Analysis needed:**
- Audit current internal links in each blog post
- Map which posts link to which
- Identify orphan pages (posts with no inbound internal links)
- Check if the EOL article links to all other relevant posts

**Actions:**
1. Create an internal link matrix (source → target)
2. Ensure every blog post links to at least 2-3 other blog posts
3. Add contextual links from the EOL article (strongest page) to:
   - upgrade-guide (natural "here's how to upgrade")
   - signals-enterprise-guide (natural "what modern Angular looks like")
   - migrations-fail (natural "avoid these mistakes")
4. Add links from checklist/framework to business-case and vice versa
5. Ensure homepage and /blog listing link to all posts

**Expected impact:** Improved indexing of weaker pages + PageRank distribution lifts positions for pages currently at 8-10 to 5-7.

---

### Step 4: Content Gap — New Articles Targeting High-Volume Queries

**Status:** Not started
**Priority:** Medium — expands keyword surface area

**Problem:** The competitive research revealed queries where frontendminds.com has relevant content but doesn't rank, and queries with volume where no content exists.

**Gaps identified from SERP mining:**

| Query Cluster | Monthly Impression Potential | Current Coverage | Action |
|---|---|---|---|
| "angular version support lifecycle" | High | EOL article covers this but doesn't rank | Optimize existing EOL article H2s for this query |
| "angular 19 to 21 migration" / "angular 19 to 20 upgrade" | High (timely — v19 EOL in 2 days) | upgrade-guide partially covers | Add specific v19→v20→v21 fast-track section |
| "is angular still relevant 2026" | Medium (PAA question) | No content | Could be a standalone article or FAQ expansion |
| "angular 22 new features" / "angular 22 release date" | Very High (upcoming release) | No content | **Opportunity: publish Angular 22 preview article** |
| "angularjs to angular migration" | Medium | cost-of-angularjs partially covers | Need dedicated AngularJS-to-Angular migration guide |
| "angular signals migration" / "angular signals tutorial" | Medium | signals-enterprise-guide exists but not ranking | Optimize for these queries, add practical code examples |

**People Also Ask (PAA) questions found in SERPs:**
- "Is Angular 19 LTS version?" — covered in FAQ schema
- "Is Angular still used in 2026?" — not covered, good standalone piece
- "Is Angular 21 production ready?" — not covered
- "How long will Angular 19 be supported?" — covered in FAQ
- "Is Angular 20 LTS?" — covered
- "Should I use Angular 19 or 20?" — partially covered
- "How hard is it to migrate from AngularJS to Angular?" — not covered

**Recommended new articles (priority order):**
1. **"Angular 22: What Enterprise Teams Need to Know"** — capitalize on imminent release (May 2026), extremely high search volume expected
2. **"AngularJS to Angular Migration Guide 2026"** — dedicated article targeting `angularjs migration` queries, linking to existing cost-of-angularjs article
3. **"Is Angular Still Relevant in 2026?"** — targets PAA questions, good for brand awareness

---

### Step 5: Build External Backlinks

**Status:** Not started (separate strategy exists in `docs/backlink-strategy.md`)
**Priority:** Critical long-term — 0 backlinks is the #1 growth blocker

**Summary from backlink-strategy.md:** 3-phase plan targeting DA 15-20 in 6 months.

**Quick wins from SERP research (new findings):**

1. **Reddit r/Angular2 and r/angular** — Multiple Reddit threads rank on page 1 for Angular queries:
   - "Why LTS is only 12 months?" (30+ comments, r/Angular2)
   - "Fastest way to upgrade from Angular 13 to 20" (40+ comments, r/angular)
   - "Any versions of angular you would avoid?" (20+ comments, r/Angular2)
   - **Action:** Participate genuinely in these threads with links to relevant articles where helpful

2. **LinkedIn** — HeroDevs employees (Javier Perez) post Angular EOL content that ranks in Google:
   - **Action:** Florin should post Angular version/EOL content on LinkedIn with links back

3. **Dev.to / Hashnode cross-posting** — Medium articles by random authors rank for Angular queries:
   - **Action:** Cross-post articles with canonical links pointing to frontendminds.com

4. **Angular community engagement** — House of Angular, HeroDevs, and TuxCare all publish frequently:
   - **Action:** Comment on their articles, engage on social, build relationships for future guest posts or mentions

---

### Step 6: Featured Snippet Optimization

**Status:** Not started
**Priority:** Medium — can leapfrog positions 1-5

**Problem:** endoflife.date wins featured snippets with clean data tables. arc.dev wins with concise paragraph answers. Your EOL article has better data but isn't winning the snippet.

**Analysis needed:**
- Compare your version status table HTML structure vs endoflife.date
- Check if your FAQ answers are concise enough for featured snippet extraction
- Test if adding a summary paragraph before the table helps

**Actions:**
1. Ensure the version status table in the EOL article renders as a clean HTML `<table>` (not a markdown table that might render as divs)
2. Add a concise 2-3 sentence summary paragraph directly answering "which Angular versions are end of life in 2026?" before the table
3. Format FAQ answers to be self-contained 40-60 word answers (featured snippet optimal length)
4. Add structured "What to do" sections with clear headers matching PAA questions

**Expected impact:** Winning even one featured snippet for "angular 19 end of life" would likely 5-10x impressions for that query.

---

### Step 7: Technical SEO Audit

**Status:** Not started
**Priority:** Low (foundation is solid)

**What's already good:**
- Sitemap submitted and processing correctly
- HTTPS fully covered (14 valid, 0 non-HTTPS)
- Breadcrumb structured data valid (10 items)
- FAQ structured data valid (9 items)
- No security or manual action issues

**Items to verify:**
1. Core Web Vitals — GSC shows "No data" for both mobile and desktop (not enough traffic yet)
2. Page speed — run Lighthouse on key pages
3. Mobile rendering — verify all blog posts render correctly
4. Canonical URLs — ensure no duplicate content issues
5. robots.txt — verify it's not blocking important pages (previous commit restricted indexing)
6. Open Graph / Twitter Card metadata — verify social sharing preview quality

---

## Success Metrics

### 30-day targets (by June 17, 2026)
- [ ] CTR improvement from 0.2% to 2%+
- [ ] Indexed pages from 4 to 8+
- [ ] Total impressions from 598 to 1,500+
- [ ] Total clicks from 1 to 30+

### 90-day targets (by August 17, 2026)
- [ ] Total monthly clicks: 100+
- [ ] Indexed pages: all blog content indexed
- [ ] At least 1 featured snippet won
- [ ] 10+ external backlinks acquired
- [ ] 3 new articles published targeting content gaps

### 6-month targets (by November 17, 2026)
- [ ] Total monthly clicks: 500+
- [ ] DA: 15-20
- [ ] 30+ external backlinks
- [ ] Top 3 ranking for 5+ target queries
- [ ] Assessment tool generating leads from organic traffic
