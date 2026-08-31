/** Google Drive “Share → anyone with the link” URLs are HTML pages, not images. */

const DRIVE_FILE_ID = /(?:\/file\/d\/|[?&]id=)([\w-]{20,})/

export function googleDriveFileId(url: string): string | undefined {
  if (!/https?:\/\/(?:drive|docs)\.google\.com\//i.test(url)) return undefined
  return url.match(DRIVE_FILE_ID)?.[1]
}

export function googleDriveImageUrl(url: string): string | undefined {
  const id = googleDriveFileId(url)
  if (!id) return undefined
  return `https://lh3.googleusercontent.com/d/${id}=s1200`
}

/**
 * Pick an <img>-safe photo URL.
 * Prefers a bundled /team/ path when the CMS value is a Drive share page.
 */
export function resolvePersonPhoto(photo?: string, fallbackLocal?: string): string | undefined {
  const trimmed = photo?.trim()
  const fallback = fallbackLocal?.trim() || undefined
  if (!trimmed) return fallback

  const driveImage = googleDriveImageUrl(trimmed)
  if (driveImage) {
    if (fallback?.startsWith("/")) return fallback
    return driveImage
  }

  return trimmed
}

export function fallbackPhotoForName(name: string, people: { name: string; photo?: string }[]) {
  const key = name.trim().toLowerCase()
  return people.find((person) => person.name.trim().toLowerCase() === key)?.photo
}
