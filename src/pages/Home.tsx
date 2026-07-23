import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Home() {
  const { chapter, communityService, competitionRecords, coreServiceProject } = useSite()
  const upcoming = communityService
    .filter((e) => e.status === "upcoming")
    .slice(0, 3)
  const highlights = competitionRecords.slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker animate-in">
            Frisco · Texas FCCLA · Est. {chapter.established}
          </p>
          <h1 className="hero-title animate-in delay-1">
            <span>Lebanon</span>
            <span>Trail</span>
            <span className="hero-accent">FCCLA</span>
          </h1>
          <p className="hero-lede animate-in delay-2">
            Welcome to Lebanon Trail FCCLA. We grow leaders through Family and Consumer Sciences,
            competition, and service that puts family first. A place where we provide a family,
            career, community, and leadership to lead the trail Toward New Horizons.
          </p>
          <div className="hero-actions animate-in delay-3">
            <Link to="/join" className="btn btn-primary">
              Join the chapter
            </Link>
            <Link to="/adopurr" className="btn btn-ghost">
              Meet Adopurr
            </Link>
          </div>
        </div>
        <div className="hero-rail animate-in delay-4" aria-hidden="true">
          <span>Family</span>
          <span>Career</span>
          <span>Community</span>
        </div>
      </section>

      <section className="symbol-strip">
        <Reveal>
          <div className="symbol-grid with-art">
            <div className="symbol-item">
              <img
                src={chapter.flowerImage}
                alt="Red rose, the official FCCLA flower"
                className="symbol-art rose-art"
              />
              <div>
                <p className="eyebrow">Official flower</p>
                <h3>{chapter.flower}</h3>
                <p>{chapter.flowerMeaning}</p>
              </div>
            </div>
            <div className="symbol-item">
              <img
                src={chapter.mascotImage}
                alt="Rosie the Llama, official national FCCLA mascot"
                className="symbol-art rosie-art"
              />
              <div>
                <p className="eyebrow">National mascot</p>
                <h3>{chapter.mascot}</h3>
                <p>{chapter.mascotMeaning}</p>
              </div>
            </div>
            <div className="symbol-item">
              <span className="symbol-swatch" aria-hidden="true" />
              <div>
                <p className="eyebrow">Colors</p>
                <h3>{chapter.colors}</h3>
                <p>{chapter.colorsMeaning}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="band band-ink">
        <Reveal>
          <p className="band-label">{chapter.tagline}</p>
          <h2 className="band-title">
            FCCLA is the only in-school CTSO with <em>family</em> at the center.
          </h2>
          <p className="band-copy">
            {chapter.creedLead} {chapter.about} Through competitive events, community service,
            student leadership, and conferences, members build skills for life: character, creative
            thinking, communication, practical knowledge, and career prep.
          </p>
          <div className="stat-row">
            <div>
              <strong>25,000+</strong>
              <span>Texas members annually</span>
            </div>
            <div>
              <strong>550+</strong>
              <span>Texas chapters</span>
            </div>
            <div>
              <strong>$1.9M+</strong>
              <span>Scholarships awarded yearly</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <article className="adopurr-feature">
            <div className="adopurr-copy">
              <p className="eyebrow">2026-27 core service project</p>
              <h2>{coreServiceProject.title}</h2>
              <p>{coreServiceProject.description}</p>
              <p className="service-impact">{coreServiceProject.impact}</p>
              <Link to="/adopurr" className="btn btn-primary">
                Explore Adopurr
              </Link>
            </div>
            <div className="adopurr-media">
              <img
                src={coreServiceProject.image}
                alt="Adopurr: Lebanon Trail FCCLA animal welfare and adoption project"
              />
            </div>
          </article>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Navigate the chapter</p>
            <h2>What you will find here.</h2>
          </div>
        </Reveal>
        <div className="feature-grid">
          {[
            {
              to: "/adopurr",
              title: "Adopurr",
              copy: "Animal welfare, shelter volunteering, advocacy, and points toward State Fair.",
            },
            {
              to: "/portal",
              title: "Member Portal",
              copy: "Log activities, track approved points, and check compete eligibility.",
            },
            {
              to: "/officers",
              title: "Officers & Advisors",
              copy: "Meet the officers and advisors who keep Trail FCCLA moving.",
            },
            {
              to: "/competitive-events",
              title: "Competitive Events",
              copy: "Explore STAR Events and pathways that turn FCS skills into competition.",
            },
            {
              to: "/gallery",
              title: "Photo Gallery",
              copy: "See chapter moments from meetings, competition, and service.",
            },
            {
              to: "/join",
              title: "Join & Membership",
              copy: "Check eligibility and open the chapter join form.",
            },
          ].map((item, i) => (
            <Reveal key={item.to} delay={i * 80}>
              <Link to={item.to} className="feature-link">
                <span className="feature-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="feature-go">Open →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-split">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Coming up</p>
            <h2>Service on the horizon</h2>
            <Link to="/community-service" className="text-link">
              All service events →
            </Link>
          </div>
          <ul className="timeline">
            {upcoming.map((event) => (
              <li key={event.title}>
                <span className="timeline-date">{event.date}</span>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="panel panel-red">
            <p className="eyebrow light">Competition pulse</p>
            <h2>Recent & featured records</h2>
            <ul className="record-list compact">
              {highlights.map((r) => (
                <li key={`${r.name}-${r.event}`}>
                  <span>{r.level}</span>
                  <strong>
                    {r.name} · {r.event}
                  </strong>
                  <em>{r.placement}</em>
                </li>
              ))}
            </ul>
            <Link to="/records" className="btn btn-on-red">
              Full records board
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>Lead on the Trail.</h2>
          <p>{chapter.joinCta}</p>
          <div className="hero-actions">
            <Link to="/join" className="btn btn-primary">
              Join the chapter
            </Link>
            <Link to="/faq" className="btn btn-ghost">
              Read the FAQ
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
