import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Records() {
  const { competitionRecords, importantDetails } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <h1>
            Records,
            <br />
            <span className="text-red">wins & milestones.</span>
          </h1>
          <p className="page-lede">
            This year marked our competitive comeback: a national qualifier and multiple state award
            winners across STAR Events and FCSA testing.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Results board</p>
            <h2>Competition records so far</h2>
          </div>
        </Reveal>
        <ol className="record-board">
          {competitionRecords.map((record, i) => (
            <Reveal key={`${record.name}-${record.event}-${i}`} delay={i * 40}>
              <li className="record-row">
                <span className="record-level">{record.level}</span>
                <div>
                  <p className="record-year">
                    {record.grade ? `${record.year} · ${record.grade}` : record.year}
                  </p>
                  <h3>{record.name}</h3>
                  <p className="record-event">{record.event}</p>
                  <p>{record.placement}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section band-soft">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Need to know</p>
            <h2>Important chapter details</h2>
          </div>
        </Reveal>
        <div className="detail-grid">
          {importantDetails.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <article className="detail-block">
                <h3>{item.label}</h3>
                <p>{item.value}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
