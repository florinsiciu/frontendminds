-- Add diagnostic pattern fields to assessments table
-- All columns are nullable to preserve backward compatibility with existing records

alter table assessments
  add column triggered_patterns jsonb,
  add column top_patterns jsonb,
  add column lead_score int,
  add column lead_bucket text check (lead_bucket in ('hot', 'warm', 'nurture')),
  add column seesaw_data jsonb;

-- Index for lead prioritization queries (admin dashboard)
create index idx_assessments_lead_bucket on assessments (lead_bucket);
create index idx_assessments_lead_score on assessments (lead_score desc nulls last);

-- Executive summaries table for shareable CTO view
create table executive_summaries (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references assessments (id) on delete cascade,
  share_token text unique not null,
  created_at timestamptz not null default now()
);

create index idx_executive_summaries_token on executive_summaries (share_token);

-- RLS for executive summaries
alter table executive_summaries enable row level security;

-- Anon can create summaries (triggered from results page share button)
create policy "Allow anonymous executive summary creation"
  on executive_summaries for insert to anon with check (true);

-- Anon can read summaries by share token (public shareable page)
create policy "Allow anonymous executive summary read"
  on executive_summaries for select to anon using (true);
