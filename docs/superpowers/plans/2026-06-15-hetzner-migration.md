# Hetzner Migration: Vercel + Supabase → Hetzner VPS + SQLite

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate frontendminds.com from Vercel + Supabase to a self-hosted Hetzner VPS with SQLite, maintaining zero downtime and preserving all SEO rankings.

**Architecture:** Next.js standalone build running behind Caddy (auto-SSL, reverse proxy). SQLite via Drizzle ORM replaces Supabase. GitHub Actions for CI/CD (build on push, rsync to VPS). Cron jobs move from Vercel Crons to system crontab calling local endpoints.

**Tech Stack:** Hetzner VPS (CX22 — 2 vCPU, 4GB RAM, €4.5/mo), Caddy, Node.js 24, PM2, SQLite + Drizzle ORM, GitHub Actions, systemd.

---

## File Structure

### New files to create
```
drizzle.config.ts                          — Drizzle config pointing to SQLite
src/lib/db/index.ts                        — Drizzle client (replaces supabase/server.ts + client.ts)
src/lib/db/schema.ts                       — All table definitions in Drizzle schema
src/lib/db/migrate.ts                      — Migration runner script
drizzle/                                   — Auto-generated migration SQL files
.github/workflows/deploy.yml               — CI/CD pipeline
ecosystem.config.cjs                       — PM2 process config
Caddyfile                                  — Caddy reverse proxy config (goes on server, not in repo)
scripts/setup-server.sh                    — One-time server setup script
scripts/backup-db.sh                       — SQLite backup script
```

### Files to modify
```
src/actions/submit-assessment.ts           — Replace supabase client with Drizzle queries
src/actions/contact.ts                     — Replace supabase client with Drizzle queries
src/actions/generate-summary.ts            — Replace supabase client with Drizzle queries
src/actions/subscribe.ts                   — Replace supabase client with Drizzle queries
src/app/assessment/results/[id]/page.tsx   — Replace supabase client with Drizzle queries
src/app/assessment/summary/page.tsx        — Replace supabase client with Drizzle queries
src/app/assessment/results/[id]/opengraph-image.tsx — Replace supabase client with Drizzle queries
src/app/admin/leads/page.tsx               — Replace supabase client with Drizzle queries
src/app/api/assessment/report/[id]/route.ts — Replace supabase client with Drizzle queries
src/app/api/cron/health/route.ts           — Replace supabase client with Drizzle queries
src/app/api/cron/nurture/route.ts          — Replace supabase client with Drizzle queries
src/app/api/cron/followup/route.ts         — Replace supabase client with Drizzle queries
next.config.ts                             — Add output: "standalone"
package.json                               — Add drizzle deps, remove supabase deps
vercel.json                                — Remove (or keep for rollback)
.env.example                               — Replace Supabase vars with DATABASE_URL
```

### Files to delete
```
src/lib/supabase/server.ts                 — Replaced by src/lib/db/index.ts
src/lib/supabase/client.ts                 — No longer needed (all queries server-side with Drizzle)
```

---

## Phase 1: Database Migration (Drizzle + SQLite)

### Task 1: Install Drizzle and Set Up Schema

**Files:**
- Create: `drizzle.config.ts`
- Create: `src/lib/db/schema.ts`
- Create: `src/lib/db/index.ts`
- Modify: `package.json`
- Modify: `.env.example`

- [ ] **Step 1: Install Drizzle dependencies**

```bash
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3
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
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "./data/frontendminds.db",
  },
});
```

- [ ] **Step 4: Create the database schema**

Create `src/lib/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

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
```

- [ ] **Step 5: Create the database client**

Create `src/lib/db/index.ts`:

```typescript
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.DATABASE_URL ?? "./data/frontendminds.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
```

- [ ] **Step 6: Create migration runner**

Create `src/lib/db/migrate.ts`:

```typescript
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database(process.env.DATABASE_URL ?? "./data/frontendminds.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./drizzle" });
sqlite.close();

console.log("Migrations complete.");
```

- [ ] **Step 7: Update .env.example**

Replace the Supabase vars:

```
# Database
DATABASE_URL=./data/frontendminds.db
```

Remove:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

- [ ] **Step 8: Generate and run initial migration**

```bash
mkdir -p data
npx drizzle-kit generate
npx tsx src/lib/db/migrate.ts
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Drizzle ORM + SQLite schema replacing Supabase"
```

---

### Task 2: Migrate Server Actions to Drizzle

