import { test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

test("snap tvaravalvet wind section", async ({ page }) => {
  await page.goto("/flyga-i-are/startplatser/tvaravalvet", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const heading = page.getByRole("heading", { name: "Optimala vindförhållanden" });
  await heading.scrollIntoViewIfNeeded();
  const section = heading.locator("xpath=..");
  await section.screenshot({ path: "tests/screenshots/qa-desktop/wind-section-tvaravalvet.png" });
});
