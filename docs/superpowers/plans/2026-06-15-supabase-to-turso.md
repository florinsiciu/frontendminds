# Supabase to Turso Migration (Stay on Vercel)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Supabase with Turso (hosted SQLite) to eliminate the free-tier pausing problem. Stay on Vercel. Zero downtime.

**Architecture:** Drizzle ORM replaces the Supabase client. Turso provides a hosted SQLite database over HTTP with edge replicas. All queries stay server-side. Vercel deployment, crons, and CI/CD remain unchanged.

**Tech Stack:** Turso (free tier — 9GB, 500M reads/mo), Drizzle ORM + @libsql/client, Vercel (unchanged)

---

## File Structure

### New files to create
```
drizzle.config.ts                 — Drizzle config pointing to Turso
src/lib/db/index.ts               — Drizzle client (replaces supabase/)
src/lib/db/schema.ts              — All 6 table definitions
scripts/migrate-data.ts           — One-time Supabase → Turso data export
```

### Files to modify
```
src/actions/submit-assessment.ts  — Supabase → Drizzle queries
src/actions/contact.ts            — Supabase → Drizzle queries
src/actions/generate-summary.ts   — Supabase → Drizzle queries
src/actions/subscribe.ts          — Supabase → Drizzle queries
src/app/assessment/results/[id]/page.tsx          — Supabase → Drizzle
src/app/assessment/summary/page.tsx               — Supabase → Drizzle
src/app/assessment/results/[id]/opengraph-image.tsx — Supabase → Drizzle
src/app/admin/leads/page.tsx                      — Supabase → Drizzle
src/app/api/assessment/report/[id]/route.ts       — Supabase → Drizzle
src/app/api/cron/health/route.ts                  — Supabase → Drizzle
src/app/api/cron/nurture/route.ts                 — Supabase → Drizzle
src/app/api/cron/followup/route.ts                — Supabase → Drizzle
package.json                      — Add drizzle + libsql, remove supabase
.env.example                      — Replace Supabase vars with Turso vars
vercel.json                       — No changes needed
```

### Files to delete
```
src/lib/supabase/server.ts        — Replaced by src/lib/db/index.ts
src/lib/supabase/client.ts        — No longer needed
```

---

## Task 1: Create Turso Database

**No code files — account setup only.**

- [ ] **Step 1: Install Turso CLI**

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

- [ ] **Step 2: Sign up and authenticate**

```bash
turso auth signup
```

- [ ] **Step 3: Create database**

```bash
turso db create frontendminds --location ams
```

Use `ams` (Amsterdam) — closest to Romania with good EU coverage.

- [ ] **Step 4: Get credentials**

```bash
turso db show frontendminds --url
turso db tokens create frontendminds
```

Save both values. You'll need them for `.env.local` and Vercel env vars.

- [ ] **Step 5: Add to local env**

Add to `.env.local`:
```
TURSO_DATABASE_URL=libsql://frontendminds-YOUR_ORG.turso.io
TURSO_AUTH_TOKEN=your-token-here
```

---

## Task 2: Install Drizzle and Define Schema

**Files:**
- Create: `drizzle.config.ts`
- Create: `src/lib/db/schema.ts`
- Create: `src/lib/db/index.ts`
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

```bash
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit
```

- [ ] **Step 2: Remove Supabase dependencies**

```bash
npm uninstall @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 3: Create Drizzle config**

Create `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
```

- [ ] **Step 4: Create schema**

Create `src/lib/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
});

export const assessments = sqliteTable("assessments", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  answers: text("answers", { mode: "json" }),
  qualifyingAnswers: text("qualifying_answers", { mode: "json" }),
  totalPercentage: integer("total_percentage"),
  dimensionPercentages: text("dimension_percentages", { mode: "json" }),
  tier: text("tier"),
  completedAt: text("completed_at").default(sql`(datetime('now'))`),
  emailSentAt: text("email_sent_at"),
  bookedCall: integer("booked_call", { mode: "boolean" }).default(false),
  triggeredPatterns: text("triggered_patterns", { mode: "json" }),
  topPatterns: text("top_patterns", { mode: "json" }),
  leadScore: integer("lead_score"),
  leadBucket: text("lead_bucket"),
  seesawData: text("seesaw_data", { mode: "json" }),
});

