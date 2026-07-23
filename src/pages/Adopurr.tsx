import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { POINTS_TO_COMPETE } from "../data/points"
import { useSite } from "../hooks/useSiteContent"

const shelterExamples = [
  {
    name: "Any local shelter or rescue",
    blurb:
      "Pick a place that works for you — Dallas Animal Services, Operation Kindness, Frisco, Plano, or another shelter/rescue nearby.",
  },
  {
    name: "Proof required",
    blurb:
      "A supervisor must sign your hours form, or you need an email from the shelter confirming you worked. No proof, no credit.",
  },
  {
    name: "Service hours + points",
    blurb:
      "Verified shifts count toward school service hours and portal points once officers approve your claim.",
  },
  {
    name: "Log it in the portal",
    blurb:
      "Submit the shelter visit activity (or a custom activity) with the shelter name and how you verified the shift.",
  },
]

const flowSteps = [
  {
    step: "01",
    title: "Volunteer at a shelter",
    copy: "Serve at any animal shelter or rescue that will take you. Bring a hours form for a supervisor signature, or get an email confirming you worked. Care for animals, help adoption days, and earn service hours.",
  },
  {
    step: "02",
    title: "Promote & fundraise",
    copy: "Build flyers, post on social, and send cold emails that raise money for sterilization and shelter needs. Adopurr treats advocacy like a campaign: clear asks, real partners, measurable impact.",
  },
  {
    step: "03",
    title: "Make & celebrate",
    copy: "Host dog-toy making nights, spotlight members who show up, and recognize strong service so the chapter sees that animal welfare work is leadership work.",
  },
  {
    step: "04",
    title: "Earn your points",
    copy: `Log activities in the member portal — including custom work if it is not on the list. Officers and advisors approve claims that meet chapter standards. You need at least ${POINTS_TO_COMPETE} approved points to compete and to go to the State Fair.`,
  },
]

const yearPlan = [
  {
    title: "Emerson × Lebanon Trail",
    detail: "Connect through cultural promotion — shared events that introduce FCCLA, family, and community across campuses.",
  },
  {
    title: "Plano × Lebanon Trail",
    detail: "Stand Up chapter project — a collaborative service and advocacy push with Plano FCCLA.",
  },
  {
    title: "Adopurr Service Project",
    detail:
      "Monthly shelter visits at any verified shelter/rescue · animal care promotion · flyers, social posts, and cold emails for funds · sterilization fundraising · dog toy making event.",
  },
  {
    title: "State Fair",
    detail: `Chapter trip and competition pathway — members need ${POINTS_TO_COMPETE}+ approved points to compete and attend.`,
  },
  {
    title: "Halloween Social",
    detail: "Fall member social to build chapter family and celebrate mid-year progress.",
  },
  {
    title: "Christmas Social",
    detail: "End-of-semester celebration with recognition for top Adopurr and chapter contributors.",
  },
]

