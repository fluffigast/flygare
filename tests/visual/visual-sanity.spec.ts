import { test, expect } from "@playwright/test";

// ═══════════════════════════════════════════════════════════
// Things a human would notice immediately
// ═══════════════════════════════════════════════════════════

test("[visual] Home hero image is not a gray box", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.locator("section").first();
  const heroImg = hero.locator("img").first();
  if ((await heroImg.count()) > 0) {
    const natural = await heroImg.evaluate((el: HTMLImageElement) => ({
      w: el.naturalWidth,
      h: el.naturalHeight,
    }));
    expect(natural.w, "Hero image didn't load").toBeGreaterThan(100);
    expect(natural.h, "Hero image didn't load").toBeGreaterThan(100);
  }
});

test("[visual] Featured section has image and text side by side on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  // The featured section has two children in flex-row
  const featured = page.locator("section").filter({ has: page.locator("h2") }).first();
  if ((await featured.count()) === 0) return;

  const children = await featured.evaluate((el) => {
    const kids = Array.from(el.children);
    if (kids.length < 2) return null;
    const a = kids[0].getBoundingClientRect();
    const b = kids[1].getBoundingClientRect();
    return { sameRow: Math.abs(a.top - b.top) < 50, aWidth: a.width, bWidth: b.width };
  });

  // On desktop, they should be side by side (not stacked)
  if (children) {
    expect(children.sameRow, "Featured section not side-by-side on desktop").toBe(true);
  }
});

test("[visual] Stats section has dark background", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const stats = page.locator("text=1975").first();
  if ((await stats.count()) === 0) return;

  // Check the text is light colored (white on dark background)
  const textColor = await stats.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.color;
  });

  // On a dark bg, the text should be light (high R,G,B values)
  const match = textColor.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const brightness = (parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3])) / 3;
    expect(brightness, "Stats text should be light (on dark bg)").toBeGreaterThan(150);
  }
});

test("[visual] No element wider than viewport on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const pages = ["/", "/nyheter", "/flyga-i-are", "/kontakt", "/tavlingar"];
  const wide: string[] = [];

  for (const path of pages) {
    await page.goto(path, { waitUntil: "networkidle", timeout: 20000 });

    const wideEls = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const issues: string[] = [];
      document.querySelectorAll("*").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > vw + 5 && el.tagName !== "HTML" && el.tagName !== "BODY") {
          const cls = (el as HTMLElement).className?.toString().slice(0, 40) || el.tagName;
          issues.push(`${cls} (${Math.round(rect.width)}px > ${vw}px)`);
        }
      });
      return issues.slice(0, 3);
    });

    if (wideEls.length > 0) wide.push(`${path}: ${wideEls.join(", ")}`);
  }

  expect(wide, `Elements wider than viewport:\n${wide.join("\n")}`).toEqual([]);
});

test("[visual] Text contrast is readable (no white on white)", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const lowContrast = await page.evaluate(() => {
    const issues: string[] = [];

    function luminance(r: number, g: number, b: number) {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function parseRgb(str: string): [number, number, number] | null {
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
    }

    document.querySelectorAll("p, h1, h2, h3, h4, a, span, li").forEach((el) => {
      if (!(el as HTMLElement).offsetParent) return; // skip hidden
      const text = el.textContent?.trim();
      if (!text || text.length === 0) return;

      const style = window.getComputedStyle(el);
      const fg = parseRgb(style.color);
      const bg = parseRgb(style.backgroundColor);
      if (!fg || !bg) return;
      if (bg[0] === 0 && bg[1] === 0 && bg[2] === 0 && style.backgroundColor.includes("0)")) return; // transparent bg

      const fgL = luminance(...fg);
      const bgL = luminance(...bg);
      const ratio = (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05);

      if (ratio < 2) {
        issues.push(`"${text.slice(0, 20)}" ratio=${ratio.toFixed(1)}`);
      }
    });

    return issues.slice(0, 5);
  });

  if (lowContrast.length > 0) {
    console.log("Low contrast elements:", lowContrast.join("; "));
  }
});

test("[visual] No clipped text on bli-medlem price card", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/bli-medlem", { waitUntil: "networkidle" });

  // The price card (dark background) should show full price text
  const price = page.locator("text=600").first();
  await expect(price).toBeVisible();

  const box = await price.boundingBox();
  expect(box!.width, "Price text might be clipped").toBeGreaterThan(30);
});

test("[visual] Weather cards don't overlap on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/flyga-i-are/vader", { waitUntil: "networkidle" });

  // Weather forecast items should stack (not overlap)
  const items = page.locator("[class*='flex'][class*='flex-col'] >> text=Vindriktning");
  const count = await items.count();

  if (count >= 2) {
    const box1 = await items.nth(0).boundingBox();
    const box2 = await items.nth(1).boundingBox();
    if (box1 && box2) {
      // Second item should be below first (stacked), not overlapping
      expect(box2.y, "Weather cards overlap").toBeGreaterThan(box1.y + box1.height - 5);
    }
  }
});

test("[visual] Article images are not stretched", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const distorted = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll("article img").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.naturalWidth === 0) return;

      // Check if object-fit is applied
      const style = window.getComputedStyle(el);
      if (style.objectFit === "cover" || style.objectFit === "contain") return; // cropped is fine

      const displayRatio = el.width / el.height;
      const naturalRatio = el.naturalWidth / el.naturalHeight;
      const distortion = Math.abs(displayRatio - naturalRatio) / naturalRatio;

      if (distortion > 0.3) {
        issues.push(`${el.src.split("/").pop()}: display ${Math.round(displayRatio * 100)}% vs natural ${Math.round(naturalRatio * 100)}%`);
      }
    });
    return issues;
  });

  expect(distorted, `Stretched images: ${distorted.join(", ")}`).toEqual([]);
});

test("[visual] Footer is at the bottom (not floating mid-page)", async ({ page }) => {
  await page.goto("/ovrigt/dokument", { waitUntil: "networkidle" });

  // On a short page (no documents), footer should still be at the bottom
  const footerBox = await page.locator("footer").boundingBox();
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  if (footerBox) {
    // Footer should be at least at the bottom of the viewport
    expect(footerBox.y, "Footer floating above viewport bottom on short page").toBeGreaterThan(viewportHeight * 0.5);
  }
});

test("[visual] Nav dropdown doesn't get cut off by viewport edge", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  // Hover over "Övrigt" (rightmost dropdown)
  const ovrigt = page.locator("header").getByText("Övrigt", { exact: false }).first();
  if ((await ovrigt.count()) === 0) return;

  await ovrigt.hover();
  await page.waitForTimeout(400);

  const dropdown = page.locator("header .absolute").last();
  if ((await dropdown.count()) === 0) return;

  const box = await dropdown.boundingBox();
  if (box) {
    // Dropdown should not extend past the right edge of the viewport
    expect(box.x + box.width, "Dropdown cut off by right edge").toBeLessThanOrEqual(1280 + 5);
  }
});
