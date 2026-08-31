import { fallbackPhotoForName, resolvePersonPhoto } from "../lib/personPhoto"
import {
  advisors,
  buildCompetitionRecords,
  chapter,
  chapterMilestones,
  communityService,
  competitionTracks,
  coreServiceProject,
  eligibleCourses,
  faqs,
  fcsPathways,
  importantDetails,
  memberResults,
  officers,
  purposes,
  type CareerPath,
  type CompetitionTrack,
  type MemberResult,
  type Person,
  type ServiceEvent,
} from "./chapter"

export type FaqItem = { question: string; answer: string }
export type DetailItem = { label: string; value: string }
export type Milestone = (typeof chapterMilestones)[number]

export type SiteBundle = {
  chapter: typeof chapter
  purposes: string[]
  eligibleCourses: string[]
  fcsPathways: CareerPath[]
  officers: Person[]
  advisors: Person[]
  competitionTracks: CompetitionTrack[]
  memberResults: MemberResult[]
  chapterMilestones: Milestone[]
  coreServiceProject: ServiceEvent
  communityService: ServiceEvent[]
  importantDetails: DetailItem[]
  faqs: FaqItem[]
}

export const defaultSiteBundle: SiteBundle = {
  chapter,
  purposes,
  eligibleCourses,
  fcsPathways,
  officers,
  advisors,
  competitionTracks,
  memberResults,
  chapterMilestones,
  coreServiceProject,
  communityService,
  importantDetails,
  faqs,
}

export type SiteContentKey = keyof SiteBundle

export function mergeSiteBundle(partial: Partial<SiteBundle> | null | undefined): SiteBundle {
  const merged: SiteBundle = {
    ...defaultSiteBundle,
    ...(partial ?? {}),
    chapter: {
      ...defaultSiteBundle.chapter,
      ...(partial?.chapter ?? {}),
      social: {
        ...defaultSiteBundle.chapter.social,
        ...(partial?.chapter?.social ?? {}),
      },
      calendar: {
        ...defaultSiteBundle.chapter.calendar,
        ...(partial?.chapter?.calendar ?? {}),
      },
      membership: {
        ...defaultSiteBundle.chapter.membership,
        ...(partial?.chapter?.membership ?? {}),
        expectations:
          partial?.chapter?.membership?.expectations ??
          defaultSiteBundle.chapter.membership.expectations,
        steps:
          partial?.chapter?.membership?.steps ?? defaultSiteBundle.chapter.membership.steps,
        paymentUrl:
          partial?.chapter?.membership?.paymentUrl ??
          defaultSiteBundle.chapter.membership.paymentUrl,
      },
      classrooms: partial?.chapter?.classrooms ?? defaultSiteBundle.chapter.classrooms,
    },
  }
  merged.officers = withResolvedPhotos(merged.officers, defaultSiteBundle.officers)
  merged.advisors = withResolvedPhotos(merged.advisors, defaultSiteBundle.advisors)
  merged.faqs = mergeFaqs(merged.faqs, defaultSiteBundle.faqs)
  return merged
}

function withResolvedPhotos(people: Person[], defaults: Person[]): Person[] {
  return people.map((person) => ({
    ...person,
    photo: resolvePersonPhoto(person.photo, fallbackPhotoForName(person.name, defaults)),
  }))
}

function mergeFaqs(cms: FaqItem[], defaults: FaqItem[]): FaqItem[] {
  const defaultsByQuestion = new Map(defaults.map((item) => [item.question, item]))
  const seen = new Set<string>()
  const merged = cms.map((item) => {
    seen.add(item.question)
    const fallback = defaultsByQuestion.get(item.question)
    if (fallback && (/\$55/.test(item.answer) || /October 7/.test(fallback.answer))) {
      return fallback
    }
    return item
  })
  for (const item of defaults) {
    if (!seen.has(item.question)) merged.push(item)
  }
  return merged
}

export function recordsFromBundle(bundle: SiteBundle) {
  return buildCompetitionRecords(bundle.memberResults, bundle.chapterMilestones)
}
