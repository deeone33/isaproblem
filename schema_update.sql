-- ============================================
-- IS A PROBLEM — Schema additions
-- Run this in Supabase SQL Editor
-- ============================================

-- Officers table (separate from profiles — for public display)
create table if not exists public.officers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  class_spec text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Add new fields to applications
alter table public.applications
  add column if not exists discord_tag text,
  add column if not exists age int,
  add column if not exists expectations text,
  add column if not exists anything_else text,
  add column if not exists user_id uuid references auth.users(id) on delete set null;

-- RLS for officers table
alter table public.officers enable row level security;

create policy "officers public read"
  on public.officers for select using (true);

create policy "officers manage officers table"
  on public.officers for all using (public.is_officer());

-- Also allow applicants to insert with their own user_id
-- (replaces the old application insert policy)
drop policy if exists "anyone can submit application" on public.applications;

create policy "anyone can submit application"
  on public.applications for insert with check (true);

-- Allow logged-in users to read their own application
create policy "users read own application"
  on public.applications for select
  using (
    public.is_officer()
    or (auth.uid() is not null and auth.uid() = user_id)
  );

-- ============================================
-- Seed some initial data (optional — remove if
-- you want to enter everything via the site UI)
-- ============================================

-- Example officers (edit names to match your actual officers)
insert into public.officers (name, title, class_spec, display_order) values
  ('Edenrath',   'Guild Master',   'Rogue · Combat',       1),
  ('Vorithil',   'Raid Leader',    'Warrior · Protection', 2),
  ('Mournstead', 'Loot Master',    'Priest · Holy',        3),
  ('Thalvex',    'Recruitment',    'Mage · Arcane',        4)
on conflict do nothing;
