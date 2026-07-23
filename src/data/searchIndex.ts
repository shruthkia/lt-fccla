import type { SiteBundle } from "./siteBundle"
import { defaultSiteBundle } from "./siteBundle"

export type SearchEntry = {
  title: string
  path: string
  blurb: string
  keywords: string
}

const pageIndex: SearchEntry[] = [
  {
    title: "Home",
    path: "/",
    blurb: "Welcome to Lebanon Trail FCCLA.",
    keywords: "home welcome trail fccla family career community",
  },
  {
    title: "Officers & Advisors",
    path: "/officers",
    blurb: "Meet officers and advisors.",
    keywords: "officers advisors team leadership",
  },
  {
    title: "Competitive Events",
    path: "/competitive-events",
    blurb: "STAR Events, Online STAR, FCSAs, skill demos, and challenge events.",
    keywords: "compete star fcsa skill demonstration challenge bowl",
  },
  {
    title: "Community Service",
    path: "/community-service",
    blurb: "Adopurr and chapter service projects.",
    keywords: "service adopurr animals community",
  },
  {
    title: "Adopurr",
    path: "/adopurr",
    blurb: "Shelter volunteering, advocacy, fundraisers, and the 2026-27 animal welfare project.",
    keywords: "adopurr cats shelter dallas operation kindness frisco plano sterilization points",
  },
  {
    title: "Member Portal",
    path: "/portal",
    blurb: "Log activities and track points for competing and State Fair.",
    keywords: "portal points tracker compete state fair approval members",
  },
  {
    title: "Calendar",
    path: "/calendar",
    blurb: "Chapter and school dates.",
    keywords: "calendar meetings conferences deadlines",
  },
  {
    title: "Records",
    path: "/records",
    blurb: "Competition wins and milestones.",
    keywords: "records wins national state region medals",
  },
  {
    title: "Blog",
    path: "/blog",
    blurb: "Chapter stories and updates.",
    keywords: "blog news updates stories",
  },
  {
    title: "Gallery",
    path: "/gallery",
    blurb: "Photos from events, competition, and service.",
    keywords: "gallery photos pictures images",
  },
  {
    title: "Join",
    path: "/join",
    blurb: "Membership form, dues, payment, expectations, and advisor classrooms.",
    keywords:
      "join membership dues pay form eligible courses meetings service fundraising A206 A204 fiszer cashion",
  },
  {
    title: "Program of Work",
    path: "/program-of-work",
    blurb: "Events on the Trail: collaborations, Adopurr, socials, and the year roadmap.",
    keywords:
      "program of work roadmap timeline year plan events emerson plano adopurr halloween christmas state fair",
  },
  {
    title: "FAQ",
    path: "/faq",
    blurb: "Dues, eligibility, and competing answers.",
    keywords: "faq dues eligibility compete questions",
  },
  {
    title: "About",
    path: "/about",
    blurb: "Mission, creed, courses, and careers.",
    keywords: "about mission creed rose rosie courses careers",
  },
  {
    title: "Search",
    path: "/search",
    blurb: "Search pages and chapter content.",
    keywords: "search find",
  },
  {
    title: "Sitemap",
    path: "/sitemap",
    blurb: "All pages on the site.",
    keywords: "sitemap pages map",
  },
  {
    title: "Officer login",
    path: "/admin",
    blurb: "Officer and advisor workspace.",
    keywords: "admin login officer advisor edit",
  },
]

/** Static fallback used by Sitemap before live content loads. */
export const searchIndex = pageIndex

export function buildSearchIndex(bundle: SiteBundle = defaultSiteBundle): SearchEntry[] {
  const entries: SearchEntry[] = [...pageIndex]

  const chapterBits = [
    bundle.chapter.name,
    bundle.chapter.school,
    bundle.chapter.city,
    bundle.chapter.tagline,
    bundle.chapter.motto,
    bundle.chapter.flower,
    bundle.chapter.mascot,
    bundle.chapter.mission,
    bundle.chapter.about,
    bundle.chapter.joinCta,
    bundle.chapter.eligibilityNote,
    ...bundle.chapter.creed,
  ].join(" ")

  entries.push({
    title: "Chapter identity",
    path: "/about",
    blurb: bundle.chapter.about.slice(0, 140),
    keywords: chapterBits,
  })

  for (const person of [...bundle.officers, ...bundle.advisors]) {
    entries.push({
      title: `${person.name} · ${person.role}`,
      path: "/officers",
      blurb: person.bio || person.focus || person.role,
      keywords: `${person.name} ${person.role} ${person.focus ?? ""} ${person.email ?? ""} ${person.bio}`,
    })
  }

  for (const track of bundle.competitionTracks) {
    entries.push({
      title: track.name,
      path: "/competitive-events",
      blurb: track.summary,
      keywords: [
        track.name,
        track.subtitle ?? "",
        track.summary,
        ...track.bullets,
        ...(track.categories ?? []),
      ].join(" "),
    })
    for (const cat of track.categories ?? []) {
      entries.push({
        title: cat,
        path: "/competitive-events",
        blurb: `Competition category under ${track.name}.`,
        keywords: `${cat} ${track.name} compete competition star fcsa`,
      })
    }
  }

  for (const event of bundle.communityService) {
    entries.push({
      title: event.title,
      path: "/community-service",
      blurb: event.description,
      keywords: `${event.title} ${event.description} ${event.impact ?? ""} ${event.date} service`,
    })
  }

  entries.push({
    title: bundle.coreServiceProject.title,
    path: "/adopurr",
    blurb: bundle.coreServiceProject.description,
    keywords: `${bundle.coreServiceProject.title} ${bundle.coreServiceProject.description} adopurr service`,
  })

  for (const member of bundle.memberResults) {
    for (const result of member.results) {
      entries.push({
        title: `${member.name} · ${result.event}`,
        path: "/records",
        blurb: result.placement,
        keywords: `${member.name} ${member.grade} ${member.year} ${result.event} ${result.placement} ${result.level}`,
      })
    }
  }

  for (const item of bundle.importantDetails) {
    entries.push({
      title: item.label,
      path: "/records",
      blurb: item.value,
      keywords: `${item.label} ${item.value}`,
    })
  }

  for (const faq of bundle.faqs) {
    entries.push({
      title: faq.question,
      path: "/faq",
      blurb: faq.answer,
      keywords: `${faq.question} ${faq.answer}`,
    })
  }

  for (const course of bundle.eligibleCourses) {
    entries.push({
      title: course,
      path: "/join",
      blurb: "Eligible FCS course for membership.",
      keywords: `${course} eligible course join membership fcs`,
    })
  }

  for (const purpose of bundle.purposes) {
    entries.push({
      title: "FCCLA purpose",
      path: "/about",
      blurb: purpose,
      keywords: purpose,
    })
  }

  for (const pathway of bundle.fcsPathways) {
    entries.push({
      title: pathway.area,
      path: "/about",
      blurb: `Careers in ${pathway.area}.`,
      keywords: `${pathway.area} ${pathway.courses.join(" ")} ${pathway.jobs.join(" ")} careers`,
    })
  }

  return entries
}

export function searchSite(
  query: string,
  bundle: SiteBundle = defaultSiteBundle,
): SearchEntry[] {
  const index = buildSearchIndex(bundle)
  const q = query.trim().toLowerCase()
  if (!q) {
    return pageIndex
  }
  const words = q.split(/\s+/).filter(Boolean)
  return index.filter((entry) => {
    const hay = `${entry.title} ${entry.blurb} ${entry.keywords}`.toLowerCase()
    return words.every((word) => hay.includes(word))
  })
}
