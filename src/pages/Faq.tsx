import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { useSite } from "../hooks/useSiteContent"

export function Faq() {
  const { faqs } = useSite()
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h1>
            FAQ
            <br />
            <span className="text-red">answers.</span>
          </h1>
          <p className="page-lede">
            Quick answers about joining, dues, eligibility, and competing at Lebanon Trail FCCLA.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <div className="faq-list">
          {faqs.map((item, i) => (
            <Reveal key={item.question} delay={i * 50}>
              <details className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="inline-cta">
            <p>Still unsure? Talk with an officer or advisor.</p>
            <Link to="/join" className="btn btn-primary">
              Join the chapter
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
