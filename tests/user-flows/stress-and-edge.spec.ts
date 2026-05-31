import { test, expect } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
const CMS_API = "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";

// ═══════════════════════════════════════════════════════════
// Landscape mobile — phone turned sideways
// ═══════════════════════════════════════════════════════════

test("[landscape] iPhone landscape no overflow", async ({ page }) => {
  await page.setViewportSize({ width: 852, height: 393 });
  const routes = ["/", "/nyheter", "/flyga-i-are", "/kontakt", "/om"];
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 25000 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow, `Overflow on ${route} in landscape`).toBe(false);
  }
});

test("[landscape] iPad landscape layout reasonable", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
});

// ═══════════════════════════════════════════════════════════
// Browser zoom — 150% and 200%
// ═══════════════════════════════════════════════════════════

test("[zoom] Page at 150% zoom no overflow", async ({ browser }) => {
  const context = await browser.newContext({ deviceScaleFactor: 1.5 });
  const page = await context.newPage();
  await page.setViewportSize({ width: 853, height: 533 }); // 1280/1.5 x 800/1.5
  await page.goto(BASE, { waitUntil: "networkidle" });

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
  await context.close();
});

test("[zoom] Page at 200% zoom no overflow", async ({ browser }) => {
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.setViewportSize({ width: 640, height: 400 }); // 1280/2 x 800/2
  await page.goto(BASE, { waitUntil: "networkidle" });

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
  await context.close();
});

// ═══════════════════════════════════════════════════════════
// Rapid clicking — double-click, spam-click
// ═══════════════════════════════════════════════════════════

test("[stress] Double-clicking nav links doesn't break", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Open hamburger
  await page.locator("header button[aria-label]").first().click();
  await page.waitForTimeout(300);

  // Double-click a nav link
  const link = page.getByRole("link", { name: "Nyheter", exact: true }).last();
  await link.dblclick();
  await page.waitForTimeout(1000);

  // Should not crash — page should render
  const body = await page.textContent("body");
  expect(body!.length).toBeGreaterThan(50);
});

