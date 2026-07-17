import { getSupabase } from "./supabase"
import type {
  ProgramItemInsert,
  ProgramItemRow,
  ProgramItemUpdate,
} from "./database.types"

function requireClient() {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")
  return supabase
}

export async function fetchProgramItems(): Promise<ProgramItemRow[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("program_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createProgramItem(input: ProgramItemInsert) {
  const supabase = requireClient()
  const { data, error } = await supabase.from("program_items").insert(input).select("*").single()
  if (error) throw error
  return data as ProgramItemRow
}

export async function updateProgramItem(id: string, input: ProgramItemUpdate) {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("program_items")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data as ProgramItemRow
}

export async function deleteProgramItem(id: string) {
  const supabase = requireClient()
  const { error } = await supabase.from("program_items").delete().eq("id", id)
  if (error) throw error
}
