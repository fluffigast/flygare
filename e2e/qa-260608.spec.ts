import { test, expect } from "@playwright/test";

/**
 * Regression tests for QA260608 sheet.
 * Each describe block maps 1:1 to a QA item from the sheet.
 */

test.describe("QA1/QA2: SMHI and XCMeteo links always visible on Start", () => {
  test("home page renders SMHI and XCMeteo links regardless of wind data state", async ({
    page,
  }) => {
    // Force the wind API to fail so we exercise the error/empty path.
    await page.route("**/api/wind", (route) =>
      route.fulfill({ status: 500, body: "fail" })
    );

    await page.goto("/");

    const smhi = page.locator(
      'a[href="https://www.smhi.se/vader/prognoser/fjallvader"]'
    );
    const xc = page.locator('a[href="https://xcmeteo.com/"]');

    await expect(smhi).toBeVisible();
    await expect(xc).toBeVisible();
  });

  test("SMHI and XCMeteo links also visible when wind data loads", async ({
    page,
  }) => {
    await page.route("**/api/wind", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          meac: {
            wind_ms: 5.2,
            wind_max: 8,
            wind_avg: 5,
            wind_min: 2,
            wind_dir: 220,
            temp_c: 3,
            time: "12:00",
          },
          skistar: { readings: [], updated: null },
        }),
      })
    );

    await page.goto("/");

    await expect(
      page.locator('a[href="https://www.smhi.se/vader/prognoser/fjallvader"]')
    ).toBeVisible();
    await expect(
      page.locator('a[href="https://xcmeteo.com/"]')
    ).toBeVisible();
  });
});

test.describe("QA4/QA10/QA11: pages scroll to top on navigation", () => {
  for (const path of [
    "/flyga-i-are/startplatser/1000-meter-syd",
    "/bli-medlem",
    "/kontakt",
  ]) {
    test(`landing on ${path} starts at top of page`, async ({ page }) => {
      await page.goto(path);
      // Allow async scroll restoration to run
      await page.waitForLoadState("domcontentloaded");
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY, `${path} should open at scroll 0`).toBeLessThan(5);
    });
  }

  test("navigating between pages resets scroll to top", async ({ page }) => {
    await page.goto("/flyga-i-are/xc");
    // Scroll down deep into the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const beforeY = await page.evaluate(() => window.scrollY);
    expect(beforeY, "must actually scroll down first").toBeGreaterThan(100);

    // Navigate via a footer link that the user used in QA9
    const footerLink = page.locator(
      'footer a[href="/flyga-i-are/sakerhet"]'
    );
    if ((await footerLink.count()) > 0) {
      await footerLink.first().click();
    } else {
      await page.goto("/flyga-i-are/sakerhet");
    }

    await page.waitForURL("**/flyga-i-are/sakerhet");
    // Give React a tick after navigation to commit + scroll
    await page.waitForTimeout(100);
    const afterY = await page.evaluate(() => window.scrollY);
    expect(
      afterY,
      "after route change to /flyga-i-are/sakerhet, page should be at top"
    ).toBeLessThan(5);
  });
});

test.describe("QA5: wind section on startplats does not overlap text", () => {
  test("Vindriktning label and wind notes do not collide on 1000-meter-syd", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/flyga-i-are/startplatser/1000-meter-syd");

    const heading = page.getByRole("heading", {
      name: "Optimala vindförhållanden",
    });
    await expect(heading).toBeVisible();

    // Scope to the heading's section so we don't match the weather forecast block below.
    const section = heading.locator("..");
    const caption = section.getByText(/Syd till Sydväst/);
    const notes = section.getByText(/Känslig för rotor vid nordlig vind\./);

    await expect(caption).toBeVisible();
    await expect(notes).toBeVisible();

    const a = await caption.boundingBox();
    const b = await notes.boundingBox();
    expect(a, "Direction caption must have a layout box").not.toBeNull();
    expect(b, "Wind notes must have a layout box").not.toBeNull();

    // Boxes must not overlap horizontally + vertically.
    const overlaps =
      a!.x < b!.x + b!.width &&
      a!.x + a!.width > b!.x &&
      a!.y < b!.y + b!.height &&
      a!.y + a!.height > b!.y;

    expect(
      overlaps,
      `Direction caption (${JSON.stringify(a)}) overlaps wind notes (${JSON.stringify(b)})`
    ).toBe(false);
  });
});

test.describe("QA6/QA7/QA8: Luftrum page renders external links", () => {
  test("xc page exposes Samarbetsavtal PDF, ATS mailto, and ARO LFV links", async ({
    page,
  }) => {
    await page.goto("/flyga-i-are/xc");

    const pdfLink = page.locator(
      'a[href="/assets/Samarbetsavtal-ATS-Ostersund.pdf"]'
    );
    const mailLink = page.locator(
      'a[href="mailto:ats.ostersund@lfv.se"]'
    );
    const aroLink = page.locator('a[href="https://aro.lfv.se/"]');

    await expect(pdfLink).toBeVisible();
    await expect(mailLink).toBeVisible();
    await expect(aroLink).toBeVisible();
  });

  test("Samarbetsavtal PDF is actually served", async ({ request }) => {
    const res = await request.get("/assets/Samarbetsavtal-ATS-Ostersund.pdf");
    expect(res.status(), "PDF asset must exist").toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });
});
