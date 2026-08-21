import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BlogSetupNotice } from "../components/BlogShared"
import { Reveal } from "../components/Reveal"
import { yearPlanEvents } from "../data/yearPlan"
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
            Events on the Trail for 2026-27: collaborations, Adopurr service, socials, and chapter
            travel.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Events on the Trail</p>
            <h2>This year&apos;s roadmap.</h2>
            <p className="section-note">
              Built-in chapter plan for collaborations, Adopurr, socials, and State Fair. Officers
              can add more items below when the admin workspace is connected.
            </p>
          </div>
        </Reveal>
        <ol className="pow-timeline">
          {yearPlanEvents.map((item, i) => (
            <Reveal key={item.title} delay={i * 50} as="li" className={`pow-item status-${item.status}`}>
              <span className="pow-status">{statusLabel[item.status]}</span>
              <div>
                {item.timeframe && <p className="pow-time">{item.timeframe}</p>}
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="inline-cta">
            <p>Adopurr is the core service project for this year. See the full flow and shelter guidance there.</p>
            <Link to="/adopurr" className="btn btn-primary">
              Open Adopurr
            </Link>
          </div>
        </Reveal>
      </section>

      <OfficerProgramExtras />
    </>
  )
}

function OfficerProgramExtras() {
  const [items, setItems] = useState<ProgramItemRow[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setItems([])
      return
    }
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

  if (!isSupabaseConfigured) return null

  if (error) {
    return (
      <section className="section">
        <Reveal>
          <BlogSetupNotice
            title="Extra roadmap items could not load"
            detail="The Events on the Trail plan above is still available. Try again later for officer-added items."
          />
        </Reveal>
      </section>
    )
  }

  if (items === null) {
    return (
      <section className="section">
        <p className="blog-loading">Loading officer-added items…</p>
      </section>
    )
  }

  if (items.length === 0) return null

  return (
    <section className="section">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Officer updates</p>
          <h2>Added from the workspace.</h2>
        </div>
      </Reveal>
      <ol className="pow-timeline">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 50} as="li" className={`pow-item status-${item.status}`}>
            <span className="pow-status">{statusLabel[item.status]}</span>
            <div>
              {item.timeframe && <p className="pow-time">{item.timeframe}</p>}
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
