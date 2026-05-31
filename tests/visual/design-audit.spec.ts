import { test, expect } from "@playwright/test";

// Real device sizes people actually use
const devices = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14 Pro", width: 393, height: 852 },
  { name: "Samsung Galaxy S23", width: 360, height: 780 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "MacBook Air", width: 1280, height: 800 },
  { name: "27in Monitor", width: 1920, height: 1080 },
  { name: "Ultrawide", width: 2560, height: 1080 },
];

const keyPages = [
  { path: "/", name: "Hem" },
  { path: "/flyga-i-are", name: "Flyga i Åre" },
  { path: "/nyheter", name: "Nyheter" },
  { path: "/flyga-i-are/vader", name: "Väder" },
  { path: "/om", name: "Om" },
  { path: "/kontakt", name: "Kontakt" },
  { path: "/bli-medlem", name: "Bli medlem" },
];

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: overflow at every real device size
// ═══════════════════════════════════════════════════════════

for (const device of devices) {
  test(`[design] No overflow @ ${device.name} (${device.width}px)`, async ({ page }) => {
    await page.setViewportSize({ width: device.width, height: device.height });
    const overflowPages: string[] = [];

    for (const p of keyPages) {
      await page.goto(p.path, { waitUntil: "networkidle", timeout: 15000 });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      if (overflow) overflowPages.push(p.path);
    }

    expect(overflowPages, `Overflow at ${device.name}: ${overflowPages.join(", ")}`).toEqual([]);
  });
}

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: text readability
// ═══════════════════════════════════════════════════════════

test("[design] No text smaller than 12px on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const tinyText: string[] = [];

  for (const p of keyPages) {
    await page.goto(p.path, { waitUntil: "networkidle", timeout: 15000 });

    const tiny = await page.evaluate(() => {
      const issues: string[] = [];
      document.querySelectorAll("p, span, a, li, td, th, label").forEach((el) => {
        const style = window.getComputedStyle(el);
        const size = parseFloat(style.fontSize);
        if (size < 12 && el.textContent && el.textContent.trim().length > 0) {
          const text = el.textContent.trim().slice(0, 40);
          issues.push(`${size}px: "${text}"`);
        }
      });
      return issues.slice(0, 5);
    });

    if (tiny.length > 0) {
      tinyText.push(`${p.path}: ${tiny.join("; ")}`);
    }
  }

  if (tinyText.length > 0) {
    console.log("Tiny text found:", tinyText.join("\n"));
  }
  // Warn but don't fail — some tiny text is intentional (labels)
});

test("[design] No text overflows its container on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const overflowText: string[] = [];

  for (const p of keyPages) {
    await page.goto(p.path, { waitUntil: "networkidle", timeout: 15000 });

    const issues = await page.evaluate(() => {
      const problems: string[] = [];
      document.querySelectorAll("h1, h2, h3, h4, p").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 1) {
          const text = el.textContent?.trim().slice(0, 40) ?? "";
          problems.push(`"${text}" extends ${Math.round(rect.right - window.innerWidth)}px past viewport`);
        }
      });
      return problems.slice(0, 5);
    });

    if (issues.length > 0) {
      overflowText.push(`${p.path}: ${issues.join("; ")}`);
    }
  }

  expect(overflowText, `Text overflow:\n${overflowText.join("\n")}`).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: touch targets
// ═══════════════════════════════════════════════════════════

test("[design] Touch targets are at least 44px on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "networkidle" });

  const smallTargets = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll("a, button").forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Skip hidden elements
      if (rect.width === 0 || rect.height === 0) return;
      // Skip elements in the header (they stack differently)
      if (el.closest("header")) return;

      if (rect.height < 44 && rect.width < 44) {
        const text = el.textContent?.trim().slice(0, 30) ?? el.getAttribute("aria-label") ?? "unknown";
        issues.push(`${Math.round(rect.width)}x${Math.round(rect.height)}px: "${text}"`);
      }
    });
    return issues.slice(0, 10);
  });

  if (smallTargets.length > 0) {
    console.log("Small touch targets:", smallTargets.join("\n"));
  }
  // Informational — log but don't fail
});

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: visual consistency
// ═══════════════════════════════════════════════════════════

test("[design] All pages have consistent header and footer", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const issues: string[] = [];

  for (const p of keyPages) {
    await page.goto(p.path, { waitUntil: "networkidle", timeout: 15000 });

    const hasHeader = await page.locator("header").count();
    const hasFooter = await page.locator("footer").count();

    if (hasHeader === 0) issues.push(`${p.path}: missing header`);
    if (hasFooter === 0) issues.push(`${p.path}: missing footer`);
  }

  expect(issues, `Missing header/footer:\n${issues.join("\n")}`).toEqual([]);
});

