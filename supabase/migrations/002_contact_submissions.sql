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
  on contact_submissions for insert to anon with check (true);
