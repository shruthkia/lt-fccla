-- Full-site editable content for officers & advisors.
-- Run after schema.sql (needs is_blog_admin + set_updated_at).

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
  before update on public.site_content
  for each row
  execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
  on public.site_content
  for insert
  to authenticated
  with check (public.is_blog_admin());

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
  on public.site_content
  for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Admins can delete site content" on public.site_content;
create policy "Admins can delete site content"
  on public.site_content
  for delete
  to authenticated
  using (public.is_blog_admin());
