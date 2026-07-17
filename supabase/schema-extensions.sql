-- Run after schema.sql in the Supabase SQL Editor.
-- Adds gallery + program of work tables, storage bucket, and admin policies.

-- Gallery images (metadata; files live in Storage bucket "gallery")
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  caption text not null default '',
  storage_path text not null,
  public_url text not null,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_created_at_idx
  on public.gallery_images (created_at desc);

-- Program of Work roadmap items
create table if not exists public.program_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  timeframe text not null default '',
  sort_order integer not null default 0,
  status text not null default 'planned'
    check (status in ('planned', 'in_progress', 'done')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists program_items_sort_idx
  on public.program_items (sort_order asc, created_at asc);

drop trigger if exists program_items_set_updated_at on public.program_items;
create trigger program_items_set_updated_at
  before update on public.program_items
  for each row
  execute function public.set_updated_at();

alter table public.gallery_images enable row level security;
alter table public.program_items enable row level security;

-- Gallery: anyone can read; only admins write
drop policy if exists "Public can read gallery" on public.gallery_images;
create policy "Public can read gallery"
  on public.gallery_images
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert gallery" on public.gallery_images;
create policy "Admins can insert gallery"
  on public.gallery_images
  for insert
  to authenticated
  with check (public.is_blog_admin());

drop policy if exists "Admins can update gallery" on public.gallery_images;
create policy "Admins can update gallery"
  on public.gallery_images
  for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Admins can delete gallery" on public.gallery_images;
create policy "Admins can delete gallery"
  on public.gallery_images
  for delete
  to authenticated
  using (public.is_blog_admin());

-- Program of Work: anyone can read; only admins write
drop policy if exists "Public can read program items" on public.program_items;
create policy "Public can read program items"
  on public.program_items
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert program items" on public.program_items;
create policy "Admins can insert program items"
  on public.program_items
  for insert
  to authenticated
  with check (public.is_blog_admin());

drop policy if exists "Admins can update program items" on public.program_items;
create policy "Admins can update program items"
  on public.program_items
  for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "Admins can delete program items" on public.program_items;
create policy "Admins can delete program items"
  on public.program_items
  for delete
  to authenticated
  using (public.is_blog_admin());

-- Public storage bucket for gallery uploads
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read gallery files" on storage.objects;
create policy "Public read gallery files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Admins upload gallery files" on storage.objects;
create policy "Admins upload gallery files"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'gallery' and public.is_blog_admin());

drop policy if exists "Admins update gallery files" on storage.objects;
create policy "Admins update gallery files"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'gallery' and public.is_blog_admin())
  with check (bucket_id = 'gallery' and public.is_blog_admin());

drop policy if exists "Admins delete gallery files" on storage.objects;
create policy "Admins delete gallery files"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'gallery' and public.is_blog_admin());
