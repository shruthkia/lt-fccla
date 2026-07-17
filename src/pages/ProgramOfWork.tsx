import { useEffect, useState } from "react"
import { BlogConfiguredGate, BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import type { ProgramItemRow } from "../lib/database.types"
import { fetchProgramItems } from "../lib/program"
import { isSupabaseConfigured } from "../lib/supabase"

const statusLabel: Record<ProgramItemRow["status"], string> = {
  planned: "Planned",
  in_progress: "In progress",
  done: "Done",
}

export function ProgramOfWork() {
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Year plan</p>
          <h1>
            Program
            <br />
            <span className="text-red">of Work.</span>
          </h1>
          <p className="page-lede">
            Our chapter roadmap for the year: leadership, service, competition, and campus presence.
          </p>
        </Reveal>
      </header>

      <BlogConfiguredGate>
        <ProgramTimeline />
      </BlogConfiguredGate>
    </>
  )
}

function ProgramTimeline() {
  const [items, setItems] = useState<ProgramItemRow[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    void fetchProgramItems()
      .then((rows) => {
        if (!cancelled) {
          setItems(rows)
          setError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setItems([])
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
            title="Program of Work is not available right now"
            detail="Could not load the roadmap. Please try again later."
          />
        </Reveal>
      )}

      {!error && items === null && <p className="blog-loading">Loading roadmap…</p>}

      {!error && items && items.length === 0 && (
        <Reveal>
          <div className="blog-empty">
            <p className="eyebrow">Roadmap</p>
            <h2>No items yet</h2>
            <p>Officers and advisors will add this year’s plan here.</p>
          </div>
        </Reveal>
      )}

      {!error && items && items.length > 0 && (
        <ol className="pow-timeline">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <li className={`pow-item status-${item.status}`}>
                <span className="pow-status">{statusLabel[item.status]}</span>
                <div>
                  {item.timeframe && <p className="pow-time">{item.timeframe}</p>}
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      )}
    </section>
  )
}