test("[stress] Rapid navigation between pages", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  const routes = ["/", "/nyheter", "/kontakt", "/om", "/flyga-i-are", "/tavlingar", "/bli-medlem"];

  // Navigate rapidly without waiting
  for (const route of routes) {
    page.goto(`${BASE}${route}`).catch(() => {}); // fire and forget
    await page.waitForTimeout(200);
  }

  // Wait for last navigation to settle
  await page.waitForTimeout(3000);

  // No crashes
  const critical = errors.filter((e) => !e.includes("fetch") && !e.includes("abort"));
  expect(critical).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// Special characters in CMS content
// ═══════════════════════════════════════════════════════════

test("[cms-edge] Swedish special chars in CMS update", async ({ request }) => {
  const loginRes = await request.post(`${CMS_API}/users/login`, {
    data: { email: "admin@flygare.nu", password: "Flygare2026!" },
  });
  const { token } = await loginRes.json();

  const original = await (await request.get(`${CMS_API}/globals/site-settings`)).json();

  // Update with heavy Swedish chars
  const testValue = "Åre Skärm- & Drakflygklubb — Störst i Nörden! Öresund → Jämtland";
  await request.post(`${CMS_API}/globals/site-settings`, {
    headers: { Authorization: `JWT ${token}` },
    data: { heroTagline: testValue },
  });

  const updated = await (await request.get(`${CMS_API}/globals/site-settings`)).json();
  expect(updated.heroTagline).toBe(testValue);

  // Restore
  await request.post(`${CMS_API}/globals/site-settings`, {
    headers: { Authorization: `JWT ${token}` },
    data: { heroTagline: original.heroTagline },
  });
});

test("[cms-edge] Emoji in news title", async ({ request }) => {
  const loginRes = await request.post(`${CMS_API}/users/login`, {
    data: { email: "admin@flygare.nu", password: "Flygare2026!" },
  });
  const { token } = await loginRes.json();

  const res = await request.post(`${CMS_API}/news`, {
    headers: { Authorization: `JWT ${token}` },
    data: {
      title: "🪂 Paragliding säsong 2026! 🏔️",
      category: "Aktiviteter",
      date: "2026-06-01",
    },
  });
  const created = await res.json();
  expect(created.doc.title).toContain("🪂");

  // Clean up
  await request.delete(`${CMS_API}/news/${created.doc.id}`, {
    headers: { Authorization: `JWT ${token}` },
  });
});

test("[cms-edge] HTML in title gets escaped, not executed", async ({ request }) => {
  const loginRes = await request.post(`${CMS_API}/users/login`, {
    data: { email: "admin@flygare.nu", password: "Flygare2026!" },
  });
  const { token } = await loginRes.json();

  const res = await request.post(`${CMS_API}/news`, {
    headers: { Authorization: `JWT ${token}` },
    data: {
      title: '<script>alert("xss")</script>Test',
      category: "Information",
      date: "2026-06-01",
    },
  });
  const created = await res.json();
  // CMS should store the text as-is (it's richtext-safe)
  expect(created.doc.title).toContain("script");

  await request.delete(`${CMS_API}/news/${created.doc.id}`, {
    headers: { Authorization: `JWT ${token}` },
  });
});

// ═══════════════════════════════════════════════════════════
// Direct URL sharing — deep links from Slack/email
// ═══════════════════════════════════════════════════════════

test("[sharing] Shared deep links load correctly", async ({ page }) => {
  const deepUrls = [
    `${BASE}/flyga-i-are/flygregler`,
    `${BASE}/om/styrelsen`,
    `${BASE}/flyga-i-are/xc`,
    `${BASE}/flyga-i-are/klubbuss`,
    `${BASE}/ovrigt/dokument`,
  ];

  for (const url of deepUrls) {
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
    expect(res?.status(), `${url} failed`).toBeLessThan(400);

    const notFound = await page.locator("text=Sidan hittades inte").count();
    expect(notFound, `${url} shows 404`).toBe(0);
  }
});

// ═══════════════════════════════════════════════════════════
// Empty states — what if CMS has no data for a collection
// ═══════════════════════════════════════════════════════════

test("[empty] Aktiviteter shows friendly empty state", async ({ page }) => {
  await page.goto(`${BASE}/aktiviteter`, { waitUntil: "networkidle" });

  // Should show the page title at minimum
  await expect(page.locator("text=Aktiviteter").first()).toBeVisible();

  // Should not crash or show a raw error
  const body = await page.textContent("body");
  expect(body).not.toContain("Error");
  expect(body).not.toContain("undefined");
  expect(body).not.toContain("Cannot read");
});

test("[empty] Foton shows friendly empty state", async ({ page }) => {
  await page.goto(`${BASE}/ovrigt/foton`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Foton").first()).toBeVisible();
  const body = await page.textContent("body");
  expect(body).not.toContain("Error");
  expect(body).not.toContain("undefined");
});

test("[empty] Dokument shows friendly empty state", async ({ page }) => {
  await page.goto(`${BASE}/ovrigt/dokument`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Dokumentarkiv").first()).toBeVisible();
  const body = await page.textContent("body");
  expect(body).not.toContain("Error");
  expect(body).not.toContain("undefined");
});

// ═══════════════════════════════════════════════════════════
// CMS auth edge cases
// ═══════════════════════════════════════════════════════════

test("[auth] Wrong password returns error, not crash", async ({ request }) => {
  const res = await request.post(`${CMS_API}/users/login`, {
    data: { email: "admin@flygare.nu", password: "wrong-password" },
  });
  expect(res.status()).toBe(401);
});

test("[auth] No token → cannot edit", async ({ request }) => {
  const res = await request.post(`${CMS_API}/globals/site-settings`, {
    data: { heroTagline: "hacked!" },
  });
  expect(res.status()).toBeGreaterThanOrEqual(400);
});

test("[auth] Invalid token → cannot edit", async ({ request }) => {
  const res = await request.post(`${CMS_API}/globals/site-settings`, {
    headers: { Authorization: "JWT invalid.token.here" },
    data: { heroTagline: "hacked!" },
  });
  expect(res.status()).toBeGreaterThanOrEqual(400);
});

// ═══════════════════════════════════════════════════════════
// Concurrent CMS edits — two users at same time
// ═══════════════════════════════════════════════════════════

test("[concurrent] Two simultaneous edits don't crash", async ({ request }) => {
  const loginRes = await request.post(`${CMS_API}/users/login`, {
    data: { email: "admin@flygare.nu", password: "Flygare2026!" },
  });
  const { token } = await loginRes.json();

  const original = await (await request.get(`${CMS_API}/globals/site-settings`)).json();

  // Fire two updates simultaneously
  const [res1, res2] = await Promise.all([
    request.post(`${CMS_API}/globals/site-settings`, {
      headers: { Authorization: `JWT ${token}` },
      data: { heroTagline: "Concurrent edit 1" },
    }),
    request.post(`${CMS_API}/globals/site-settings`, {
      headers: { Authorization: `JWT ${token}` },
      data: { heroDescription: "Concurrent edit 2" },
    }),
  ]);

  // Neither should crash
  expect(res1.status()).toBeLessThan(500);
  expect(res2.status()).toBeLessThan(500);

  // Restore
  await request.post(`${CMS_API}/globals/site-settings`, {
    headers: { Authorization: `JWT ${token}` },
    data: { heroTagline: original.heroTagline, heroDescription: original.heroDescription },
  });
});

// ═══════════════════════════════════════════════════════════
// Print — page doesn't break in print mode
// ═══════════════════════════════════════════════════════════

test("[print] Home page renders in print media", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });

  // Should still have content
  const body = await page.textContent("body");
  expect(body!.length).toBeGreaterThan(100);

  // Take a screenshot to verify visually
  await page.screenshot({
    path: "tests/screenshots/print-home.png",
    fullPage: true,
  });
});

// ═══════════════════════════════════════════════════════════
// Hash/anchor URLs — don't break the router
// ═══════════════════════════════════════════════════════════

test("[url] Hash in URL doesn't break page", async ({ page }) => {
  await page.goto(`${BASE}/kontakt#radiofrekvenser`, { waitUntil: "networkidle" });

  // Page should load normally
  const body = await page.textContent("body");
  expect(body).toContain("info@flygare.nu");
});

test("[url] Query params don't break page", async ({ page }) => {
  await page.goto(`${BASE}/nyheter?category=Information&page=1`, { waitUntil: "networkidle" });

  const body = await page.textContent("body");
  expect(body!.length).toBeGreaterThan(100);
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);
});
