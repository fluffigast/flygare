import { test, expect } from "@playwright/test";

const PAGES: { name: string; path: string }[] = [
  { name: "home", path: "/" },
  { name: "flyga-i-are", path: "/flyga-i-are" },
  { name: "flygregler", path: "/flyga-i-are/flygregler" },
  { name: "startplatser", path: "/flyga-i-are/startplatser" },
  { name: "startplats-1000-meter-syd", path: "/flyga-i-are/startplatser/1000-meter-syd" },
  { name: "vader", path: "/flyga-i-are/vader" },
  { name: "klubbuss", path: "/flyga-i-are/klubbuss" },
  { name: "xc", path: "/flyga-i-are/xc" },
  { name: "sakerhet", path: "/flyga-i-are/sakerhet" },
  { name: "nyheter", path: "/nyheter" },
  { name: "aktiviteter", path: "/aktiviteter" },
  { name: "tavlingar", path: "/tavlingar" },
  { name: "om", path: "/om" },
  { name: "styrelsen", path: "/om/styrelsen" },
  { name: "kontakt", path: "/kontakt" },
  { name: "bli-medlem", path: "/bli-medlem" },
];

test.use({ viewport: { width: 1440, height: 900 } });

for (const { name, path } of PAGES) {
  test(`desktop-fullpage ${name}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `tests/screenshots/qa-desktop/${name}.png`,
      fullPage: true,
    });
    expect(true).toBe(true);
  });
}
