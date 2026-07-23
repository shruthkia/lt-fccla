import { Link } from "react-router-dom"
import { useSite } from "../hooks/useSiteContent"

export function Footer() {
  const { chapter } = useSite()

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">{chapter.name}</p>
          <p className="footer-tag">{chapter.tagline}</p>
          <p className="footer-meta">
            {chapter.school} · Est. {chapter.established}
          </p>
          <p className="footer-meta">
            Motto: {chapter.motto} · Flower: {chapter.flower} · Mascot: {chapter.mascot}
          </p>
        </div>
        <div className="footer-links">
          <Link to="/officers">Officers & Advisors</Link>
          <Link to="/adopurr">Adopurr</Link>
          <Link to="/portal">Member Portal</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/program-of-work">Program of Work</Link>
          <Link to="/join">Join</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/search">Search</Link>
          <Link to="/sitemap">Sitemap</Link>
          <Link to="/admin">Officer login</Link>
        </div>
        <div className="footer-aside">
          <p>
            Affiliated with{" "}
            <a href="https://www.texasfccla.org/" target="_blank" rel="noreferrer">
              Texas FCCLA
            </a>{" "}
            and{" "}
            <a href="https://fcclainc.org/" target="_blank" rel="noreferrer">
              FCCLA National
            </a>
            .
          </p>
          <p className="footer-copy">For Trail students, by Trail FCCLA.</p>
        </div>
      </div>
    </footer>
  )
}
