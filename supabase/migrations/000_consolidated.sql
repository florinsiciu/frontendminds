-- FrontendMinds — Consolidated Schema (fresh database)
-- Combines migrations 001–004 with final column names
-- Run this in Supabase SQL Editor for a new project

-- ─── Enable UUID extension ──────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ─── Leads ──────────────────────────────────────────────────────────────────

create table leads (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  email text unique not null,
  created_at timestamptz not null default now(),
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index idx_leads_email on leads (email);

-- ─── Assessments ────────────────────────────────────────────────────────────

create table assessments (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references leads (id) on delete cascade,
  answers jsonb not null,
  qualifying_answers jsonb not null,
  total_percentage int not null check (total_percentage between 0 and 100),
  dimension_percentages jsonb not null,
  tier text not null check (tier in ('critical_risk', 'modernization_ready', 'well_positioned')),
  completed_at timestamptz not null default now(),
  email_sent_at timestamptz,
  booked_call boolean not null default false
);

create index idx_assessments_lead_id on assessments (lead_id);

-- ─── Email Events ───────────────────────────────────────────────────────────

create table email_events (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references assessments (id) on delete cascade,
  resend_id text not null,
  type text not null default 'results',
  status text not null default 'sent',
  created_at timestamptz not null default now()
);

create index idx_email_events_assessment_id on email_events (assessment_id);

-- ─── Contact Submissions ────────────────────────────────────────────────────

create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  reason text not null check (reason in ('general', 'service', 'speaking', 'partnership')),
  message text not null,
  created_at timestamptz not null default now()
);

-- ─── Nurture Queue ──────────────────────────────────────────────────────────

create table nurture_queue (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  first_name text,
  subscribed_at timestamptz not null default now(),
  emails_sent int not null default 0,
  last_sent_at timestamptz,
  completed boolean not null default false
);

create index idx_nurture_queue_email on nurture_queue (email);

-- ─── Row Level Security ─────────────────────────────────────────────────────

alter table leads enable row level security;
alter table assessments enable row level security;
alter table email_events enable row level security;
alter table contact_submissions enable row level security;
alter table nurture_queue enable row level security;

-- Leads: anon can insert + read (for upsert check)
create policy "Allow anonymous lead creation"
  on leads for insert to anon with check (true);
create policy "Allow anonymous lead read"
  on leads for select to anon using (true);

-- Assessments: anon can insert + read + update (email_sent_at, booked_call)
create policy "Allow anonymous assessment creation"
  on assessments for insert to anon with check (true);
create policy "Allow anonymous assessment read by id"
  on assessments for select to anon using (true);
create policy "Allow anonymous assessment update"
  on assessments for update to anon using (true) with check (true);

-- Email events: anon can insert
create policy "Allow anonymous email event creation"
  on email_events for insert to anon with check (true);

-- Contact submissions: anon can insert
create policy "Allow anonymous contact submissions"
  on contact_submissions for insert to anon with check (true);

-- Nurture queue: anon can insert + read + update
create policy "Allow anonymous nurture queue insert"
  on nurture_queue for insert to anon with check (true);
create policy "Allow anonymous nurture queue select"
  on nurture_queue for select to anon using (true);
create policy "Allow anonymous nurture queue update"
  on nurture_queue for update to anon using (true) with check (true);
