import { test, expect } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";

// ═══════════════════════════════════════════════════════════
// User journeys — real workflows a visitor would do
// ═══════════════════════════════════════════════════════════

test("[journey] New visitor: home → read article → back to home", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Click first article in the grid
  const firstArticle = page.locator("article a").first();
  await expect(firstArticle).toBeVisible();
  const articleHref = await firstArticle.getAttribute("href");
  await firstArticle.click();
  await page.waitForURL(`**${articleHref}`);

  // Should show article content, not 404
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);

  // Go back
  await page.goBack();
  await page.waitForURL("**/");
});

test("[journey] Pilot checks weather before flying", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Navigate directly (dropdown may not show at this width with @5xl)
  await page.goto(`${BASE}/flyga-i-are/vader`, { waitUntil: "networkidle" });

  // Weather forecast visible
  await expect(page.locator("text=Väderprognos").first()).toBeVisible();

  // Click a weather service link
  const weatherLinks = page.locator("a[target='_blank']");
  const count = await weatherLinks.count();
  expect(count, "Should have external weather links").toBeGreaterThan(0);
});

test("[journey] New member wants to join", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Click "Bli medlem" button
  await page.click('a[href="/bli-medlem"]');
  await page.waitForURL("**/bli-medlem");

  // See price
  await expect(page.locator("text=600").first()).toBeVisible();

  // See benefits
  await expect(page.locator("text=Vad ingår").first()).toBeVisible();

  // See shop link
  const shopLink = page.locator('a[href*="paragliding.se"], a[data-payload-field="shopUrl"]').first();
  await expect(shopLink).toBeVisible();
});

test("[journey] Pilot checks launch site details", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/startplatser`, { waitUntil: "networkidle" });

  // Should have launch sites listed
  await expect(page.locator("text=Startplatser").first()).toBeVisible();

  // Click a launch site (if links exist)
  const siteLinks = page.locator("a[href*='/flyga-i-are/startplatser/']");
  if ((await siteLinks.count()) > 0) {
    const firstSite = siteLinks.first();
    const href = await firstSite.getAttribute("href");
    await firstSite.click();
    await page.waitForURL(`**${href}`);

    // Should show site details, not 404
    const notFound = await page.locator("text=Sidan hittades inte").count();
    expect(notFound).toBe(0);
  }
});

test("[journey] Board member reads about club", async ({ page }) => {
  await page.goto(`${BASE}/om`, { waitUntil: "networkidle" });

  // History section
  await expect(page.locator("text=1975").first()).toBeVisible();

  // Navigate to styrelsen
  await page.goto(`${BASE}/om/styrelsen`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Ordförande").first()).toBeVisible();

  // Navigate to kontakt
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });
  await expect(page.locator("text=info@flygare.nu").first()).toBeVisible();
});

test("[journey] Browse news by category", async ({ page }) => {
  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });

  // Category filter visible
  await expect(page.locator("text=Alla kategorier").first()).toBeVisible();

  // Click a category
  const categories = page.locator("a[href*='/nyheter?category=']");
  if ((await categories.count()) > 0) {
    await categories.first().click();
    await page.waitForTimeout(1000);
    // Page should still render (not crash)
    const notFound = await page.locator("text=Sidan hittades inte").count();
    expect(notFound).toBe(0);
  }
});

test("[journey] Click news item → read detail", async ({ page }) => {
  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });

  // Click first news item
  const newsLink = page.locator("a[href*='/nyheter/']").first();
  if ((await newsLink.count()) > 0) {
    await newsLink.click();
    await page.waitForTimeout(3000);

    // Should not show "not found"
    const notFound = await page.locator("text=Nyheten hittades inte").count();
    const notFoundOld = await page.locator("text=News item not found").count();
    expect(notFound + notFoundOld, "News detail page shows not found").toBe(0);
  }
});

// ═══════════════════════════════════════════════════════════
// Deep linking — accessing pages directly works
// ═══════════════════════════════════════════════════════════

const deepLinks = [
  "/flyga-i-are/acro",
  "/flyga-i-are/speedrider",
  "/flyga-i-are/hangflyg",
  "/flyga-i-are/paramotor",
  "/flyga-i-are/sakerhet",
  "/flyga-i-are/xc",
  "/om/klubbprodukter",
  "/om/stadgar",
];

for (const path of deepLinks) {
  test(`[deeplink] ${path} loads directly`, async ({ page }) => {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const notFound = await page.locator("text=Sidan hittades inte").count();
    expect(notFound, `${path} shows 404`).toBe(0);

    // Should have a heading
    const heading = page.locator("h2").first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text!.length).toBeGreaterThan(0);
  });
}

// ═══════════════════════════════════════════════════════════
// Browser navigation — back/forward works with SPA
// ═══════════════════════════════════════════════════════════

test("[browser] Back/forward navigation works", async ({ page }) => {
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Kontakta oss").first()).toBeVisible();

  await page.goto(`${BASE}/om`, { waitUntil: "networkidle" });
  await expect(page.locator("text=1975").first()).toBeVisible();

  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });

  // Go back to /om
  await page.goBack();
  await page.waitForURL("**/om");
  await expect(page.locator("text=1975").first()).toBeVisible();

  // Go back to /kontakt
  await page.goBack();
  await page.waitForURL("**/kontakt");
  await expect(page.locator("text=Kontakta oss").first()).toBeVisible();

  // Go forward to /om
  await page.goForward();
  await page.waitForURL("**/om");
});

// ═══════════════════════════════════════════════════════════
// Map — startplatser map loads
// ═══════════════════════════════════════════════════════════

test("[map] Startplatser map canvas renders", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/startplatser`, { waitUntil: "networkidle" });

  // MapLibre renders a canvas element
  const canvas = page.locator("canvas").first();
  if ((await canvas.count()) > 0) {
    await expect(canvas).toBeVisible();
    // Canvas should have dimensions
    const box = await canvas.boundingBox();
    expect(box!.width).toBeGreaterThan(100);
    expect(box!.height).toBeGreaterThan(100);
  }
});

