import { useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { checkIsAdmin } from "../lib/blog"
import { getSupabase, isSupabaseConfigured } from "../lib/supabase"

export type AuthState = {
  ready: boolean
  session: Session | null
  user: User | null
  isAdmin: boolean
  configured: boolean
}

const initial: AuthState = {
  ready: false,
  session: null,
  user: null,
  isAdmin: false,
  configured: isSupabaseConfigured,
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>(initial)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setState({ ...initial, ready: true, configured: false })
      return
    }

    let cancelled = false

    async function sync(session: Session | null) {
      const user = session?.user ?? null
      let isAdmin = false
      if (user) {
        try {
          isAdmin = await checkIsAdmin()
        } catch {
          isAdmin = false
        }
      }
      if (!cancelled) {
        setState({
          ready: true,
          session,
          user,
          isAdmin,
          configured: true,
        })
      }
    }

    void supabase.auth.getSession().then(({ data }) => sync(data.session))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void sync(session)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  return state
}
