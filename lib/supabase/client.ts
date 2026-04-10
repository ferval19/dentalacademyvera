import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

/**
 * Supabase client for use in Client Components ('use client').
 * Call this function inside the component, not at module level.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