// ═══════════════════════════════════════════════════════════
// Resize — desktop to mobile doesn't break
// ═══════════════════════════════════════════════════════════

test("[resize] Desktop → mobile → desktop doesn't break layout", async ({ page }) => {
  // Start at desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Verify desktop nav
  await expect(page.locator("header nav").first()).toBeVisible();

  // Resize to mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);

  // No overflow
  const mobileOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(mobileOverflow).toBe(false);

  // Resize back to desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(500);

  const desktopOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(desktopOverflow).toBe(false);
});

// ═══════════════════════════════════════════════════════════
// Scroll behavior — images load on scroll (lazy loading)
// ═══════════════════════════════════════════════════════════

test("[scroll] Images below the fold load on scroll", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  // Check all images loaded
  const images = await page.locator("img").all();
  let broken = 0;
  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    if (naturalWidth === 0) broken++;
  }

  expect(broken, `${broken} images didn't load after scroll`).toBe(0);
});

// ═══════════════════════════════════════════════════════════
// Performance — pages load within timeout
// ═══════════════════════════════════════════════════════════

test("[perf] All key pages load within 5 seconds", async ({ page }) => {
  const slowPages: string[] = [];

  const routes = ["/", "/nyheter", "/flyga-i-are", "/om", "/kontakt", "/tavlingar", "/bli-medlem"];

  for (const route of routes) {
    const start = Date.now();
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 5000 }).catch(() => {
      slowPages.push(`${route} — timed out`);
    });
    const elapsed = Date.now() - start;
    if (elapsed > 5000) {
      slowPages.push(`${route} — ${elapsed}ms`);
    }
  }

  expect(slowPages, `Slow pages:\n${slowPages.join("\n")}`).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// Competitions — click through to details
// ═══════════════════════════════════════════════════════════

test("[journey] Browse competitions and see winners", async ({ page }) => {
  await page.goto(`${BASE}/tavlingar`, { waitUntil: "networkidle" });

  // PPC should be listed
  await expect(page.locator("text=PPC").first()).toBeVisible();

  // Winners table (if present)
  const winnersHeader = page.locator("text=Vinnare").first();
  if ((await winnersHeader.count()) > 0) {
    await expect(winnersHeader).toBeVisible();
  }
});
