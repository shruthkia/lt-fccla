import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function CompetitiveEvents() {
  const { competitionTracks } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">2026-27 competition brief</p>
          <h1>
            Competition
            <br />
            <span className="text-red">& more info.</span>
          </h1>
          <p className="page-lede">
            STAR Events, Online STAR, FCSAs, Skill Demos, Spotlight on Projects, Knowledge Bowl,
            Virtual Business Challenge, Challenge Tests, and National Program Awards. Members need
            50+ approved portal points to compete and to attend the State Fair on October 7.
          </p>
        </Reveal>
      </header>

      <section className="section">
        {competitionTracks.map((track, i) => (
          <Reveal key={track.name} delay={i * 40}>
            <article className="track-block">
              <div className="track-intro">
                <p className="eyebrow">Track {String(i + 1).padStart(2, "0")}</p>
                <h2>{track.name}</h2>
                {track.subtitle && <p className="track-subtitle">{track.subtitle}</p>}
                <p className="track-summary">{track.summary}</p>
                <ul className="track-bullets">
                  {track.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              {track.categories && track.categories.length > 0 && (
                <div className="track-cats">
                  <p className="pathway-label">{track.categoryLabel ?? "Categories available"}</p>
                  <ul className="cat-grid">
                    {track.categories.map((cat) => (
                      <li key={cat}>{cat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="inline-cta">
            <p>
              Track points in the member portal, then review who placed last year on the records
              board.
            </p>
            <Link to="/portal" className="btn btn-primary">
              Open member portal
            </Link>
            <Link to="/records" className="btn btn-ghost">
              See our records
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
