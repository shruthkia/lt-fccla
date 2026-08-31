import { useEffect, useState, type FormEvent } from "react"
import { defaultSiteBundle, type SiteBundle } from "../data/siteBundle"
import type { Person, ServiceEvent } from "../data/chapter"
import { useSiteContent } from "../hooks/useSiteContent"

type Message = string | null

function useSectionState<K extends keyof SiteBundle>(key: K) {
  const { bundle, saveSection } = useSiteContent()
  const [draft, setDraft] = useState(bundle[key])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<Message>(null)

  useEffect(() => {
    setDraft(bundle[key])
  }, [bundle, key])

  async function save() {
    setBusy(true)
    setMessage(null)
    try {
      await saveSection(key, draft)
      setMessage("Saved. Public pages will show the update.")
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Could not save.")
    } finally {
      setBusy(false)
    }
  }

  function resetDefaults() {
    setDraft(defaultSiteBundle[key])
    setMessage("Loaded built-in defaults. Click Save to publish them.")
  }

  return { draft, setDraft, busy, message, setMessage, save, resetDefaults }
}

function SectionActions({
  busy,
  message,
  onSave,
  onReset,
}: {
  busy: boolean
  message: Message
  onSave: () => void
  onReset: () => void
}) {
  return (
    <div className="site-admin-actions">
      <button type="button" className="btn btn-primary" disabled={busy} onClick={onSave}>
        {busy ? "Saving…" : "Save section"}
      </button>
      <button type="button" className="btn btn-ghost" onClick={onReset}>
        Load defaults
      </button>
      {message && <p className="blog-admin-message">{message}</p>}
    </div>
  )
}