export function Adopurr() {
  const { coreServiceProject } = useSite()

  return (
    <div className="adopurr-page">
      <header className="adopurr-hero">
        <div className="adopurr-hero-bg" aria-hidden="true" />
        <div className="adopurr-hero-paws" aria-hidden="true" />
        <Reveal>
          <p className="eyebrow adopurr-eyebrow">2026-27 core service project</p>
          <h1 className="adopurr-title">
            <span>Ado</span>
            <span className="text-red">purr</span>
          </h1>
          <p className="adopurr-lede">
            {coreServiceProject.description} All cats. All paws on deck. Service hours, fundraisers,
            and recognition — with a little Legally Blonde 2 energy for animal rights.
          </p>
          <div className="hero-actions">
            <Link to="/portal" className="btn btn-primary">
              Track your points
            </Link>
            <Link to="/community-service" className="btn btn-ghost">
              All service events
            </Link>
          </div>
        </Reveal>
        <div className="adopurr-hero-cats" aria-hidden="true">
          <CatSilhouette className="cat-a" />
          <CatSilhouette className="cat-b" />
          <CatSilhouette className="cat-c" />
        </div>
      </header>

      <section className="section adopurr-section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">How Adopurr works</p>
            <h2>From shelter floors to State Fair.</h2>
            <p className="section-lede">
              A clear chapter flow so every member knows where to plug in — and how points unlock
              competing and the State Fair.
            </p>
          </div>
        </Reveal>
        <ol className="adopurr-flow">
          {flowSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 70} as="li">
              <span className="adopurr-flow-step">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section adopurr-section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Shelter volunteering</p>
            <h2>Any shelter works — with proof.</h2>
            <p className="section-lede">
              We do not lock you to one partner. Volunteer where you can, then bring a supervisor
              signature or a confirmation email so officers can approve your hours and points.
            </p>
          </div>
        </Reveal>
        <div className="adopurr-shelter-grid">
          {shelterExamples.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <article className="adopurr-shelter">
                <PawMark />
                <h3>{item.name}</h3>
                <p>{item.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band band-ink adopurr-advocacy">
        <Reveal>
          <p className="band-label">Advocacy, Elle-style</p>
          <h2 className="band-title">
            Animal rights with <em>Bruiser&apos;s Bill</em> energy.
          </h2>
          <p className="band-copy">
            Legally Blonde 2 followed Elle Woods to Washington for animal welfare. Adopurr keeps that
            spirit closer to home: we fundraise for sterilization, push adoption and responsible care,
            and treat every flyer, cold email, and social post like a lobbying packet for the animals
            who cannot speak for themselves. What, like it&apos;s hard? Not if the chapter shows up
            together.
          </p>
          <ul className="adopurr-advocacy-list">
            <li>Raise money for sterilization and shelter medical needs</li>
            <li>Flyers, social posts, and cold emails that ask clearly and kindly</li>
            <li>Monthly animal-care promotion with verified shelter volunteering</li>
            <li>Recognitions for members who lead with consistency, not just vibes</li>
          </ul>
        </Reveal>
      </section>

      <section className="section adopurr-section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Next year plan</p>
            <h2>Events on the Trail.</h2>
            <p className="section-lede">
              Collaboration, Adopurr service, State Fair, and socials — with a points gate for
              competition travel.
            </p>
          </div>
        </Reveal>
        <ul className="adopurr-year-plan">
          {yearPlan.map((item, i) => (
            <Reveal key={item.title} delay={i * 50} as="li">
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <div className="inline-cta">
            <p>
              Need {POINTS_TO_COMPETE}+ approved points to compete or attend State Fair? Log your work
              in the member portal and wait for officer approval.
            </p>
            <Link to="/portal" className="btn btn-primary">
              Open member portal
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section adopurr-section adopurr-media-band">
        <Reveal>
          <article className="adopurr-feature adopurr-feature-page">
            <div className="adopurr-copy">
              <p className="eyebrow">Chapter mascot energy</p>
              <h2>Paws, purpose, and points.</h2>
              <p>
                Adopurr is more than a cute name. It is Lebanon Trail FCCLA&apos;s promise to animals
                in our community — and a pathway for members to earn service hours, practice
                advocacy, and qualify for the biggest chapter opportunities of the year.
              </p>
              <p className="service-impact">{coreServiceProject.impact}</p>
              <Link to="/join" className="btn btn-primary">
                Join the chapter
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
      </section>
    </div>
  )
}

function PawMark() {
  return (
    <svg className="adopurr-paw" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="20" cy="18" rx="7" ry="9" />
      <ellipse cx="32" cy="12" rx="7" ry="9" />
      <ellipse cx="44" cy="18" rx="7" ry="9" />
      <ellipse cx="14" cy="32" rx="6" ry="8" />
      <ellipse cx="50" cy="32" rx="6" ry="8" />
      <path d="M32 28c-10 0-18 8-18 16 0 6 5 10 12 10h12c7 0 12-4 12-10 0-8-8-16-18-16z" />
    </svg>
  )
}

function CatSilhouette({ className }: { className?: string }) {
  return (
    <svg className={`adopurr-cat ${className ?? ""}`} viewBox="0 0 120 90" aria-hidden="true">
      <path d="M20 70c0-22 18-40 40-40s40 18 40 40v8H20v-8z" />
      <path d="M38 30l-10-18 18 10zM82 30l10-18-18 10z" />
      <circle cx="48" cy="52" r="3.5" className="cat-eye" />
      <circle cx="72" cy="52" r="3.5" className="cat-eye" />
      <path d="M60 58c-2 3-6 3-8 0M60 58c2 3 6 3 8 0" className="cat-nose" />
    </svg>
  )
}
