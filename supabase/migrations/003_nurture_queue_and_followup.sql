-- Nurture queue table for newsletter email sequencing
-- Referenced by: src/actions/subscribe.ts, src/app/api/cron/nurture/route.ts

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

alter table nurture_queue enable row level security;

create policy "Allow anonymous nurture queue insert"
  on nurture_queue for insert
  to anon
  with check (true);

create policy "Allow anonymous nurture queue select"
  on nurture_queue for select
  to anon
  using (true);

create policy "Allow anonymous nurture queue update"
  on nurture_queue for update
  to anon
  using (true)
  with check (true);

-- Add booked_call column to assessments for follow-up email logic
-- Referenced by: src/app/api/cron/followup/route.ts

alter table assessments add column booked_call boolean not null default false;
