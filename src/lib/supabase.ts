import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ""
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ""

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabaseConfigMessage = "Please check back soon."

let client: SupabaseClient<Database> | null = null

export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient<Database>(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return client
}
