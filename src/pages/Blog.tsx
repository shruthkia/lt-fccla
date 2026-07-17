import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BlogConfiguredGate, BlogEmptyState, BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import { fetchPublishedPosts, type PostRow } from "../lib/blog"
import { formatPostDate } from "../lib/markdown"
import { isSupabaseConfigured } from "../lib/supabase"

export function Blog() {
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Chapter updates</p>
          <h1>
            Trail FCCLA
            <br />
            <span className="text-red">Blog</span>
          </h1>
          <p className="page-lede">
            Stories from meetings, competitive events, community service, and life at Lebanon Trail
            FCCLA.
          </p>
        </Reveal>
      </header>

      <BlogConfiguredGate>
        <BlogList />
      </BlogConfiguredGate>
    </>
  )
}

function BlogList() {
  const [posts, setPosts] = useState<PostRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    void fetchPublishedPosts()
      .then((rows) => {
        if (!cancelled) {
          setPosts(rows)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Could not load posts."
          setError(message)
          setPosts([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section">
      {error && (
        <Reveal>
          <BlogSetupNotice detail="Could not load posts right now. Please try again later." />
        </Reveal>
      )}

      {!error && posts === null && (
        <Reveal>
          <p className="blog-loading">Loading posts…</p>
        </Reveal>
      )}

      {!error && posts && posts.length === 0 && (
        <Reveal>
          <BlogEmptyState />
        </Reveal>
      )}

      {!error && posts && posts.length > 0 && (
        <div className="blog-list">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <article className="blog-card">
                <div className="blog-card-meta">
                  <time dateTime={post.published_at ?? post.created_at}>
                    {formatPostDate(post.published_at ?? post.created_at)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.author_name}</span>
                </div>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
                <Link to={`/blog/${post.slug}`} className="text-link">
                  Read post
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
