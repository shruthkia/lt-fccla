import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  defaultSiteBundle,
  recordsFromBundle,
  type SiteBundle,
  type SiteContentKey,
} from "../data/siteBundle"
import { fetchSiteBundle, saveSiteSection } from "../lib/siteContent"
import { isSupabaseConfigured } from "../lib/supabase"

type SiteContentContextValue = {
  bundle: SiteBundle
  loading: boolean
  refresh: () => Promise<void>
  saveSection: <K extends SiteContentKey>(key: K, data: SiteBundle[K]) => Promise<void>
  competitionRecords: ReturnType<typeof recordsFromBundle>
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<SiteBundle>(defaultSiteBundle)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setBundle(defaultSiteBundle)
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      setBundle(await fetchSiteBundle())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const saveSection = useCallback(
    async <K extends SiteContentKey>(key: K, data: SiteBundle[K]) => {
      await saveSiteSection(key, data)
      setBundle((prev) => ({ ...prev, [key]: data }))
    },
    [],
  )

  const competitionRecords = useMemo(() => recordsFromBundle(bundle), [bundle])

  const value = useMemo(
    () => ({ bundle, loading, refresh, saveSection, competitionRecords }),
    [bundle, loading, refresh, saveSection, competitionRecords],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider")
  return ctx
}

/** Convenience accessors for page components. */
export function useSite() {
  const { bundle, competitionRecords, loading } = useSiteContent()
  return { ...bundle, competitionRecords, loading }
}
