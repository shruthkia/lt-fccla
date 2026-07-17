import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Reveal } from "../components/Reveal"
import { searchSite } from "../data/searchIndex"
import { useSite } from "../hooks/useSiteContent"

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get("q") ?? ""
  const [query, setQuery] = useState(initial)
  const site = useSite()

  const results = useMemo(
    () =>
      searchSite(query, {
        chapter: site.chapter,
        purposes: site.purposes,
        eligibleCourses: site.eligibleCourses,
        fcsPathways: site.fcsPathways,
        officers: site.officers,
        advisors: site.advisors,
        competitionTracks: site.competitionTracks,
        memberResults: site.memberResults,
        chapterMilestones: site.chapterMilestones,
        coreServiceProject: site.coreServiceProject,
        communityService: site.communityService,
        importantDetails: site.importantDetails,
        faqs: site.faqs,
      }),
    [query, site],
  )

  return (
    <>
      <header className="page-hero">
        <Reveal>
          <p className="eyebrow">Find it fast</p>
          <h1>
            Search
            <br />
            <span className="text-red">the site.</span>
          </h1>
          <p className="page-lede">
            Search pages, officers, competitions, FAQ, records, courses, and service projects.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault()
              setParams(query.trim() ? { q: query.trim() } : {})
            }}
          >
            <label>
              Search
              <input
                type="search"
                value={query}
                placeholder="Try Tanisa, Adopurr, Culinary Arts, dues…"
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </Reveal>

        <p className="search-count">
          {query.trim()
            ? `${results.length} result${results.length === 1 ? "" : "s"}`
            : "Showing main pages. Type to search the whole site."}
        </p>

        <div className="search-results">
          {results.map((entry, i) => (
            <Reveal key={`${entry.path}-${entry.title}-${i}`} delay={Math.min(i, 12) * 30}>
              <article className="search-card">
                <h2>
                  <Link to={entry.path}>{entry.title}</Link>
                </h2>
                <p>{entry.blurb}</p>
                <Link to={entry.path} className="text-link">
                  Open page
                </Link>
              </article>
            </Reveal>
          ))}
          {results.length === 0 && (
            <p className="blog-loading">No matches. Try a different word.</p>
          )}
        </div>
      </section>
    </>
  )
}
