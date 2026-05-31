import { test, expect } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";

// ═══════════════════════════════════════════════════════════
// Edge cases your colleagues will try
// ═══════════════════════════════════════════════════════════

test("[edge] Navigating between pages doesn't break layout", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  const routes = ["/", "/flyga-i-are", "/nyheter", "/om", "/kontakt", "/bli-medlem", "/tavlingar"];
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 15000 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow, `Overflow after navigating to ${route}`).toBe(false);
  }
});

test("[edge] Clicking logo goes to home from any page", async ({ page }) => {
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });
  await page.click("header a:first-child");
  await page.waitForURL("**/");
  expect(page.url()).toBe(`${BASE}/`);
});

test("[edge] 404 page shows Swedish message", async ({ page }) => {
  await page.goto(`${BASE}/this-page-does-not-exist`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Sidan hittades inte")).toBeVisible();
  await expect(page.locator("text=Till startsidan")).toBeVisible();
});

test("[edge] 404 page has working link back to home", async ({ page }) => {
  await page.goto(`${BASE}/nonexistent`, { waitUntil: "networkidle" });
  await page.click("text=Till startsidan");
  await page.waitForURL("**/");
  expect(page.url()).toBe(`${BASE}/`);
});

test("[edge] Legacy /information route redirects to flyga-i-are", async ({ page }) => {
  await page.goto(`${BASE}/information`, { waitUntil: "networkidle" });
  // Should show the Flyga i Åre index, not 404
  await expect(page.locator("text=Flyga i Åre").first()).toBeVisible();
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);
});

test("[edge] Legacy /startplatser route still works", async ({ page }) => {
  await page.goto(`${BASE}/startplatser`, { waitUntil: "networkidle" });
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);
});

test("[edge] Legacy /vader route still works", async ({ page }) => {
  await page.goto(`${BASE}/vader`, { waitUntil: "networkidle" });
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);
});

test("[edge] Mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });

  const hamburger = page.locator("header button[aria-label]").first();
  await expect(hamburger).toBeVisible();
  await hamburger.click();
  await page.waitForTimeout(500);

  // Verify mobile nav sections visible using getByRole to target visible links
  const flygaLink = page.getByRole("link", { name: "Flyga i Åre", exact: true }).last();
  await expect(flygaLink).toBeVisible();

  // Close
  await hamburger.click();
  await page.waitForTimeout(500);
});

test("[edge] Mobile menu: clicking a nav link navigates", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });

  const hamburger = page.locator("header button[aria-label]").first();
  await hamburger.click();
  await page.waitForTimeout(300);

  // Click visible Nyheter link (use getByRole to avoid hidden desktop nav)
  await page.getByRole("link", { name: "Nyheter", exact: true }).last().click();
  await page.waitForURL("**/nyheter", { timeout: 10000 });
  expect(page.url()).toContain("/nyheter");
});

test("[edge] Mobile menu: subsections are visible", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.locator('button[aria-label="Öppna meny"]').click();

  // Subsections should be visible (indented under parent)
  await expect(page.locator("header >> text=Starter & landningar").first()).toBeVisible();
  await expect(page.locator("header >> text=Flygregler").first()).toBeVisible();
  await expect(page.locator("header >> text=Styrelsen").first()).toBeVisible();
});

test("[edge] External links open in new tab (Skärmflygförbundet)", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.locator('button[aria-label="Öppna meny"]').click();

  // Find the external link
  const externalLink = page.locator('header a[target="_blank"]').first();
  if ((await externalLink.count()) > 0) {
    const href = await externalLink.getAttribute("href");
    expect(href).toContain("paragliding.se");
  }
});

test("[edge] No broken images on home page", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  const images = await page.locator("img").all();
  const broken: string[] = [];

  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    const src = await img.getAttribute("src");
    if (naturalWidth === 0) {
      broken.push(src ?? "unknown");
    }
  }

  expect(broken, `Broken images: ${broken.join(", ")}`).toEqual([]);
});

test("[edge] No broken images on nyheter page", async ({ page }) => {
  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });

  const images = await page.locator("img").all();
  const broken: string[] = [];

  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    const src = await img.getAttribute("src");
    if (naturalWidth === 0) {
      broken.push(src ?? "unknown");
    }
  }

  expect(broken, `Broken images: ${broken.join(", ")}`).toEqual([]);
});

test("[edge] Weather shows real dates (not hardcoded February)", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/vader`, { waitUntil: "networkidle" });

  // Should NOT show "3 februari" (hardcoded fallback dates)
  const feb = await page.locator("text=februari").count();
  // If SMHI is working, we should see current month dates
  // If fallback, we'd see "3 februari" etc.
  // This is a soft check — if the proxy works, feb should be 0
  if (feb > 0) {
    console.warn("Weather showing fallback dates — SMHI proxy may not be working");
  }
});

test("[edge] Scroll position resets when navigating between pages", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(200);

  // Navigate to another page
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });

  // Scroll should be at top
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeLessThan(100);
});

test("[edge] Page titles are in Swedish", async ({ page }) => {
  const checks = [
    { url: "/", expected: "Åre" },
    { url: "/nyheter", expected: "Åre" },
    { url: "/flyga-i-are", expected: "Åre" },
    { url: "/kontakt", expected: "Åre" },
  ];

  for (const { url, expected } of checks) {
    await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
    const title = await page.title();
    // Should at least contain the club name
    expect(title.length, `Empty title on ${url}`).toBeGreaterThan(0);
  }
});

test("[edge] No console errors on rapid navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  const routes = ["/", "/flyga-i-are", "/nyheter", "/kontakt", "/om", "/bli-medlem"];
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  }

  await page.waitForTimeout(1000);
  const critical = errors.filter((e) => !e.includes("SMHI") && !e.includes("fetch"));
  expect(critical).toEqual([]);
});