**Files:**
- Modify: `src/actions/submit-assessment.ts`
- Modify: `src/actions/contact.ts`
- Modify: `src/actions/generate-summary.ts`
- Modify: `src/actions/subscribe.ts`
- Delete: `src/lib/supabase/server.ts`
- Delete: `src/lib/supabase/client.ts`

- [ ] **Step 1: Migrate submit-assessment.ts**

Replace the Supabase import and client usage. The key operations are:

1. Upsert lead by email:
```typescript
import { db } from "@/lib/db";
import { leads, assessments, emailEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Find or create lead
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

2. Insert assessment:
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

3. Update email_sent_at and insert email event:
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
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

await db.insert(contactSubmissions).values({
  name, email, reason, message,
});
```

- [ ] **Step 3: Migrate generate-summary.ts**

```typescript
import { db } from "@/lib/db";
import { executiveSummaries, assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Check existing
const existing = await db.query.executiveSummaries.findFirst({
  where: eq(executiveSummaries.assessmentId, assessmentId),
});
if (existing) return { token: existing.shareToken };

// Verify assessment exists
const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, assessmentId),
});
if (!assessment) return { error: "Assessment not found" };

// Create summary
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
  email,
  firstName,
  emailsSent: 1,
});
```

- [ ] **Step 5: Delete old Supabase clients**

```bash
rm src/lib/supabase/server.ts src/lib/supabase/client.ts
rmdir src/lib/supabase
```

- [ ] **Step 6: Verify build compiles**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: migrate server actions from Supabase to Drizzle + SQLite"
```

---

### Task 3: Migrate Page Routes and API Routes to Drizzle

**Files:**
- Modify: `src/app/assessment/results/[id]/page.tsx`
- Modify: `src/app/assessment/summary/page.tsx`
- Modify: `src/app/assessment/results/[id]/opengraph-image.tsx`
- Modify: `src/app/admin/leads/page.tsx`
- Modify: `src/app/api/assessment/report/[id]/route.ts`

- [ ] **Step 1: Migrate results page**

In `src/app/assessment/results/[id]/page.tsx`, replace Supabase query:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
  columns: {
    id: true,
    totalPercentage: true,
    dimensionPercentages: true,
    tier: true,
    topPatterns: true,
    triggeredPatterns: true,
  },
});
```

- [ ] **Step 2: Migrate summary page**

In `src/app/assessment/summary/page.tsx`, replace both Supabase queries:

```typescript
import { db } from "@/lib/db";
import { executiveSummaries, assessments, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// By share token
const summary = await db.query.executiveSummaries.findFirst({
  where: eq(executiveSummaries.shareToken, token),
});

// Get assessment with lead
const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, assessmentId),
});
const lead = assessment
  ? await db.query.leads.findFirst({ where: eq(leads.id, assessment.leadId) })
  : null;
```

Note: Supabase had nested selects (e.g., `lead:leads(*)`). With Drizzle, use separate queries or `with` relations. Define relations in schema if using `db.query` with nested reads:

Add to `src/lib/db/schema.ts`:
```typescript
import { relations } from "drizzle-orm";

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

Then use `with`:
```typescript
const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
  with: { lead: true },
});
// assessment.lead.firstName, assessment.lead.email, etc.
```

- [ ] **Step 3: Migrate opengraph-image route**

In `src/app/assessment/results/[id]/opengraph-image.tsx`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
  columns: { totalPercentage: true, dimensionPercentages: true, tier: true },
});
```

- [ ] **Step 4: Migrate admin leads page**

In `src/app/admin/leads/page.tsx`:

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

- [ ] **Step 5: Migrate PDF report API route**

In `src/app/api/assessment/report/[id]/route.ts`:

```typescript
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const assessment = await db.query.assessments.findFirst({
  where: eq(assessments.id, id),
  with: { lead: true },
});
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: migrate page routes and API routes to Drizzle + SQLite"
```

---

### Task 4: Migrate Cron Routes to Drizzle

**Files:**
- Modify: `src/app/api/cron/health/route.ts`
- Modify: `src/app/api/cron/nurture/route.ts`
- Modify: `src/app/api/cron/followup/route.ts`

- [ ] **Step 1: Migrate health cron**

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

- [ ] **Step 2: Migrate nurture cron**

Replace Supabase client with Drizzle. Key operations:

```typescript
import { db } from "@/lib/db";
import { nurtureQueue } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Fetch queue
const queue = await db.query.nurtureQueue.findMany({
  where: eq(nurtureQueue.completed, false),
  limit: 50,
});

// Update completed
await db.update(nurtureQueue)
  .set({ completed: true })
  .where(eq(nurtureQueue.id, item.id));

// Update sent count
await db.update(nurtureQueue)
  .set({
    emailsSent: item.emailsSent + 1,
    lastSentAt: new Date().toISOString(),
    completed: isComplete,
  })
  .where(eq(nurtureQueue.id, item.id));
```

