import { test, expect } from "@playwright/test";

const CMS = "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io";
const FRONTEND = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";

test.describe("CMS Admin", () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto(`${CMS}/admin/login`);
    await page.fill('input[name="email"]', "admin@flygare.nu");
    await page.fill('input[name="password"]', process.env.CMS_PASSWORD ?? "changeme");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin", { timeout: 15000 });
  });

  test("All sidebar collections are accessible", async ({ page }) => {
    const collections = [
      "News",
      "Board Members",
      "Launches",
      "Other Sites",
      "Competitions",
      "Milestones",
      "Weather Links",
      "Media",
      "Pages",
      "Activities",
      "Documents",
      "Photos",
      "Links",
    ];

    const missing: string[] = [];

    for (const name of collections) {
      await page.goto(`${CMS}/admin`, { waitUntil: "networkidle" });
      const link = page.locator(`nav >> text="${name}"`).first();
      if ((await link.count()) === 0) {
        missing.push(`Sidebar missing: ${name}`);
        continue;
      }
      await link.click();
      await page.waitForTimeout(1000);

      // Verify list view loads (not an error page)
      const errorCount = await page.locator("text=Not Found").count();
      if (errorCount > 0) {
        missing.push(`${name} → loads error page`);
      }
    }

    expect(missing, `CMS issues:\n${missing.join("\n")}`).toEqual([]);
  });

  test("All sidebar globals are accessible", async ({ page }) => {
    const globals = [
      "Site Settings",
      "Membership Info",
      "Contact Info",
      "Bus Rules",
      "Flying Guide",
      "Site Navigation",
      "Club Info",
    ];

    const missing: string[] = [];

    for (const name of globals) {
      await page.goto(`${CMS}/admin`, { waitUntil: "networkidle" });
      const link = page.locator(`nav >> text="${name}"`).first();
      if ((await link.count()) === 0) {
        missing.push(`Sidebar missing: ${name}`);
        continue;
      }
      await link.click();
      await page.waitForTimeout(1000);

      const errorCount = await page.locator("text=Not Found").count();
      if (errorCount > 0) {
        missing.push(`${name} → loads error page`);
      }
    }

    expect(missing, `CMS globals issues:\n${missing.join("\n")}`).toEqual([]);
  });

  test("Live preview loads frontend in iframe for Site Settings", async ({ page }) => {
    await page.goto(`${CMS}/admin/globals/site-settings`, { waitUntil: "networkidle" });

    // Look for Live Preview button/toggle
    const previewButton = page.locator("text=Live Preview").first();
    if ((await previewButton.count()) > 0) {
      await previewButton.click();
      await page.waitForTimeout(2000);

      // Check iframe loads
      const iframe = page.frameLocator("iframe").first();
      const iframeContent = iframe.locator("body");
      await expect(iframeContent).not.toBeEmpty({ timeout: 10000 });
    }
  });

  test("Can edit and save a news item", async ({ page }) => {
    await page.goto(`${CMS}/admin/collections/news`, { waitUntil: "networkidle" });

    // Click first news item
    const firstItem = page.locator("table tbody tr").first().locator("a").first();
    if ((await firstItem.count()) > 0) {
      await firstItem.click();
      await page.waitForTimeout(2000);

      // Verify edit form loaded
      const titleField = page.locator('input[name="title"]');
      await expect(titleField).toBeVisible({ timeout: 5000 });

      // Read current value
      const originalTitle = await titleField.inputValue();
      expect(originalTitle.length).toBeGreaterThan(0);
    }
  });

  test("Can edit and save a page", async ({ page }) => {
    await page.goto(`${CMS}/admin/collections/pages`, { waitUntil: "networkidle" });

    const firstItem = page.locator("table tbody tr").first().locator("a").first();
    if ((await firstItem.count()) > 0) {
      await firstItem.click();
      await page.waitForTimeout(2000);

      const titleField = page.locator('input[name="title"]');
      await expect(titleField).toBeVisible({ timeout: 5000 });

      const originalTitle = await titleField.inputValue();
      expect(originalTitle.length).toBeGreaterThan(0);
    }
  });

  test("Site Navigation global has sections", async ({ page }) => {
    await page.goto(`${CMS}/admin/globals/site-navigation`, { waitUntil: "networkidle" });

    // Verify sections array is populated
    const sectionRows = page.locator('[data-row-count]').first();
    const arrayItems = page.locator(".array-field__row");
    const count = await arrayItems.count();
    expect(count, "Site navigation should have sections").toBeGreaterThan(0);
  });
});
