// Headless browser verify för flygare.nu live-audit.
// Kör: cd scripts && npm install && npm run verify
// Env: FRONTEND_URL (default https://flygare.nu)
import puppeteer from 'puppeteer-core'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, 'artifacts')
const FE = process.env.FRONTEND_URL || 'https://flygare.nu'

const ROUTES = [
  { name: 'home',                 url: `${FE}/` },
  { name: 'flyga-i-are-index',    url: `${FE}/flyga-i-are` },
  { name: 'flyga-sakerhet',       url: `${FE}/flyga-i-are/sakerhet` },
  { name: 'flyga-xc',             url: `${FE}/flyga-i-are/xc` },
  { name: 'flyga-flygregler',     url: `${FE}/flyga-i-are/flygregler` },
  { name: 'flyga-skistar',        url: `${FE}/flyga-i-are/skistar` },
  { name: 'flyga-acro',           url: `${FE}/flyga-i-are/acro` },
  { name: 'flyga-vader',          url: `${FE}/flyga-i-are/vader` },
  { name: 'flyga-speedrider',     url: `${FE}/flyga-i-are/speedrider` },
  { name: 'flyga-startplatser',   url: `${FE}/flyga-i-are/startplatser` },
  { name: 'flyga-hangflyg',       url: `${FE}/flyga-i-are/hangflyg` },
  { name: 'flyga-klubbuss',       url: `${FE}/flyga-i-are/klubbuss` },
  { name: 'flyga-paramotor',      url: `${FE}/flyga-i-are/paramotor` },
  { name: 'nyheter',              url: `${FE}/nyheter` },
  { name: 'nyheter-aktiviteter',  url: `${FE}/nyheter?category=Aktiviteter` },
  { name: 'aktiviteter',          url: `${FE}/aktiviteter` },
  { name: 'aktiviteter-kalender', url: `${FE}/aktiviteter/kalender` },
  { name: 'aktiviteter-klubbresor', url: `${FE}/aktiviteter/klubbresor` },
  { name: 'aktiviteter-arsmoten', url: `${FE}/aktiviteter/arsmoten` },
  { name: 'tavlingar',            url: `${FE}/tavlingar` },
  { name: 'tavling-are-ppc',      url: `${FE}/tavlingar/are-ppc` },
  { name: 'tavling-topplandning', url: `${FE}/tavlingar/topplandning` },
  { name: 'tavling-sverige-cup',  url: `${FE}/tavlingar/sverige-cup` },
  { name: 'tavling-stipendium',   url: `${FE}/tavlingar/stipendium` },
  { name: 'om',                   url: `${FE}/om` },
  { name: 'om-styrelsen',         url: `${FE}/om/styrelsen` },
  { name: 'om-klubbprodukter',    url: `${FE}/om/klubbprodukter` },
  { name: 'om-stadgar',           url: `${FE}/om/stadgar` },
  { name: 'kontakt',              url: `${FE}/kontakt` },
  { name: 'bli-medlem',           url: `${FE}/bli-medlem` },
  { name: 'ovrigt-foton',         url: `${FE}/ovrigt/foton` },
  { name: 'ovrigt-dokument',      url: `${FE}/ovrigt/dokument` },
]

const VIEWPORTS = [
  { key: 'desktop', width: 1440, height: 900, dpr: 2 },
  { key: 'mobile',  width: 390,  height: 844, dpr: 3 },
]

function short(s, n = 200) { return String(s).replace(/\s+/g, ' ').slice(0, n) }

