import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Join() {
  const { chapter, eligibleCourses, advisors } = useSite()
  const { membership, classrooms } = chapter

  return (
    <div className="join-page">
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

      <section className="section" aria-labelledby="join-expectations-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Before you join</p>
            <h2 id="join-expectations-heading">What we expect</h2>
            <p className="section-note">
              FCCLA is more than a form. Members show up for meetings, service, and fundraising so the
              whole chapter can grow.
            </p>
          </div>
        </Reveal>
        <ul className="join-expect-list">
          {membership.expectations.map((item, i) => (
            <Reveal key={item} delay={i * 50} as="li">
              {item}
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section band-soft" aria-labelledby="join-steps-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">How to join</p>
            <h2 id="join-steps-heading">Four clear steps</h2>
          </div>
        </Reveal>
        <ol className="join-steps">
          {membership.steps.map((step, i) => (
            <Reveal key={step} delay={i * 60} as="li">
              <span className="join-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{step}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="join-dues-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Dues & payment</p>
            <h2 id="join-dues-heading">How much and how to pay</h2>
          </div>
        </Reveal>
        <div className="join-info-grid">
          <Reveal>
            <article className="join-info-card">
              <h3>Amount</h3>
              <p className="join-dues-amount">{membership.duesAmount}</p>
              <p>{membership.duesDetails}</p>
            </article>
          </Reveal>
          <Reveal delay={70}>
            <article className="join-info-card">
              <h3>How to pay</h3>
              <p>{membership.paymentHow}</p>
              <p>{membership.paymentWhere}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section band-soft" aria-labelledby="join-forms-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Forms</p>
            <h2 id="join-forms-heading">Complete and submit</h2>
            <div className="join-stack">
              <p className="section-note">{membership.formOnline}</p>
              <p className="section-note">{membership.formReturn}</p>
            </div>
          </div>
          <div className="join-actions">
            <a
              href={chapter.joinFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open membership form
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link to="/officers" className="btn btn-ghost">
              Meet advisors & officers
            </Link>
            <Link to="/calendar" className="btn btn-ghost">
              See meeting dates
            </Link>
          </div>
          <div className="join-embed">
            <iframe
              title="Lebanon Trail FCCLA membership Google Form"
              src={`${chapter.joinFormUrl}?embedded=true`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="join-embed-fallback">
            If the form does not load here,{" "}
            <a href={chapter.joinFormUrl} target="_blank" rel="noopener noreferrer">
              open it in a new tab
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="join-contact-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="join-contact-heading">Contact & classrooms</h2>
            <p className="section-note">
              Stop by during the school day, or email an advisor. Bring forms and dues to either room.
            </p>
          </div>
        </Reveal>
        <div className="join-contact-grid">
          {classrooms.map((room, i) => (
            <Reveal key={room.code} delay={i * 60}>
              <article className="join-contact-card">
                <p className="eyebrow">{room.code}</p>
                <h3>{room.advisor}</h3>
                <p>{room.note}</p>
                <a className="text-link" href={`mailto:${room.email}`}>
                  {room.email}
                </a>
              </article>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <article className="join-contact-card">
              <p className="eyebrow">Chapter email</p>
              <h3>Primary contact</h3>
              <p>General membership and chapter questions.</p>
              <a className="text-link" href={`mailto:${chapter.contactEmail}`}>
                {chapter.contactEmail}
              </a>
              {advisors[1]?.email && (
                <a className="text-link" href={`mailto:${advisors[1].email}`}>
                  {advisors[1].email}
                </a>
              )}
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section band-soft" aria-labelledby="join-eligibility-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Eligibility</p>
            <h2 id="join-eligibility-heading">Who can join</h2>
            <p className="section-note">{chapter.eligibilityNote}</p>
          </div>
        </Reveal>
        <ul className="course-grid" aria-label="Eligible FCS courses">
          {eligibleCourses.map((course) => (
            <li key={course} className="course-pill">
              {course}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