export function ChapterSitePanel() {
  const { draft, setDraft, busy, message, save, resetDefaults } = useSectionState("chapter")

  function setField<K extends keyof SiteBundle["chapter"]>(key: K, value: SiteBundle["chapter"][K]) {
    setDraft({ ...draft, [key]: value })
  }

  return (
    <div className="site-admin-section">
      <h2>Chapter identity & join</h2>
      <p className="section-note">
        Controls Nav, Footer, Home, About, Join, and Calendar embeds.
      </p>
      <div className="blog-editor">
        {(
          [
            ["name", "Chapter name"],
            ["school", "School"],
            ["city", "City"],
            ["tagline", "Tagline"],
            ["motto", "Motto"],
            ["flower", "Flower"],
            ["mascot", "Mascot"],
            ["colors", "Colors"],
            ["contactEmail", "Contact email"],
            ["joinFormUrl", "Join form URL"],
          ] as const
        ).map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              value={String(draft[key] ?? "")}
              onChange={(e) => setField(key, e.target.value as never)}
            />
          </label>
        ))}
        <label>
          Established year
          <input
            type="number"
            value={draft.established}
            onChange={(e) => setField("established", Number(e.target.value) || draft.established)}
          />
        </label>
        <label>
          About blurb
          <textarea
            rows={4}
            value={draft.about}
            onChange={(e) => setField("about", e.target.value)}
          />
        </label>
        <label>
          Mission
          <textarea
            rows={4}
            value={draft.mission}
            onChange={(e) => setField("mission", e.target.value)}
          />
        </label>
        <label>
          Join CTA
          <textarea
            rows={3}
            value={draft.joinCta}
            onChange={(e) => setField("joinCta", e.target.value)}
          />
        </label>
        <label>
          Eligibility note
          <textarea
            rows={3}
            value={draft.eligibilityNote}
            onChange={(e) => setField("eligibilityNote", e.target.value)}
          />
        </label>
        <label>
          Dues amount (shown on Join)
          <input
            value={draft.membership.duesAmount}
            onChange={(e) =>
              setField("membership", { ...draft.membership, duesAmount: e.target.value })
            }
          />
        </label>
        <label>
          Dues details
          <textarea
            rows={3}
            value={draft.membership.duesDetails}
            onChange={(e) =>
              setField("membership", { ...draft.membership, duesDetails: e.target.value })
            }
          />
        </label>
        <label>
          How to pay
          <textarea
            rows={3}
            value={draft.membership.paymentHow}
            onChange={(e) =>
              setField("membership", { ...draft.membership, paymentHow: e.target.value })
            }
          />
        </label>
        <label>
          Where to pay / turn in
          <textarea
            rows={3}
            value={draft.membership.paymentWhere}
            onChange={(e) =>
              setField("membership", { ...draft.membership, paymentWhere: e.target.value })
            }
          />
        </label>
        <label>
          Payment link
          <input
            value={draft.membership.paymentUrl ?? ""}
            placeholder="https://www.onlineschoolfees.com/"
            onChange={(e) =>
              setField("membership", { ...draft.membership, paymentUrl: e.target.value })
            }
          />
        </label>
        <label>
          Online form instructions
          <textarea
            rows={3}
            value={draft.membership.formOnline}
            onChange={(e) =>
              setField("membership", { ...draft.membership, formOnline: e.target.value })
            }
          />
        </label>
        <label>
          Paper form return instructions
          <textarea
            rows={3}
            value={draft.membership.formReturn}
            onChange={(e) =>
              setField("membership", { ...draft.membership, formReturn: e.target.value })
            }
          />
        </label>
        <label>
          Member expectations (one per line)
          <textarea
            rows={5}
            value={draft.membership.expectations.join("\n")}
            onChange={(e) =>
              setField("membership", {
                ...draft.membership,
                expectations: e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
        <label>
          Join steps (one per line)
          <textarea
            rows={5}
            value={draft.membership.steps.join("\n")}
            onChange={(e) =>
              setField("membership", {
                ...draft.membership,
                steps: e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
        <label>
          Creed (one line per sentence)
          <textarea
            rows={8}
            value={draft.creed.join("\n")}
            onChange={(e) =>
              setField(
                "creed",
                e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label>
          Calendar embed URL
          <input
            value={draft.calendar.embedSrc}
            onChange={(e) =>
              setField("calendar", { ...draft.calendar, embedSrc: e.target.value })
            }
          />
        </label>
        <label>
          Calendar public URL
          <input
            value={draft.calendar.publicUrl}
            onChange={(e) =>
              setField("calendar", { ...draft.calendar, publicUrl: e.target.value })
            }
          />
        </label>
        <label>
          Instagram URL
          <input
            value={draft.social.instagram}
            onChange={(e) =>
              setField("social", { ...draft.social, instagram: e.target.value })
            }
          />
        </label>
        <label>
          Twitter / X URL
          <input
            value={draft.social.twitter}
            onChange={(e) => setField("social", { ...draft.social, twitter: e.target.value })}
          />
        </label>
      </div>
      <SectionActions busy={busy} message={message} onSave={() => void save()} onReset={resetDefaults} />
    </div>
  )
}

function emptyPerson(): Person {
  return { name: "", role: "", bio: "", focus: "", email: "", photo: "" }
}

function PersonEditor({
  title,
  people,
  onChange,
}: {
  title: string
  people: Person[]
  onChange: (next: Person[]) => void
}) {
  return (
    <div className="site-admin-list">
      <h3>{title}</h3>
      {people.map((person, index) => (
        <article key={`${title}-${index}`} className="site-admin-card">
          <div className="blog-editor">
            <label>
              Name
              <input
                value={person.name}
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, name: e.target.value }
                  onChange(next)
                }}
              />
            </label>
            <label>
              Role
              <input
                value={person.role}
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, role: e.target.value }
                  onChange(next)
                }}
              />
            </label>
            <label>
              Focus
              <input
                value={person.focus ?? ""}
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, focus: e.target.value }
                  onChange(next)
                }}
              />
            </label>
            <label>
              Email
              <input
                value={person.email ?? ""}
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, email: e.target.value }
                  onChange(next)
                }}
              />
            </label>
            <label>
              Photo path or URL
              <input
                value={person.photo ?? ""}
                placeholder="/team/name.jpg"
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, photo: e.target.value }
                  onChange(next)
                }}
              />
              <span className="field-hint">
                Prefer a file in public/team, such as /team/shruthika-omkumar.jpg. A Google Drive
                share/view link is a web page, not an image file, so paste those only if needed.
              </span>
            </label>
            <label>
              Classroom
              <input
                value={person.classroom ?? ""}
                placeholder="MF A206"
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, classroom: e.target.value }
                  onChange(next)
                }}
              />
            </label>
            <label>
              Bio
              <textarea
                rows={3}
                value={person.bio}
                onChange={(e) => {
                  const next = [...people]
                  next[index] = { ...person, bio: e.target.value }
                  onChange(next)
                }}
              />
            </label>
          </div>
          <button
            type="button"
            className="btn btn-ghost blog-danger"
            onClick={() => onChange(people.filter((_, i) => i !== index))}
          >
            Remove
          </button>
        </article>
      ))}
      <button type="button" className="btn btn-ghost" onClick={() => onChange([...people, emptyPerson()])}>
        Add person
      </button>
    </div>
  )
}

export function TeamSitePanel() {
  const officers = useSectionState("officers")
  const advisors = useSectionState("advisors")

  async function saveBoth() {
    officers.setMessage(null)
    advisors.setMessage(null)
    try {
      await officers.save()
      await advisors.save()
      officers.setMessage("Team saved.")
    } catch (err: unknown) {
      officers.setMessage(err instanceof Error ? err.message : "Could not save team.")
    }
  }

  return (
    <div className="site-admin-section">
      <h2>Officers & advisors</h2>
      <PersonEditor title="Officers" people={officers.draft} onChange={officers.setDraft} />
      <PersonEditor title="Advisors" people={advisors.draft} onChange={advisors.setDraft} />
      <SectionActions
        busy={officers.busy || advisors.busy}
        message={officers.message ?? advisors.message}
        onSave={() => void saveBoth()}
        onReset={() => {
          officers.resetDefaults()
          advisors.resetDefaults()
        }}
      />
    </div>
  )
}

