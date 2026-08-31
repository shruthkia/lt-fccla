import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Join() {
  const { chapter, eligibleCourses } = useSite()
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
        <div className="join-panel">
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
        </div>
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
              {membership.paymentUrl && (
                <a
                  className="btn btn-primary"
                  href={membership.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay on OnlineSchoolFees
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section band-soft" aria-labelledby="join-forms-heading">
        <div className="join-panel">
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
        </div>
      </section>

      <section className="section" aria-labelledby="join-contact-heading">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="join-contact-heading">Contact & classrooms</h2>
            <p className="section-note">
              Email an officer with questions, or visit an advisor in MF A206 or KC A204 at any
              point in the day if they are available. Pay $40 dues on OnlineSchoolFees.
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
              </article>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <article className="join-contact-card">
              <p className="eyebrow">Best first step</p>
              <h3>Email an officer</h3>
              <p>
                Officers can answer membership questions quickly. Visit advisors in MF A206 or KC
                A204 at any point in the day if they are available.
              </p>
              <Link to="/officers" className="text-link">
                Meet officers and get emails
              </Link>
            </article>
          </Reveal>
          {chapter.social.instagram && (
            <Reveal delay={180}>
              <article className="join-contact-card">
                <p className="eyebrow">Social</p>
                <h3>Instagram</h3>
                <p>Updates, events, and chapter life on @LEBANONTRAILFCCLA.</p>
                <a
                  className="text-link"
                  href={chapter.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow @LEBANONTRAILFCCLA
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section band-soft" aria-labelledby="join-eligibility-heading">
        <div className="join-panel">
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
        </div>
      </section>
    </div>
  )
}
