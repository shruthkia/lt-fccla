# Lebanon Trail FCCLA

Chapter website for **Lebanon Trail High School FCCLA** (Frisco, Texas), built for the FCCLA Chapter Website STAR Event.

## Run locally

```bash
npm install
npm run dev
```

## Edit chapter content

Update names, service events, competition records, FAQ copy, and contact info in:

`src/data/chapter.ts`

## Pages

- Home
- Officers & Advisors
- Competitive Events
- Community Service
- Adopurr (core animal welfare project + year plan)
- Member Portal (activity checkboxes + points tracker)
- Gallery (Supabase Storage uploads)
- Calendar (Google Calendar embed)
- Records
- Blog
- Join (Google Form)
- Program of Work (editable roadmap)
- FAQ
- About
- Search + Sitemap
- Admin workspace at `/admin` (blog, gallery, Program of Work, point approvals)

## Official FCCLA logo

Drop the official Emblem or Tagline logo PNG from the [National FCCLA branding pages](https://fcclainc.org/communications/branding-guidelines/fccla-logos) / Portal into:

`public/brand/fccla-logo.png`

Until that file is present, the nav shows an FCCLA text mark.

## Officer / advisor editing (Supabase)

Public visitors can read published blog posts, gallery images, Program of Work items, and all site copy.
Writes require an admin profile (`profiles.is_admin = true`).

### 1. Env vars

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
```

### 2. SQL schemas

In the Supabase **SQL Editor**, run in order:

1. `supabase/schema.sql` (profiles, posts, admin helper)
2. `supabase/schema-extensions.sql` (gallery, program of work, storage)
3. `supabase/schema-site-content.sql` (editable chapter/team/FAQ/records/etc.)
4. `supabase/schema-points.sql` (member portal activities + point claim approvals)

### 3. Create an admin user

1. **Authentication → Users → Add user** (email + password).
2. Grant admin:

```sql
update public.profiles
set is_admin = true
where email = 'your-admin@example.com';
```

### 4. Edit the whole site

1. Visit `/admin` and sign in.
2. Use the tabs to edit chapter identity, team, FAQ, service, courses, records, milestones, compete tracks, pathways, blog, gallery, Program of Work, and member point approvals.
3. Click **Save section** after each change. Public pages update from Supabase (with built-in defaults until a section is saved).

`/blog/admin` redirects to `/admin`.

Built-in defaults still live in `src/data/chapter.ts` as a fallback if Supabase is offline or a section has never been saved.

## Build

```bash
npm run build
npm run preview
```
