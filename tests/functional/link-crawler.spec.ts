import { test, expect } from "@playwright/test";

test("Crawl all internal links — every link resolves, no 404s, no dead ends", async ({ page }) => {
  const visited = new Set<string>();
  const broken: string[] = [];
  const queue: { url: string; from: string }[] = [{ url: "/", from: "start" }];

  while (queue.length > 0) {
    const { url, from } = queue.shift()!;
    const normalizedUrl = url.split("?")[0].split("#")[0];
    if (visited.has(normalizedUrl)) continue;
    visited.add(normalizedUrl);

    const res = await page.goto(normalizedUrl, { waitUntil: "networkidle", timeout: 15000 }).catch(() => null);

    if (!res || res.status() >= 400) {
      broken.push(`${normalizedUrl} (from ${from}) → ${res?.status() ?? "timeout"}`);
      continue;
    }

    // Check for "Sidan hittades inte" (404 page rendered as 200)
    const notFound = await page.locator("text=Sidan hittades inte").count();
    if (notFound > 0 && normalizedUrl !== "/404") {
      broken.push(`${normalizedUrl} (from ${from}) → renders 404 page`);
    }

    // Collect all internal links
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a[href]"))
        .map((a) => a.getAttribute("href") ?? "")
        .filter((h) => h.startsWith("/") && !h.startsWith("//"))
        .map((h) => h.split("?")[0].split("#")[0]);
    });

    for (const link of links) {
      if (!visited.has(link)) {
        queue.push({ url: link, from: normalizedUrl });
      }
    }
  }

  console.log(`\nCrawled ${visited.size} pages`);
  if (broken.length > 0) {
    console.log("\n=== BROKEN LINKS ===");
    broken.forEach((b) => console.log(`  ${b}`));
    console.log("=== END ===\n");
  }

  expect(broken, `Broken links found:\n${broken.join("\n")}`).toEqual([]);
});

test("Verify all nav dropdown links resolve", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  const navSections = ["Flyga i Åre", "Om klubben", "Övrigt"];
  const brokenLinks: string[] = [];

  for (const section of navSections) {
    // Hover to open dropdown
    const trigger = page.locator(`header nav >> text="${section}"`).first();
    if (await trigger.count() === 0) continue;
    await trigger.hover();
    await page.waitForTimeout(300);

    // Get all dropdown links
    const dropdownLinks = await page.locator("header .absolute a").all();

    for (const link of dropdownLinks) {
      const href = await link.getAttribute("href");
      const text = await link.textContent();
      if (!href || href.startsWith("http")) continue;

      // Navigate and check
      const res = await page.goto(href!, { waitUntil: "networkidle", timeout: 10000 }).catch(() => null);
      const status = res?.status() ?? 0;
      const is404Page = await page.locator("text=Sidan hittades inte").count();

      if (status >= 400 || is404Page > 0) {
        brokenLinks.push(`"${text?.trim()}" → ${href} (${status >= 400 ? status : "renders 404"})`);
      }

      // Go back to home for next hover
      await page.goto("/", { waitUntil: "networkidle" });
    }
  }

  if (brokenLinks.length > 0) {
    console.log("\n=== BROKEN NAV LINKS ===");
    brokenLinks.forEach((b) => console.log(`  ${b}`));
    console.log("=== END ===\n");
  }

  expect(brokenLinks, `Broken nav links:\n${brokenLinks.join("\n")}`).toEqual([]);
});

test("CMS live preview URLs resolve on frontend", async ({ request, page }) => {
  const CMS_API = process.env.CMS_URL ? process.env.CMS_URL + "/api" : "http://localhost:3001/api";

  // Get the live preview route map from the CMS config by testing each known mapping
  const previewRoutes = [
    { collection: "news", expectedPath: "/nyheter" },
    { collection: "pages", slug: "flygregler", expectedPath: "/flyga-i-are/flygregler" },
    { collection: "pages", slug: "sakerhet", expectedPath: "/flyga-i-are/sakerhet" },
    { collection: "pages", slug: "xc", expectedPath: "/flyga-i-are/xc" },
    { collection: "pages", slug: "acro", expectedPath: "/flyga-i-are/acro" },
    { collection: "pages", slug: "speedrider", expectedPath: "/flyga-i-are/speedrider" },
    { collection: "pages", slug: "hangflyg", expectedPath: "/flyga-i-are/hangflyg" },
    { collection: "pages", slug: "paramotor", expectedPath: "/flyga-i-are/paramotor" },
    { collection: "pages", slug: "klubbprodukter", expectedPath: "/om/klubbprodukter" },
    { collection: "pages", slug: "stadgar", expectedPath: "/om/stadgar" },
    { global: "site-settings", expectedPath: "/" },
    { global: "membership-info", expectedPath: "/bli-medlem" },
    { global: "contact-info", expectedPath: "/kontakt" },
    { global: "bus-rules", expectedPath: "/flyga-i-are/klubbuss" },
    { global: "club-info", expectedPath: "/om" },
    { global: "site-navigation", expectedPath: "/" },
  ];

  const broken: string[] = [];

  for (const route of previewRoutes) {
    const res = await page.goto(route.expectedPath, { waitUntil: "networkidle", timeout: 10000 }).catch(() => null);
    const status = res?.status() ?? 0;
    const is404 = await page.locator("text=Sidan hittades inte").count();

    const label = route.collection ? `${route.collection}/${route.slug ?? "index"}` : route.global;

    if (status >= 400 || is404 > 0) {
      broken.push(`${label} → ${route.expectedPath} (${status >= 400 ? status : "renders 404"})`);
    }
  }

  if (broken.length > 0) {
    console.log("\n=== BROKEN LIVE PREVIEW ROUTES ===");
    broken.forEach((b) => console.log(`  ${b}`));
    console.log("=== END ===\n");
  }

  expect(broken, `Broken live preview routes:\n${broken.join("\n")}`).toEqual([]);
});
