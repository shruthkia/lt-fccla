import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

const shelterExamples = [
  {
    name: "Any local shelter or rescue",
    blurb:
      "Choose a place that works for you, including Dallas Animal Services, Operation Kindness, Frisco, Plano, or another shelter nearby.",
  },
  {
    name: "Proof required",
    blurb:
      "A supervisor must sign your hours form, or you need an email from the shelter confirming you worked. No proof, no credit.",
  },
  {
    name: "Service hours and points",
    blurb:
      "Verified shifts count toward school service hours and portal points once officers approve your claim.",
  },
  {
    name: "Log it in the portal",
    blurb:
      "Submit the shelter visit activity or a custom activity with the shelter name and how you verified the shift.",
  },
]

const flowSteps = [
  {
    step: "01",
    title: "Volunteer at a shelter",
    copy: "Serve at any animal shelter or rescue that will take you. Bring an hours form for a supervisor signature, or get an email confirming you worked. Care for animals, help adoption days, and earn service hours.",
  },
  {
    step: "02",
    title: "Promote and fundraise",
    copy: "Build flyers, post on social, and send cold emails that raise money for sterilization and shelter needs. Clear asks, real partners, measurable impact.",
  },
  {
    step: "03",
    title: "Build and recognize",
    copy: "Host dog-toy making nights, share progress, and recognize members who show up so animal welfare work stays visible across the chapter.",
  },
  {
    step: "04",
    title: "Log your work",
    copy: "Record activities in the member portal, including custom work if it is not on the list. Officers and advisors approve claims that meet chapter standards.",
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
            {coreServiceProject.description} Members volunteer, fundraise, and advocate so more
            animals get care, homes, and a fair chance.
          </p>
          <div className="hero-actions">
            <Link to="/portal" className="btn btn-primary">
              Log Adopurr work
            </Link>
            <Link to="/program-of-work" className="btn btn-ghost">
              Year plan
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
            <h2>Shelter care, advocacy, and follow-through.</h2>
            <p className="section-lede">
              A clear flow so every member knows how to help animals and support the project.
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
            <h2>Any shelter works, with proof.</h2>
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
          <p className="band-label">Advocacy</p>
          <h2 className="band-title">
            Animal welfare treated as serious chapter work.
          </h2>
          <p className="band-copy">
            Inspired by the animal-rights fight in Legally Blonde 2, Adopurr treats sterilization
            funding, adoption outreach, and responsible care as civic work the chapter can actually
            move. Every flyer, cold email, and social post is a clear ask for animals who cannot
            speak for themselves.
          </p>
          <ul className="adopurr-advocacy-list">
            <li>Raise money for sterilization and shelter medical needs</li>
            <li>Flyers, social posts, and cold emails with clear asks</li>
            <li>Monthly animal-care promotion with verified shelter volunteering</li>
            <li>Recognition for members who show up consistently</li>
          </ul>
        </Reveal>
      </section>

      <section className="section adopurr-section adopurr-media-band">
        <Reveal>
          <article className="adopurr-feature adopurr-feature-page">
            <div className="adopurr-copy">
              <p className="eyebrow">Get involved</p>
              <h2>Help Adopurr grow this year.</h2>
              <p>
                Lebanon Trail FCCLA&apos;s core service project for 2026-27. Volunteer, fundraise,
                log your work, and help more animals find care and homes.
              </p>
              <p className="service-impact">{coreServiceProject.impact}</p>
              <div className="hero-actions">
                <Link to="/join" className="btn btn-primary">
                  Join the chapter
                </Link>
                <Link to="/program-of-work" className="btn btn-ghost">
                  Events on the Trail
                </Link>
              </div>
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
