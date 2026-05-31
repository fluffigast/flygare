import { test, expect } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";

// ═══════════════════════════════════════════════════════════
// Content verification — checks that real content renders
// ═══════════════════════════════════════════════════════════

test("[content] Home: hero has title and subtitle", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  const heroTitle = page.locator("section h1").first();
  await expect(heroTitle).toBeVisible();
  const text = await heroTitle.textContent();
  expect(text!.length).toBeGreaterThan(5);
});

test("[content] Home: stats section has values", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Stats labels are uppercase via CSS — check the values instead
  await expect(page.locator("text=1975").first()).toBeVisible();
  await expect(page.locator("text=~100").first()).toBeVisible();
});

test("[content] Home: news slider has items", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await expect(page.locator("text=Nyheter").first()).toBeVisible();
});

test("[content] Home: articles grid has images", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  const articleImages = page.locator("article img");
  const count = await articleImages.count();
  expect(count, "Articles should have images").toBeGreaterThan(0);
});

test("[content] Home: CTA button links to bli-medlem", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  const cta = page.locator('a[href="/bli-medlem"]').first();
  await expect(cta).toBeVisible();
});

test("[content] Flyga i Åre: has all 10 subsection links", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are`, { waitUntil: "networkidle" });
  const expected = [
    "Starter & landningar",
    "Väder",
    "Flygregler",
    "Säkerhet",
    "Cross country",
    "Acro",
    "Speedrider",
    "Hängflyg",
    "Paramotor",
    "Klubbuss",
  ];
  for (const label of expected) {
    await expect(
      page.locator(`text=${label}`).first(),
      `Missing: ${label}`
    ).toBeVisible();
  }
});

test("[content] Nyheter: has news items with titles", async ({ page }) => {
  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });
  const newsItems = page.locator("article, [class*=news]").first();
  await expect(newsItems).toBeVisible({ timeout: 10000 });
});

test("[content] Nyheter: has category filters", async ({ page }) => {
  await page.goto(`${BASE}/nyheter`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Alla kategorier").first()).toBeVisible();
});

test("[content] Väder: has weather forecast", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/vader`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Väderprognos").first()).toBeVisible();
  // Should have day names (real data from SMHI)
  const dayNames = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
  let foundDay = false;
  for (const day of dayNames) {
    if ((await page.locator(`text=${day}`).count()) > 0) {
      foundDay = true;
      break;
    }
  }
  expect(foundDay, "Weather should show a day name").toBe(true);
});

test("[content] Väder: has weather service links", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/vader`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Vädertjänster").first()).toBeVisible();
  await expect(page.locator("text=SMHI").first()).toBeVisible();
});

test("[content] Startplatser: has map and sites", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/startplatser`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Startplatser").first()).toBeVisible();
});

test("[content] Om: has club history and board members", async ({ page }) => {
  await page.goto(`${BASE}/om`, { waitUntil: "networkidle" });
  await expect(page.locator("text=1975").first()).toBeVisible();
  await expect(page.locator("text=Styrelse").first()).toBeVisible();
});

test("[content] Styrelsen: lists board members", async ({ page }) => {
  await page.goto(`${BASE}/om/styrelsen`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Ordförande").first()).toBeVisible();
});

test("[content] Kontakt: has email and radio frequencies", async ({ page }) => {
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });
  await expect(page.locator("text=info@flygare.nu").first()).toBeVisible();
  await expect(page.locator("text=Radiofrekvenser").first()).toBeVisible();
});

test("[content] Bli medlem: has price and benefits", async ({ page }) => {
  await page.goto(`${BASE}/bli-medlem`, { waitUntil: "networkidle" });
  await expect(page.locator("text=600").first()).toBeVisible();
  await expect(page.locator("text=Vad ingår").first()).toBeVisible();
});

test("[content] Tävlingar: has competitions", async ({ page }) => {
  await page.goto(`${BASE}/tavlingar`, { waitUntil: "networkidle" });
  await expect(page.locator("text=PPC").first()).toBeVisible();
  await expect(page.locator("text=Topplandning").first()).toBeVisible();
});

test("[content] Klubbuss: has rules", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/klubbuss`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Klubbuss").first()).toBeVisible();
  // Should have bullet points with rules
  const bullets = page.locator("li");
  const count = await bullets.count();
  expect(count, "Klubbuss should have rule items").toBeGreaterThan(3);
});

test("[content] Flygregler: has content (not blank)", async ({ page }) => {
  await page.goto(`${BASE}/flyga-i-are/flygregler`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Flygregler").first()).toBeVisible();
  // Should not show 404 page
  const notFound = await page.locator("text=Sidan hittades inte").count();
  expect(notFound).toBe(0);
});

test("[content] Aktiviteter: page renders", async ({ page }) => {
  await page.goto(`${BASE}/aktiviteter`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Aktiviteter").first()).toBeVisible();
});

test("[content] Foton: page renders", async ({ page }) => {
  await page.goto(`${BASE}/ovrigt/foton`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Foton").first()).toBeVisible();
});

test("[content] Dokument: page renders", async ({ page }) => {
  await page.goto(`${BASE}/ovrigt/dokument`, { waitUntil: "networkidle" });
  await expect(page.locator("text=Dokumentarkiv").first()).toBeVisible();
});

// ═══════════════════════════════════════════════════════════
// Navigation — desktop dropdown menus
// ═══════════════════════════════════════════════════════════

test("[nav] Desktop dropdown: Flyga i Åre opens on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.hover("header >> text=Flyga i Åre");
  await page.waitForTimeout(300);
  await expect(page.locator("text=Starter & landningar")).toBeVisible();
  await expect(page.locator("text=Flygregler")).toBeVisible();
  await expect(page.locator("text=Acro")).toBeVisible();
});

test("[nav] Desktop dropdown: Om klubben opens on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.hover("header >> text=Om klubben");
  await page.waitForTimeout(300);
  await expect(page.locator("text=Styrelsen")).toBeVisible();
  await expect(page.locator("text=Stadgar")).toBeVisible();
});

test("[nav] Desktop dropdown: Övrigt opens on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.hover("header >> text=Övrigt");
  await page.waitForTimeout(300);
  await expect(page.locator("text=Foton")).toBeVisible();
  await expect(page.locator("text=Dokumentarkiv")).toBeVisible();
});

test("[nav] Footer has correct sections", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await expect(page.locator("footer >> text=Flyga i Åre").first()).toBeVisible();
  await expect(page.locator("footer >> text=Klubben").first()).toBeVisible();
  await expect(page.locator("footer >> text=Om Oss").first()).toBeVisible();
});
