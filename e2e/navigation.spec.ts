import { test, expect } from "@playwright/test";

// Every internal route that should render content (not 404)
const PAGES = [
  { path: "/", h: "Åre Skärm- och Drakflygklubb" },
  { path: "/flyga-i-are", h: "Flyga i Åre" },
  { path: "/flyga-i-are/startplatser", h: "Startplatser" },
  { path: "/flyga-i-are/vader", h: "Väder" },
  { path: "/flyga-i-are/klubbuss", h: "Klubbuss" },
  { path: "/flyga-i-are/flygregler", h: "Flygregler" },
  { path: "/flyga-i-are/sakerhet", h: "Säkerhet" },
  { path: "/flyga-i-are/xc", h: "Cross country" },
  { path: "/nyheter", h: "" },
  { path: "/aktiviteter", h: "" },
  { path: "/tavlingar", h: "Tävla" },
  { path: "/om", h: "Åre Skärm- och Drakflygklubb" },
  { path: "/om/styrelsen", h: "Styrelse" },
  { path: "/om/klubbprodukter", h: "Klubbprodukter" },
  { path: "/om/stadgar", h: "Stadgar" },
  { path: "/kontakt", h: "Kontakta oss" },
  { path: "/bli-medlem", h: "Bli medlem" },
  { path: "/ovrigt/foton", h: "" },
  { path: "/ovrigt/dokument", h: "" },
];

test.describe("Page rendering", () => {
  for (const { path, h } of PAGES) {
    test(`${path} renders without 404`, async ({ page }) => {
      await page.goto(path);

      // Should NOT show the 404 text
      const notFound = page.getByText("Sidan hittades inte");
      await expect(notFound).not.toBeVisible();

      // If we have expected heading text, verify it shows
      if (h) {
        await expect(page.getByText(h, { exact: false }).first()).toBeVisible();
      }
    });
  }
});

test.describe("404 handling", () => {
  test("unknown path shows 404 page", async ({ page }) => {
    await page.goto("/this-does-not-exist-xyz");
    await expect(page.getByText("Sidan hittades inte")).toBeVisible();
  });
});
