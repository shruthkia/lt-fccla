import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"
import { isSupabaseConfigured } from "../lib/supabase"

export function BlogSetupNotice({
  detail,
  title = "This section is not available right now",
}: {
  detail?: string
  title?: string
}) {
  return (
    <div className="blog-notice" role="status">
      <p className="eyebrow">Temporarily unavailable</p>
      <h2>{title}</h2>
      <p>{detail ?? "Please check back soon."}</p>
    </div>
  )
}

export function BlogEmptyState() {
  return (
    <div className="blog-empty">
      <p className="eyebrow">Chapter journal</p>
      <h2>No published posts yet</h2>
      <p>
        When officers share updates, competition results, or service stories, they will appear here.
        Check back soon, or open the calendar for upcoming chapter moments.
      </p>
      <div className="blog-empty-actions">
        <Link to="/calendar" className="btn btn-primary">
          Open calendar
        </Link>
        <Link to="/about" className="btn btn-ghost">
          About the chapter
        </Link>
      </div>
    </div>
  )
}

export function BlogConfiguredGate({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <section className="section">
        <Reveal>
          <BlogSetupNotice />
        </Reveal>
      </section>
    )
  }
  return <>{children}</>
}
