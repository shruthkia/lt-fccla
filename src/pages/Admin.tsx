import { useEffect, useState, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import {
  ChapterSitePanel,
  CompeteSitePanel,
  FaqSitePanel,
  ListsSitePanel,
  MilestonesSitePanel,
  PathwaysSitePanel,
  RecordsSitePanel,
  ServiceSitePanel,
  TeamSitePanel,
} from "../components/SiteAdminPanels"
import { useAuth } from "../hooks/useAuth"
import {
  createPost,
  deletePost,
  fetchAllPostsForAdmin,
  slugifyTitle,
  updatePost,
  type PostRow,
} from "../lib/blog"
import {
  deleteGalleryImage,
  fetchGalleryImages,
  uploadGalleryImage,
} from "../lib/gallery"
import type { GalleryImageRow, ProgramItemRow } from "../lib/database.types"
import {
  createProgramItem,
  deleteProgramItem,
  fetchProgramItems,
  updateProgramItem,
} from "../lib/program"
import {
  fetchAllClaimsForAdmin,
  fetchMemberPointSummary,
  formatPointsError,
  reviewPointClaim,
} from "../lib/points"
import { formatPostDate } from "../lib/markdown"
import { getSupabase, isSupabaseConfigured } from "../lib/supabase"
import { POINTS_TO_COMPETE } from "../data/points"

type Tab =
  | "chapter"
  | "team"
  | "faq"
  | "service"
  | "lists"
  | "records"
  | "milestones"
  | "compete"
  | "pathways"
  | "posts"
  | "gallery"
  | "program"
  | "points"

const tabs: { id: Tab; label: string }[] = [
  { id: "chapter", label: "Chapter" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
  { id: "service", label: "Service" },
  { id: "lists", label: "Courses" },
  { id: "records", label: "Records" },
  { id: "milestones", label: "Milestones" },
  { id: "compete", label: "Compete" },
  { id: "pathways", label: "Pathways" },
  { id: "posts", label: "Blog" },
  { id: "gallery", label: "Gallery" },
  { id: "program", label: "Program of Work" },
  { id: "points", label: "Points" },
]

type PostForm = {
  title: string
  slug: string
  excerpt: string
  body: string
  author_name: string
  published: boolean
}

const emptyPost: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  author_name: "Lebanon Trail FCCLA",
  published: false,
}

export function Admin() {
  if (!isSupabaseConfigured) {
    return (
      <>
        <AdminHero />
        <section className="section">
          <Reveal>
            <BlogSetupNotice title="Admin tools need a connection" />
          </Reveal>
        </section>
      </>
    )
  }

  return (
    <>
      <AdminHero />
      <AdminGate />
    </>
  )
}

export function BlogAdminRedirect() {
  return <Navigate to="/admin" replace />
}

function AdminHero() {
  return (
    <header className="page-hero">
      <Reveal>
        <p className="eyebrow">
          <Link to="/" className="text-link">
            Chapter tools
          </Link>
        </p>
        <h1>
          Officer
          <br />
          <span className="text-red">workspace.</span>
        </h1>
        <p className="page-lede">
          Edit every public page: chapter copy, team, FAQ, service, records, compete tracks,
          pathways, blog, gallery, Program of Work, and member point approvals.
        </p>
      </Reveal>
    </header>
  )
}

function AdminGate() {
  const auth = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [authBusy, setAuthBusy] = useState(false)

  async function onSignIn(e: FormEvent) {
    e.preventDefault()
    const supabase = getSupabase()
    if (!supabase) return
    setAuthBusy(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setAuthBusy(false)
    if (error) setAuthError(error.message)
  }

  async function onSignOut() {
    const supabase = getSupabase()
    if (!supabase) return
    await supabase.auth.signOut()
  }

  if (!auth.ready) {
    return (
      <section className="section">
        <p className="blog-loading">Checking session…</p>
      </section>
    )
  }

  if (!auth.user) {
    return (
      <section className="section">
        <Reveal>
          <form className="blog-auth-form" onSubmit={onSignIn}>
            <p className="eyebrow">Sign in</p>
            <h2>Officer & advisor login</h2>
            <label>
              Email
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {authError && <p className="blog-form-error">{authError}</p>}
            <button type="submit" className="btn btn-primary" disabled={authBusy}>
              {authBusy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </Reveal>
      </section>
    )
  }

  if (!auth.isAdmin) {
    return (
      <section className="section">
        <Reveal>
          <div className="blog-notice">
            <p className="eyebrow">Not authorized</p>
            <h2>You do not have access to edit the site</h2>
            <p>Signed in as {auth.user.email}. Ask a chapter advisor to grant you access.</p>
            <button type="button" className="btn btn-ghost" onClick={() => void onSignOut()}>
              Sign out
            </button>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <AdminWorkspace email={auth.user.email ?? "member"} onSignOut={() => void onSignOut()} />
  )
}

function AdminWorkspace({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("chapter")

  return (
    <section className="section">
      <div className="blog-admin-bar">
        <p>
          Signed in as <strong>{email}</strong>
        </p>
        <button type="button" className="btn btn-ghost" onClick={onSignOut}>
          Sign out
        </button>
      </div>

      <div className="admin-tabs admin-tabs-wrap">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`btn ${tab === id ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "chapter" && <ChapterSitePanel />}
      {tab === "team" && <TeamSitePanel />}
      {tab === "faq" && <FaqSitePanel />}
      {tab === "service" && <ServiceSitePanel />}
      {tab === "lists" && <ListsSitePanel />}
      {tab === "records" && <RecordsSitePanel />}
      {tab === "milestones" && <MilestonesSitePanel />}
      {tab === "compete" && <CompeteSitePanel />}
      {tab === "pathways" && <PathwaysSitePanel />}
      {tab === "posts" && <PostsPanel />}
      {tab === "gallery" && <GalleryPanel />}
      {tab === "program" && <ProgramPanel />}
      {tab === "points" && <PointsPanel />}
    </section>
  )
}

function PostsPanel() {
  const [posts, setPosts] = useState<PostRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<"list" | "create" | "edit">("list")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PostForm>(emptyPost)
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function reload() {
    setLoading(true)
    setError(null)
    try {
      setPosts(await fetchAllPostsForAdmin())
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load posts.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void reload()
  }, [])

  async function onSave(e: FormEvent) {
    e.preventDefault()
    const supabase = getSupabase()
    if (!supabase) return
    const title = form.title.trim()
    const slug = (form.slug.trim() || slugifyTitle(title)).toLowerCase()
    if (!title || !slug) {
      setMessage("Title and slug are required.")
      return
    }
    setSaving(true)
    setMessage(null)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const payload = {
      title,
      slug,
      excerpt: form.excerpt.trim(),
      body: form.body,
      author_name: form.author_name.trim() || "Lebanon Trail FCCLA",
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    }
    try {
      if (mode === "edit" && editingId) {
        const existing = posts.find((p) => p.id === editingId)
        await updatePost(editingId, {
          ...payload,
          published_at: form.published
            ? existing?.published_at ?? new Date().toISOString()
            : null,
        })
        setMessage("Post updated.")
      } else {
        await createPost({ ...payload, created_by: user?.id ?? null })
        setMessage("Post created.")
      }
      setMode("list")
      setEditingId(null)
      setForm(emptyPost)
      await reload()
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Could not save post.")
    } finally {
      setSaving(false)
    }
  }

  if (mode !== "list") {
    return (
      <form className="blog-editor" onSubmit={onSave}>
        <h2>{mode === "edit" ? "Edit post" : "New post"}</h2>
        <label>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => {
              const title = e.target.value
              setForm((f) => ({
                ...f,
                title,
                slug: slugTouched ? f.slug : slugifyTitle(title),
              }))
            }}
          />
        </label>
        <label>
          Slug
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true)
              setForm((f) => ({ ...f, slug: e.target.value }))
            }}
          />
        </label>
        <label>
          Author
          <input
            value={form.author_name}
            onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
          />
        </label>
        <label>
          Excerpt
          <textarea
            rows={3}
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          />
        </label>
        <label>
          Body
          <textarea
            rows={12}
            required
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          />
        </label>
        <label className="blog-check">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Published
        </label>
        {message && <p className="blog-admin-message">{message}</p>}
        <div className="blog-admin-row-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setMode("list")
              setForm(emptyPost)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div>
      <div className="blog-admin-bar">
        <h2>Blog posts</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setMode("create")
            setForm(emptyPost)
            setSlugTouched(false)
            setMessage(null)
          }}
        >
          New post
        </button>
      </div>
      {loading && <p className="blog-loading">Loading…</p>}
      {error && <p className="blog-form-error">{error}</p>}
      {message && <p className="blog-admin-message">{message}</p>}
      <div className="blog-admin-table">
        {posts.map((post) => (
          <article key={post.id} className="blog-admin-row">
            <div>
              <p className="blog-admin-status">
                {post.published ? "Published" : "Draft"} ·{" "}
                {formatPostDate(post.published_at ?? post.updated_at)}
              </p>
              <h3>{post.title}</h3>
              <p className="blog-admin-slug">/{post.slug}</p>
            </div>
            <div className="blog-admin-row-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setMode("edit")
                  setEditingId(post.id)
                  setForm({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    body: post.body,
                    author_name: post.author_name,
                    published: post.published,
                  })
                  setSlugTouched(true)
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  if (!window.confirm("Delete this post?")) return
                  void deletePost(post.id).then(reload)
                }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function GalleryPanel() {
  const [images, setImages] = useState<GalleryImageRow[]>([])
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function reload() {
    try {
      setImages(await fetchGalleryImages())
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Could not load gallery.")
    }
  }

  useEffect(() => {
    void reload()
  }, [])

  async function onUpload(e: FormEvent) {
    e.preventDefault()
    if (!file) {
      setMessage("Choose a photo first.")
      return
    }
    setBusy(true)
    setMessage(null)
    try {
      await uploadGalleryImage(file, title, caption)
      setTitle("")
      setCaption("")
      setFile(null)
      setMessage("Photo uploaded.")
      await reload()
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h2>Gallery uploads</h2>
      <form className="blog-editor" onSubmit={onUpload}>
        <label>
          Photo
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Caption
          <input value={caption} onChange={(e) => setCaption(e.target.value)} />
        </label>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Uploading…" : "Upload photo"}
        </button>
      </form>
      {message && <p className="blog-admin-message">{message}</p>}
      <div className="gallery-admin-grid">
        {images.map((image) => (
          <article key={image.id} className="gallery-admin-card">
            <img src={image.public_url} alt={image.title} />
            <strong>{image.title || "Untitled"}</strong>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (!window.confirm("Delete this photo?")) return
                void deleteGalleryImage(image).then(reload)
              }}
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

function ProgramPanel() {
  const [items, setItems] = useState<ProgramItemRow[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [status, setStatus] = useState<ProgramItemRow["status"]>("planned")
  const [message, setMessage] = useState<string | null>(null)

  async function reload() {
    try {
      setItems(await fetchProgramItems())
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Could not load roadmap.")
    }
  }

  useEffect(() => {
    void reload()
  }, [])

  async function onCreate(e: FormEvent) {
    e.preventDefault()
    const supabase = getSupabase()
    if (!supabase) return
    const {
      data: { user },
    } = await supabase.auth.getUser()
    try {
      await createProgramItem({
        title: title.trim(),
        description: description.trim(),
        timeframe: timeframe.trim(),
        status,
        sort_order: items.length,
        created_by: user?.id ?? null,
      })
      setTitle("")
      setDescription("")
      setTimeframe("")
      setStatus("planned")
      setMessage("Item added.")
      await reload()
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Could not add item.")
    }
  }

  return (
    <div>
      <h2>Program of Work</h2>
      <form className="blog-editor" onSubmit={onCreate}>
        <label>
          Title
          <input required value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Timeframe
          <input
            placeholder="Fall 2026"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProgramItemRow["status"])}
          >
            <option value="planned">Planned</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          Add to roadmap
        </button>
      </form>
      {message && <p className="blog-admin-message">{message}</p>}
      <div className="blog-admin-table">
        {items.map((item) => (
          <article key={item.id} className="blog-admin-row">
            <div>
              <p className="blog-admin-status">
                {item.status} · {item.timeframe || "No date"}
              </p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="blog-admin-row-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  const next =
                    item.status === "planned"
                      ? "in_progress"
                      : item.status === "in_progress"
                        ? "done"
                        : "planned"
                  void updateProgramItem(item.id, { status: next }).then(reload)
                }}
              >
                Advance status
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  if (!window.confirm("Delete this item?")) return
                  void deleteProgramItem(item.id).then(reload)
                }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function PointsPanel() {
  const [claims, setClaims] = useState<Awaited<ReturnType<typeof fetchAllClaimsForAdmin>>>([])
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof fetchMemberPointSummary>>>([])
  const [message, setMessage] = useState<string | null>(null)
  const [filter, setFilter] = useState<"pending" | "all">("pending")

  async function reload() {
    try {
      const [allClaims, memberSummary] = await Promise.all([
        fetchAllClaimsForAdmin(),
        fetchMemberPointSummary(),
      ])
      setClaims(allClaims)
      setSummary(memberSummary)
      setMessage(null)
    } catch (err: unknown) {
      setMessage(formatPointsError(err))
    }
  }

  useEffect(() => {
    void reload()
  }, [])

  async function onReview(id: string, status: "approved" | "denied") {
    const supabase = getSupabase()
    const {
      data: { user },
    } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
    try {
      await reviewPointClaim(id, status, user?.id ?? null)
      setMessage(status === "approved" ? "Claim approved." : "Claim denied.")
      await reload()
    } catch (err: unknown) {
      setMessage(formatPointsError(err))
    }
  }

  const visible = filter === "pending" ? claims.filter((c) => c.status === "pending") : claims

  return (
    <div>
      <div className="blog-admin-bar">
        <h2>Member points</h2>
        <div className="blog-admin-row-actions">
          <button
            type="button"
            className={`btn ${filter === "pending" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            type="button"
            className={`btn ${filter === "all" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter("all")}
          >
            All claims
          </button>
        </div>
      </div>
      <p className="portal-help">
        Members need {POINTS_TO_COMPETE}+ approved points to compete and attend State Fair. Approve
        only activities they actually completed. Custom claims should match chapter standards;
        shelter visits need a supervisor signature or confirmation email.
      </p>
      {message && <p className="blog-admin-message">{message}</p>}

      <div className="portal-admin-summary">
        {summary.map((row) => (
          <article key={row.member_name} className="portal-admin-member">
            <strong>{row.member_name}</strong>
            <span>
              {row.approved} approved
              {row.pending > 0 ? ` · ${row.pending} pending` : ""}
            </span>
            <em>{row.approved >= POINTS_TO_COMPETE ? "Eligible" : "Building points"}</em>
          </article>
        ))}
        {summary.length === 0 && <p className="portal-help">No member claims yet.</p>}
      </div>

      <div className="blog-admin-table">
        {visible.map((claim) => (
          <article key={claim.id} className="blog-admin-row">
            <div>
              <p className="blog-admin-status">
                {claim.status} · +{claim.points} pts · {formatPostDate(claim.created_at)}
              </p>
              <h3>
                {claim.member_name} · {claim.activity_label}
                {claim.activity_key === "custom" ? " (custom)" : ""}
              </h3>
              {claim.note && <p>{claim.note}</p>}
            </div>
            {claim.status === "pending" && (
              <div className="blog-admin-row-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => void onReview(claim.id, "approved")}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => void onReview(claim.id, "denied")}
                >
                  Deny
                </button>
              </div>
            )}
          </article>
        ))}
        {visible.length === 0 && (
          <p className="portal-help">
            {filter === "pending" ? "No pending claims right now." : "No claims yet."}
          </p>
        )}
      </div>
    </div>
  )
}
