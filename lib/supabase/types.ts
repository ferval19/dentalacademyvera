/**
 * Database type definition for Supabase.
 * Run `supabase gen types typescript --project-id <id>` to regenerate from the actual schema.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          title: string
          category: string
          category_label: string
          modality: 'presencial' | 'online' | 'hibrido'
          date: string
          duration: string
          location: string
          price: number
          spots: number
          spots_remaining: number
          emoji: string
          gradient: string
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      professors: {
        Row: {
          id: string
          name: string
          initials: string
          specialty: string
          bio: string
          avatar_url: string | null
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['professors']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['professors']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
