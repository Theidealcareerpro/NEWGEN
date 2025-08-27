-- Tracks where our last poll ended (cursor/timestamp)
create table if not exists public.bmc_sync_state (
  id                 bigint generated always as identity primary key,
  last_run_at        timestamptz default now(),
  last_cursor        text,
  last_supporter_iso timestamptz,
  updated_at         timestamptz default now()
);

-- Raw log of supporters we’ve processed (for audits/debug)
create table if not exists public.bmc_supporter_events (
  id           bigint generated always as identity primary key,
  supporter_id text,
  occurred_at  timestamptz,
  email        text,
  name         text,
  amount       numeric,
  currency     text,
  note         text,
  raw          jsonb,
  inserted_at  timestamptz default now()
);
create index if not exists idx_bmc_supporter_events_supporter_id on public.bmc_supporter_events(supporter_id);

-- Safety net: make sure usage_tracking has the columns we use.
-- (No-op if they already exist.)
alter table if exists public.usage_tracking
  add column if not exists is_supporter boolean default false,
  add column if not exists expiry_date timestamptz,
  add column if not exists updated_at timestamptz default now();