export const emailEvents = sqliteTable("email_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  assessmentId: text("assessment_id").notNull().references(() => assessments.id, { onDelete: "cascade" }),
  resendId: text("resend_id"),
  type: text("type").default("results"),
  status: text("status").default("sent"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  reason: text("reason"),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const nurtureQueue = sqliteTable("nurture_queue", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  firstName: text("first_name"),
  subscribedAt: text("subscribed_at").default(sql`(datetime('now'))`),
  emailsSent: integer("emails_sent").default(0),
  lastSentAt: text("last_sent_at"),
  completed: integer("completed", { mode: "boolean" }).default(false),
});

export const executiveSummaries = sqliteTable("executive_summaries", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  assessmentId: text("assessment_id").notNull().references(() => assessments.id, { onDelete: "cascade" }),
  shareToken: text("share_token").notNull().unique(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

// Relations for nested queries with db.query
export const leadsRelations = relations(leads, ({ many }) => ({
  assessments: many(assessments),
}));

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  lead: one(leads, { fields: [assessments.leadId], references: [leads.id] }),
  emailEvents: many(emailEvents),
  executiveSummaries: many(executiveSummaries),
}));

export const emailEventsRelations = relations(emailEvents, ({ one }) => ({
  assessment: one(assessments, { fields: [emailEvents.assessmentId], references: [assessments.id] }),
}));

export const executiveSummariesRelations = relations(executiveSummaries, ({ one }) => ({
  assessment: one(assessments, { fields: [executiveSummaries.assessmentId], references: [assessments.id] }),
}));
```

- [ ] **Step 5: Create database client**

Create `src/lib/db/index.ts`:

```typescript
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
```

- [ ] **Step 6: Generate and push schema to Turso**

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

- [ ] **Step 7: Verify tables exist**

```bash
turso db shell frontendminds ".tables"
```

Expected: `leads assessments email_events contact_submissions nurture_queue executive_summaries`

- [ ] **Step 8: Commit**

```bash
git add drizzle.config.ts src/lib/db/ drizzle/ package.json package-lock.json
git commit -m "feat: add Drizzle ORM + Turso schema replacing Supabase"
```

---

## Task 3: Migrate Server Actions

**Files:**
- Modify: `src/actions/submit-assessment.ts`
- Modify: `src/actions/contact.ts`
- Modify: `src/actions/generate-summary.ts`
- Modify: `src/actions/subscribe.ts`

- [ ] **Step 1: Migrate submit-assessment.ts**

Replace the Supabase import and all queries:

```typescript
// Remove:
import { createServerClient } from "@/lib/supabase/server";
// Add:
import { db } from "@/lib/db";
import { leads, assessments, emailEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
```

Replace lead upsert:
```typescript
let lead = await db.query.leads.findFirst({
  where: eq(leads.email, email),
});

if (!lead) {
  const [newLead] = await db.insert(leads).values({
    firstName, email, utmSource, utmMedium, utmCampaign,
  }).returning();
  lead = newLead;
}
```

Replace assessment insert:
```typescript
const [assessment] = await db.insert(assessments).values({
  leadId: lead.id,
  answers: scoredAnswers,
  qualifyingAnswers,
  totalPercentage,
  dimensionPercentages,
  tier,
  triggeredPatterns,
  topPatterns,
  leadScore,
  leadBucket,
  seesawData,
}).returning();
```

Replace email tracking:
```typescript
await db.update(assessments)
  .set({ emailSentAt: new Date().toISOString() })
  .where(eq(assessments.id, assessment.id));

await db.insert(emailEvents).values({
  assessmentId: assessment.id,
  resendId: emailResult.id,
  type: "results",
  status: "sent",
});
```

- [ ] **Step 2: Migrate contact.ts**

```typescript
// Remove Supabase import, add:
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

// Replace Supabase insert with:
await db.insert(contactSubmissions).values({ name, email, reason, message });
```

- [ ] **Step 3: Migrate generate-summary.ts**

```typescript
import { db } from "@/lib/db";
import { executiveSummaries, assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const existing = await db.query.executiveSummaries.findFirst({
  where: eq(executiveSummaries.assessmentId, assessmentId),
});
if (existing) return { token: existing.shareToken };

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, assessmentId),
});
if (!assessment) return { error: "Assessment not found" };

const [summary] = await db.insert(executiveSummaries).values({
  assessmentId,
  shareToken: crypto.randomUUID(),
}).returning();

return { token: summary.shareToken };
```

- [ ] **Step 4: Migrate subscribe.ts**

```typescript
import { db } from "@/lib/db";
import { nurtureQueue } from "@/lib/db/schema";

