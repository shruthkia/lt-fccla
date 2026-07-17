import { Reveal } from "../components/Reveal"
import { PersonCard } from "../components/PersonCard"
import { useSite } from "../hooks/useSiteContent"

export function Officers() {
  const { advisors, officers } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Leadership team</p>
          <h1>
            Meet the people
            <br />
            <span className="text-red">behind the Trail.</span>
          </h1>
          <p className="page-lede">
            Officers run the day to day. Advisors are here if you need them. Reach out anytime.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Advisors</p>
            <h2>Ms. Fiszer & Ms. Cashion</h2>
          </div>
        </Reveal>
        <div className="people-grid advisors">
          {advisors.map((person, i) => (
            <Reveal key={`${person.name}-${i}`} delay={i * 90}>
              <PersonCard person={person} variant="advisor" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Student officers</p>
            <h2>The 2025-26 officer team</h2>
            <p className="section-note">
              Have a question about joining or competing? Reach out to an officer or advisor by
              email.
            </p>
          </div>
        </Reveal>
        <div className="people-grid officers">
          {officers.map((person, i) => (
            <Reveal key={`${person.role}-${person.name}-${i}`} delay={(i % 5) * 60}>
              <PersonCard person={person} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