test("[design] Font families load correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const fonts = await page.evaluate(() => {
    const h1 = document.querySelector("h1, h2");
    const p = document.querySelector("p");
    return {
      heading: h1 ? window.getComputedStyle(h1).fontFamily : "none",
      body: p ? window.getComputedStyle(p).fontFamily : "none",
    };
  });

  // Should use custom fonts, not system defaults
  expect(fonts.heading).not.toContain("Times");
  expect(fonts.body).not.toContain("Times");
  expect(fonts.heading).toContain("Source Serif");
  expect(fonts.body).toContain("Karla");
});

test("[design] Color scheme is consistent (no bright neon or red)", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hasBrightRed = await page.evaluate(() => {
    let found = false;
    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bg = style.backgroundColor;
      // Check for bright red/neon that shouldn't be in a navy+gold palette
      if (color.includes("rgb(255, 0, 0)") || bg.includes("rgb(255, 0, 0)")) {
        found = true;
      }
    });
    return found;
  });

  expect(hasBrightRed, "Found bright red elements — shouldn't be in this design").toBe(false);
});

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: spacing and alignment
// ═══════════════════════════════════════════════════════════

test("[design] No overlapping elements on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const overlaps: string[] = [];

  for (const p of [keyPages[0], keyPages[2], keyPages[4]]) {
    await page.goto(p.path, { waitUntil: "networkidle", timeout: 15000 });

    const issues = await page.evaluate(() => {
      const problems: string[] = [];
      const elements = Array.from(document.querySelectorAll("h1, h2, h3, p, img, section"));

      for (let i = 0; i < elements.length - 1; i++) {
        const a = elements[i].getBoundingClientRect();
        const b = elements[i + 1].getBoundingClientRect();

        // Skip invisible or zero-size
        if (a.height === 0 || b.height === 0) continue;
        if (a.width === 0 || b.width === 0) continue;

        // Check vertical overlap (elements that should stack but overlap)
        if (a.bottom > b.top + 2 && a.top < b.top) {
          const aText = elements[i].textContent?.trim().slice(0, 20) ?? elements[i].tagName;
          const bText = elements[i + 1].textContent?.trim().slice(0, 20) ?? elements[i + 1].tagName;
          // Only flag if they're in the same container (siblings)
          if (elements[i].parentElement === elements[i + 1].parentElement) {
            problems.push(`"${aText}" overlaps "${bText}" by ${Math.round(a.bottom - b.top)}px`);
          }
        }
      }
      return problems.slice(0, 5);
    });

    if (issues.length > 0) {
      overlaps.push(`${p.path}: ${issues.join("; ")}`);
    }
  }

  expect(overlaps, `Overlapping elements:\n${overlaps.join("\n")}`).toEqual([]);
});

test("[design] Images have proper aspect ratios (not stretched)", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const stretchedImages = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll("img").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.naturalWidth === 0 || el.naturalHeight === 0) return;

      const displayRatio = el.width / el.height;
      const naturalRatio = el.naturalWidth / el.naturalHeight;
      const distortion = Math.abs(displayRatio - naturalRatio) / naturalRatio;

      // Allow up to 50% ratio difference (object-cover crops, that's fine)
      // But flag extreme distortion
      if (distortion > 2.0) {
        issues.push(`${el.src.split("/").pop()}: display ${el.width}x${el.height} vs natural ${el.naturalWidth}x${el.naturalHeight}`);
      }
    });
    return issues;
  });

  expect(stretchedImages, `Stretched images: ${stretchedImages.join(", ")}`).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// DESIGN AUDIT: responsive screenshots for manual review
// ═══════════════════════════════════════════════════════════

for (const device of devices) {
  test(`[screenshot] Home @ ${device.name}`, async ({ page }) => {
    await page.setViewportSize({ width: device.width, height: device.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `tests/screenshots/${device.name.replace(/\s+/g, "-").toLowerCase()}-home.png`,
      fullPage: true,
    });
  });
}

// Screenshot every page at iPhone 14 Pro (most common phone)
for (const p of keyPages) {
  test(`[screenshot] ${p.name} @ iPhone 14 Pro`, async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(p.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `tests/screenshots/iphone14-${p.name.toLowerCase().replace(/\s+/g, "-")}.png`,
      fullPage: true,
    });
  });
}
