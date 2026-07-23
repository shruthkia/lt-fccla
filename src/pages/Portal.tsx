import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import {
  POINTS_TO_COMPETE,
  isEligibleForCompete,
  sumApprovedPoints,
  type PointActivity,
  type PointClaim,
} from "../data/points"
import { fetchClaimsByMember, fetchPointActivities, submitPointClaims } from "../lib/points"
import { isSupabaseConfigured } from "../lib/supabase"

const NAME_KEY = "lt-fccla-portal-name"

export function Portal() {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) ?? "")
  const [activities, setActivities] = useState<PointActivity[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [claims, setClaims] = useState<PointClaim[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lookedUp, setLookedUp] = useState(false)

  useEffect(() => {
    let cancelled = false
    void fetchPointActivities()
      .then((rows) => {
        if (!cancelled) setActivities(rows)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const approved = sumApprovedPoints(claims)
  const pending = claims
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.points, 0)
  const eligible = isEligibleForCompete(approved)

  async function lookupClaims(memberName: string) {
    setError(null)
    setMessage(null)
    try {
      const rows = await fetchClaimsByMember(memberName)
      setClaims(rows)
      setLookedUp(true)
    } catch (err: unknown) {
      setClaims([])
      setLookedUp(true)
      setError(err instanceof Error ? err.message : "Could not load points.")
    }
  }

  async function onLookup(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError("Type your name to check points.")
      return
    }
    localStorage.setItem(NAME_KEY, trimmed)
    setBusy(true)
    await lookupClaims(trimmed)
    setBusy(false)
  }

  function toggleActivity(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      await submitPointClaims({
        memberName: name,
        activityIds: selected,
        note,
        activities,
      })
      localStorage.setItem(NAME_KEY, name.trim())
      setSelected([])
      setNote("")
      setMessage("Submitted for officer/advisor approval. Points count after they approve.")
      await lookupClaims(name)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not submit.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Member portal</p>
          <h1>
            Points
            <br />
            <span className="text-red">tracker.</span>
          </h1>
          <p className="page-lede">
            Type your name, check the activities you completed, and submit for officer approval.
            You need at least {POINTS_TO_COMPETE} approved points to compete and to go to the State
            Fair.
          </p>
        </Reveal>
      </header>

      <section className="section portal-section">
        {!isSupabaseConfigured && (
          <Reveal>
            <div className="blog-notice">
              <p className="eyebrow">Setup needed</p>
              <h2>Portal submissions need Supabase</h2>
              <p>
                Officers can connect the project and run <code>supabase/schema-points.sql</code>.
                Until then, you can still review the activity list and points rules below.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal>
          <form className="portal-lookup" onSubmit={onLookup}>
            <label>
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last name"
                autoComplete="name"
                required
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? "Checking…" : "Check my points"}
            </button>
          </form>
        </Reveal>

        {lookedUp && (
          <Reveal>
            <div className={`portal-status ${eligible ? "is-eligible" : ""}`}>
              <div>
                <p className="eyebrow">Approved points</p>
                <strong className="portal-score">{approved}</strong>
                <span> / {POINTS_TO_COMPETE} needed</span>
              </div>
              <div>
                <p className="eyebrow">Pending review</p>
                <strong>{pending}</strong>
              </div>
              <div>
                <p className="eyebrow">Compete & State Fair</p>
                <strong>{eligible ? "Eligible" : "Not yet"}</strong>
                <p className="portal-status-note">
                  {eligible
                    ? "You have enough approved points for competing and State Fair."
                    : `Keep logging Adopurr and chapter work until you reach ${POINTS_TO_COMPETE}.`}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="portal-grid">
          <Reveal>
            <form className="portal-claim-form" onSubmit={onSubmit}>
              <p className="eyebrow">Log activity</p>
              <h2>What did you complete?</h2>
              <p className="portal-help">
                Only check activities you actually did. Officers and advisors approve before points
                count.
              </p>

              {loading && <p className="blog-loading">Loading activities…</p>}

              <ul className="portal-activity-list">
                {activities.map((activity) => {
                  const checked = selected.includes(activity.id)
                  return (
                    <li key={activity.id}>
                      <label className={`portal-activity ${checked ? "is-checked" : ""}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleActivity(activity.id)}
                        />
                        <span>
                          <strong>
                            {activity.label}{" "}
                            <em>+{activity.points} pts</em>
                          </strong>
                          <small>{activity.description}</small>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>

              <label>
                Optional note for officers
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Date, shelter name, or what you helped with"
                />
              </label>

              {error && <p className="blog-form-error">{error}</p>}
              {message && <p className="blog-admin-message">{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={busy || selected.length === 0}>
                {busy ? "Submitting…" : "Submit for approval"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={80}>
            <div className="portal-history">
              <p className="eyebrow">Your history</p>
              <h2>Claims & status</h2>
              {!lookedUp && (
                <p className="portal-help">Check your name above to load approved and pending claims.</p>
              )}
              {lookedUp && claims.length === 0 && (
                <p className="portal-help">No claims yet for this name. Submit an activity to start.</p>
              )}
              <ul className="portal-claim-list">
                {claims.map((claim) => (
                  <li key={claim.id} className={`status-${claim.status}`}>
                    <div>
                      <strong>{claim.activity_label}</strong>
                      <span>+{claim.points} pts · {claim.status}</span>
                      {claim.note && <p>{claim.note}</p>}
                    </div>
                    <time>{new Date(claim.created_at).toLocaleDateString()}</time>
                  </li>
                ))}
              </ul>
              <div className="inline-cta portal-cta">
                <p>See the full Adopurr flow, shelters, and year plan.</p>
                <Link to="/adopurr" className="btn btn-ghost">
                  Open Adopurr
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
