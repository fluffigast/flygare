import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test("desktop nav links navigate to valid pages", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Get all nav links in the desktop nav bar
    const navLinks = page.locator("header nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      // Re-query after each navigation
      await page.goto("/");
      const link = page.locator("header nav a").nth(i);
      const href = await link.getAttribute("href");
      const label = await link.textContent();

      await link.click();
      await page.waitForLoadState("domcontentloaded");

      // Verify no 404
      const notFound = page.getByText("Sidan hittades inte");
      await expect(
        notFound,
        `Nav link "${label}" (${href}) landed on 404`
      ).not.toBeVisible();
    }
  });

  test("mobile menu links navigate to valid pages", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Open hamburger
    const menuButton = page.locator("header button");
    await menuButton.click();

    // Collect all mobile nav links
    const mobileLinks = page.locator("header nav a");
    const hrefs: string[] = [];
    const count = await mobileLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await mobileLinks.nth(i).getAttribute("href");
      if (href && href.startsWith("/")) hrefs.push(href);
    }

    // Visit each internal link
    for (const href of hrefs) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");

      const notFound = page.getByText("Sidan hittades inte");
      await expect(
        notFound,
        `Mobile nav link ${href} landed on 404`
      ).not.toBeVisible();
    }
  });
});

test.describe("Footer links", () => {
  test("all footer links navigate to valid pages", async ({ page }) => {
    await page.goto("/");

    // Collect all footer link hrefs
    const footerLinks = page.locator("footer a[href^='/']");
    const hrefs: string[] = [];
    const count = await footerLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await footerLinks.nth(i).getAttribute("href");
      if (href) hrefs.push(href);
    }

    expect(hrefs.length, "footer should have internal links").toBeGreaterThan(0);

    for (const href of hrefs) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");

      const notFound = page.getByText("Sidan hittades inte");
      await expect(
        notFound,
        `Footer link ${href} landed on 404`
      ).not.toBeVisible();
    }
  });
});

test.describe("Home page cards", () => {
  test("info cards link to valid pages", async ({ page }) => {
    await page.goto("/");

    // Collect all internal hrefs on the home page
    const allLinks = page.locator('a[href^="/flyga-i-are/"]');
    const hrefs: string[] = [];
    const count = await allLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await allLinks.nth(i).getAttribute("href");
      if (href) hrefs.push(href);
    }
    const unique = [...new Set(hrefs)];
    expect(unique.length, "home page should have flyga-i-are links").toBeGreaterThan(0);

    for (const href of unique) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");

      const notFound = page.getByText("Sidan hittades inte");
      await expect(
        notFound,
        `Home page link ${href} landed on 404`
      ).not.toBeVisible();
    }
  });
});

test.describe("Flying guide index", () => {
  test("all section links lead to pages with content", async ({ page }) => {
    await page.goto("/flyga-i-are");

    const links = page.locator('a[href^="/flyga-i-are/"]');
    const hrefs: string[] = [];
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      if (href) hrefs.push(href);
    }

    // Deduplicate
    const unique = [...new Set(hrefs)];

    for (const href of unique) {
      await page.goto(href);
      await page.waitForLoadState("domcontentloaded");

      const notFound = page.getByText("Sidan hittades inte");
      await expect(
        notFound,
        `Flying guide link ${href} landed on 404`
      ).not.toBeVisible();

      // Page should have some heading content
      const headings = page.locator("h1, h2, h3");
      const hCount = await headings.count();
      expect(hCount, `${href} should render headings`).toBeGreaterThan(0);
    }
  });
});
