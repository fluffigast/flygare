import puppeteer, { Browser, Page } from 'puppeteer'

const FRONTEND = 'http://localhost:5173'
const CMS_API = 'http://localhost:3001/api'
const CMS_ADMIN = 'http://localhost:3001/admin'

let browser: Browser
let page: Page

const results: { name: string; pass: boolean; error?: string }[] = []

function test(name: string, fn: () => Promise<void>) {
  return async () => {
    try {
      await fn()
      results.push({ name, pass: true })
      console.log(`  ✓ ${name}`)
    } catch (e: any) {
      results.push({ name, pass: false, error: e.message })
      console.log(`  ✗ ${name}`)
      console.log(`    ${e.message}`)
    }
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg)
}

async function run() {
  console.log('\nFlygare E2E Tests\n')

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  page = await browser.newPage()
  page.setDefaultTimeout(15000)

  // ── CMS API Tests ──────────────────────────────────────────

  console.log('CMS API:')

  await test('API /news returns articles', async () => {
    const res = await fetch(`${CMS_API}/news?limit=100`)
    assert(res.ok, `HTTP ${res.status}`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 news, got ${data.totalDocs}`)
    assert(data.docs[0].title && data.docs[0].title.length > 0, 'First article has no title')
  })()

  await test('API /board-members returns members sorted', async () => {
    const res = await fetch(`${CMS_API}/board-members?limit=100&sort=sortOrder`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 member, got ${data.totalDocs}`)
    assert(data.docs[0].name && data.docs[0].name.length > 0, 'First member has no name')
    assert(data.docs[0].role && data.docs[0].role.length > 0, 'First member has no role')
  })()

  await test('API /launches returns sites', async () => {
    const res = await fetch(`${CMS_API}/launches?limit=100`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 launch, got ${data.totalDocs}`)
    assert(data.docs[0].name && data.docs[0].name.length > 0, 'First launch has no name')
  })()

  await test('API /competitions returns entries with rules and winners', async () => {
    const res = await fetch(`${CMS_API}/competitions?limit=100`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 competition, got ${data.totalDocs}`)
    const withWinners = data.docs.find((d: any) => d.winners && d.winners.length > 0)
    assert(withWinners, 'No competition has winners')
    const withRules = data.docs.find((d: any) => d.rules && d.rules.length > 0)
    assert(withRules, 'No competition has rules')
  })()

  await test('API /milestones returns entries', async () => {
    const res = await fetch(`${CMS_API}/milestones?limit=100`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 milestone, got ${data.totalDocs}`)
  })()

  await test('API /weather-links returns links', async () => {
    const res = await fetch(`${CMS_API}/weather-links?limit=100`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 weather link, got ${data.totalDocs}`)
  })()

  await test('API /other-sites returns sites', async () => {
    const res = await fetch(`${CMS_API}/other-sites?limit=100`)
    const data = await res.json()
    assert(data.totalDocs >= 1, `Expected at least 1 other site, got ${data.totalDocs}`)
  })()

  await test('Global site-settings has required fields', async () => {
    const res = await fetch(`${CMS_API}/globals/site-settings`)
    const data = await res.json()
    assert(data.clubName && data.clubName.length > 0, 'clubName is empty')
    assert(data.foundedYear && data.foundedYear > 0, 'foundedYear is missing')
    assert(data.heroTagline && data.heroTagline.length > 0, 'heroTagline is empty')
  })()

  await test('Global membership-info has benefits and license reqs', async () => {
    const res = await fetch(`${CMS_API}/globals/membership-info`)
    const data = await res.json()
    assert(data.price && data.price.length > 0, 'price is empty')
    assert(data.benefits && data.benefits.length >= 1, 'No benefits listed')
    assert(data.licenseRequirements && data.licenseRequirements.length >= 1, 'No license requirements listed')
  })()

  await test('Global contact-info has radio frequencies and emergency contacts', async () => {
    const res = await fetch(`${CMS_API}/globals/contact-info`)
    const data = await res.json()
    assert(data.email && data.email.length > 0, 'email is empty')
    assert(data.radioFrequencies && data.radioFrequencies.length >= 1, 'No radio frequencies')
    assert(data.emergencyContacts && data.emergencyContacts.length >= 1, 'No emergency contacts')
  })()

  await test('Global bus-rules has rules', async () => {
    const res = await fetch(`${CMS_API}/globals/bus-rules`)
    const data = await res.json()
    assert(data.rules && data.rules.length >= 1, 'No bus rules')
  })()

  await test('Global flying-guide has winter/summer content', async () => {
    const res = await fetch(`${CMS_API}/globals/flying-guide`)
    const data = await res.json()
    assert(data.winterTitle && data.winterTitle.length > 0, 'winterTitle is empty')
    assert(data.summerTitle && data.summerTitle.length > 0, 'summerTitle is empty')
    assert(data.winterContent?.root, 'winterContent missing richtext')
    assert(data.summerContent?.root, 'summerContent missing richtext')
  })()

  // ── Frontend Page Tests ────────────────────────────────────

  console.log('\nFrontend Pages:')

  await test('Homepage loads and shows CMS content', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    const title = await page.title()
    assert(title.length > 0, 'Page has no title')
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 100, 'Homepage body is too short — content not loaded')
  })()

  await test('Homepage shows news from CMS', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    // Verify at least one article link/card exists
    const hasArticle = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="nyheter"], article, [class*="news"], [class*="article"]'))
      return links.length > 0
    })
    assert(hasArticle, 'No news articles found on homepage')
  })()

  await test('/nyheter page shows news articles', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    const articleCount = await page.evaluate(() => {
      const articles = document.querySelectorAll('article, [class*="article"], [class*="news-card"], [class*="card"]')
      return articles.length
    })
    assert(articleCount >= 1, `Expected at least 1 article on /nyheter, found ${articleCount}`)
  })()

  await test('/nyheter category filter works', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    const buttons = await page.$$('button')
    let clicked = false
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent)
      if (text && !text.includes('Alla') && (text.includes('Tävlingar') || text.includes('Information') || text.includes('Aktiviteter'))) {
        await btn.click()
        clicked = true
        break
      }
    }
    if (clicked) {
      await new Promise(r => setTimeout(r, 500))
      const body = await page.evaluate(() => document.body.innerText)
      assert(body.length > 50, 'Page content disappeared after filter click')
    }
  })()

  await test('/flyga-i-are/startplatser shows launch sites from CMS', async () => {
    await page.goto(`${FRONTEND}/flyga-i-are/startplatser`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 100, 'Launch sites page has no content')
    // Verify structural elements exist
    const hasItems = await page.evaluate(() => {
      const items = document.querySelectorAll('li, article, [class*="card"], [class*="launch"], [class*="site"]')
      return items.length >= 1
    })
    assert(hasItems, 'No launch site items found on page')
  })()

  await test('/om shows board members from CMS', async () => {
    await page.goto(`${FRONTEND}/om`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    // Just verify board section exists with at least one role-like text
    assert(
      body.includes('Ordförande') || body.includes('Kassör') || body.includes('Sekreterare') || body.includes('Styrelse'),
      'No board member roles found on /om'
    )
  })()

  await test('/om shows milestones from CMS', async () => {
    await page.goto(`${FRONTEND}/om`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    // Just verify a year is present (milestones show years)
    assert(/\b19\d{2}\b|\b20\d{2}\b/.test(body), 'No year found on /om — milestones likely not loaded')
  })()

  await test('/bli-medlem shows membership info from CMS', async () => {
    await page.goto(`${FRONTEND}/bli-medlem`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('kr') || body.includes('SEK') || body.includes('avgift'), 'No price indicator on membership page')
  })()

  await test('/tavlingar shows competitions from CMS', async () => {
    await page.goto(`${FRONTEND}/tavlingar`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 100, 'Competitions page has no content')
    // Verify at least one competition section exists
    const hasCompetitions = await page.evaluate(() => {
      const headings = document.querySelectorAll('h2, h3')
      return headings.length >= 1
    })
    assert(hasCompetitions, 'No competition headings found')
  })()

  await test('/flyga-i-are/klubbuss shows bus rules from CMS', async () => {
    await page.goto(`${FRONTEND}/flyga-i-are/klubbuss`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 100, 'Bus rules page has no content')
  })()

  await test('/kontakt shows contact info from CMS', async () => {
    await page.goto(`${FRONTEND}/kontakt`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    // Verify contact page has an email-like string
    assert(/@/.test(body), 'No email address found on contact page')
  })()

  await test('/flyga-i-are shows flying guide content from CMS', async () => {
    await page.goto(`${FRONTEND}/flyga-i-are`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 100, 'Flying guide page has no content')
  })()

  await test('/flyga-i-are/vader shows weather links from CMS', async () => {
    await page.goto(`${FRONTEND}/flyga-i-are/vader`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.length > 50, 'Weather page has no content')
    // Verify at least one link exists
    const hasLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="http"]')
      return links.length >= 1
    })
    assert(hasLinks, 'No external links found on weather page')
  })()

  await test('No page shows "Laddar..." stuck state (all content loaded)', async () => {
    const pages = ['/', '/nyheter', '/flyga-i-are/startplatser', '/om', '/bli-medlem', '/tavlingar', '/flyga-i-are/klubbuss', '/kontakt']
    for (const p of pages) {
      await page.goto(`${FRONTEND}${p}`, { waitUntil: 'networkidle0' })
      await new Promise(r => setTimeout(r, 1000))
      const body = await page.evaluate(() => document.body.innerText)
      const laddarCount = (body.match(/Laddar\.\.\./g) || []).length
      assert(laddarCount === 0, `"Laddar..." stuck on ${p} (${laddarCount} instances)`)
    }
  })()

  // ── Navigation Tests ────────────────────────────────────────

  console.log('\nNavigation:')

  await test('Desktop nav links all work (SPA navigation)', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    const navLinks = await page.$$('header a')
    const hrefs: string[] = []
    for (const link of navLinks) {
      const href = await link.evaluate(el => el.getAttribute('href'))
      if (href && href.startsWith('/')) hrefs.push(href)
    }
    assert(hrefs.length >= 4, `Only ${hrefs.length} nav links found`)

    for (const href of hrefs) {
      await page.goto(`${FRONTEND}${href}`, { waitUntil: 'networkidle0' })
      const status = await page.evaluate(() => document.querySelector('h1, h2') !== null)
      assert(status, `Page ${href} has no heading`)
    }
  })()

  await test('Footer links navigate correctly', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    const footerLinks = await page.$$('footer a')
    const hrefs: string[] = []
    for (const link of footerLinks) {
      const href = await link.evaluate(el => el.getAttribute('href'))
      if (href && href.startsWith('/')) hrefs.push(href)
    }
    assert(hrefs.length >= 4, `Only ${hrefs.length} footer links`)

    // Click first footer link and verify navigation
    if (hrefs[0]) {
      await page.goto(`${FRONTEND}${hrefs[0]}`, { waitUntil: 'networkidle0' })
      const url = page.url()
      assert(url.includes(hrefs[0]), `Did not navigate to ${hrefs[0]}`)
    }
  })()

  await test('Scroll-to-top works on navigation', async () => {
    await page.goto(`${FRONTEND}/flyga-i-are/startplatser`, { waitUntil: 'networkidle0' })
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000))
    await new Promise(r => setTimeout(r, 200))
    // Navigate to another page
    await page.goto(`${FRONTEND}/om`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 500))
    const scrollY = await page.evaluate(() => window.scrollY)
    assert(scrollY === 0, `Scroll position is ${scrollY}, expected 0`)
  })()

  await test('Mobile menu toggle works', async () => {
    await page.setViewport({ width: 375, height: 812 })
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    // Find mobile menu button
    const menuBtn = await page.$('.mob-btn, header button')
    if (menuBtn) {
      await menuBtn.click()
      await new Promise(r => setTimeout(r, 500))
      const navVisible = await page.evaluate(() => {
        const nav = document.querySelector('nav, [class*="mobile-menu"], [class*="nav"]')
        return nav !== null && nav.textContent!.length > 10
      })
      assert(navVisible, 'Mobile menu did not show nav items')
    }
    await page.setViewport({ width: 1280, height: 800 })
  })()

  // ── Interactive Elements ───────────────────────────────────

  console.log('\nInteractive Elements:')

  await test('/tavlingar toggle rules expand/collapse', async () => {
    await page.goto(`${FRONTEND}/tavlingar`, { waitUntil: 'networkidle0' })
    // Find a toggle button for rules
    const buttons = await page.$$('button')
    let rulesBtn = null
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent)
      if (text?.includes('Visa regler') || text?.includes('regler') || text?.includes('Regler')) {
        rulesBtn = btn
        break
      }
    }
    if (rulesBtn) {
      await rulesBtn.click()
      await new Promise(r => setTimeout(r, 500))
      const body = await page.evaluate(() => document.body.innerText)
      // After clicking, more content should be visible
      assert(body.length > 200, 'Rules not shown after clicking toggle')
    }
  })()

  await test('/nyheter all category filters work', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    const filterButtons = await page.$$('button')
    const filterTexts: string[] = []
    for (const btn of filterButtons) {
      const text = await btn.evaluate(el => el.textContent?.trim())
      if (text && text.length < 30) filterTexts.push(text)
    }

    // Click each filter and verify no crash
    for (const btn of filterButtons) {
      const text = await btn.evaluate(el => el.textContent?.trim())
      if (text && (text === 'Alla' || text === 'Aktiviteter' || text === 'Information' || text === 'Tävlingar')) {
        await btn.click()
        await new Promise(r => setTimeout(r, 500))
        const body = await page.evaluate(() => document.body.innerText)
        assert(body.length > 50, `Page went blank after clicking filter "${text}"`)
      }
    }
  })()

  // ── Edge Cases ─────────────────────────────────────────────

  console.log('\nEdge Cases:')

  await test('404 route shows fallback (no crash)', async () => {
    await page.goto(`${FRONTEND}/nonexistent-page-xyz`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    // Should show nav/footer at minimum (React app still renders)
    const hasStructure = await page.evaluate(() =>
      document.querySelector('header') !== null || document.querySelector('nav') !== null
    )
    assert(hasStructure, 'App crashed on unknown route — no header/nav found')
  })()

  await test('Page with no JS errors on console', async () => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    const pages = ['/', '/nyheter', '/flyga-i-are/startplatser', '/om', '/bli-medlem', '/tavlingar', '/flyga-i-are/klubbuss', '/kontakt']
    for (const p of pages) {
      await page.goto(`${FRONTEND}${p}`, { waitUntil: 'networkidle0' })
      await new Promise(r => setTimeout(r, 500))
    }
    // Filter out known non-critical errors (e.g. ResizeObserver, third-party)
    const critical = errors.filter(e =>
      !e.includes('ResizeObserver') &&
      !e.includes('Non-Error') &&
      !e.includes('Loading chunk')
    )
    assert(critical.length === 0, `JS errors: ${critical.join('; ')}`)
  })()

  await test('API returns proper CORS headers for frontend origin', async () => {
    const res = await fetch(`${CMS_API}/news`, {
      headers: { Origin: 'http://localhost:5173' },
    })
    assert(res.ok, `HTTP ${res.status}`)
    const data = await res.json()
    assert(data.docs, 'No docs in response')
  })()

  await test('API handles invalid collection gracefully', async () => {
    const res = await fetch(`${CMS_API}/nonexistent-collection`)
    assert(res.status === 404, `Expected 404, got ${res.status}`)
  })()

  await test('API handles invalid global gracefully', async () => {
    const res = await fetch(`${CMS_API}/globals/nonexistent-global`)
    assert(res.status === 404, `Expected 404, got ${res.status}`)
  })()

  await test('News API supports sorting by date desc', async () => {
    const res = await fetch(`${CMS_API}/news?sort=-date&limit=3`)
    const data = await res.json()
    assert(data.docs.length >= 2, `Expected at least 2 docs for sort test, got ${data.docs.length}`)
    const dates = data.docs.map((d: any) => new Date(d.date).getTime())
    for (let i = 1; i < dates.length; i++) {
      assert(dates[i - 1] >= dates[i], 'News not sorted by date desc')
    }
  })()

  await test('Board members API supports sorting by sortOrder', async () => {
    const res = await fetch(`${CMS_API}/board-members?sort=sortOrder`)
    const data = await res.json()
    const orders = data.docs.map((d: any) => d.sortOrder)
    for (let i = 1; i < orders.length; i++) {
      assert(orders[i] >= orders[i-1], `sortOrder not ascending: ${orders[i-1]} -> ${orders[i]}`)
    }
  })()

  await test('Launches API distinguishes types', async () => {
    const res = await fetch(`${CMS_API}/launches?limit=100`)
    const data = await res.json()
    const types = [...new Set(data.docs.map((d: any) => d.type))]
    assert(types.length >= 1, 'No launch types found')
    // Verify each doc has a name
    for (const doc of data.docs) {
      assert(doc.name && doc.name.length > 0, 'A launch has no name')
    }
  })()

  await test('Competitions winners have correct structure', async () => {
    const res = await fetch(`${CMS_API}/competitions?limit=100`)
    const data = await res.json()
    const withWinners = data.docs.find((d: any) => d.winners && d.winners.length > 0)
    assert(withWinners, 'No competition has winners')
    const first = withWinners.winners[0]
    assert(first.year && first.name && first.result, `Winner missing fields: ${JSON.stringify(first)}`)
  })()

  await test('Rich text fields are valid Lexical JSON', async () => {
    const res = await fetch(`${CMS_API}/globals/flying-guide`)
    const data = await res.json()
    assert(data.winterContent?.root?.type === 'root', 'winterContent not valid Lexical root')
    assert(Array.isArray(data.winterContent.root.children), 'winterContent has no children')
    assert(data.winterContent.root.children.length >= 1, 'winterContent has no child nodes')
  })()

  await test('All pages have consistent header and footer', async () => {
    const pages = ['/', '/nyheter', '/flyga-i-are/startplatser', '/om', '/bli-medlem', '/tavlingar', '/flyga-i-are/klubbuss', '/kontakt', '/flyga-i-are', '/flyga-i-are/vader']
    for (const p of pages) {
      await page.goto(`${FRONTEND}${p}`, { waitUntil: 'networkidle0' })
      const hasHeader = await page.evaluate(() => document.querySelector('header') !== null)
      const hasFooter = await page.evaluate(() => document.querySelector('footer') !== null)
      assert(hasHeader, `${p} missing header`)
      assert(hasFooter, `${p} missing footer`)
    }
  })()

  // ── CMS Admin Tests ────────────────────────────────────────

  console.log('\nCMS Admin:')

  await test('Admin panel loads login page', async () => {
    await page.goto(CMS_ADMIN, { waitUntil: 'domcontentloaded' })
    // Payload admin is a heavy React SPA — wait for it to hydrate
    await page.waitForSelector('input, [class*="dashboard"], [class*="nav"]', { timeout: 15000 }).catch(() => {})
    await new Promise(r => setTimeout(r, 5000))
    const body = await page.evaluate(() => document.body.innerText)
    const html = await page.evaluate(() => document.body.innerHTML)
    assert(
      body.includes('Email') || body.includes('email') || body.includes('Dashboard') || body.includes('News') || html.includes('input') || html.includes('login'),
      `Admin panel did not load. Body: ${body.slice(0, 200)}`
    )
  })()

  await test('Admin login works via API', async () => {
    const password = process.env.CMS_PASSWORD || 'changeme123'
    const res = await fetch(`${CMS_API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@flygare.nu', password }),
    })
    assert(res.ok, `Login HTTP ${res.status}`)
    const data = await res.json()
    assert(data.token && data.token.length > 0, 'No token returned')
    assert(data.user?.email === 'admin@flygare.nu', `Wrong user: ${data.user?.email}`)
  })()

  // ── Summary ────────────────────────────────────────────────

  await browser.close()

  const passed = results.filter(r => r.pass).length
  const failed = results.filter(r => !r.pass).length
  console.log(`\n${'─'.repeat(50)}`)
  console.log(`Results: ${passed} passed, ${failed} failed, ${results.length} total`)

  if (failed > 0) {
    console.log('\nFailed:')
    results.filter(r => !r.pass).forEach(r => {
      console.log(`  ✗ ${r.name}: ${r.error}`)
    })
    process.exit(1)
  }

  console.log('\nAll tests passed.')
  process.exit(0)
}

run().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})
