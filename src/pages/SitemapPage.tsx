import { Link } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { searchIndex } from "../data/searchIndex"

export function SitemapPage() {
  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Site map</p>
          <h1>
            All
            <br />
            <span className="text-red">pages.</span>
          </h1>
        </Reveal>
      </header>

      <section className="section">
        <ul className="sitemap-list">
          {searchIndex.map((entry, i) => (
            <Reveal key={entry.path} delay={i * 30}>
              <li>
                <Link to={entry.path}>
                  <strong>{entry.title}</strong>
                  <span>{entry.blurb}</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
