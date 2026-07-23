import {
  defaultPointActivities,
  normalizeMemberName,
  type PointActivity,
  type PointClaim,
  type PointClaimStatus,
} from "../data/points"
import { getSupabase, isSupabaseConfigured } from "./supabase"

export type PointClaimRow = {
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

export type PointActivityRow = {
  id: string
  key: string
  label: string
  description: string
  points: number
  category: PointActivity["category"]
  sort_order: number
  active: boolean
}

function requireClient() {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Member portal needs a Supabase connection.")
  return supabase
}

function mapActivity(row: PointActivityRow): PointActivity {
  return {
    id: row.id,
    key: row.key,
    label: row.label,
    description: row.description,
    points: row.points,
    category: row.category,
    sort_order: row.sort_order,
    active: row.active,
  }
}

function mapClaim(row: PointClaimRow): PointClaim {
  return {
    id: row.id,
    member_name: row.member_name,
    activity_id: row.activity_id,
    activity_key: row.activity_key,
    activity_label: row.activity_label,
    points: row.points,
    note: row.note,
    status: row.status,
    reviewed_by: row.reviewed_by,
    reviewed_at: row.reviewed_at,
    created_at: row.created_at,
  }
}

export async function fetchPointActivities(): Promise<PointActivity[]> {
  if (!isSupabaseConfigured) return defaultPointActivities.filter((a) => a.active)

  const supabase = requireClient()
  const { data, error } = await supabase
    .from("point_activities")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    // Table may not exist yet — fall back to built-in activities.
    console.warn(error.message)
    return defaultPointActivities.filter((a) => a.active)
  }

  const rows = (data ?? []) as PointActivityRow[]
  if (rows.length === 0) return defaultPointActivities.filter((a) => a.active)
  return rows.map(mapActivity)
}

export async function fetchClaimsByMember(memberName: string): Promise<PointClaim[]> {
  const name = normalizeMemberName(memberName)
  if (!name) return []
  if (!isSupabaseConfigured) return []

  const supabase = requireClient()
  const { data, error } = await supabase
    .from("point_claims")
    .select("*")
    .ilike("member_name", name)
    .order("created_at", { ascending: false })

  if (error) throw error
  return ((data ?? []) as PointClaimRow[]).map(mapClaim)
}

export async function submitPointClaims(input: {
  memberName: string
  activityIds: string[]
  note?: string
  activities: PointActivity[]
  custom?: {
    label: string
    points: number
    note?: string
  } | null
}) {
  const member_name = normalizeMemberName(input.memberName)
  if (!member_name) throw new Error("Enter your name.")

  const selected = input.activities.filter((a) => input.activityIds.includes(a.id))
  const customLabel = input.custom?.label.trim() ?? ""
  const customPoints = Math.round(input.custom?.points ?? 0)
  const hasCustom = Boolean(customLabel)

  if (selected.length === 0 && !hasCustom) {
    throw new Error("Select an activity or add a custom one.")
  }
  if (hasCustom && (customPoints < 1 || customPoints > 25)) {
    throw new Error("Custom activities need 1–25 points requested.")
  }

  if (!isSupabaseConfigured) {
    throw new Error(
      "Point submissions need Supabase. Officers can run supabase/schema-points.sql, then members can submit here.",
    )
  }

  const supabase = requireClient()
  const sharedNote = input.note?.trim() ?? ""
  const payload = [
    ...selected.map((activity) => ({
      member_name,
      activity_id: activity.id,
      activity_key: activity.key,
      activity_label: activity.label,
      points: activity.points,
      note: sharedNote,
      status: "pending" as const,
    })),
    ...(hasCustom
      ? [
          {
            member_name,
            activity_id: "custom",
            activity_key: "custom",
            activity_label: customLabel,
            points: customPoints,
            note: [sharedNote, input.custom?.note?.trim()]
              .filter(Boolean)
              .join(sharedNote && input.custom?.note?.trim() ? "\n" : ""),
            status: "pending" as const,
          },
        ]
      : []),
  ]

  const { data, error } = await supabase.from("point_claims").insert(payload).select("*")
  if (error) throw error
  return ((data ?? []) as PointClaimRow[]).map(mapClaim)
}

export async function fetchPendingClaims(): Promise<PointClaim[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("point_claims")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
  if (error) throw error
  return ((data ?? []) as PointClaimRow[]).map(mapClaim)
}

export async function fetchAllClaimsForAdmin(): Promise<PointClaim[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("point_claims")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return ((data ?? []) as PointClaimRow[]).map(mapClaim)
}

export async function reviewPointClaim(
  id: string,
  status: Extract<PointClaimStatus, "approved" | "denied">,
  reviewerId: string | null,
) {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("point_claims")
    .update({
      status,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return mapClaim(data as PointClaimRow)
}

export async function fetchMemberPointSummary(): Promise<
  { member_name: string; approved: number; pending: number }[]
> {
  const claims = await fetchAllClaimsForAdmin()
  const map = new Map<string, { member_name: string; approved: number; pending: number }>()
  for (const claim of claims) {
    const key = claim.member_name.toLowerCase()
    const row = map.get(key) ?? {
      member_name: claim.member_name,
      approved: 0,
      pending: 0,
    }
    if (claim.status === "approved") row.approved += claim.points
    if (claim.status === "pending") row.pending += claim.points
    map.set(key, row)
  }
  return [...map.values()].sort((a, b) => b.approved - a.approved || a.member_name.localeCompare(b.member_name))
}
