import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/flyga-i-are",
  "/flyga-i-are/startplatser",
  "/flyga-i-are/flygregler",
  "/flyga-i-are/vader",
  "/flyga-i-are/klubbuss",
  "/nyheter",
  "/tavlingar",
  "/om",
  "/om/styrelsen",
  "/kontakt",
  "/bli-medlem",
  "/ovrigt/foton",
  "/ovrigt/dokument",
  "/aktiviteter",
];

test.describe("Accessibility (axe-core)", () => {
  for (const path of PAGES) {
    test(`${path} has no critical a11y violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .disableRules([
          "color-contrast", // design-controlled, not a code bug
        ])
        .analyze();

      const critical = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      if (critical.length > 0) {
        const summary = critical
          .map(
            (v) =>
              `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instances)`
          )
          .join("\n");
        expect.fail(`${path} has accessibility violations:\n${summary}`);
      }
    });
  }
});
