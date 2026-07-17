import type { PostInsert, PostRow, PostUpdate } from "./database.types"
import { getSupabase } from "./supabase"

export type { PostRow }

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export async function fetchPublishedPosts(): Promise<PostRow[]> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })

  if (error) throw error
  return data ?? []
}

export async function fetchPublishedPostBySlug(slug: string): Promise<PostRow | null> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function fetchAllPostsForAdmin(): Promise<PostRow[]> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function fetchPostById(id: string): Promise<PostRow | null> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createPost(input: PostInsert): Promise<PostRow> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase.from("posts").insert(input).select("*").single()
  if (error) throw error
  return data
}

export async function updatePost(id: string, input: PostUpdate): Promise<PostRow> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { data, error } = await supabase.from("posts").update(input).eq("id", id).select("*").single()
  if (error) throw error
  return data
}

export async function deletePost(id: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")

  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) throw error
}

export async function checkIsAdmin(): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { data, error } = await supabase.rpc("is_blog_admin")
  if (error) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle()

    return Boolean(profile?.is_admin)
  }

  return Boolean(data)
}
