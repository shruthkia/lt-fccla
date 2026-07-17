export type GalleryImageRow = {
  id: string
  title: string
  caption: string
  storage_path: string
  public_url: string
  uploaded_by: string | null
  created_at: string
}

export type ProgramItemRow = {
  id: string
  title: string
  description: string
  timeframe: string
  sort_order: number
  status: "planned" | "in_progress" | "done"
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ProgramItemInsert = {
  title: string
  description?: string
  timeframe?: string
  sort_order?: number
  status?: "planned" | "in_progress" | "done"
  created_by?: string | null
}

export type ProgramItemUpdate = Partial<ProgramItemInsert>

export type PostRow = {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  author_name: string
  published: boolean
  published_at: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ProfileRow = {
  id: string
  email: string | null
  display_name: string | null
  is_admin: boolean
  created_at: string
}

export type SiteContentRow = {
  key: string
  data: unknown
  updated_at: string
  updated_by: string | null
}

export type PostInsert = {
  title: string
  slug: string
  excerpt?: string
  body?: string
  author_name?: string
  published?: boolean
  published_at?: string | null
  created_by?: string | null
}

export type PostUpdate = Partial<PostInsert>

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: PostRow
        Insert: PostInsert
        Update: PostUpdate
        Relationships: []
      }
      profiles: {
        Row: ProfileRow
        Insert: {
          id: string
          email?: string | null
          display_name?: string | null
          is_admin?: boolean
        }
        Update: {
          email?: string | null
          display_name?: string | null
          is_admin?: boolean
        }
        Relationships: []
      }
      gallery_images: {
        Row: GalleryImageRow
        Insert: {
          title?: string
          caption?: string
          storage_path: string
          public_url: string
          uploaded_by?: string | null
        }
        Update: {
          title?: string
          caption?: string
          storage_path?: string
          public_url?: string
        }
        Relationships: []
      }
      program_items: {
        Row: ProgramItemRow
        Insert: ProgramItemInsert
        Update: ProgramItemUpdate
        Relationships: []
      }
      site_content: {
        Row: SiteContentRow
        Insert: {
          key: string
          data?: unknown
          updated_by?: string | null
        }
        Update: {
          data?: unknown
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_blog_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