- [ ] **Step 3: Migrate followup cron**

```typescript
import { db } from "@/lib/db";
import { assessments, emailEvents } from "@/lib/db/schema";
import { eq, and, gte, inArray } from "drizzle-orm";

// Fetch recent assessments
const recentAssessments = await db.query.assessments.findMany({
  where: and(
    eq(assessments.bookedCall, false),
    gte(assessments.completedAt, fourteenDaysAgo),
  ),
  limit: 50,
  with: { lead: true },
});

// Check sent events
const sentEvents = await db.select()
  .from(emailEvents)
  .where(and(
    eq(emailEvents.assessmentId, assessmentId),
    inArray(emailEvents.type, ["followup_day3", "followup_day7"]),
  ));

// Insert email event
await db.insert(emailEvents).values({
  assessmentId,
  resendId: emailResult.id,
  type: `followup_day${day}`,
  status: "sent",
});
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Test locally**

```bash
# Create local database
mkdir -p data
npx tsx src/lib/db/migrate.ts

# Start dev server
npm run dev

# Test health endpoint
curl -s http://localhost:3000/api/cron/health -H "Authorization: Bearer $CRON_SECRET"
# Expected: {"status":"ok","leads":0,"timestamp":"..."}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate cron routes to Drizzle + SQLite"
```

---

### Task 5: Migrate Existing Data from Supabase to SQLite

**Files:**
- Create: `scripts/migrate-data.ts`

- [ ] **Step 1: Create data migration script**

Create `scripts/migrate-data.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "../src/lib/db/schema";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const sqlite = new Database(process.env.DATABASE_URL ?? "./data/frontendminds.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

// Run migrations first
migrate(db, { migrationsFolder: "./drizzle" });

async function migrateTable(tableName: string, drizzleTable: any) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return;
  }
  if (!data || data.length === 0) {
    console.log(`${tableName}: 0 rows (skipping)`);
    return;
  }

  // Map Supabase column names (snake_case) to Drizzle values
  for (const row of data) {
    await db.insert(drizzleTable).values(row).onConflictDoNothing();
  }
  console.log(`${tableName}: ${data.length} rows migrated`);
}

async function main() {
  // Order matters due to foreign keys
  await migrateTable("leads", schema.leads);
  await migrateTable("assessments", schema.assessments);
  await migrateTable("email_events", schema.emailEvents);
  await migrateTable("contact_submissions", schema.contactSubmissions);
  await migrateTable("nurture_queue", schema.nurtureQueue);
  await migrateTable("executive_summaries", schema.executiveSummaries);

  sqlite.close();
  console.log("Migration complete!");
}

main().catch(console.error);
```

- [ ] **Step 2: Run data migration**

```bash
# You'll need the Supabase service role key temporarily
SUPABASE_URL=https://tsckwmbjwnjzomxshfbn.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
npx tsx scripts/migrate-data.ts
```

Expected output:
```
leads: 8 rows migrated
assessments: N rows migrated
email_events: N rows migrated
contact_submissions: N rows migrated
nurture_queue: N rows migrated
executive_summaries: N rows migrated
Migration complete!
```

- [ ] **Step 3: Verify data**

```bash
npx tsx -e "
import Database from 'better-sqlite3';
const db = new Database('./data/frontendminds.db');
console.log('leads:', db.prepare('SELECT count(*) as c FROM leads').get());
console.log('assessments:', db.prepare('SELECT count(*) as c FROM assessments').get());
db.close();
"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/migrate-data.ts
git commit -m "feat: add Supabase to SQLite data migration script"
```

---

## Phase 2: Next.js Standalone Build

### Task 6: Configure Next.js for Standalone Output

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add standalone output**

In `next.config.ts`, add `output: "standalone"`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  async headers() {
    // ... existing headers unchanged
  },
};

export default nextConfig;
```

- [ ] **Step 2: Test standalone build**

```bash
npm run build
ls .next/standalone/
# Should contain: server.js, node_modules/, .next/, package.json
```

- [ ] **Step 3: Test standalone server locally**

