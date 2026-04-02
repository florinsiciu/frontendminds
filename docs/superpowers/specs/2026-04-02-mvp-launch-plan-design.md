# FrontendMinds MVP Launch Plan

## Context

FrontendMinds is a fully-coded Angular Modernization Assessment Scorecard — a lead-generation platform built on Daniel Priestley's Scorecard Marketing methodology. The codebase (Next.js 16.2.1, Supabase, Resend, PostHog) is feature-complete with a single initial commit, but **zero external services are connected** and the app has never been deployed or tested end-to-end with real infrastructure.

**Problem:** The code exists but can't generate leads until all services are provisioned, connected, and verified working together.

**Goal:** Get the full funnel live and tested — from landing page through assessment, email capture, results delivery, PDF report, and Calendly booking — so it can be shared with real people.

---

## Approach: Systematic Bottom-Up

Set up each service independently, verify locally, then deploy to Vercel. Each piece is verified before moving to the next, reducing debugging surface area.

---

## Phase 1: Infrastructure Setup

### 1.1 Supabase
- Create Supabase project (free tier)
- Run 4 SQL migrations in order:
  - `supabase/migrations/001_initial_schema.sql`
  - `supabase/migrations/002_contact_submissions.sql`
  - `supabase/migrations/003_nurture_queue_and_followup.sql`
  - `supabase/migrations/004_percentage_scoring.sql`
- Collect: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify tables: `leads`, `assessments`, `email_events`, `nurture_queue`, `contact_submissions`

### 1.2 Resend
- Create Resend account
- Add sending domain (same as FrontendMinds domain)
- Configure DNS records: SPF, DKIM, DMARC
- Wait for domain verification
- Create API key → `RESEND_API_KEY`
- Create audience → `RESEND_AUDIENCE_ID`

### 1.3 PostHog
- Create PostHog cloud account (free tier)
- Create project
- Collect: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`

### 1.4 Calendly
- Set up "Strategy Call" booking page
- Update URL in `src/lib/config/site.ts`

### 1.5 Environment Variables
- Copy `.env.example` → `.env.local`
- Fill all keys from steps above
- Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Generate random `CRON_SECRET`

---

## Phase 2: Local E2E Verification

Run `pnpm dev` and test each part of the funnel:

| Test | What to verify | Where to check |
|------|---------------|----------------|
| Database connection | Lead + assessment rows created | Supabase dashboard |
| Scoring engine | Dimension scores + tier computed correctly | `assessments` table |
| Email delivery | Results email received with correct content | Inbox + `email_events` table |
| Results page | 5 dimension bars, tier, diagnosis, recommendations render | Browser |
| PDF report | Downloads correctly with scores and branding | `/api/assessment/report/[id]` |
| Analytics | Events firing | PostHog dashboard |
| Retake flow | Same email → same lead, new assessment | Supabase |
| Error handling | Invalid ID → redirect, bad input → validation error | Browser |

---

## Phase 3: Vercel Deployment

### 3.1 Deploy
- `vercel link` to connect repo
- Configure all environment variables in Vercel dashboard
- Set `NEXT_PUBLIC_SITE_URL` to production domain
- Deploy preview → verify → promote to production

### 3.2 Custom Domain
- Configure domain in Vercel dashboard
- Point DNS to Vercel (A record + CNAME)
- Verify SSL certificate active

### 3.3 Cron Jobs
- Verify cron jobs appear in Vercel dashboard:
  - `/api/cron/followup` — 10am UTC daily
  - `/api/cron/nurture` — 9am UTC daily
- Test endpoints manually with `curl -H "Authorization: Bearer $CRON_SECRET"`

---

## Phase 4: Production E2E Testing

Same as Phase 2, but on the live URL. Additionally:
- Test from a real mobile device
- Test email delivery to Gmail, Outlook, and at least one other provider
- Verify Calendly link works from both results page and email
- Check meta tags / social previews (OpenGraph, Twitter Cards)
- Verify `sitemap.xml` and `robots.txt` accessible
- Verify sending domain passes SPF/DKIM/DMARC checks

---

## Phase 5: Pre-Launch Checklist

- [ ] All pages load without console errors
- [ ] Full assessment flow completes end-to-end
- [ ] Results email delivered (not in spam)
- [ ] PDF report generates correctly
- [ ] Calendly booking opens from all CTAs
- [ ] Privacy + Terms pages have correct content
- [ ] Mobile responsive on real devices
- [ ] PostHog events flowing
- [ ] Custom domain + SSL active
- [ ] Sending domain verified (email deliverability)

---

## Phase 6: Post-Launch Quick Wins

Not blockers, but should follow quickly:
1. **Scoring algorithm tests** — Unit tests for `src/lib/scoring.ts`
2. **Error monitoring** — Sentry or Vercel error tracking
3. **Rate limiting** — Protect form submission endpoints
4. **Email tracking** — Resend webhooks for open/click data

---

## Key Files

| Purpose | Path |
|---------|------|
| Environment template | `.env.example` |
| Supabase migrations | `supabase/migrations/001-004` |
| Supabase clients | `src/lib/supabase/client.ts`, `server.ts` |
| Site config (Calendly URL etc.) | `src/lib/config/site.ts` |
| Scoring engine | `src/lib/scoring.ts` |
| Scoring config (tiers) | `src/lib/config/scoring.ts` |
| Assessment questions | `src/lib/data/questions.ts` |
| Submit action | `src/actions/submit-assessment.ts` |
| Results email template | `src/lib/email.tsx` |
| PDF report | `src/lib/pdf/report-document.tsx` |
| Cron: followup | `src/app/api/cron/followup/route.ts` |
| Cron: nurture | `src/app/api/cron/nurture/route.ts` |
| PostHog config | `src/lib/config/analytics.ts` |
| Vercel cron config | `vercel.json` |

---

## Verification

The MVP is ready to publish when:
1. A complete assessment submission (quiz → email gate → results) works on the production URL
2. The results email arrives in inbox (not spam) with correct scores
3. PDF report downloads from both the results page and email link
4. Calendly booking page opens from the tier CTA
5. PostHog shows events flowing
6. The app renders correctly on mobile
