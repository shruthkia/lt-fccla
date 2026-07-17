import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BlogConfiguredGate, BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import { fetchGalleryImages } from "../lib/gallery"
import type { GalleryImageRow } from "../lib/database.types"
import { isSupabaseConfigured } from "../lib/supabase"

export function Gallery() {
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Chapter photos</p>
          <h1>
            Gallery
            <br />
            <span className="text-red">on the Trail.</span>
          </h1>
          <p className="page-lede">
            Moments from meetings, competitions, service, and Rosie energy around campus.
          </p>
        </Reveal>
      </header>

      <BlogConfiguredGate>
        <GalleryGrid />
      </BlogConfiguredGate>
    </>
  )
}

function GalleryGrid() {
  const [images, setImages] = useState<GalleryImageRow[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    void fetchGalleryImages()
      .then((rows) => {
        if (!cancelled) {
          setImages(rows)
          setError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setImages([])
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
          <BlogSetupNotice
            title="Gallery photos are not available right now"
            detail="Could not load the gallery. Please try again later."
          />
        </Reveal>
      )}

      {!error && images === null && <p className="blog-loading">Loading gallery…</p>}

      {!error && images && images.length === 0 && (
        <Reveal>
          <div className="blog-empty">
            <p className="eyebrow">Coming soon</p>
            <h2>No photos yet</h2>
            <p>Officers and advisors will add event photos here as the year unfolds.</p>
            <Link to="/calendar" className="btn btn-primary">
              Open calendar
            </Link>
          </div>
        </Reveal>
      )}

      {!error && images && images.length > 0 && (
        <div className="gallery-grid">
          {images.map((image, i) => (
            <Reveal key={image.id} delay={(i % 6) * 40}>
              <figure className="gallery-card">
                <img src={image.public_url} alt={image.title || "Chapter photo"} loading="lazy" />
                {(image.title || image.caption) && (
                  <figcaption>
                    {image.title && <strong>{image.title}</strong>}
                    {image.caption && <span>{image.caption}</span>}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
