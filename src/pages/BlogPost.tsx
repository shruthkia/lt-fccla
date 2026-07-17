import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BlogConfiguredGate, BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import { fetchPublishedPostBySlug, type PostRow } from "../lib/blog"
import { formatPostDate, renderSimpleMarkdown } from "../lib/markdown"
import { isSupabaseConfigured } from "../lib/supabase"

export function BlogPost() {
  return (
    <BlogConfiguredGate>
      <BlogPostBody />
    </BlogConfiguredGate>
  )
}

function BlogPostBody() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<PostRow | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !slug) return
    let cancelled = false

    void fetchPublishedPostBySlug(slug)
      .then((row) => {
        if (!cancelled) {
          setPost(row)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load this post.")
          setPost(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (error) {
    return (
      <section className="section">
        <Reveal>
          <BlogSetupNotice detail={error} />
          <p className="blog-back">
            <Link to="/blog" className="text-link">
              Back to blog
            </Link>
          </p>
        </Reveal>
      </section>
    )
  }

  if (post === undefined) {
    return (
      <section className="section">
        <Reveal>
          <p className="blog-loading">Loading post…</p>
        </Reveal>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="section">
        <Reveal>
          <div className="blog-empty">
            <p className="eyebrow">Not found</p>
            <h2>This post is not available</h2>
            <p>It may be unpublished, removed, or the link may be incorrect.</p>
            <div className="blog-empty-actions">
              <Link to="/blog" className="btn btn-primary">
                Back to blog
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    )
  }

  const html = renderSimpleMarkdown(post.body)

  return (
    <>
      <header className="page-hero blog-post-hero">
        <Reveal>
          <p className="eyebrow">
            <Link to="/blog" className="text-link">
              Blog
            </Link>
          </p>
          <h1>{post.title}</h1>
          <p className="blog-byline">
            <time dateTime={post.published_at ?? post.created_at}>
              {formatPostDate(post.published_at ?? post.created_at)}
            </time>
            <span aria-hidden="true"> · </span>
            <span>{post.author_name}</span>
          </p>
          {post.excerpt && <p className="page-lede">{post.excerpt}</p>}
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <article
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Reveal>
        <Reveal>
          <p className="blog-back">
            <Link to="/blog" className="text-link">
              Back to all posts
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  )
}
