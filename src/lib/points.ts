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

const LOCAL_CLAIMS_KEY = "lt-fccla-point-claims"

export function formatPointsError(err: unknown): string {
  if (err instanceof Error && err.message) return err.message
  if (typeof err === "object" && err && "message" in err) {
    const message = String((err as { message: unknown }).message ?? "")
    if (message) return message
  }
  if (typeof err === "string" && err.trim()) return err
  return "Something went wrong. Please try again."
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

function readLocalClaims(): PointClaim[] {
  try {
    const raw = localStorage.getItem(LOCAL_CLAIMS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as PointClaim[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLocalClaims(claims: PointClaim[]) {
  localStorage.setItem(LOCAL_CLAIMS_KEY, JSON.stringify(claims))
}

function saveLocalClaims(newClaims: PointClaim[]) {
  const existing = readLocalClaims()
  writeLocalClaims([...newClaims, ...existing])
  return newClaims
}

function isMissingTableError(err: unknown) {
  const message = formatPointsError(err).toLowerCase()
  return (
    message.includes("does not exist") ||
    message.includes("could not find the table") ||
    message.includes("schema cache") ||
    message.includes("point_claims")
  )
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
    console.warn(error.message)
    return defaultPointActivities.filter((a) => a.active)
  }

  const rows = (data ?? []) as PointActivityRow[]
  if (rows.length === 0) return defaultPointActivities.filter((a) => a.active)
  return rows.map(mapActivity)
}

function localClaimsForMember(memberName: string) {
  const name = normalizeMemberName(memberName).toLowerCase()
  return readLocalClaims()
    .filter((c) => c.member_name.toLowerCase() === name)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function fetchClaimsByMember(memberName: string): Promise<PointClaim[]> {
  const name = normalizeMemberName(memberName)
  if (!name) return []

  const local = localClaimsForMember(name)

  if (!isSupabaseConfigured) return local

  try {
    const supabase = requireClient()
    const { data, error } = await supabase
      .from("point_claims")
      .select("*")
      .ilike("member_name", name)
      .order("created_at", { ascending: false })

    if (error) {
      if (isMissingTableError(error)) return local
      throw new Error(formatPointsError(error))
    }

    const remote = ((data ?? []) as PointClaimRow[]).map(mapClaim)
    const remoteIds = new Set(remote.map((c) => c.id))
    const merged = [...remote, ...local.filter((c) => !remoteIds.has(c.id))]
    return merged.sort((a, b) => b.created_at.localeCompare(a.created_at))
  } catch (err) {
    if (isMissingTableError(err)) return local
    throw err instanceof Error ? err : new Error(formatPointsError(err))
  }
}

function buildClaimPayload(input: {
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
    throw new Error("Custom activities need 1-25 points requested.")
  }

  const sharedNote = input.note?.trim() ?? ""
  return {
    member_name,
    rows: [
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
    ],
  }
}

function toLocalClaims(
  rows: ReturnType<typeof buildClaimPayload>["rows"],
): PointClaim[] {
  const now = new Date().toISOString()
  return rows.map((row, index) => ({
    id: `local-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    member_name: row.member_name,
    activity_id: row.activity_id,
    activity_key: row.activity_key,
    activity_label: row.activity_label,
    points: row.points,
    note: row.note,
    status: row.status,
    reviewed_by: null,
    reviewed_at: null,
    created_at: now,
  }))
}

export type SubmitPointClaimsResult = {
  claims: PointClaim[]
  storage: "supabase" | "local"
  notice?: string
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
}): Promise<SubmitPointClaimsResult> {
  const { rows } = buildClaimPayload(input)

  if (!isSupabaseConfigured) {
    const claims = saveLocalClaims(toLocalClaims(rows))
    return {
      claims,
      storage: "local",
      notice:
        "Saved on this device. Ask an advisor to connect Supabase and run supabase/schema-points.sql so officers can approve chapter-wide.",
    }
  }

  try {
    const supabase = requireClient()
    const { data, error } = await supabase.from("point_claims").insert(rows).select("*")
    if (error) throw error
    return {
      claims: ((data ?? []) as PointClaimRow[]).map(mapClaim),
      storage: "supabase",
    }
  } catch (err) {
    if (isMissingTableError(err)) {
      const claims = saveLocalClaims(toLocalClaims(rows))
      return {
        claims,
        storage: "local",
        notice:
          "Saved on this device because the points table is not set up yet. An advisor needs to run supabase/schema-points.sql in Supabase for officer approvals.",
      }
    }
    throw new Error(formatPointsError(err))
  }
}

export async function fetchPendingClaims(): Promise<PointClaim[]> {
  const localPending = readLocalClaims().filter((c) => c.status === "pending")
  if (!isSupabaseConfigured) return localPending

  try {
    const supabase = requireClient()
    const { data, error } = await supabase
      .from("point_claims")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
    if (error) {
      if (isMissingTableError(error)) return localPending
      throw new Error(formatPointsError(error))
    }
    const remote = ((data ?? []) as PointClaimRow[]).map(mapClaim)
    const remoteIds = new Set(remote.map((c) => c.id))
    return [...remote, ...localPending.filter((c) => !remoteIds.has(c.id))]
  } catch (err) {
    if (isMissingTableError(err)) return localPending
    throw new Error(formatPointsError(err))
  }
}

export async function fetchAllClaimsForAdmin(): Promise<PointClaim[]> {
  const local = readLocalClaims()
  if (!isSupabaseConfigured) return local

  try {
    const supabase = requireClient()
    const { data, error } = await supabase
      .from("point_claims")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      if (isMissingTableError(error)) return local
      throw new Error(formatPointsError(error))
    }
    const remote = ((data ?? []) as PointClaimRow[]).map(mapClaim)
    const remoteIds = new Set(remote.map((c) => c.id))
    return [...remote, ...local.filter((c) => !remoteIds.has(c.id))].sort((a, b) =>
      b.created_at.localeCompare(a.created_at),
    )
  } catch (err) {
    if (isMissingTableError(err)) return local
    throw new Error(formatPointsError(err))
  }
}

export async function reviewPointClaim(
  id: string,
  status: Extract<PointClaimStatus, "approved" | "denied">,
  reviewerId: string | null,
) {
  if (id.startsWith("local-")) {
    const next = readLocalClaims().map((claim) =>
      claim.id === id
        ? {
            ...claim,
            status,
            reviewed_by: reviewerId,
            reviewed_at: new Date().toISOString(),
          }
        : claim,
    )
    writeLocalClaims(next)
    const updated = next.find((c) => c.id === id)
    if (!updated) throw new Error("Could not find that local claim.")
    return updated
  }

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
  if (error) throw new Error(formatPointsError(error))
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
  return [...map.values()].sort(
    (a, b) => b.approved - a.approved || a.member_name.localeCompare(b.member_name),
  )
}
