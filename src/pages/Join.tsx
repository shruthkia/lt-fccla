import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Join() {
  const { chapter, eligibleCourses } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Membership</p>
          <h1>
            Join
            <br />
            <span className="text-red">the Trail.</span>
          </h1>
          <p className="page-lede">{chapter.joinCta}</p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Eligibility</p>
            <h2>Who can join</h2>
            <p className="section-note">{chapter.eligibilityNote}</p>
          </div>
        </Reveal>
        <div className="course-grid">
          {eligibleCourses.map((course) => (
            <div key={course} className="course-pill">
              {course}
            </div>
          ))}
        </div>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Application</p>
            <h2>Membership form</h2>
            <p className="section-note">
              Complete the form below to start your membership. Then reach out to an officer or
              advisor with any questions about dues and meetings.
            </p>
          </div>
          <div className="join-actions">
            <a
              href={chapter.joinFormUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Open join form
            </a>
            <Link to="/officers" className="btn btn-ghost">
              Meet the team
            </Link>
          </div>
          <div className="join-embed">
            <iframe
              title="Lebanon Trail FCCLA membership form"
              src={`${chapter.joinFormUrl}?embedded=true`}
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