async function run() {
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const CANDIDATES = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Brave Browser Nightly.app/Contents/MacOS/Brave Browser Nightly',
  ].filter(Boolean)
  const executablePath = CANDIDATES.find((p) => existsSync(p))
  if (!executablePath) throw new Error(`No usable Chrome found. Tried: ${CANDIDATES.join(', ')}`)
  console.log(`using: ${executablePath}\nfrontend: ${FE}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const summary = []
  for (const route of ROUTES) {
    const routeReport = { name: route.name, url: route.url, viewports: [] }

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage()
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.dpr })

      const failedRequests = []
      const consoleErrors = []
      const pageErrors = []

      // Ignorera data:-URIs. Chromium rapporterar dessa som "failed"
      // trots att fonten laddas korrekt (inline base64). Blir 100+
      // false-positive-failures per route annars.
      const isNoise = (url) => url.startsWith('data:')

      page.on('response', (res) => {
        const status = res.status()
        if (status >= 400 && !isNoise(res.url())) {
          failedRequests.push({ status, url: res.url() })
        }
      })
      page.on('requestfailed', (req) => {
        if (isNoise(req.url())) return
        const err = req.failure()?.errorText || ''
        failedRequests.push({ status: 0, url: req.url(), reason: err })
      })
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return
        const loc = msg.location?.() || {}
        if (loc.url && isNoise(loc.url)) return
        const text = msg.text()
        // "Failed to load resource" med data:-URL i suffixet — samma noise.
        if (text.includes('data:font/') || text.includes('data:image/')) return
        const suffix = loc.url ? ` :: ${loc.url}` : ''
        consoleErrors.push(short(text + suffix, 400))
      })
      page.on('pageerror', (err) => pageErrors.push(short(err.message, 300)))

      let status = 0
      let title = ''
      let error = null
      try {
        const resp = await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 30_000 })
        status = resp?.status() ?? 0
        title = await page.title().catch(() => '')
      } catch (e) {
        error = e.message
      }

      await new Promise((r) => setTimeout(r, 1_500))

      try {
        await page.evaluate(async (vh) => {
          const total = document.documentElement.scrollHeight
          const step = Math.max(200, vh - 100)
          for (let y = 0; y < total; y += step) {
            window.scrollTo(0, y)
            await new Promise((r) => setTimeout(r, 120))
          }
          window.scrollTo(0, total)
          await new Promise((r) => setTimeout(r, 400))
          window.scrollTo(0, 0)
          await new Promise((r) => setTimeout(r, 200))
        }, vp.height)
      } catch { /* ignore */ }

      const filename = `${route.name}-${vp.key}.png`
      const shotOk = status && status < 400 && !error
      if (shotOk) {
        try {
          await page.screenshot({ path: join(OUT, filename), fullPage: true })
        } catch (e) { error = `screenshot: ${e.message}` }
      }

      routeReport.viewports.push({
        viewport: vp.key,
        size: `${vp.width}x${vp.height}`,
        status,
        title,
        screenshot: shotOk ? filename : null,
        error,
        failedRequests,
        consoleErrors,
        pageErrors,
      })

      await page.close()
    }

    summary.push(routeReport)
  }

  await browser.close()

  let report = `# Verify report\n\ngenerated: ${new Date().toISOString()}\nfrontend: ${FE}\n\n`
  let bad = 0
  for (const r of summary) {
    report += `## ${r.name} — ${r.url}\n`
    for (const v of r.viewports) {
      const ok =
        v.status && v.status < 400 &&
        !v.error &&
        v.failedRequests.length === 0 &&
        v.consoleErrors.length === 0 &&
        v.pageErrors.length === 0
      if (!ok) bad++
      report += `- [${v.viewport} ${v.size}] status=${v.status} title=${JSON.stringify(v.title)} shot=${v.screenshot ?? '—'}${ok ? ' · OK' : ' · FAIL'}\n`
      if (v.error) report += `    error: ${v.error}\n`
      if (v.failedRequests.length) {
        report += `    failedRequests (${v.failedRequests.length}):\n`
        for (const f of v.failedRequests) report += `      - ${f.status} ${f.url}${f.reason ? ' :: ' + f.reason : ''}\n`
      }
      if (v.consoleErrors.length) {
        report += `    consoleErrors (${v.consoleErrors.length}):\n`
        for (const e of v.consoleErrors) report += `      - ${e}\n`
      }
      if (v.pageErrors.length) {
        report += `    pageErrors (${v.pageErrors.length}):\n`
        for (const e of v.pageErrors) report += `      - ${e}\n`
      }
    }
    report += '\n'
  }
  report += `\n# Summary\n\nroutes: ${summary.length} · viewports: ${summary.length * VIEWPORTS.length} · failing: ${bad}\n`
  await writeFile(join(OUT, 'report.txt'), report)
  console.log(report)
  process.exit(bad > 0 ? 1 : 0)
}

run().catch((e) => { console.error(e); process.exit(2) })
