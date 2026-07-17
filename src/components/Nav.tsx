import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"
import { useSite } from "../hooks/useSiteContent"

type NavChild = { to: string; label: string }
type NavItem = {
  to: string
  label: string
  end?: boolean
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/officers", label: "Officers & Advisors" },
  {
    to: "/community-service",
    label: "Service",
    children: [{ to: "/program-of-work", label: "Program of Work" }],
  },
  { to: "/calendar", label: "Calendar" },
  { to: "/competitive-events", label: "Compete" },
  {
    to: "/records",
    label: "Records",
    children: [
      { to: "/gallery", label: "Gallery" },
      { to: "/blog", label: "Blog" },
    ],
  },
  { to: "/about", label: "About" },
  {
    to: "/faq",
    label: "More",
    children: [
      { to: "/faq", label: "FAQ" },
      { to: "/search", label: "Search" },
      { to: "/sitemap", label: "Sitemap" },
    ],
  },
]

function NavDropdown({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isMore = item.label === "More"

  return (
    <div
      className={`nav-dropdown ${open ? "is-open" : ""}`}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {isMore ? (
        <button
          type="button"
          className="nav-dropdown-trigger"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {item.label}
          <span aria-hidden="true">▾</span>
        </button>
      ) : (
        <span className="nav-dropdown-trigger nav-dropdown-linkrow">
          <NavLink
            to={item.to}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={() => {
              setOpen(false)
              onNavigate()
            }}
          >
            {item.label}
          </NavLink>
          <button
            type="button"
            className="nav-dropdown-caret"
            aria-label={`${item.label} menu`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">▾</span>
          </button>
        </span>
      )}
      <div className="nav-dropdown-panel" role="menu">
        {item.children!.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            role="menuitem"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={() => {
              setOpen(false)
              onNavigate()
            }}
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { chapter } = useSite()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link
          to="/"
          className="nav-brand"
          aria-label="Lebanon Trail FCCLA home"
          onClick={closeMenu}
        >
          {!logoFailed ? (
            <img
              src="/brand/fccla-logo.png"
              alt="FCCLA"
              className="nav-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="nav-mark">FCCLA</span>
          )}
          <span className="nav-brand-text">
            Lebanon Trail
            <em>FCCLA</em>
          </span>
        </Link>

        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary">
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} onNavigate={closeMenu} />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ),
          )}

          <div className="nav-drawer-tools">
            <Link to="/join" className="nav-cta nav-cta-login" onClick={closeMenu}>
              Join
            </Link>
            <Link to="/admin" className="nav-cta nav-cta-login" onClick={closeMenu}>
              Officer login
            </Link>
            <button
              type="button"
              className="nav-icon-btn"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </nav>

        <div className="nav-tools">
          <Link to="/join" className="nav-cta nav-cta-login nav-cta-desktop">
            Join
          </Link>
          <Link to="/admin" className="nav-cta nav-cta-login nav-cta-desktop">
            Officer login
          </Link>
          <button
            type="button"
            className="nav-icon-btn"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            className={`nav-toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <p className="nav-eyebrow">{chapter.city}</p>
    </header>
  )
}
