// Visual QA: screenshot every route at desktop + mobile widths and capture
// per-page console errors/warnings + uncaught page errors against the
// production preview build. Run: node scripts/visual-qa.mjs [baseURL]
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.argv[2] || 'http://localhost:4173'
const OUT = process.env.VISUAL_QA_OUT || '.omc/visual-qa'
mkdirSync(OUT, { recursive: true })

const sampleIds = [
  'aurora-landing', 'softdeck-retro', 'zenith-saas',
  'pulse-dashboard', 'vault-finance', 'flow-crm',
  'slab-shop', 'lumiere-store', 'fresh-market',
  'nebula-folio', 'atelier-studio', 'lens-gallery',
  'quill-journal', 'pulse-stream', 'daily-wire',
  'inkwell-blog', 'prism-blog', 'mono-devlog',
  'press-brut', 'velvet-blog', 'halo-neon',
  'converse-chat', 'tempo-music', 'board-tasks',
]

const requested = process.argv[3]?.split(',')
const routes = [
  { id: 'gallery', path: '/' },
  ...sampleIds.map((id) => ({ id, path: `/sample/${id}` })),
].filter(route => !requested || requested.includes(route.id))

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const report = []

const browser = await chromium.launch()
try {
  for (const route of routes) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        // Respect reduced-motion so scroll-reveal (whileInView) sections that
        // gate on it render immediately instead of holding at opacity:0.
        reducedMotion: 'reduce',
      })
      const page = await context.newPage()
      const messages = []
      page.on('console', (msg) => {
        const t = msg.type()
        if (t === 'error' || t === 'warning') messages.push({ type: t, text: msg.text() })
      })
      page.on('pageerror', (err) => messages.push({ type: 'pageerror', text: String(err) }))

      const url = BASE + route.path
      let ok = true
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
      } catch {
        try {
          await page.goto(url, { waitUntil: 'load', timeout: 20000 })
        } catch (e) {
          ok = false
          messages.push({ type: 'navigation', text: String(e) })
        }
      }
      // Scroll through the whole page to trigger any IntersectionObserver /
      // whileInView reveals, then return to top so the full-page capture shows
      // every section as a real user would after scrolling.
      try {
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let y = 0
            const step = () => {
              y += Math.round(window.innerHeight * 0.8)
              window.scrollTo(0, y)
              if (y < document.body.scrollHeight) setTimeout(step, 80)
              else {
                window.scrollTo(0, 0)
                setTimeout(resolve, 50)
              }
            }
            step()
          })
        })
      } catch {
        /* ignore scroll errors */
      }
      await page.waitForTimeout(700)

      const diagnostics = await page.evaluate(async (id) => {
        const root = id === 'gallery' ? document.querySelector('.showcase-gallery') : document.querySelector('.sample-' + id)
        const backgrounds = [...new Set(Array.from(root?.querySelectorAll('*') ?? []).flatMap(el =>
          Array.from(getComputedStyle(el).backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g), match => match[1]),
        ))]
        const backgroundResults = await Promise.all(backgrounds.map(src => new Promise(resolve => {
          const img = new Image()
          img.onload = () => resolve(null)
          img.onerror = () => resolve(src)
          img.src = src
          setTimeout(() => resolve(img.complete && img.naturalWidth ? null : src), 5000)
        })))
        return {
          title: document.title,
          hasContent: !!root && root.textContent.trim().length > 30,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          brokenImages: Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')),
          brokenBackgrounds: backgroundResults.filter(Boolean),
          frameworkOverlay: !!document.querySelector('vite-error-overlay'),
        }
      }, route.id)
      if (!diagnostics.hasContent || diagnostics.frameworkOverlay || diagnostics.horizontalOverflow || diagnostics.brokenImages.length || diagnostics.brokenBackgrounds.length) {
        ok = false
        messages.push({ type: 'layout', text: JSON.stringify(diagnostics) })
      }

      const file = `${OUT}/${route.id}-${vp.name}.png`
      try {
        await page.screenshot({ path: file, fullPage: true })
      } catch (e) {
        ok = false
        messages.push({ type: 'screenshot', text: String(e) })
      }

      const errors = messages.filter((m) => m.type !== 'warning')
      report.push({
        route: route.id,
        viewport: vp.name,
        url,
        ok,
        errorCount: errors.length,
        warningCount: messages.length - errors.length,
        messages,
        file,
        diagnostics,
      })
      console.log(
        `${ok ? 'OK ' : 'ERR'} ${route.id} [${vp.name}]  errors=${errors.length} warnings=${messages.length - errors.length}`,
      )
      await context.close()
    }
  }
} finally {
  await browser.close()
}

writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2))

const totalErrors = report.reduce((s, r) => s + r.errorCount, 0)
const totalWarnings = report.reduce((s, r) => s + r.warningCount, 0)
console.log(`\n=== Visual QA summary ===`)
console.log(`pages captured: ${report.length}`)
console.log(`total console errors / pageerrors: ${totalErrors}`)
console.log(`total console warnings: ${totalWarnings}`)
if (totalErrors > 0) {
  console.log(`\n--- pages with errors ---`)
  for (const r of report.filter((r) => r.errorCount > 0)) {
    console.log(`${r.route} [${r.viewport}]:`)
    for (const m of r.messages.filter((m) => m.type !== 'warning')) {
      console.log(`  [${m.type}] ${m.text}`)
    }
  }
}
process.exit(report.some(r => !r.ok || r.errorCount > 0) ? 1 : 0)
