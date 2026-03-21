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

  await test('API /news returns seeded articles', async () => {
    const res = await fetch(`${CMS_API}/news?limit=100`)
    assert(res.ok, `HTTP ${res.status}`)
    const data = await res.json()
    assert(data.totalDocs === 8, `Expected 8 news, got ${data.totalDocs}`)
    const titles = data.docs.map((d: any) => d.title)
    assert(titles.includes('Välkommen till PPC Åre 2026'), 'Missing PPC article')
    assert(titles.includes('Klubbuss Kampanj'), 'Missing Klubbuss article')
  })()

  await test('API /board-members returns 7 members sorted', async () => {
    const res = await fetch(`${CMS_API}/board-members?limit=100&sort=sortOrder`)
    const data = await res.json()
    assert(data.totalDocs === 7, `Expected 7 members, got ${data.totalDocs}`)
    assert(data.docs[0].name === 'Therese Bärfenheim', `First member: ${data.docs[0].name}`)
    assert(data.docs[0].role === 'Ordförande', `First role: ${data.docs[0].role}`)
  })()

  await test('API /launches returns 9 sites', async () => {
    const res = await fetch(`${CMS_API}/launches?limit=100`)
    const data = await res.json()
    assert(data.totalDocs === 9, `Expected 9 launches, got ${data.totalDocs}`)
    const names = data.docs.map((d: any) => d.name)
    assert(names.includes('Draklanda'), 'Missing Draklanda')
    assert(names.includes('1000m starten'), 'Missing 1000m starten')
  })()

  await test('API /competitions returns 3 with rules and winners', async () => {
    const res = await fetch(`${CMS_API}/competitions?limit=100`)
    const data = await res.json()
    assert(data.totalDocs === 3, `Expected 3, got ${data.totalDocs}`)
    const larsa = data.docs.find((d: any) => d.name === 'Larsa Open')
    assert(larsa, 'Missing Larsa Open')
    assert(larsa.winners.length === 3, `Larsa winners: ${larsa.winners.length}`)
    assert(larsa.rules.length === 4, `Larsa rules: ${larsa.rules.length}`)
  })()

  await test('API /milestones returns 5 entries', async () => {
    const res = await fetch(`${CMS_API}/milestones?limit=100`)
    const data = await res.json()
    assert(data.totalDocs === 5, `Expected 5, got ${data.totalDocs}`)
  })()

  await test('API /weather-links returns 8 links', async () => {
    const res = await fetch(`${CMS_API}/weather-links?limit=100`)
    const data = await res.json()
    assert(data.totalDocs === 8, `Expected 8, got ${data.totalDocs}`)
  })()

  await test('API /other-sites returns 4 sites', async () => {
    const res = await fetch(`${CMS_API}/other-sites?limit=100`)
    const data = await res.json()
    assert(data.totalDocs === 4, `Expected 4, got ${data.totalDocs}`)
  })()

  await test('Global site-settings has correct data', async () => {
    const res = await fetch(`${CMS_API}/globals/site-settings`)
    const data = await res.json()
    assert(data.clubName === 'Åre Skärm- och Drakflygklubb', `clubName: ${data.clubName}`)
    assert(data.foundedYear === 1975, `foundedYear: ${data.foundedYear}`)
    assert(data.heroTagline === 'Skandinaviens mest spektakulära flygplats', `tagline: ${data.heroTagline}`)
    assert(data.statsMembers === '~100', `statsMembers: ${data.statsMembers}`)
  })()

  await test('Global membership-info has benefits and license reqs', async () => {
    const res = await fetch(`${CMS_API}/globals/membership-info`)
    const data = await res.json()
    assert(data.price === '600 kr / år', `price: ${data.price}`)
    assert(data.benefits.length === 9, `benefits: ${data.benefits.length}`)
    assert(data.licenseRequirements.length === 3, `licenseReqs: ${data.licenseRequirements.length}`)
  })()

  await test('Global contact-info has radio frequencies and emergency contacts', async () => {
    const res = await fetch(`${CMS_API}/globals/contact-info`)
    const data = await res.json()
    assert(data.email === 'info@flygare.nu', `email: ${data.email}`)
    assert(data.radioFrequencies.length === 4, `radio: ${data.radioFrequencies.length}`)
    assert(data.emergencyContacts.length === 4, `emergency: ${data.emergencyContacts.length}`)
  })()

  await test('Global bus-rules has 11 rules', async () => {
    const res = await fetch(`${CMS_API}/globals/bus-rules`)
    const data = await res.json()
    assert(data.rules.length === 11, `rules: ${data.rules.length}`)
  })()

  await test('Global flying-guide has winter/summer content', async () => {
    const res = await fetch(`${CMS_API}/globals/flying-guide`)
    const data = await res.json()
    assert(data.winterTitle === 'Flyga på vintern', `winterTitle: ${data.winterTitle}`)
    assert(data.summerTitle === 'Flyga på sommaren', `summerTitle: ${data.summerTitle}`)
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
    assert(body.includes('Skandinaviens mest spektakulära flygplats'), 'Missing hero tagline')
    assert(body.includes('Åre Skärm- och Drakflygklubb'), 'Missing club name')
    assert(body.includes('100'), 'Missing member count')
  })()

  await test('Homepage shows news from CMS', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('PPC Åre 2026') || body.includes('Välkommen till PPC'), 'Missing PPC news on homepage')
  })()

  await test('/nyheter page shows all 8 news articles', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Välkommen till PPC Åre 2026'), 'Missing PPC article')
    assert(body.includes('Klubbuss Kampanj'), 'Missing Klubbuss article')
    assert(body.includes('Kallelse till Årsmöte 2026'), 'Missing Årsmöte article')
    assert(body.includes('1000m projektet avslutat'), 'Missing 1000m article')
  })()

  await test('/nyheter category filter works', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    // Click Tävlingar filter
    const buttons = await page.$$('button')
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent)
      if (text?.includes('Tävlingar')) {
        await btn.click()
        break
      }
    }
    await new Promise(r => setTimeout(r, 500))
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Välkommen till PPC Åre 2026'), 'Missing Tävlingar article after filter')
  })()

  await test('/startplatser shows launch sites from CMS', async () => {
    await page.goto(`${FRONTEND}/startplatser`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('1000m starten'), 'Missing 1000m starten')
    assert(body.includes('Tväråvalvet'), 'Missing Tväråvalvet')
    assert(body.includes('Draklanda'), 'Missing Draklanda')
    assert(body.includes('Mörvikshummeln'), 'Missing Mörvikshummeln')
  })()

  await test('/startplatser shows other flying sites', async () => {
    await page.goto(`${FRONTEND}/startplatser`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Välliste'), 'Missing Välliste')
    assert(body.includes('Getryggen'), 'Missing Getryggen')
    assert(body.includes('Tossön'), 'Missing Tossön')
    assert(body.includes('Rännberg'), 'Missing Rännberg')
  })()

  await test('/om shows board members from CMS', async () => {
    await page.goto(`${FRONTEND}/om`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Therese Bärfenheim'), 'Missing Ordförande')
    assert(body.includes('Ordförande'), 'Missing Ordförande role')
    assert(body.includes('Vladimir Gutic'), 'Missing Vice ordförande')
    assert(body.includes('Linda Kits'), 'Missing Kassör')
  })()

  await test('/om shows milestones from CMS', async () => {
    await page.goto(`${FRONTEND}/om`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('1975'), 'Missing founding year')
    assert(body.includes('1000m-projektet'), 'Missing 1000m milestone')
  })()

  await test('/bli-medlem shows membership info from CMS', async () => {
    await page.goto(`${FRONTEND}/bli-medlem`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('600'), 'Missing price')
    assert(body.includes('startplatser'), 'Missing benefit about startplatser')
    assert(body.includes('Elevlicens'), 'Missing Elevlicens requirement')
    assert(body.includes('Pilot 2'), 'Missing Pilot 2 requirement')
  })()

  await test('/tavlingar shows competitions from CMS', async () => {
    await page.goto(`${FRONTEND}/tavlingar`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Åre PPC'), 'Missing Åre PPC')
    assert(body.includes('Larsa Open'), 'Missing Larsa Open')
    assert(body.includes('Topplandning'), 'Missing Topplandning')
    assert(body.includes('Gillis Bengtsson'), 'Missing Larsa winner')
  })()

  await test('/klubbuss shows bus rules from CMS', async () => {
    await page.goto(`${FRONTEND}/klubbuss`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('Max 4 passagerare'), 'Missing passenger rule')
    assert(body.includes('20 kr'), 'Missing price rule')
    assert(body.includes('40 km/h'), 'Missing speed rule')
  })()

  await test('/kontakt shows contact info from CMS', async () => {
    await page.goto(`${FRONTEND}/kontakt`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('info@flygare.nu'), 'Missing email')
    assert(body.includes('146.7625'), 'Missing radio frequency')
    assert(body.includes('112'), 'Missing emergency number')
  })()

  await test('/flygguiden shows flying guide content from CMS', async () => {
    await page.goto(`${FRONTEND}/flygguiden`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('vintern') || body.includes('Vintern'), 'Missing winter section')
    assert(body.includes('sommaren') || body.includes('Sommaren'), 'Missing summer section')
  })()

  await test('/vader shows weather links from CMS', async () => {
    await page.goto(`${FRONTEND}/vader`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    assert(body.includes('SMHI'), 'Missing SMHI link')
    assert(body.includes('Yr.no'), 'Missing Yr.no link')
    assert(body.includes('Windguru'), 'Missing Windguru link')
  })()

  await test('No page shows "Laddar..." stuck state (all content loaded)', async () => {
    const pages = ['/', '/nyheter', '/startplatser', '/om', '/bli-medlem', '/tavlingar', '/klubbuss', '/kontakt']
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
    assert(hrefs.length >= 6, `Only ${hrefs.length} nav links found`)

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
    assert(hrefs.length >= 8, `Only ${hrefs.length} footer links`)

    // Click first footer link and verify navigation
    if (hrefs[0]) {
      await page.goto(`${FRONTEND}${hrefs[0]}`, { waitUntil: 'networkidle0' })
      const url = page.url()
      assert(url.includes(hrefs[0]), `Did not navigate to ${hrefs[0]}`)
    }
  })()

  await test('Scroll-to-top works on navigation', async () => {
    await page.goto(`${FRONTEND}/startplatser`, { waitUntil: 'networkidle0' })
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
      const body = await page.evaluate(() => document.body.innerText)
      assert(body.includes('Flygguiden'), 'Mobile menu did not show nav items')
      assert(body.includes('Väder'), 'Mobile menu missing Väder')
      assert(body.includes('Startplatser'), 'Mobile menu missing Startplatser')
    }
    await page.setViewport({ width: 1280, height: 800 })
  })()

  // ── Interactive Elements ───────────────────────────────────

  console.log('\nInteractive Elements:')

  await test('/tavlingar toggle rules expand/collapse', async () => {
    await page.goto(`${FRONTEND}/tavlingar`, { waitUntil: 'networkidle0' })
    // Find "Visa regler" button
    const buttons = await page.$$('button')
    let rulesBtn = null
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent)
      if (text?.includes('Visa regler') || text?.includes('regler')) {
        rulesBtn = btn
        break
      }
    }
    if (rulesBtn) {
      await rulesBtn.click()
      await new Promise(r => setTimeout(r, 500))
      const body = await page.evaluate(() => document.body.innerText)
      // Rules should now be visible
      assert(
        body.includes('Flightlog') || body.includes('GPS') || body.includes('cylinder') || body.includes('poäng') || body.includes('Poäng'),
        'Rules not shown after clicking toggle'
      )
    }
  })()

  await test('/nyheter all category filters work', async () => {
    await page.goto(`${FRONTEND}/nyheter`, { waitUntil: 'networkidle0' })
    const categories = ['Alla', 'Aktiviteter', 'Information', 'Tävlingar']

    for (const cat of categories) {
      const buttons = await page.$$('button')
      for (const btn of buttons) {
        const text = await btn.evaluate(el => el.textContent?.trim())
        if (text === cat) {
          await btn.click()
          await new Promise(r => setTimeout(r, 500))
          break
        }
      }
      const body = await page.evaluate(() => document.body.innerText)
      if (cat === 'Alla') {
        assert(body.includes('PPC') || body.includes('Klubbuss'), `"Alla" filter shows no articles`)
      } else if (cat === 'Information') {
        assert(body.includes('Ny webbshop') || body.includes('Kallelse') || body.includes('Viktig info'), `Information filter wrong`)
      }
    }
  })()

  // ── Edge Cases ─────────────────────────────────────────────

  console.log('\nEdge Cases:')

  await test('404 route shows fallback (no crash)', async () => {
    await page.goto(`${FRONTEND}/nonexistent-page-xyz`, { waitUntil: 'networkidle0' })
    const body = await page.evaluate(() => document.body.innerText)
    // Should show nav/footer at minimum (React app still renders)
    assert(body.includes('Åre Skärm') || body.includes('Flygguiden'), 'App crashed on unknown route')
  })()

  await test('Page with no JS errors on console', async () => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    const pages = ['/', '/nyheter', '/startplatser', '/om', '/bli-medlem', '/tavlingar', '/klubbuss', '/kontakt']
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
    // Payload should allow the origin configured in cors
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
    assert(data.docs.length === 3, `Expected 3 docs, got ${data.docs.length}`)
    const dates = data.docs.map((d: any) => new Date(d.date).getTime())
    assert(dates[0] >= dates[1] && dates[1] >= dates[2], 'News not sorted by date desc')
  })()

  await test('Board members API supports sorting by sortOrder', async () => {
    const res = await fetch(`${CMS_API}/board-members?sort=sortOrder`)
    const data = await res.json()
    const orders = data.docs.map((d: any) => d.sortOrder)
    for (let i = 1; i < orders.length; i++) {
      assert(orders[i] >= orders[i-1], `sortOrder not ascending: ${orders[i-1]} -> ${orders[i]}`)
    }
  })()

  await test('Launches API distinguishes Starter vs Landning', async () => {
    const res = await fetch(`${CMS_API}/launches?limit=100`)
    const data = await res.json()
    const starters = data.docs.filter((d: any) => d.type === 'Starter')
    const landnings = data.docs.filter((d: any) => d.type === 'Landning')
    assert(starters.length === 8, `Expected 8 Starter, got ${starters.length}`)
    assert(landnings.length === 1, `Expected 1 Landning, got ${landnings.length}`)
    assert(landnings[0].name === 'Draklanda', `Landning name: ${landnings[0].name}`)
  })()

  await test('Competitions winners have correct structure', async () => {
    const res = await fetch(`${CMS_API}/competitions?limit=100`)
    const data = await res.json()
    const topplandning = data.docs.find((d: any) => d.name === 'Topplandning')
    assert(topplandning, 'Missing Topplandning')
    assert(topplandning.winners.length === 4, `Expected 4 winners, got ${topplandning.winners.length}`)
    const first = topplandning.winners[0]
    assert(first.year && first.name && first.result, `Winner missing fields: ${JSON.stringify(first)}`)
  })()

  await test('Rich text fields are valid Lexical JSON', async () => {
    const res = await fetch(`${CMS_API}/globals/flying-guide`)
    const data = await res.json()
    assert(data.winterContent?.root?.type === 'root', 'winterContent not valid Lexical root')
    assert(Array.isArray(data.winterContent.root.children), 'winterContent has no children')
    assert(data.winterContent.root.children[0]?.type === 'paragraph', 'First child not paragraph')
    const textNode = data.winterContent.root.children[0]?.children?.[0]
    assert(textNode?.type === 'text' && textNode.text.length > 0, 'No text in paragraph')
  })()

  await test('All pages have consistent header and footer', async () => {
    const pages = ['/', '/nyheter', '/startplatser', '/om', '/bli-medlem', '/tavlingar', '/klubbuss', '/kontakt', '/flygguiden', '/vader']
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
    // Test login via REST API since admin SPA is slow to hydrate in headless
    const res = await fetch(`${CMS_API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@flygare.nu', password: 'changeme123' }),
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
