/** Lightweight Markdown subset for chapter posts (no heavyweight editor dependency). */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function inlineFormat(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>")
  return out
}

export function renderSimpleMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i] ?? ""

    if (!line.trim()) {
      i += 1
      continue
    }

    if (/^###\s+/.test(line)) {
      html.push(`<h3>${inlineFormat(line.replace(/^###\s+/, ""))}</h3>`)
      i += 1
      continue
    }
    if (/^##\s+/.test(line)) {
      html.push(`<h2>${inlineFormat(line.replace(/^##\s+/, ""))}</h2>`)
      i += 1
      continue
    }
    if (/^#\s+/.test(line)) {
      html.push(`<h2>${inlineFormat(line.replace(/^#\s+/, ""))}</h2>`)
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i] ?? "")) {
        items.push(`<li>${inlineFormat((lines[i] ?? "").replace(/^[-*]\s+/, ""))}</li>`)
        i += 1
      }
      html.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i] ?? "")) {
        items.push(`<li>${inlineFormat((lines[i] ?? "").replace(/^\d+\.\s+/, ""))}</li>`)
        i += 1
      }
      html.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    const para: string[] = [line]
    i += 1
    while (i < lines.length && (lines[i] ?? "").trim() && !/^(#{1,3}\s+|[-*]\s+|\d+\.\s+)/.test(lines[i] ?? "")) {
      para.push(lines[i] ?? "")
      i += 1
    }
    html.push(`<p>${inlineFormat(para.join(" "))}</p>`)
  }

  return html.join("")
}

export function formatPostDate(iso: string | null | undefined): string {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
