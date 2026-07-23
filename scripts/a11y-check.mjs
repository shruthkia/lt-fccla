import puppeteer from "puppeteer"
import { AxePuppeteer } from "@axe-core/puppeteer"
import fs from "node:fs"

const base = process.env.A11Y_BASE || "http://127.0.0.1:4173"
const paths = ["/", "/join", "/adopurr", "/portal", "/officers", "/faq"]

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  let seriousCount = 0
  const summary = []

  for (const path of paths) {
    const url = `${base}${path}`
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })

    // Exclude third-party Google Form iframe content we do not control.
    const results = await new AxePuppeteer(page)
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude("iframe")
      .analyze()

    const serious = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact || ""),
    )
    seriousCount += serious.length

    summary.push({
      path,
      violations: results.violations.length,
      serious: serious.length,
      details: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 5).map((n) => n.target),
      })),
    })

    console.log(`\n=== ${path} ===`)
    if (results.violations.length === 0) {
      console.log("No WCAG 2 A/AA violations (excluding iframes).")
    } else {
      for (const v of results.violations) {
        console.log(`[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`)
        for (const n of v.nodes.slice(0, 3)) {
          console.log(`  - ${JSON.stringify(n.target)}`)
        }
      }
    }
  }

  await browser.close()
  const out = "/tmp/a11y-summary.json"
  fs.writeFileSync(out, JSON.stringify(summary, null, 2))
  console.log(`\nWrote ${out}`)
  console.log(`Serious/critical violation groups: ${seriousCount}`)
  process.exit(seriousCount > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
