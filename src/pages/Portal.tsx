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
import { fetchClaimsByMember, fetchPointActivities, formatPointsError, submitPointClaims } from "../lib/points"
import { isSupabaseConfigured } from "../lib/supabase"

const NAME_KEY = "lt-fccla-portal-name"

export function Portal() {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) ?? "")
  const [activities, setActivities] = useState<PointActivity[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [customLabel, setCustomLabel] = useState("")
  const [customPoints, setCustomPoints] = useState("5")
  const [customNote, setCustomNote] = useState("")
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
  const hasCustom = customLabel.trim().length > 0
  const canSubmit = selected.length > 0 || hasCustom

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
      setError(formatPointsError(err))
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
      const result = await submitPointClaims({
        memberName: name,
        activityIds: selected,
        note,
        activities,
        custom: hasCustom
          ? {
              label: customLabel,
              points: Number(customPoints),
              note: customNote,
            }
          : null,
      })
      localStorage.setItem(NAME_KEY, name.trim())
      setSelected([])
      setNote("")
      setCustomLabel("")
      setCustomPoints("5")
      setCustomNote("")
      setMessage(
        result.notice ??
          "Submitted for officer/advisor approval. Custom activities are reviewed against chapter standards before points count.",
      )
      await lookupClaims(name)
    } catch (err: unknown) {
      setError(formatPointsError(err))
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
            Type your name, check the activities you completed, or add a custom activity for review.
            Shelter shifts need a supervisor signature or confirmation email. You need at least{" "}
            {POINTS_TO_COMPETE} approved points to compete and to go to the State Fair.
          </p>
        </Reveal>
      </header>

      <section className="section portal-section">
        {!isSupabaseConfigured && (
          <Reveal>
            <div className="blog-notice">
              <p className="eyebrow">Heads up</p>
              <h2>Submissions save on this device for now</h2>
              <p>
                You can still log activities. For chapter-wide officer approval, an advisor should
                connect Supabase and run <code>supabase/schema-points.sql</code>.
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
                Check listed activities you actually did, or add something custom below. Officers
                and advisors approve before points count. Shelter work needs a signed form or
                confirmation email.
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

              <div className="portal-custom">
                <p className="eyebrow">Not on the list?</p>
                <h3>Add a custom activity</h3>
                <p className="portal-help">
                  Describe what you did and request points. Officers approve only if it matches
                  chapter standards.
                </p>
                <label>
                  Custom activity name
                  <input
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="e.g. Foster transport for a local rescue"
                  />
                </label>
                <label>
                  Points requested (1-25)
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={customPoints}
                    onChange={(e) => setCustomPoints(e.target.value)}
                  />
                </label>
                <label>
                  Why it should count / proof notes
                  <textarea
                    rows={3}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Supervisor name, email confirmation, date, and what you did"
                  />
                </label>
              </div>

              <label>
                Shared note for officers (optional)
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Date, shelter name, or extra context for checked activities"
                />
              </label>

              {error && <p className="blog-form-error">{error}</p>}
              {message && <p className="blog-admin-message">{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={busy || !canSubmit}>
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
                      <strong>
                        {claim.activity_label}
                        {claim.activity_key === "custom" ? " · custom" : ""}
                      </strong>
                      <span>
                        +{claim.points} pts · {claim.status}
                      </span>
                      {claim.note && <p>{claim.note}</p>}
                    </div>
                    <time>{new Date(claim.created_at).toLocaleDateString()}</time>
                  </li>
                ))}
              </ul>
              <div className="inline-cta portal-cta">
                <p>See the full Adopurr flow and year plan.</p>
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
