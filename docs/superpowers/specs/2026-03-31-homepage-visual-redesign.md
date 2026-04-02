# Homepage Visual Redesign — Design Spec & Implementation Plan

## Context

The FrontendMinds homepage (built on `feat/frontendminds-platform` branch) has all 15 planned features implemented but the visual design feels flat and monotonous — every section uses the same "centered title + grid of identical cards" pattern with uniform dark navy backgrounds. The user identified the AstroWind theme as a visual reference and wants to adopt its design principles: spaciousness, visual richness, bolder typography, and varied layouts.

**What stays:** Indigo (#6366F1) / Emerald (#34D399) color palette, Inter + Fraunces fonts, page structure per the existing plan, all existing functionality.

**What changes:** Visual styling, layout patterns, typography scale, section backgrounds, card treatments, animations, and overall visual polish.

## Design Spec

### 1. Design Primitives (new files in `src/components/ui/`)

All primitives use Tailwind classes and shadcn/ui conventions (`cn()`, CVA, `forwardRef`).

#### `GlassCard` — `src/components/ui/glass-card.tsx`
```
background: bg-white/[0.02]
backdrop-filter: backdrop-blur-2xl
border: border border-white/[0.06]
border-radius: rounded-2xl
shadow: shadow-[0_8px_32px_rgba(0,0,0,0.12)]
hover: hover:border-white/[0.12] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5
transition: transition-all duration-300
```
Variant: `highlight` adds `bg-indigo-500/[0.04] border-indigo-500/[0.12]`
Props: `children`, `className`, `variant` (`default` | `highlight`), `as` (element tag)

#### `Section` — `src/components/ui/section.tsx`
Wrapper providing consistent spacing and background alternation.
```
padding: py-16 md:py-20 lg:py-24 px-4 sm:px-6
```
Props:
- `bg`: `"default"` (transparent) | `"muted"` (`bg-[#131C2E]`) | `"accent"` (gradient primary/7 → primary/1) | `"warm"` (gradient primary/4 + emerald/3)
- `width`: `"narrow"` (`max-w-3xl`) | `"medium"` (`max-w-5xl`) | `"wide"` (`max-w-6xl`) | `"full"` (`max-w-[1200px]`)
- `className`, `children`

#### `Tagline` — `src/components/ui/tagline.tsx`
```
text-xs uppercase tracking-[0.2em] font-bold text-indigo-400 mb-5
```
Props: `children`, `className`

#### `IconCircle` — `src/components/ui/icon-circle.tsx`
```
w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shrink-0
```
Default: `bg-indigo-500/[0.12] text-indigo-400`
Props: `children`, `className`, `size` (`"sm"` = w-9 h-9 | `"md"` default | `"lg"` = w-14 h-14)

#### `Button` update — `src/components/ui/button-variants.ts`
Add to CVA config:
- New `shape` variant: `default: "rounded-lg"`, `pill: "rounded-full"`
- New `glow` compound variant: when `variant=default` + `shape=pill`, add `shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)] hover:-translate-y-0.5`

### 2. Global CSS Updates — `src/app/globals.css`

Add utility class for dot-grid background pattern:
```css
.bg-dot-grid {
  background-image: radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Fix accessibility — update CSS custom properties:
- `--muted-foreground`: change from `#94A3B8` to `#8B9DB8` (passes WCAG AA on #0F172A)
- Tagline color: use `text-indigo-400` (#818CF8, 5.6:1) instead of `text-primary` (#6366F1, 4.0:1)

### 3. Section-by-Section Component Changes

#### Hero — `src/components/landing/hero.tsx`
- **Typography**: h1 uses `font-instrument text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-none`. Add italic `<em>` on "Angular" with `text-indigo-400`.
- **Badge**: Add pulsing green dot. Apply `uppercase tracking-widest font-bold` to text.
- **Buttons**: Primary gets `shape="pill"` with glow. Secondary gets `shape="pill"` variant ghost.
- **Primary CTA larger**: `text-base py-4 px-10` vs secondary at default size.
- **Social proof line**: Add `<p>` below buttons: "Used by frontend leads at enterprise Angular teams" in `text-slate-500 text-sm`.
- **Dimension tags label**: Add "5 Scored Dimensions" micro-label above tags.
- **Background**: Add `bg-dot-grid` class. Add two decorative glow `<div>`s (absolute positioned, blur-[120px], indigo top-right, emerald bottom-left).
- **Remove**: Backdrop blur effect div (replaced by dot grid + glows).

#### Problem Framing — `src/components/landing/problem-framing.tsx`
- **Layout**: Change from centered title + 2x2 grid to **side-by-side flex**: headline/subtitle on left (flex-1), stacked cards on right (flex-1). Gap: `gap-14`. Responsive: stack on mobile.
- **Section bg**: `<Section bg="muted">`.
- **Cards**: Use `<GlassCard>` with colored `border-l-[3px]` per card (Migration blue, CI/CD amber, AI purple, Strategy red — matching dimension colors).
- **Icons**: Replace all "?" with distinct icons per pain point. Use Lucide icons inside `<IconCircle>` with matching dimension color backgrounds.
- **Add transition CTA**: "Find out where you stand →" link below subtitle on left side.

#### Stats Bar — NEW `src/components/landing/stats-bar.tsx`
- **Position**: Between Problem Framing and How It Works.
- **Layout**: Horizontal flex, 4 equal columns, `border-r border-white/[0.06]` between (last has no border).
- **Background**: `bg-[#151F32]/50` with top/bottom borders `border-y border-white/[0.06]`.
- **Numbers**: `font-instrument text-5xl font-bold` with gradient text (`bg-gradient-to-br from-indigo-400 to-indigo-500 bg-clip-text text-transparent`). Last stat ("Free") uses emerald gradient.
- **Labels**: `text-[0.7rem] uppercase tracking-[0.15em] font-semibold text-slate-500`.
- **Stats**: 20 (Diagnostic Questions), 5 (Scored Dimensions), 3 min (To Complete), Free (No Strings Attached).
- **Responsive**: 2x2 grid on mobile.

#### How It Works — `src/components/landing/how-it-works.tsx`
- **Layout**: Replace 3-column grid with **vertical timeline**.
- **Section bg**: `<Section bg="muted" width="narrow">`.
- **Header**: Left-aligned (not centered) — matches timeline alignment.
- **Timeline**: Relative container with `pl-16`. Vertical connecting line: use an absolutely positioned `<div>` (not pseudo-element) — `absolute left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500 to-indigo-500/10 rounded-full`. Steps with absolute-positioned dot circles.
- **Timeline dots**: Each step gets a different color — step 1 indigo, step 2 emerald, step 3 amber. Dot is `absolute -left-16 top-0.5 w-[46px] h-[46px] rounded-full border-2 flex items-center justify-center font-extrabold text-sm`.
- **Descriptions**: Longer, more descriptive text per step (currently too terse).
- **CTA at bottom**: "See What Your Score Looks Like →" — varied copy from hero.

#### Scorecard Spotlight — `src/components/landing/scorecard-spotlight.tsx`
- **Section bg**: `<Section bg="warm">` (primary+emerald gradient).
- **Header**: Change tagline from "Free Assessment" to "See What You'll Get". Change heading to "Your Personalized Score Report".
- **Content**: Replace generic description with a **sample score preview mockup**:
  - 5 horizontal progress bars (one per dimension) with dimension color gradients
  - Score fractions (e.g., "2/4", "3/4") color-coded by risk level
  - Total score display: "11/20" in large Fraunces font
  - Tier badge: "Modernization Ready" in amber
- **CTA**: "Get Your Real Score →" — different from hero and How It Works.
- Wrap preview in `<GlassCard variant="highlight">`.

#### Content Pillars — `src/components/landing/content-pillars.tsx`
- **Layout**: Change from 4-column grid of small cards to **2-column grid of wide horizontal cards** (`grid-cols-1 sm:grid-cols-2 gap-5`). Each card is a horizontal row with icon left and text right — not the previous 4 small squares.
- **Card style**: `<GlassCard>` with `flex gap-6 items-start p-6` — `<IconCircle size="lg">` on left, title + description + "Browse articles →" accent-colored link on right.
- **Each card** has its own accent color matching the pillar (indigo, teal, amber, purple) applied to the IconCircle bg and the "Browse articles" link.
- **Section bg**: Default (transparent).

#### Featured Articles — `src/components/landing/featured-articles.tsx`
- **Header**: Left-aligned with "View all posts →" link right-aligned on same row.
- **Grid**: `grid-cols-[2fr_1fr_1fr]` — first card is featured (larger).
- **Cards**: Use `<GlassCard>` with colored `border-t-[3px]` matching category color. Remove gradient image placeholders.
- **Featured card**: Larger padding, Fraunces heading, longer description.
- **Section bg**: `<Section bg="accent">`.

#### Lead Magnet → Newsletter — `src/components/landing/lead-magnet.tsx`
- **Rename conceptually**: Focus on newsletter signup, not competing "5-Minute Health Check".
- **Layout**: Split — benefits checklist on left, form on right. Gap: `gap-16`.
- **Left side**: Tagline "Stay sharp", heading "The FrontendMinds Newsletter" (with italic Fraunces on "Newsletter"), 3 bullet points with emerald checkmarks.
- **Right side**: `<GlassCard>` with form. Add proper `<label>` elements. Input border-radius: `rounded-xl` (not pill). 
- **Section bg**: `<Section bg="muted">`.

#### Founder — `src/components/landing/founder-section.tsx`
- **Tagline**: Change "About the Author" to "About the Founder".
- **Name**: Use Fraunces font.
- **Bio**: Add credentials: "10+ years" experience, mention enterprise teams.
- **Social links**: Add LinkedIn, GitHub, X links after "Learn more →".
- **Avatar**: Keep gradient placeholder (real photo to be added later).

#### Footer — `src/components/landing/footer.tsx`
- **Layout**: Full footer with 3-column link grid (Platform, Company, Legal) + logo/tagline on left.
- **Background**: `bg-[#0B1120]` — darker than page bg for visual depth.
- **Bottom bar**: Copyright left, social links right, separated by `border-t border-white/[0.04]`.

#### Navigation — `src/components/landing/navigation.tsx`
- **CTA button**: Add `shape="pill"` prop.
- No other changes needed (existing scroll-aware blur is good).

#### Removed Components
- `GradientDivider` — no longer needed (section backgrounds handle separation).
- Remove gradient divider imports/usage from `src/app/page.tsx`.

### 4. Animation Updates — `src/components/ui/reveal.tsx`
- Change duration from `0.7s` to `1s`.
- Change translateY from `24px` to `32px` (2rem, matching AstroWind).
- Keep existing cubic-bezier easing.

### 5. Homepage Layout — `src/app/page.tsx`
New section order (remove GradientDivider between all sections):
1. Hero (default bg + dot grid)
2. Problem Framing (muted bg)
3. **Stats Bar** (new — elevated bg)
4. How It Works (muted bg)
5. Scorecard Spotlight (warm bg)
6. Content Pillars (default bg)
7. Featured Articles (accent bg)
8. Newsletter CTA (muted bg) — was Lead Magnet
9. Founder (default bg)
10. Exit Intent Popup (unchanged)
11. Sticky Mobile CTA (unchanged)

### 6. Content Updates — `src/lib/content/landing.ts`
- `hero.socialProof`: "Used by frontend leads at enterprise Angular teams"
- `hero.dimensionLabel`: "5 Scored Dimensions"
- `howItWorks` step descriptions: expanded (longer, more specific text)
- `scorecardSpotlight`: new heading/tagline/CTA copy ("See What You'll Get" / "Your Personalized Score Report" / "Get Your Real Score")
- `newsletterCta`: new section content (replaces `leadMagnet`), bullet points, heading
- `founderSection.tagline`: "About the Founder", add credentials text
- CTA copy varies per section: "Take the Free Assessment" → "Find out where you stand" → "See What Your Score Looks Like" → "Get Your Real Score" → "Start the Assessment"
- `statsBar`: new content object with 4 stats

## Implementation Plan

### Task 1: Create design primitives + button update
**Create:** `src/components/ui/glass-card.tsx`, `src/components/ui/section.tsx`, `src/components/ui/tagline.tsx`, `src/components/ui/icon-circle.tsx`
**Modify:** `src/components/ui/button-variants.ts` (add `shape` variant + glow compound), `src/components/ui/button.tsx` (pass `shape` prop)
**Verify:** Import and render each primitive in isolation.

### Task 2: Update globals.css + animation
**Files:** `src/app/globals.css` (add `.bg-dot-grid`, fix contrast values)
**Modify:** `src/components/ui/reveal.tsx` (duration 0.7→1s, translateY 24→32px)

### Task 3: Update content
**Modify:** `src/lib/content/landing.ts` (all copy changes, new sections, varied CTAs)

### Task 4: Hero redesign
**Modify:** `src/components/landing/hero.tsx`
Fraunces heading, pill buttons, dot grid, glow orbs, social proof, dimension label.

### Task 5: Problem Framing redesign  
**Modify:** `src/components/landing/problem-framing.tsx`
Side-by-side layout, colored left borders, distinct Lucide icons, transition CTA.

### Task 6: Create Stats Bar
**Create:** `src/components/landing/stats-bar.tsx`

### Task 7: How It Works → Timeline
**Modify:** `src/components/landing/how-it-works.tsx`
Replace grid with vertical timeline, colored dots, left-aligned header.

### Task 8: Scorecard Spotlight → Score Preview
**Modify:** `src/components/landing/scorecard-spotlight.tsx`
Sample score bars, tier badge, new copy.

### Task 9: Content Pillars → Bento
**Modify:** `src/components/landing/content-pillars.tsx`
Bento grid, horizontal cards, "Browse articles →" links.

### Task 10: Featured Articles → Asymmetric grid
**Modify:** `src/components/landing/featured-articles.tsx`, `src/components/blog/post-card.tsx`
2fr/1fr/1fr grid, colored top borders, left-aligned header.

### Task 11: Lead Magnet → Newsletter CTA
**Modify:** `src/components/landing/lead-magnet.tsx`
Split layout, newsletter focus, proper labels, benefit checklist.

### Task 12: Founder + Footer polish
**Modify:** `src/components/landing/founder-section.tsx` (Fraunces name, credentials, social links)
**Modify:** `src/components/landing/footer.tsx` (3-column link grid, darker bg)

### Task 13: Homepage layout + cleanup
**Modify:** `src/app/page.tsx` (add Stats Bar, remove GradientDivider imports, update section order)
**Modify:** `src/components/landing/navigation.tsx` (pill CTA button)
**Delete:** GradientDivider component if it exists as a separate file.

### Task 14: Exit intent popup update
**Modify:** `src/components/landing/exit-intent-popup.tsx` — update to focus on newsletter signup (consistent with Lead Magnet → Newsletter change). Keep same trigger logic (mouse leave / inactivity timeout / 7-day cooldown).

## Verification

1. Run `pnpm dev` and visually inspect every homepage section
2. Check section background alternation creates visible rhythm
3. Verify all text passes WCAG AA contrast (especially taglines, muted text, micro text)
4. Test hover states on all cards and buttons
5. Check responsive behavior (mobile stack for side-by-side layouts)
6. Verify no broken imports after GradientDivider removal
7. Open Lighthouse and check accessibility score
8. Compare against v3 mockup at `.superpowers/brainstorm/` for visual fidelity
