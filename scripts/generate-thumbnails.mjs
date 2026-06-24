// Generate gallery thumbnails from the live sample routes.
// Run with a Vite dev/preview server running:
//   node scripts/generate-thumbnails.mjs http://localhost:5173
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:5173'
const OUT = join('public', 'thumbnails')
const VIEWPORT = { width: 1280, height: 800 }
const THUMBNAIL_HEIGHT = 720

mkdirSync(OUT, { recursive: true })

const registry = readFileSync(join('src', 'samples', 'registry.ts'), 'utf8')
const sampleIds = [...registry.matchAll(/id: '([^']+)'/g)].map((match) => match[1])

if (sampleIds.length === 0) {
  throw new Error('No sample ids found in src/samples/registry.ts')
}

const browser = await chromium.launch()

try {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })

  for (const id of sampleIds) {
    const page = await context.newPage()
    const url = `${BASE}/sample/${id}`

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
    } catch {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 })
    }

    await page.waitForSelector(`.sample-${id}`, { timeout: 20000 })
    await page.waitForTimeout(500)

    const sampleRoot = page.locator(`.sample-${id}`).first()
    const box = await sampleRoot.boundingBox()

    if (!box) {
      throw new Error(`Could not measure .sample-${id}`)
    }

    const clip = {
      x: Math.max(0, Math.floor(box.x)),
      y: Math.max(0, Math.floor(box.y)),
      width: Math.min(VIEWPORT.width, Math.ceil(box.width)),
      height: Math.min(THUMBNAIL_HEIGHT, Math.ceil(box.height)),
    }

    await page.screenshot({
      path: join(OUT, `${id}.png`),
      clip,
    })

    console.log(`OK ${id}`)
    await page.close()
  }

  await context.close()
} finally {
  await browser.close()
}

console.log(`Generated ${sampleIds.length} thumbnails in ${OUT}`)