export function FaqSitePanel() {
  const { draft, setDraft, busy, message, save, resetDefaults } = useSectionState("faqs")

  return (
    <div className="site-admin-section">
      <h2>FAQ</h2>
      <div className="site-admin-list">
        {draft.map((item, index) => (
          <article key={index} className="site-admin-card">
            <div className="blog-editor">
              <label>
                Question
                <input
                  value={item.question}
                  onChange={(e) => {
                    const next = [...draft]
                    next[index] = { ...item, question: e.target.value }
                    setDraft(next)
                  }}
                />
              </label>
              <label>
                Answer
                <textarea
                  rows={4}
                  value={item.answer}
                  onChange={(e) => {
                    const next = [...draft]
                    next[index] = { ...item, answer: e.target.value }
                    setDraft(next)
                  }}
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-ghost blog-danger"
              onClick={() => setDraft(draft.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </article>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setDraft([...draft, { question: "", answer: "" }])}
        >
          Add FAQ
        </button>
      </div>
      <SectionActions busy={busy} message={message} onSave={() => void save()} onReset={resetDefaults} />
    </div>
  )
}

function emptyService(): ServiceEvent {
  return {
    title: "",
    date: "",
    status: "upcoming",
    description: "",
    impact: "",
    image: "",
    featured: false,
  }
}

export function ServiceSitePanel() {
  const core = useSectionState("coreServiceProject")
  const list = useSectionState("communityService")

  async function saveBoth() {
    try {
      await core.save()
      await list.save()
      core.setMessage("Service content saved.")
    } catch (err: unknown) {
      core.setMessage(err instanceof Error ? err.message : "Could not save.")
    }
  }

  return (
    <div className="site-admin-section">
      <h2>Community service</h2>
      <h3>Core project</h3>
      <div className="blog-editor">
        <label>
          Title
          <input
            value={core.draft.title}
            onChange={(e) => core.setDraft({ ...core.draft, title: e.target.value })}
          />
        </label>
        <label>
          Date label
          <input
            value={core.draft.date}
            onChange={(e) => core.setDraft({ ...core.draft, date: e.target.value })}
          />
        </label>
        <label>
          Image path
          <input
            value={core.draft.image ?? ""}
            onChange={(e) => core.setDraft({ ...core.draft, image: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            rows={4}
            value={core.draft.description}
            onChange={(e) => core.setDraft({ ...core.draft, description: e.target.value })}
          />
        </label>
        <label>
          Impact
          <input
            value={core.draft.impact ?? ""}
            onChange={(e) => core.setDraft({ ...core.draft, impact: e.target.value })}
          />
        </label>
      </div>

      <h3>Service events</h3>
      <div className="site-admin-list">
        {list.draft.map((event, index) => (
          <article key={index} className="site-admin-card">
            <div className="blog-editor">
              <label>
                Title
                <input
                  value={event.title}
                  onChange={(e) => {
                    const next = [...list.draft]
                    next[index] = { ...event, title: e.target.value }
                    list.setDraft(next)
                  }}
                />
              </label>
              <label>
                Date
                <input
                  value={event.date}
                  onChange={(e) => {
                    const next = [...list.draft]
                    next[index] = { ...event, date: e.target.value }
                    list.setDraft(next)
                  }}
                />
              </label>
              <label>
                Status
                <select
                  value={event.status}
                  onChange={(e) => {
                    const next = [...list.draft]
                    next[index] = {
                      ...event,
                      status: e.target.value as ServiceEvent["status"],
                    }
                    list.setDraft(next)
                  }}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="core">Core</option>
                </select>
              </label>
              <label>
                Description
                <textarea
                  rows={3}
                  value={event.description}
                  onChange={(e) => {
                    const next = [...list.draft]
                    next[index] = { ...event, description: e.target.value }
                    list.setDraft(next)
                  }}
                />
              </label>
              <label>
                Impact
                <input
                  value={event.impact ?? ""}
                  onChange={(e) => {
                    const next = [...list.draft]
                    next[index] = { ...event, impact: e.target.value }
                    list.setDraft(next)
                  }}
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-ghost blog-danger"
              onClick={() => list.setDraft(list.draft.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </article>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => list.setDraft([...list.draft, emptyService()])}
        >
          Add event
        </button>
      </div>
      <SectionActions
        busy={core.busy || list.busy}
        message={core.message ?? list.message}
        onSave={() => void saveBoth()}
        onReset={() => {
          core.resetDefaults()
          list.resetDefaults()
        }}
      />
    </div>
  )
}

export function ListsSitePanel() {
  const courses = useSectionState("eligibleCourses")
  const purposes = useSectionState("purposes")
  const details = useSectionState("importantDetails")

  async function saveAll() {
    try {
      await courses.save()
      await purposes.save()
      await details.save()
      courses.setMessage("About lists saved.")
    } catch (err: unknown) {
      courses.setMessage(err instanceof Error ? err.message : "Could not save.")
    }
  }

  return (
    <div className="site-admin-section">
      <h2>Courses, purposes & details</h2>
      <div className="blog-editor">
        <label>
          Eligible courses (one per line)
          <textarea
            rows={10}
            value={courses.draft.join("\n")}
            onChange={(e) =>
              courses.setDraft(
                e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label>
          FCCLA purposes (one per line)
          <textarea
            rows={10}
            value={purposes.draft.join("\n")}
            onChange={(e) =>
              purposes.setDraft(
                e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
      </div>
      <h3>Important details (Records page)</h3>
      <div className="site-admin-list">
        {details.draft.map((item, index) => (
          <article key={index} className="site-admin-card">
            <div className="blog-editor">
              <label>
                Label
                <input
                  value={item.label}
                  onChange={(e) => {
                    const next = [...details.draft]
                    next[index] = { ...item, label: e.target.value }
                    details.setDraft(next)
                  }}
                />
              </label>
              <label>
                Value
                <textarea
                  rows={3}
                  value={item.value}
                  onChange={(e) => {
                    const next = [...details.draft]
                    next[index] = { ...item, value: e.target.value }
                    details.setDraft(next)
                  }}
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-ghost blog-danger"
              onClick={() => details.setDraft(details.draft.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </article>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => details.setDraft([...details.draft, { label: "", value: "" }])}
        >
          Add detail
        </button>
      </div>
      <SectionActions
        busy={courses.busy || purposes.busy || details.busy}
        message={courses.message ?? purposes.message ?? details.message}
        onSave={() => void saveAll()}
        onReset={() => {
          courses.resetDefaults()
          purposes.resetDefaults()
          details.resetDefaults()
        }}
      />
    </div>
  )
}

function JsonSectionPanel<K extends keyof SiteBundle>({
  title,
  note,
  sectionKey,
}: {
  title: string
  note: string
  sectionKey: K
}) {
  const { bundle, saveSection } = useSiteContent()
  const [text, setText] = useState(() => JSON.stringify(bundle[sectionKey], null, 2))
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<Message>(null)

  useEffect(() => {
    setText(JSON.stringify(bundle[sectionKey], null, 2))
  }, [bundle, sectionKey])

  async function onSave(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      const parsed = JSON.parse(text) as SiteBundle[K]
      await saveSection(sectionKey, parsed)
      setMessage("Saved. Public pages will show the update.")
    } catch (err: unknown) {
      setMessage(
        err instanceof SyntaxError
          ? "JSON is invalid. Fix the formatting and try again."
          : err instanceof Error
            ? err.message
            : "Could not save.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="site-admin-section">
      <h2>{title}</h2>
      <p className="section-note">{note}</p>
      <form className="blog-editor" onSubmit={(e) => void onSave(e)}>
        <label>
          JSON
          <textarea
            className="site-admin-json"
            rows={22}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
        </label>
        <div className="site-admin-actions">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save section"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setText(JSON.stringify(defaultSiteBundle[sectionKey], null, 2))
              setMessage("Loaded built-in defaults. Click Save to publish them.")
            }}
          >
            Load defaults
          </button>
          {message && <p className="blog-admin-message">{message}</p>}
        </div>
      </form>
    </div>
  )
}

export function RecordsSitePanel() {
  return (
    <JsonSectionPanel
      title="Competition records"
      note="Edit memberResults as JSON (name, grade, year, results[]). The Records page builds from this automatically."
      sectionKey="memberResults"
    />
  )
}

export function MilestonesSitePanel() {
  return (
    <JsonSectionPanel
      title="Chapter milestones"
      note="Chapter-level rows on the Records board (Established, competitive comeback, etc.)."
      sectionKey="chapterMilestones"
    />
  )
}

export function CompeteSitePanel() {
  return (
    <JsonSectionPanel
      title="Competitive events"
      note="Edit competition tracks shown on the Compete page (STAR, Online STAR, FCSAs, Skill Demos)."
      sectionKey="competitionTracks"
    />
  )
}

export function PathwaysSitePanel() {
  return (
    <JsonSectionPanel
      title="FCS career pathways"
      note="About page pathway cards: area, courses[], jobs[]."
      sectionKey="fcsPathways"
    />
  )
}
