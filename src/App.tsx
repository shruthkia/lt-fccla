import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { About } from "./pages/About"
import { Admin, BlogAdminRedirect } from "./pages/Admin"
import { Blog } from "./pages/Blog"
import { BlogPost } from "./pages/BlogPost"
import { CalendarPage } from "./pages/Calendar"
import { CommunityService } from "./pages/CommunityService"
import { CompetitiveEvents } from "./pages/CompetitiveEvents"
import { Faq } from "./pages/Faq"
import { Gallery } from "./pages/Gallery"
import { Home } from "./pages/Home"
import { Join } from "./pages/Join"
import { Officers } from "./pages/Officers"
import { ProgramOfWork } from "./pages/ProgramOfWork"
import { Records } from "./pages/Records"
import { SearchPage } from "./pages/SearchPage"
import { SitemapPage } from "./pages/SitemapPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="officers" element={<Officers />} />
          <Route path="competitive-events" element={<CompetitiveEvents />} />
          <Route path="community-service" element={<CommunityService />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="records" element={<Records />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/admin" element={<BlogAdminRedirect />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="join" element={<Join />} />
          <Route path="program-of-work" element={<ProgramOfWork />} />
          <Route path="faq" element={<Faq />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
