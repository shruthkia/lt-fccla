import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function CommunityService() {
  const { communityService, coreServiceProject } = useSite()
  const others = communityService.filter((e) => !e.featured)

  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Chapter service</p>
          <h1>
            Serve families.
            <br />
            <span className="text-red">Strengthen community.</span>
          </h1>
          <p className="page-lede">
            Our 2026-27 core project is Adopurr: animal welfare, responsible care, and adoption
            advocacy for the Trail and Frisco.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <article className="adopurr-feature adopurr-feature-page">
            <div className="adopurr-copy">
              <p className="eyebrow">Core project 2026-27</p>
              <h2>{coreServiceProject.title}</h2>
              <p>{coreServiceProject.description}</p>
              <p className="service-impact">{coreServiceProject.impact}</p>
              <Link to="/adopurr" className="btn btn-primary">
                Open full Adopurr page
              </Link>
            </div>
            <div className="adopurr-media">
              <img
                src={coreServiceProject.image}
                alt="Adopurr project artwork for Lebanon Trail FCCLA"
              />
            </div>
          </article>
        </Reveal>

        <div className="service-grid" style={{ marginTop: "2rem" }}>
          {others.map((event, i) => (
            <Reveal key={event.title} delay={i * 70}>
              <article className={`service-card status-${event.status}`}>
                <div className="service-top">
                  <span className="status-pill">{event.status}</span>
                  <time>{event.date}</time>
                </div>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                {event.impact && <p className="service-impact">{event.impact}</p>}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="inline-cta">
            <p>Dates live on the chapter calendar. Sync your phone and stay involved.</p>
            <Link to="/calendar" className="btn btn-primary">
              Open calendar
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
