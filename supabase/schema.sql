-- Lebanon Trail FCCLA blog schema
-- Run this in the Supabase SQL Editor after creating your project.
-- Then create an Auth user and grant admin (see README).

-- Profiles: explicit admin flag (signed-in users are NOT admins by default)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Blog posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text not null default '',
  body text not null default '',
  author_name text not null default 'Lebanon Trail FCCLA',
  published boolean not null default false,
  published_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_slug_unique unique (slug),
  constraint posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists posts_published_at_idx
  on public.posts (published_at desc nulls last)
  where published = true;

create index if not exists posts_updated_at_idx
  on public.posts (updated_at desc);

-- Keep updated_at fresh on every update
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();

-- When a new auth user signs up, create a non-admin profile row
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, is_admin)
  values (new.id, new.email, false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Helper: only explicitly flagged admins pass
create or replace function public.is_blog_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

revoke all on function public.is_blog_admin() from public;
grant execute on function public.is_blog_admin() to authenticated, anon;

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Profiles policies
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
  on public.profiles
  for select
  to authenticated
  using (public.is_blog_admin());

-- No insert/update/delete on profiles for clients.
-- Grant admin only via SQL Editor (service role / dashboard), never from the frontend.

-- Posts policies
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
  on public.posts
  for select
  to authenticated
  using (public.is_blog_admin());

drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts"
  on public.posts
  for insert
  to authenticated
  with check (public.is_blog_admin());

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
  on public.posts
  for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
  on public.posts
  for delete
  to authenticated
  using (public.is_blog_admin());