await db.insert(nurtureQueue).values({
  email, firstName, emailsSent: 1,
});
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/actions/
git commit -m "feat: migrate server actions from Supabase to Drizzle + Turso"
```

---

## Task 4: Migrate Page Routes, API Routes, and Crons

**Files:**
- Modify: `src/app/assessment/results/[id]/page.tsx`
- Modify: `src/app/assessment/summary/page.tsx`
- Modify: `src/app/assessment/results/[id]/opengraph-image.tsx`
- Modify: `src/app/admin/leads/page.tsx`
- Modify: `src/app/api/assessment/report/[id]/route.ts`
- Modify: `src/app/api/cron/health/route.ts`
- Modify: `src/app/api/cron/nurture/route.ts`
- Modify: `src/app/api/cron/followup/route.ts`

- [ ] **Step 1: Migrate results page**

`src/app/assessment/results/[id]/page.tsx`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
});
```

- [ ] **Step 2: Migrate summary page**

`src/app/assessment/summary/page.tsx`:

```typescript
import { db } from "@/lib/db";
import { executiveSummaries, assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// By share token
const summary = await db.query.executiveSummaries.findFirst({
  where: eq(executiveSummaries.shareToken, token),
});

// Get assessment with lead
const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, assessmentId),
  with: { lead: true },
});
```

- [ ] **Step 3: Migrate opengraph-image route**

`src/app/assessment/results/[id]/opengraph-image.tsx`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
});
```

- [ ] **Step 4: Migrate admin leads page**

`src/app/admin/leads/page.tsx`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { desc, isNotNull } from "drizzle-orm";

const results = await db.query.assessments.findMany({
  where: isNotNull(assessments.triggeredPatterns),
  orderBy: desc(assessments.leadScore),
  limit: 50,
  with: { lead: true },
});
```

- [ ] **Step 5: Migrate PDF report route**

`src/app/api/assessment/report/[id]/route.ts`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
  with: { lead: true },
});
```

- [ ] **Step 6: Migrate health cron**

`src/app/api/cron/health/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [result] = await db.select({ count: count() }).from(leads);

  return NextResponse.json({
    status: "ok",
    leads: result.count,
    timestamp: new Date().toISOString(),
  });
}
```

- [ ] **Step 7: Migrate nurture cron**

`src/app/api/cron/nurture/route.ts` — replace Supabase client:

```typescript
import { db } from "@/lib/db";
import { nurtureQueue } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const queue = await db.query.nurtureQueue.findMany({
  where: eq(nurtureQueue.completed, false),
  limit: 50,
});

// Update per item:
await db.update(nurtureQueue)
  .set({ emailsSent: item.emailsSent + 1, lastSentAt: new Date().toISOString(), completed: isComplete })
  .where(eq(nurtureQueue.id, item.id));
```

- [ ] **Step 8: Migrate followup cron**

`src/app/api/cron/followup/route.ts` — replace Supabase client:

```typescript
import { db } from "@/lib/db";
import { assessments, emailEvents } from "@/lib/db/schema";
import { eq, and, gte, inArray } from "drizzle-orm";

const recentAssessments = await db.query.assessments.findMany({
  where: and(
    eq(assessments.bookedCall, false),
    gte(assessments.completedAt, fourteenDaysAgo),
  ),
  limit: 50,
  with: { lead: true },
});

const sentEvents = await db.select()
  .from(emailEvents)
  .where(and(
    eq(emailEvents.assessmentId, assessmentId),
    inArray(emailEvents.type, ["followup_day3", "followup_day7"]),
  ));

