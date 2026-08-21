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
      },
      classrooms: partial?.chapter?.classrooms ?? defaultSiteBundle.chapter.classrooms,
    },
  }
  return merged
}

export function recordsFromBundle(bundle: SiteBundle) {
  return buildCompetitionRecords(bundle.memberResults, bundle.chapterMilestones)
}