```bash
# Copy static assets (required for standalone)
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Run standalone
DATABASE_URL=./data/frontendminds.db node .next/standalone/server.js
# Should serve on port 3000
```

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat: enable Next.js standalone output for VPS deployment"
```

---

## Phase 3: Server Setup

### Task 7: Provision and Configure Hetzner VPS

**No code files — all server-side.**

- [ ] **Step 1: Create Hetzner VPS**

In Hetzner Cloud Console (https://console.hetzner.cloud):
- Create new server
- Location: Nuremberg or Helsinki (closest to you + good EU coverage)
- Image: Ubuntu 24.04
- Type: CX22 (2 vCPU, 4GB RAM, 40GB disk) — €4.51/month
- SSH key: add your public key
- Name: `frontendminds-prod`

Note the IP address.

- [ ] **Step 2: Initial server setup**

```bash
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Create deploy user
adduser --disabled-password deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh

# Disable root SSH login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

# Install Node.js 24
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy

# Create app directory
mkdir -p /home/deploy/frontendminds/data
chown -R deploy:deploy /home/deploy/frontendminds
```

- [ ] **Step 3: Configure Caddy**

Create `/etc/caddy/Caddyfile`:

```
frontendminds.com {
    reverse_proxy localhost:3000

    header {
        X-Frame-Options "DENY"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        Permissions-Policy "camera=(), microphone=(), geolocation=()"
    }

    header /_next/static/* {
        Cache-Control "public, max-age=31536000, immutable"
    }
}

www.frontendminds.com {
    redir https://frontendminds.com{uri} permanent
}
```

```bash
systemctl restart caddy
```

Caddy automatically provisions SSL certificates via Let's Encrypt.

- [ ] **Step 4: Configure PM2 ecosystem file**

On your local machine, create `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [{
    name: "frontendminds",
    script: ".next/standalone/server.js",
    cwd: "/home/deploy/frontendminds",
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      HOSTNAME: "0.0.0.0",
      DATABASE_URL: "/home/deploy/frontendminds/data/frontendminds.db",
    },
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: "512M",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
  }],
};
```

- [ ] **Step 5: Set up cron jobs on server**

```bash
ssh deploy@YOUR_SERVER_IP
crontab -e
```

Add:
```
# Health check (keep DB alive / monitoring)
0 0 * * * curl -s http://localhost:3000/api/cron/health -H "Authorization: Bearer YOUR_CRON_SECRET" > /dev/null 2>&1

# Follow-up emails
0 9 * * * curl -s http://localhost:3000/api/cron/followup -H "Authorization: Bearer YOUR_CRON_SECRET" > /dev/null 2>&1

# Nurture queue
0 10 * * 1 curl -s http://localhost:3000/api/cron/nurture -H "Authorization: Bearer YOUR_CRON_SECRET" > /dev/null 2>&1

# SQLite backup (daily at 3am)
0 3 * * * cp /home/deploy/frontendminds/data/frontendminds.db /home/deploy/frontendminds/data/backups/frontendminds-$(date +\%Y\%m\%d).db && find /home/deploy/frontendminds/data/backups/ -mtime +30 -delete
```

- [ ] **Step 6: Create backup directory**

```bash
mkdir -p /home/deploy/frontendminds/data/backups
```

- [ ] **Step 7: Commit ecosystem config**

```bash
git add ecosystem.config.cjs
git commit -m "feat: add PM2 ecosystem config for Hetzner deployment"
```

---

## Phase 4: CI/CD Pipeline

### Task 8: Set Up GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Add server SSH key as GitHub secret**

In GitHub repo → Settings → Secrets and Variables → Actions, add:
- `SERVER_HOST`: your Hetzner IP
- `SERVER_USER`: `deploy`
- `SERVER_SSH_KEY`: contents of your SSH private key
- `ENV_FILE`: full contents of production `.env` file (all vars)

- [ ] **Step 2: Create deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hetzner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ./data/build.db
          NEXT_PUBLIC_SITE_URL: https://frontendminds.com
          NEXT_PUBLIC_POSTHOG_KEY: ${{ secrets.POSTHOG_KEY }}
          NEXT_PUBLIC_POSTHOG_HOST: https://us.i.posthog.com

      - name: Prepare standalone
        run: |
          cp -r .next/static .next/standalone/.next/static
          cp -r public .next/standalone/public
          cp ecosystem.config.cjs .next/standalone/
          cp -r drizzle .next/standalone/drizzle
          rm -f .next/standalone/data/build.db

      - name: Deploy to server
        uses: easingthemes/ssh-deploy@v5
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.SERVER_HOST }}
          REMOTE_USER: ${{ secrets.SERVER_USER }}
          SOURCE: ".next/standalone/"
          TARGET: "/home/deploy/frontendminds/"
          ARGS: "-rlgoDzvc --delete --exclude='data/'"
          SCRIPT_AFTER: |
            cd /home/deploy/frontendminds
            echo '${{ secrets.ENV_FILE }}' > .env
            npx tsx drizzle/migrate.ts 2>/dev/null || true
            pm2 restart ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
            pm2 save
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions CI/CD for Hetzner deployment"
```

---

## Phase 5: DNS Cutover (Zero Downtime)

### Task 9: DNS Migration

**No code files — DNS and verification only.**

- [ ] **Step 1: Test deployment on server IP first**

Before touching DNS, verify the site works by accessing `http://YOUR_SERVER_IP:3000` or adding a temporary test domain.

- [ ] **Step 2: Lower DNS TTL**

In your DNS provider, set the A record TTL for `frontendminds.com` to **300 seconds** (5 minutes). Wait for the old TTL to expire (check current TTL with `dig frontendminds.com`).

- [ ] **Step 3: Update DNS records**

Change the A record for `frontendminds.com`:
- **From:** `216.198.79.1` (Vercel)
- **To:** `YOUR_HETZNER_IP`

Remove any Vercel CNAME records for `www.frontendminds.com`. Add:
- **Type:** A
- **Name:** `www`
- **Value:** `YOUR_HETZNER_IP`

Caddy handles the www→non-www redirect.

- [ ] **Step 4: Verify SSL**

Wait 2-5 minutes for DNS propagation, then:

```bash
curl -sI https://frontendminds.com | head -10
# Should show HTTP/2 200 with Caddy server header

curl -sI https://www.frontendminds.com | head -5
# Should show 308 redirect to frontendminds.com
```

- [ ] **Step 5: Test all critical paths**

```bash
# Homepage
curl -s -o /dev/null -w "%{http_code}" https://frontendminds.com
# Expected: 200

# Blog post
curl -s -o /dev/null -w "%{http_code}" https://frontendminds.com/blog/angular-22-release
# Expected: 200

# Health endpoint
curl -s https://frontendminds.com/api/cron/health -H "Authorization: Bearer YOUR_SECRET"
# Expected: {"status":"ok",...}

# Sitemap
curl -s https://frontendminds.com/sitemap.xml | head -5
# Expected: XML sitemap

# Assessment flow
# Open in browser and test full flow
```

- [ ] **Step 6: Restore normal DNS TTL**

Once verified, set TTL back to **3600** (1 hour) or **86400** (24 hours).

- [ ] **Step 7: Remove Vercel project (optional — keep as rollback for 2 weeks)**

Keep the Vercel project inactive for 2 weeks. If anything goes wrong, you can switch DNS back. After 2 weeks with no issues, remove it.

---

## Phase 6: Post-Migration Cleanup

### Task 10: Cleanup and Monitoring

- [ ] **Step 1: Remove vercel.json cron config**

The crons now run from the server's crontab, not Vercel. Either delete `vercel.json` or remove the crons block:

```json
{}
```

- [ ] **Step 2: Add .gitignore entries**

Add to `.gitignore`:
```
data/
*.db
*.db-journal
*.db-wal
```

- [ ] **Step 3: Update .env.example with final vars**

```
# Database (SQLite — path on server)
DATABASE_URL=./data/frontendminds.db

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

- [ ] **Step 4: Set up basic monitoring**

SSH into server and set up PM2 monitoring:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

Optional: set up UptimeRobot (free) to ping `https://frontendminds.com` every 5 minutes and alert you on downtime.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: post-migration cleanup — remove Vercel deps, update env config"
```

---

## Rollback Plan

If anything goes wrong after DNS cutover:

1. **Immediate:** Switch DNS A record back to Vercel IP (`216.198.79.1`)
2. **Within 5 minutes:** Traffic returns to Vercel (if TTL was lowered)
3. **Data:** Any new data written to SQLite during the cutover window needs to be manually synced back to Supabase

Keep the Vercel project and Supabase project alive for at least 2 weeks after migration.

---

## Cost Comparison

| Item | Before (Vercel + Supabase) | After (Hetzner) |
|------|---------------------------|-----------------|
| Hosting | $0 (Vercel free) | €4.51/mo (Hetzner CX22) |
| Database | $0 (Supabase free, pauses) | $0 (SQLite on same VPS) |
| SSL | $0 (Vercel) | $0 (Caddy + Let's Encrypt) |
| CDN | Included (Vercel Edge) | None (consider Cloudflare free if needed) |
| CI/CD | Included (Vercel) | $0 (GitHub Actions free tier) |
| **Total** | **$0/mo** | **~€4.51/mo (~$5/mo)** |

Trade-off: You gain full control, no pausing DB, ability to host multiple sites on same VPS. You lose Vercel's global CDN edge network (mitigate with Cloudflare free tier if needed).
