import { getSupabase } from "./supabase"
import type { GalleryImageRow } from "./database.types"

function requireClient() {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Blog is unavailable right now.")
  return supabase
}

export async function fetchGalleryImages(): Promise<GalleryImageRow[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function uploadGalleryImage(file: File, title: string, caption: string) {
  const supabase = requireClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg"
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${safeExt}`,
  })
  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path)

  const { data, error } = await supabase
    .from("gallery_images")
    .insert({
      title: title.trim() || file.name,
      caption: caption.trim(),
      storage_path: path,
      public_url: urlData.publicUrl,
      uploaded_by: user?.id ?? null,
    })
    .select("*")
    .single()

  if (error) throw error
  return data as GalleryImageRow
}

export async function updateGalleryImage(
  id: string,
  input: { title?: string; caption?: string },
) {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("gallery_images")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data as GalleryImageRow
}

export async function deleteGalleryImage(row: GalleryImageRow) {
  const supabase = requireClient()
  await supabase.storage.from("gallery").remove([row.storage_path])
  const { error } = await supabase.from("gallery_images").delete().eq("id", row.id)
  if (error) throw error
}
