import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function About() {
  const { chapter, eligibleCourses, fcsPathways, purposes } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">About the chapter</p>
          <h1>
            {chapter.school}
            <br />
            <span className="text-red">FCCLA</span>
          </h1>
          <p className="page-lede">{chapter.mission}</p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="about-prose">
            <h2>Who we are</h2>
            <p>{chapter.about}</p>
            <p>
              Family, Career and Community Leaders of America (FCCLA) has helped members make a
              difference in families, careers, and communities since 1945. Texas FCCLA carries that
              mission statewide through leadership conferences, national programs, competitive
              events, and community service, from local chapters all the way to Nationals.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Our marks</p>
            <h2>Flower, mascot, colors, motto</h2>
          </div>
        </Reveal>
        <div className="detail-grid marks-grid">
          <Reveal>
            <article className="detail-block mark-block">
              <img
                src={chapter.flowerImage}
                alt="Red rose, the official FCCLA flower"
                className="mark-art rose-art"
              />
              <h3>Flower</h3>
              <p>
                <strong>{chapter.flower}.</strong> {chapter.flowerMeaning}
              </p>
            </article>
          </Reveal>
          <Reveal delay={60}>
            <article className="detail-block mark-block">
              <img
                src={chapter.mascotImage}
                alt="Rosie the Llama, official national FCCLA mascot"
                className="mark-art rosie-art"
              />
              <h3>National mascot</h3>
              <p>
                <strong>{chapter.mascot}.</strong> {chapter.mascotMeaning}
              </p>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="detail-block">
              <h3>Colors</h3>
              <p>
                <strong>{chapter.colors}.</strong> {chapter.colorsMeaning}
              </p>
            </article>
          </Reveal>
          <Reveal delay={180}>
            <article className="detail-block">
              <h3>Motto</h3>
              <p>&ldquo;{chapter.motto}&rdquo;</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">FCCLA Creed</p>
            <h2>The words we stand on</h2>
          </div>
          <div className="creed-full">
            {chapter.creed.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Eight purposes</p>
            <h2>Why FCCLA exists</h2>
          </div>
        </Reveal>
        <ol className="purpose-list">
          {purposes.map((purpose, i) => (
            <Reveal key={purpose} delay={(i % 4) * 40}>
              <li>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{purpose}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Membership</p>
            <h2>Who can join</h2>
            <p className="section-note">{chapter.eligibilityNote}</p>
          </div>
        </Reveal>
        <div className="course-grid">
          {eligibleCourses.map((course, i) => (
            <Reveal key={course} delay={(i % 5) * 30}>
              <div className="course-pill">{course}</div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="eligibility-aside">
            Already took one of these classes earlier in high school? You can still be in FCCLA.
            Unsure? Email an officer on the{" "}
            <Link to="/officers" className="text-link">
              Team page
            </Link>
            , or visit an advisor in MF A206 or KC A204 at any point in the day if they are
            available.
          </p>
        </Reveal>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">FCS pathways</p>
            <h2>Courses today. Careers tomorrow.</h2>
            <p className="section-note">
              Family and Consumer Sciences opens doors across hospitality, design, education,
              food, business, and human services.
            </p>
          </div>
        </Reveal>
        <div className="pathway-grid">
          {fcsPathways.map((path, i) => (
            <Reveal key={path.area} delay={i * 70}>
              <article className="pathway-card">
                <h3>{path.area}</h3>
                <p className="pathway-label">Related courses</p>
                <ul>
                  {path.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="pathway-label">Future jobs</p>
                <ul>
                  {path.jobs.map((j) => (
                    <li key={j}>{j}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="inline-cta">
            <p>{chapter.joinCta}</p>
            <div className="hero-actions">
              <Link to="/calendar" className="btn btn-primary">
                See upcoming dates
              </Link>
              <Link to="/officers" className="btn btn-ghost">
                Talk to officers
              </Link>
              <a
                href="https://www.texasfccla.org/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Texas FCCLA
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