await db.insert(emailEvents).values({
  assessmentId,
  resendId: emailResult.id,
  type: `followup_day${day}`,
  status: "sent",
});
```

- [ ] **Step 9: Verify build**

```bash
npm run build
```

- [ ] **Step 10: Commit**

```bash
git add src/app/
git commit -m "feat: migrate page routes, API routes, and crons to Drizzle + Turso"
```

---

## Task 5: Migrate Data and Clean Up

**Files:**
- Create: `scripts/migrate-data.ts`
- Delete: `src/lib/supabase/server.ts`
- Delete: `src/lib/supabase/client.ts`
- Modify: `.env.example`

- [ ] **Step 1: Create data migration script**

Create `scripts/migrate-data.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import { createClient as createTursoClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/lib/db/schema";

// Temporarily re-install supabase for this script:
// npm install @supabase/supabase-js

const supabase = createClient(
  process.env.OLD_SUPABASE_URL!,
  process.env.OLD_SUPABASE_SERVICE_ROLE_KEY!,
);

const turso = createTursoClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(turso, { schema });

async function migrateTable(name: string, table: any) {
  const { data, error } = await supabase.from(name).select("*");
  if (error) { console.error(`${name}: ${error.message}`); return; }
  if (!data?.length) { console.log(`${name}: 0 rows`); return; }

  for (const row of data) {
    await db.insert(table).values(row).onConflictDoNothing();
  }
  console.log(`${name}: ${data.length} rows migrated`);
}

async function main() {
  await migrateTable("leads", schema.leads);
  await migrateTable("assessments", schema.assessments);
  await migrateTable("email_events", schema.emailEvents);
  await migrateTable("contact_submissions", schema.contactSubmissions);
  await migrateTable("nurture_queue", schema.nurtureQueue);
  await migrateTable("executive_summaries", schema.executiveSummaries);
  console.log("Done!");
}

main().catch(console.error);
```

- [ ] **Step 2: Run data migration**

```bash
# Temporarily install supabase client for the migration script
npm install @supabase/supabase-js

OLD_SUPABASE_URL=https://tsckwmbjwnjzomxshfbn.supabase.co \
OLD_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
npx tsx scripts/migrate-data.ts
```

Expected:
```
leads: 8 rows migrated
assessments: N rows migrated
...
Done!
```

- [ ] **Step 3: Verify data in Turso**

```bash
turso db shell frontendminds "SELECT count(*) FROM leads"
turso db shell frontendminds "SELECT count(*) FROM assessments"
```

- [ ] **Step 4: Remove Supabase client after migration**

```bash
npm uninstall @supabase/supabase-js
rm -rf src/lib/supabase/
```

- [ ] **Step 5: Update .env.example**

```
# Database (Turso)
TURSO_DATABASE_URL=libsql://frontendminds-YOUR_ORG.turso.io
TURSO_AUTH_TOKEN=your-token

# Resend (email)
RESEND_API_KEY=re_your-api-key
RESEND_AUDIENCE_ID=your-audience-id

# PostHog (analytics)
NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Site
NEXT_PUBLIC_SITE_URL=https://frontendminds.com

# Cron authentication
CRON_SECRET=

# Admin
ADMIN_SECRET=any-secret-you-choose
```

- [ ] **Step 6: Add Turso env vars to Vercel**

```bash
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_AUTH_TOKEN production
```

Remove old Supabase vars:
```bash
vercel env rm NEXT_PUBLIC_SUPABASE_URL production
vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

- [ ] **Step 7: Verify full build**

```bash
npm run build
```

- [ ] **Step 8: Test locally**

```bash
npm run dev

# Test health endpoint
curl -s http://localhost:3000/api/cron/health -H "Authorization: Bearer $CRON_SECRET"
# Expected: {"status":"ok","leads":8,"timestamp":"..."}

# Test assessment flow in browser — complete a test assessment
```

- [ ] **Step 9: Commit and deploy**

```bash
git add -A
git commit -m "feat: complete Supabase to Turso migration — remove all Supabase dependencies"
git push
```

Vercel auto-deploys. Verify production:
```bash
curl -s https://frontendminds.com/api/cron/health -H "Authorization: Bearer $CRON_SECRET"
# Expected: {"status":"ok","leads":8,"timestamp":"..."}
```

- [ ] **Step 10: Test production assessment flow**

Open https://frontendminds.com/assessment in browser and complete a full test assessment. Verify:
- Assessment submits successfully
- Results page loads with scores
- Email is sent (check Resend dashboard)

---

## Post-Migration

- [ ] **Remove the health cron frequency change** — Turso doesn't pause, so daily pings are unnecessary. You can keep it for monitoring or reduce to weekly.

- [ ] **Keep Supabase project alive for 2 weeks** as rollback. After 2 weeks with no issues, delete it.

- [ ] **Delete `scripts/migrate-data.ts`** — one-time use, no longer needed.

---

## Summary

| Before | After |
|--------|-------|
| Supabase (Postgres, pauses) | Turso (SQLite, never pauses) |
| @supabase/supabase-js + @supabase/ssr | drizzle-orm + @libsql/client |
| 14 files using Supabase client | 14 files using Drizzle ORM |
| Vercel hosting (unchanged) | Vercel hosting (unchanged) |
| Vercel crons (unchanged) | Vercel crons (unchanged) |
| $0/month | $0/month |
| DB pauses every 7 days | Never pauses |
