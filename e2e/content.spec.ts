import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, welcome section, weather, news, and info cards", async ({
    page,
  }) => {
    await page.goto("/");

    // Hero section exists
    await expect(page.locator("section").first()).toBeVisible();

    // Welcome section has a heading
    const welcomeHeading = page.locator("h2").first();
    await expect(welcomeHeading).toBeVisible();

    // Membership block
    await expect(page.getByText("Bli medlem").first()).toBeVisible();

    // Info cards section
    await expect(page.getByText("Flyga i Åre").first()).toBeVisible();

    // Footer renders
    await expect(page.locator("footer")).toBeVisible();
  });

  test("header brand links home", async ({ page }) => {
    await page.goto("/kontakt");
    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("News", () => {
  test("news list renders articles", async ({ page }) => {
    await page.goto("/nyheter");

    // Should have news links pointing to individual articles
    const newsLinks = page.locator('a[href^="/nyheter/"]');
    const count = await newsLinks.count();
    expect(count, "news page should render article links").toBeGreaterThan(0);
  });

  test("clicking a news item navigates to detail view", async ({ page }) => {
    await page.goto("/nyheter");

    const newsLink = page.locator('a[href^="/nyheter/"]').first();
    if ((await newsLink.count()) > 0) {
      await newsLink.click();
      await page.waitForURL(/\/nyheter\/.+/);
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound).not.toBeVisible();
    }
  });
});

test.describe("Om klubben", () => {
  test("renders club history and board members", async ({ page }) => {
    await page.goto("/om");

    await expect(page.getByText("Om oss", { exact: false })).toBeVisible();
    await expect(page.getByText("Styrelse")).toBeVisible();
    await expect(page.getByText("Historia")).toBeVisible();

    // Board members should be listed
    await expect(page.getByText("Ordförande", { exact: true })).toBeVisible();
  });
});

test.describe("Kontakt", () => {
  test("renders contact info and emergency contacts", async ({ page }) => {
    await page.goto("/kontakt");

    await expect(page.getByText("Kontakta oss")).toBeVisible();
    await expect(page.getByText("E-post:")).toBeVisible();
    await expect(page.getByText("Nödkontakter")).toBeVisible();
    await expect(page.getByText("Radiofrekvenser")).toBeVisible();
  });
});

test.describe("Bli medlem", () => {
  test("renders membership info with price and benefits", async ({ page }) => {
    await page.goto("/bli-medlem");

    await expect(page.getByText("Bli medlem").first()).toBeVisible();
    // Price should be visible (CMS-managed, don't hardcode exact value)
    await expect(page.getByText("kr").first()).toBeVisible();
    await expect(page.getByText("Vad ingår i medlemskapet")).toBeVisible();
    await expect(page.getByText("Licenskrav")).toBeVisible();
  });
});

test.describe("Tävlingar", () => {
  test("renders competitions with results", async ({ page }) => {
    await page.goto("/tavlingar");

    await expect(
      page.getByText("Tävla och utmana dig själv")
    ).toBeVisible();
  });
});

test.describe("Startplatser", () => {
  test("sites list renders and links to detail pages", async ({ page }) => {
    await page.goto("/flyga-i-are/startplatser");

    // Should render a map or site listings
    await expect(page.getByText("Startplatser").first()).toBeVisible();

    // Click first site link if available
    const siteLink = page
      .locator('a[href^="/flyga-i-are/startplatser/"]')
      .first();
    if ((await siteLink.count()) > 0) {
      const href = await siteLink.getAttribute("href");
      await siteLink.click();
      if (href) {
        await expect(page).toHaveURL(href);
        const notFound = page.getByText("Sidan hittades inte");
        await expect(notFound).not.toBeVisible();
        // Detail page should show overview
        await expect(page.getByText("Översikt")).toBeVisible();
      }
    }
  });
});

test.describe("Aktiviteter", () => {
  test("list renders and links to detail page", async ({ page }) => {
    await page.goto("/aktiviteter");

    const activityLink = page.locator('a[href^="/aktiviteter/"]').first();
    const count = await activityLink.count();

    if (count > 0) {
      const href = await activityLink.getAttribute("href");
      await activityLink.click();
      if (href) {
        await expect(page).toHaveURL(href);
        // Detail page should render content
        const notFound = page.getByText("Sidan hittades inte");
        await expect(notFound).not.toBeVisible();
        const paragraphs = page.locator("p");
        expect(await paragraphs.count()).toBeGreaterThan(0);
      }
    }
  });
});

test.describe("Övrigt redirect", () => {
  test("/ovrigt redirects to /ovrigt/foton", async ({ page }) => {
    await page.goto("/ovrigt");
    await expect(page).toHaveURL("/ovrigt/foton");
  });
});

test.describe("Dynamic pages render content", () => {
  const dynamicPages = [
    { path: "/flyga-i-are/flygregler", contains: "Flygregler" },
    { path: "/flyga-i-are/sakerhet", contains: "Säkerhet" },
    { path: "/flyga-i-are/xc", contains: "XC" },
    { path: "/flyga-i-are/acro", contains: "Acro" },
    { path: "/flyga-i-are/hangflyg", contains: "Hängflyg" },
    { path: "/flyga-i-are/paramotor", contains: "Paramotor" },
    { path: "/om/klubbprodukter", contains: "Klubb" },
    { path: "/om/stadgar", contains: "Stadgar" },
  ];

  for (const { path, contains } of dynamicPages) {
    test(`${path} renders with body content`, async ({ page }) => {
      await page.goto(path);

      // No 404
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound).not.toBeVisible();

      // Has the expected heading
      await expect(
        page.getByText(contains, { exact: false }).first()
      ).toBeVisible();

      // Has paragraph content (not an empty page)
      const paragraphs = page.locator("p");
      const pCount = await paragraphs.count();
      expect(pCount, `${path} should render paragraph content`).toBeGreaterThan(
        0
      );
    });
  }
});
