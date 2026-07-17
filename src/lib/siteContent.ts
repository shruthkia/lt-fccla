import { defaultSiteBundle, mergeSiteBundle, type SiteBundle, type SiteContentKey } from "../data/siteBundle"
import { getSupabase } from "./supabase"

export async function fetchSiteBundle(): Promise<SiteBundle> {
  const supabase = getSupabase()
  if (!supabase) return defaultSiteBundle

  const { data, error } = await supabase.from("site_content").select("key, data")
  if (error) {
    // Table may not exist yet; fall back to built-in defaults.
    console.warn("site_content fetch failed, using defaults:", error.message)
    return defaultSiteBundle
  }

  const partial: Partial<SiteBundle> = {}
  for (const row of data ?? []) {
    const key = row.key as SiteContentKey
    if (key in defaultSiteBundle) {
      ;(partial as Record<string, unknown>)[key] = row.data
    }
  }
  return mergeSiteBundle(partial)
}

export async function saveSiteSection<K extends SiteContentKey>(key: K, data: SiteBundle[K]) {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Supabase is not configured.")

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from("site_content").upsert(
    {
      key,
      data,
      updated_by: user?.id ?? null,
    },
    { onConflict: "key" },
  )
  if (error) throw error
}

export async function saveFullSiteBundle(bundle: SiteBundle) {
  const keys = Object.keys(defaultSiteBundle) as SiteContentKey[]
  for (const key of keys) {
    await saveSiteSection(key, bundle[key])
  }
}
