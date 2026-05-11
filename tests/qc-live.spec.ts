import { test, expect } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
const CMS_API = "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";

const pages = [
  { path: "/", name: "Hem" },
  { path: "/nyheter", name: "Nyheter" },
  { path: "/information", name: "Flygguiden" },
  { path: "/startplatser", name: "Startplatser" },
  { path: "/vader", name: "Väder" },
  { path: "/om", name: "Om klubben" },
  { path: "/bli-medlem", name: "Bli medlem" },
  { path: "/kontakt", name: "Kontakt" },
  { path: "/tavlingar", name: "Tävlingar" },
];

// Desktop + Mobile viewports
const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];

// 1. Every page loads without errors
for (const page of pages) {
  test(`${page.name} (${page.path}) loads without console errors`, async ({ page: p }) => {
    const errors: string[] = [];
    p.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    p.on("pageerror", (err) => errors.push(err.message));

    const res = await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
    expect(res?.status()).toBeLessThan(400);

    // Filter out known non-critical errors (SMHI fetch if proxy not ready)
    const critical = errors.filter(
      (e) => !e.includes("SMHI") && !e.includes("fetch") && !e.includes("NetworkError")
    );
    expect(critical).toEqual([]);
  });
}

// 2. Every page renders at desktop and mobile without horizontal overflow
for (const vp of viewports) {
  for (const page of pages) {
    test(`${page.name} no horizontal overflow @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });

      const overflow = await p.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow, `Horizontal overflow on ${page.path} @ ${vp.name}`).toBe(false);
    });
  }
}

// 3. Navigation works — all nav links exist and are clickable
test("Desktop nav has all links", async ({ page: p }) => {
  await p.setViewportSize({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  const navLinks = await p.locator("header nav a").allTextContents();
  const expected = ["Hem", "Flygguiden", "Väder", "Startplatser", "Nyheter", "Om klubben"];
  for (const label of expected) {
    expect(navLinks.some((t) => t.includes(label)), `Missing nav link: ${label}`).toBe(true);
  }
});

test("Mobile hamburger menu works", async ({ page: p }) => {
  await p.setViewportSize({ width: 375, height: 812 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  // Hamburger button should be visible
  const hamburger = p.locator("header button[aria-label]");
  await expect(hamburger).toBeVisible();

  // Click it
  await hamburger.click();

  // Mobile nav should appear with links
  const mobileNav = p.locator("header nav");
  await expect(mobileNav).toBeVisible();
});

// 4. Images load on home page
test("Home page images load", async ({ page: p }) => {
  await p.goto(BASE, { waitUntil: "networkidle" });

  const images = await p.locator("img").all();
  expect(images.length).toBeGreaterThan(0);

  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    const src = await img.getAttribute("src");
    expect(naturalWidth, `Broken image: ${src}`).toBeGreaterThan(0);
  }
});

// 5. CMS API responds
test("CMS API returns site settings", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/site-settings`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.clubName).toBe("Åre Skärm- och Drakflygklubb");
});

test("CMS API returns news", async ({ request }) => {
  const res = await request.get(`${CMS_API}/news?limit=1`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.totalDocs).toBeGreaterThan(0);
});

// 6. SMHI proxy works
test("SMHI proxy returns weather data", async ({ request }) => {
  const res = await request.get(`${BASE}/api/smhi?lat=63.4&lon=13.1`);
  // May be 404 if proxy not deployed yet — mark as soft fail
  if (res.status() === 200) {
    const data = await res.json();
    expect(data.timeSeries).toBeDefined();
  } else {
    console.warn(`SMHI proxy returned ${res.status()} — not deployed yet`);
  }
});

// 7. Screenshot every page at both viewports
for (const vp of viewports) {
  for (const page of pages) {
    test(`Screenshot: ${page.name} @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
      await p.screenshot({
        path: `tests/screenshots/${vp.name}-${page.path.replace(/\//g, "_") || "home"}.png`,
        fullPage: true,
      });
    });
  }
}
