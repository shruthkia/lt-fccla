export type YearPlanItem = {
  title: string
  timeframe: string
  description: string
  status: "planned" | "in_progress" | "done"
}

/** Built-in Events on the Trail roadmap shown on Program of Work. */
export const yearPlanEvents: YearPlanItem[] = [
  {
    title: "Emerson × Lebanon Trail Connect",
    timeframe: "2026-27",
    description:
      "Connect through cultural promotion and shared events that introduce FCCLA, family, and community across campuses.",
    status: "planned",
  },
  {
    title: "Plano × Lebanon Trail Stand Up",
    timeframe: "2026-27",
    description: "Joint Stand Up chapter project with Plano FCCLA.",
    status: "planned",
  },
  {
    title: "Adopurr Service Project",
    timeframe: "Ongoing 2026-27",
    description:
      "Monthly shelter visits at any verified shelter or rescue, animal care promotion, flyers and social posts, cold emails for funds, sterilization fundraising, and a dog toy making event.",
    status: "in_progress",
  },
  {
    title: "State Fair",
    timeframe: "Fall",
    description:
      "Chapter trip and competition pathway. Members need enough approved portal points to compete and attend.",
    status: "planned",
  },
  {
    title: "Halloween Social",
    timeframe: "Fall",
    description: "Fall member social to build chapter community and celebrate mid-year progress.",
    status: "planned",
  },
  {
    title: "Christmas Social",
    timeframe: "Winter",
    description:
      "End-of-semester celebration with recognition for strong Adopurr and chapter contributors.",
    status: "planned",
  },
]
