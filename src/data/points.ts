export const POINTS_TO_COMPETE = 50

export type PointActivity = {
  id: string
  key: string
  label: string
  description: string
  points: number
  category: "service" | "advocacy" | "chapter" | "leadership"
  sort_order: number
  active: boolean
}

export type PointClaimStatus = "pending" | "approved" | "denied"

export type PointClaim = {
  id: string
  member_name: string
  activity_id: string
  activity_key: string
  activity_label: string
  points: number
  note: string
  status: PointClaimStatus
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
}

export const defaultPointActivities: PointActivity[] = [
  {
    id: "local-shelter-visit",
    key: "shelter-visit",
    label: "Shelter visit / animal care shift",
    description:
      "Volunteer at Dallas Animal Services, Operation Kindness, Frisco Animal Shelter, or Plano Animal Shelter.",
    points: 10,
    category: "service",
    sort_order: 1,
    active: true,
  },
  {
    id: "local-dog-toy",
    key: "dog-toy-event",
    label: "Dog toy making event",
    description: "Help build enrichment toys for shelter dogs at an Adopurr work day.",
    points: 8,
    category: "service",
    sort_order: 2,
    active: true,
  },
  {
    id: "local-flyer",
    key: "flyer-outreach",
    label: "Flyer / campus outreach",
    description: "Design, print, or distribute Adopurr flyers and adoption promo materials.",
    points: 5,
    category: "advocacy",
    sort_order: 3,
    active: true,
  },
  {
    id: "local-social",
    key: "social-post",
    label: "Social media advocacy post",
    description: "Create or schedule an approved post promoting animal welfare or adoption.",
    points: 4,
    category: "advocacy",
    sort_order: 4,
    active: true,
  },
  {
    id: "local-cold-email",
    key: "cold-email",
    label: "Cold email / donation ask",
    description: "Send approved outreach emails to raise funds for sterilization and shelter needs.",
    points: 6,
    category: "advocacy",
    sort_order: 5,
    active: true,
  },
  {
    id: "local-fundraiser",
    key: "fundraiser",
    label: "Fundraiser shift",
    description: "Work a chapter fundraiser that supports Adopurr and animal welfare advocacy.",
    points: 8,
    category: "advocacy",
    sort_order: 6,
    active: true,
  },
  {
    id: "local-meeting",
    key: "chapter-meeting",
    label: "Chapter meeting attendance",
    description: "Attend a scheduled Lebanon Trail FCCLA meeting.",
    points: 3,
    category: "chapter",
    sort_order: 7,
    active: true,
  },
  {
    id: "local-social-event",
    key: "social-event",
    label: "Chapter social (Halloween / Christmas)",
    description: "Help host or attend a chapter social and support member community.",
    points: 4,
    category: "chapter",
    sort_order: 8,
    active: true,
  },
  {
    id: "local-collab",
    key: "chapter-collab",
    label: "Chapter collaboration project",
    description: "Support Emerson x LT Connect cultural promotion or Plano x LT Stand Up.",
    points: 7,
    category: "leadership",
    sort_order: 9,
    active: true,
  },
  {
    id: "local-recognition",
    key: "recognition-help",
    label: "Recognition / awards support",
    description: "Help prepare member recognitions that celebrate strong Adopurr and chapter work.",
    points: 5,
    category: "leadership",
    sort_order: 10,
    active: true,
  },
]

export function normalizeMemberName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

export function sumApprovedPoints(claims: PointClaim[]) {
  return claims
    .filter((c) => c.status === "approved")
    .reduce((sum, c) => sum + c.points, 0)
}

export function isEligibleForCompete(points: number) {
  return points >= POINTS_TO_COMPETE
}
