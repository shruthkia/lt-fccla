-- Run after schema.sql in the Supabase SQL Editor.
-- Member portal point activities + officer-approved claims.

create table if not exists public.point_activities (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  label text not null,
  description text not null default '',
  points integer not null check (points > 0),
  category text not null default 'chapter'
    check (category in ('service', 'advocacy', 'chapter', 'leadership')),
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint point_activities_key_unique unique (key)
);

create table if not exists public.point_claims (
  id uuid primary key default gen_random_uuid(),
  member_name text not null,
  activity_id text not null,
  activity_key text not null,
  activity_label text not null,
  points integer not null check (points > 0),
  note text not null default '',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'denied')),
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists point_claims_member_name_idx
  on public.point_claims (lower(member_name));

create index if not exists point_claims_status_created_idx
  on public.point_claims (status, created_at desc);

alter table public.point_activities enable row level security;
alter table public.point_claims enable row level security;

drop policy if exists "Public can read point activities" on public.point_activities;
create policy "Public can read point activities"
  on public.point_activities
  for select
  to anon, authenticated
  using (active = true);

drop policy if exists "Admins can manage point activities" on public.point_activities;
create policy "Admins can manage point activities"
  on public.point_activities
  for all
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Public can read point claims" on public.point_claims;
create policy "Public can read point claims"
  on public.point_claims
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can insert pending point claims" on public.point_claims;
create policy "Anyone can insert pending point claims"
  on public.point_claims
  for insert
  to anon, authenticated
  with check (status = 'pending');

drop policy if exists "Admins can update point claims" on public.point_claims;
create policy "Admins can update point claims"
  on public.point_claims
  for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Admins can delete point claims" on public.point_claims;
create policy "Admins can delete point claims"
  on public.point_claims
  for delete
  to authenticated
  using (public.is_blog_admin());

-- Seed default activities (safe to re-run)
insert into public.point_activities (key, label, description, points, category, sort_order)
values
  (
    'shelter-visit',
    'Shelter visit / animal care shift',
    'Volunteer at Dallas Animal Services, Operation Kindness, Frisco Animal Shelter, or Plano Animal Shelter.',
    10,
    'service',
    1
  ),
  (
    'dog-toy-event',
    'Dog toy making event',
    'Help build enrichment toys for shelter dogs at an Adopurr work day.',
    8,
    'service',
    2
  ),
  (
    'flyer-outreach',
    'Flyer / campus outreach',
    'Design, print, or distribute Adopurr flyers and adoption promo materials.',
    5,
    'advocacy',
    3
  ),
  (
    'social-post',
    'Social media advocacy post',
    'Create or schedule an approved post promoting animal welfare or adoption.',
    4,
    'advocacy',
    4
  ),
  (
    'cold-email',
    'Cold email / donation ask',
    'Send approved outreach emails to raise funds for sterilization and shelter needs.',
    6,
    'advocacy',
    5
  ),
  (
    'fundraiser',
    'Fundraiser shift',
    'Work a chapter fundraiser that supports Adopurr and animal welfare advocacy.',
    8,
    'advocacy',
    6
  ),
  (
    'chapter-meeting',
    'Chapter meeting attendance',
    'Attend a scheduled Lebanon Trail FCCLA meeting.',
    3,
    'chapter',
    7
  ),
  (
    'social-event',
    'Chapter social (Halloween / Christmas)',
    'Help host or attend a chapter social and support member community.',
    4,
    'chapter',
    8
  ),
  (
    'chapter-collab',
    'Chapter collaboration project',
    'Support Emerson x LT Connect cultural promotion or Plano x LT Stand Up.',
    7,
    'leadership',
    9
  ),
  (
    'recognition-help',
    'Recognition / awards support',
    'Help prepare member recognitions that celebrate strong Adopurr and chapter work.',
    5,
    'leadership',
    10
  )
on conflict (key) do update set
  label = excluded.label,
  description = excluded.description,
  points = excluded.points,
  category = excluded.category,
  sort_order = excluded.sort_order,
  active = true;
