import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
const CMS_API =
  "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";

const pages = [
  { path: "/", name: "Hem" },
  { path: "/nyheter", name: "Nyheter" },
  { path: "/flyga-i-are", name: "Flyga i Åre" },
  { path: "/flyga-i-are/startplatser", name: "Startplatser" },
  { path: "/flyga-i-are/vader", name: "Väder" },
  { path: "/flyga-i-are/flygregler", name: "Flygregler" },
  { path: "/flyga-i-are/sakerhet", name: "Säkerhet" },
  { path: "/flyga-i-are/xc", name: "Cross country" },
  { path: "/flyga-i-are/klubbuss", name: "Klubbuss" },
  { path: "/aktiviteter", name: "Aktiviteter" },
  { path: "/tavlingar", name: "Tävlingar" },
  { path: "/om", name: "Om klubben" },
  { path: "/om/styrelsen", name: "Styrelsen" },
  { path: "/kontakt", name: "Kontakt" },
  { path: "/bli-medlem", name: "Bli medlem" },
  { path: "/ovrigt/foton", name: "Foton" },
  { path: "/ovrigt/dokument", name: "Dokument" },
];

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];

// ═══════════════════════════════════════════════════════════
// LAYER 1: Functional — pages load, no errors, no overflow
// ═══════════════════════════════════════════════════════════

for (const page of pages) {
  test(`[functional] ${page.name} loads without console errors`, async ({
    page: p,
  }) => {
    const errors: string[] = [];
    p.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    p.on("pageerror", (err) => errors.push(err.message));

    const res = await p.goto(`${BASE}${page.path}`, {
      waitUntil: "networkidle",
    });
    expect(res?.status()).toBeLessThan(400);

    const critical = errors.filter(
      (e) =>
        !e.includes("SMHI") &&
        !e.includes("fetch") &&
        !e.includes("NetworkError") &&
        !e.includes("404") &&
        !e.includes("the server responded with a status of")
    );
    expect(critical).toEqual([]);
  });
}

for (const vp of viewports) {
  for (const page of pages) {
    test(`[overflow] ${page.name} @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });

      const overflow = await p.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
      );
      expect(
        overflow,
        `Horizontal overflow on ${page.path} @ ${vp.name}`
      ).toBe(false);
    });
  }
}

test("[functional] Desktop nav has all links", async ({ page: p }) => {
  await p.setViewportSize({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  const navLinks = await p.locator("header nav a").allTextContents();
  const expected = [
    "Hem",
    "Flyga i Åre",
    "Nyheter",
    "Aktiviteter",
    "Tävling",
    "Om klubben",
    "Övrigt",
  ];
  for (const label of expected) {
    expect(
      navLinks.some((t) => t.includes(label)),
      `Missing nav link: ${label}`
    ).toBe(true);
  }
});

test("[functional] Mobile hamburger menu works", async ({ page: p }) => {
  await p.setViewportSize({ width: 375, height: 812 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  const hamburger = p.locator("header button[aria-label]");
  await expect(hamburger).toBeVisible();
  await hamburger.click();

  const mobileNav = p.locator("header nav").nth(1);
  await expect(mobileNav).toBeVisible();
});

test("[functional] Home page images load", async ({ page: p }) => {
  await p.goto(BASE, { waitUntil: "networkidle" });

  const images = await p.locator("img").all();
  expect(images.length).toBeGreaterThan(0);

  for (const img of images) {
    const naturalWidth = await img.evaluate(
      (el: HTMLImageElement) => el.naturalWidth
    );
    const src = await img.getAttribute("src");
    expect(naturalWidth, `Broken image: ${src}`).toBeGreaterThan(0);
  }
});

// ═══════════════════════════════════════════════════════════
// LAYER 2: API — CMS and SMHI proxy
// ═══════════════════════════════════════════════════════════

test("[api] CMS returns site settings", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/site-settings`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.clubName).toBe("Åre Skärm- och Drakflygklubb");
});

test("[api] CMS returns news", async ({ request }) => {
  const res = await request.get(`${CMS_API}/news?limit=1`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.totalDocs).toBeGreaterThan(0);
});

test("[api] CMS returns pages", async ({ request }) => {
  const res = await request.get(`${CMS_API}/pages?limit=1`);
  expect(res.status()).toBe(200);
});

test("[api] CMS returns site-navigation", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/site-navigation`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.sections.length).toBeGreaterThan(0);
});

test("[api] CMS returns club-info", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/club-info`);
  expect(res.status()).toBe(200);
});

test("[functional] Desktop nav has dropdown menus", async ({ page: p }) => {
  await p.setViewportSize({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  await p.hover("text=Flyga i Åre");
  await expect(p.locator("text=Starter & landningar")).toBeVisible();
  await expect(p.locator("text=Flygregler")).toBeVisible();
});

test("[api] SMHI proxy returns weather data", async ({ request }) => {
  const res = await request.get(`${BASE}/api/smhi?lat=63.4&lon=13.1`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.timeSeries).toBeDefined();
  expect(data.timeSeries.length).toBeGreaterThan(0);
  expect(data.timeSeries[0].data.air_temperature).toBeDefined();
});

// ═══════════════════════════════════════════════════════════
// LAYER 3: Visual regression — screenshot baselines
// ═══════════════════════════════════════════════════════════

for (const vp of viewports) {
  for (const page of pages) {
    test(`[visual] ${page.name} @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });

      // Wait for animations/transitions to settle
      await p.waitForTimeout(500);

      await expect(p).toHaveScreenshot(
        `${vp.name}-${page.name.toLowerCase().replace(/\s+/g, "-")}.png`,
        {
          fullPage: true,
          animations: "disabled",
          maxDiffPixelRatio: 0.02,
        }
      );
    });
  }
}

// ═══════════════════════════════════════════════════════════
// LAYER 4: Accessibility — axe-core WCAG scan
// ═══════════════════════════════════════════════════════════

for (const page of pages) {
  test(`[a11y] ${page.name} passes accessibility scan`, async ({
    page: p,
  }) => {
    await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page: p })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude(".maplibregl-map") // map widget has its own a11y concerns
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (serious.length > 0) {
      const summary = serious
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instances)`
        )
        .join("\n");
      expect(serious.length, `Accessibility violations:\n${summary}`).toBe(0);
    }
  });
}
