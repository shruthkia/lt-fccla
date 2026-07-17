import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function CalendarPage() {
  const { chapter } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">School & chapter dates</p>
          <h1>
            Stay on
            <br />
            <span className="text-red">the calendar.</span>
          </h1>
          <p className="page-lede">
            Meetings, conferences, service projects, and competition deadlines, powered by our
            public Google Calendar (America/Chicago).
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <div className="calendar-shell">
            <iframe
              title="Lebanon Trail FCCLA Calendar"
              src={chapter.calendar.embedSrc}
              loading="lazy"
            />
          </div>
          <p className="calendar-actions">
            <a
              href={chapter.calendar.publicUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Open in Google Calendar
            </a>
          </p>
        </Reveal>
      </section>
    </>
  )
}
