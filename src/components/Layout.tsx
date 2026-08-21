import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { ThemeProvider } from "../hooks/useTheme"
import { SiteContentProvider } from "../hooks/useSiteContent"

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ThemeProvider>
      <SiteContentProvider>
        <div className="app-shell">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Nav />
          <main id="main-content" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </SiteContentProvider>
    </ThemeProvider>
  )
}
