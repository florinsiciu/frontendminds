-- Angular Modernization Scorecard — Initial Schema
-- Run this in Supabase SQL Editor or via supabase db push

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
  total_score int not null check (total_score between 0 and 20),
  dimension_scores jsonb not null,
  tier text not null check (tier in ('critical_risk', 'modernization_ready', 'well_positioned')),
  completed_at timestamptz not null default now(),
  email_sent_at timestamptz
);

create index idx_assessments_lead_id on assessments (lead_id);

-- ─── Email Events (optional for MVP) ───────────────────────────────────────

create table email_events (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references assessments (id) on delete cascade,
  resend_id text not null,
  type text not null default 'results',
  status text not null default 'sent',
  created_at timestamptz not null default now()
);

create index idx_email_events_assessment_id on email_events (assessment_id);

-- ─── Row Level Security ─────────────────────────────────────────────────────

alter table leads enable row level security;
alter table assessments enable row level security;
alter table email_events enable row level security;

-- Allow the anon key to insert leads (email gate form submission)
create policy "Allow anonymous lead creation"
  on leads for insert
  to anon
  with check (true);

-- Allow the anon key to insert assessments (server action)
create policy "Allow anonymous assessment creation"
  on assessments for insert
  to anon
  with check (true);

-- Allow the anon key to read assessments by id (results page)
create policy "Allow anonymous assessment read by id"
  on assessments for select
  to anon
  using (true);

-- Allow the anon key to read leads by email (upsert check)
create policy "Allow anonymous lead read"
  on leads for select
  to anon
  using (true);

-- Allow the anon key to insert email events
create policy "Allow anonymous email event creation"
  on email_events for insert
  to anon
  with check (true);

-- Allow the anon key to update assessments (email_sent_at)
create policy "Allow anonymous assessment update"
  on assessments for update
  to anon
  using (true)
  with check (true);
