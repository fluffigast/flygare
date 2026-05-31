import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test("desktop nav links navigate to valid pages", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const hrefs = await page.locator("header nav a").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")).filter((h): h is string => !!h && h.startsWith("/"))
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound, `Nav link ${href} → 404`).not.toBeVisible();
    }
  });

  test("mobile menu links navigate to valid pages", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.locator("header button").click();

    const hrefs = await page.locator("header nav a").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")).filter((h): h is string => !!h && h.startsWith("/"))
    );

    for (const href of [...new Set(hrefs)]) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound, `Mobile link ${href} → 404`).not.toBeVisible();
    }
  });
});

test.describe("Footer links", () => {
  test("all footer links navigate to valid pages", async ({ page }) => {
    await page.goto("/");

    const hrefs = await page.locator("footer a[href^='/']").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")).filter((h): h is string => !!h)
    );
    expect(hrefs.length, "footer should have internal links").toBeGreaterThan(0);

    for (const href of [...new Set(hrefs)]) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound, `Footer link ${href} → 404`).not.toBeVisible();
    }
  });
});

test.describe("Home page links", () => {
  test("info cards and flyga-i-are links lead to valid pages", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/");

    const hrefs = await page.locator('a[href^="/flyga-i-are/"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")).filter((h): h is string => !!h)
    );
    const unique = [...new Set(hrefs)];
    expect(unique.length, "home page should have flyga-i-are links").toBeGreaterThan(0);

    for (const href of unique) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound, `${href} → 404`).not.toBeVisible();
    }
  });
});

test.describe("Flying guide index", () => {
  test("all section links lead to pages with content", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/flyga-i-are");

    const hrefs = await page.locator('a[href^="/flyga-i-are/"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")).filter((h): h is string => !!h)
    );
    const unique = [...new Set(hrefs)];

    for (const href of unique) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");

      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound, `${href} → 404`).not.toBeVisible();

      // Page should render content (headings or paragraphs)
      const content = page.locator("h1, h2, h3, p");
      const count = await content.count();
      expect(count, `${href} should render content`).toBeGreaterThan(0);
    }
  });
});
