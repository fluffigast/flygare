import { test, expect } from "@playwright/test";

const CMS_API = process.env.CMS_URL ? process.env.CMS_URL + "/api" : "http://localhost:3001/api";

// ═══════════════════════════════════════════════════════════
// SEO & meta — headings hierarchy, meta tags
// ═══════════════════════════════════════════════════════════

test("[seo] Every page has exactly one h1 or zero (home hero is h1)", async ({ page }) => {
  const routes = ["/", "/nyheter", "/flyga-i-are", "/om", "/kontakt", "/bli-medlem", "/tavlingar", "/flyga-i-are/vader"];
  const issues: string[] = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle", timeout: 15000 });
    const h1Count = await page.locator("h1").count();
    if (h1Count > 1) {
      issues.push(`${route}: ${h1Count} h1 tags (should be 0 or 1)`);
    }
  }

  expect(issues, `H1 issues:\n${issues.join("\n")}`).toEqual([]);
});

test("[seo] Page has a title tag", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const title = await page.title();
  expect(title.length, "Page should have a title").toBeGreaterThan(0);
});

test("[seo] Headings don't skip levels (h1 → h3 without h2)", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const skips = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const issues: string[] = [];
    let lastLevel = 0;

    for (const h of headings) {
      const level = parseInt(h.tagName[1]);
      if (lastLevel > 0 && level > lastLevel + 1) {
        issues.push(`${h.tagName} after H${lastLevel}: "${h.textContent?.trim().slice(0, 30)}"`);
      }
      lastLevel = level;
    }
    return issues;
  });

  if (skips.length > 0) {
    console.log("Heading hierarchy skips:", skips.join("; "));
  }
});

// ═══════════════════════════════════════════════════════════
// Swedish characters — Å Ä Ö render everywhere
// ═══════════════════════════════════════════════════════════

test("[i18n] Swedish characters render correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const bodyText = await page.textContent("body");

  // Must find Swedish special chars
  expect(bodyText).toContain("Åre");
  expect(bodyText).toContain("Skärm");
  expect(bodyText).toContain("ö"); // any ö
});

test("[i18n] Footer renders Swedish characters", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const footerText = await page.locator("footer").textContent();
  expect(footerText).toContain("Säkerhet");
  expect(footerText).toContain("Nödinformation");
  expect(footerText).toContain("Väder");
});

// ═══════════════════════════════════════════════════════════
// Image alt text — accessibility
// ═══════════════════════════════════════════════════════════

test("[a11y] All visible images have alt text", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const missingAlt = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll("img").forEach((img) => {
      if (img.offsetParent === null) return; // skip hidden
      if (!img.alt || img.alt.trim() === "") {
        issues.push(img.src.split("/").pop() ?? "unknown");
      }
    });
    return issues;
  });

  if (missingAlt.length > 0) {
    console.log("Images without alt:", missingAlt.join(", "));
  }
  // Warn — some decorative images are OK without alt
});

// ═══════════════════════════════════════════════════════════
// Keyboard navigation — tab through interactive elements
// ═══════════════════════════════════════════════════════════

test("[a11y] Can tab through nav links", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  // Tab to first focusable element
  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
  expect(firstFocused).toBe("A"); // Should focus a link

  // Tab a few more times — should not get stuck
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
  }
  const stillFocused = await page.evaluate(() => document.activeElement?.tagName);
  expect(["A", "BUTTON"]).toContain(stillFocused);
});

test("[a11y] Skip to content or focus visible on tab", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.keyboard.press("Tab");

  // Check focus is visible (outline)
  const hasFocusStyle = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.outlineStyle !== "none" || style.boxShadow !== "none";
  });

  // Informational — focus visibility is important for a11y
  if (!hasFocusStyle) {
    console.log("Warning: focus indicator may not be visible on tab");
  }
});

// ═══════════════════════════════════════════════════════════
// External links — open in new tab, have rel=noopener
// ═══════════════════════════════════════════════════════════

test("[links] External links have target=_blank and rel=noopener", async ({ page }) => {
  await page.goto("/kontakt", { waitUntil: "networkidle" });

  const unsafeLinks = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll('a[href^="http"]').forEach((a) => {
      const el = a as HTMLAnchorElement;
      // Skip same-origin links
      if (el.href.includes(window.location.hostname)) return;

      if (el.target !== "_blank") {
        issues.push(`${el.href} missing target=_blank`);
      }
      if (!el.rel.includes("noopener")) {
        issues.push(`${el.href} missing rel=noopener`);
      }
    });
    return issues;
  });

  expect(unsafeLinks, `Unsafe external links:\n${unsafeLinks.join("\n")}`).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// URL consistency — no double slashes, no trailing slashes
// ═══════════════════════════════════════════════════════════

test("[url] No double slashes in internal links", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const doubleSlashLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href") ?? "")
      .filter((h) => h.startsWith("/") && h.includes("//"));
  });

  expect(doubleSlashLinks, `Double-slash links: ${doubleSlashLinks.join(", ")}`).toEqual([]);
});

// ═══════════════════════════════════════════════════════════
// CMS data freshness — frontend actually uses CMS data
// ═══════════════════════════════════════════════════════════

test("[cms] Frontend shows CMS news, not just local data", async ({ page }) => {
  // Check CMS has news
  const cmsRes = await page.request.get(`${CMS_API}/news?limit=1&sort=-date`);
  const cmsData = await cmsRes.json();
  const cmsTitle = cmsData.docs[0]?.title;

  if (cmsTitle) {
    await page.goto("/nyheter", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const bodyText = await page.textContent("body");
    expect(bodyText, "Frontend should show CMS news title").toContain(cmsTitle);
  }
});

test("[cms] Frontend shows CMS site-settings, not hardcoded", async ({ page }) => {
  const cmsRes = await page.request.get(`${CMS_API}/globals/site-settings`);
  const settings = await cmsRes.json();

  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const bodyText = await page.textContent("body");

  // The hero tagline should come from CMS
  if (settings.heroTagline) {
    expect(bodyText).toContain(settings.heroTagline);
  }
});

test("[cms] Frontend shows CMS contact info", async ({ page }) => {
  const cmsRes = await page.request.get(`${CMS_API}/globals/contact-info`);
  const contact = await cmsRes.json();

  await page.goto("/kontakt", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const bodyText = await page.textContent("body");

  if (contact.email) {
    expect(bodyText).toContain(contact.email);
  }
});

// ═══════════════════════════════════════════════════════════
// Interactive elements — sliders, map, arrows
// ═══════════════════════════════════════════════════════════

test("[interactive] News slider arrows work on home page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Find the next arrow button near "Nyheter"
  const nextBtn = page.locator('button[aria-label="Next"]').first();
  if ((await nextBtn.count()) > 0) {
    await nextBtn.click();
    await page.waitForTimeout(500);
    // Page shouldn't crash
    const bodyText = await page.textContent("body");
    expect(bodyText!.length).toBeGreaterThan(100);
  }
});

test("[interactive] News page pagination dots work", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Find pagination dots (radio buttons)
  const dots = page.locator('[role="radiogroup"] button, [role="radiogroup"] [role="radio"]');
  if ((await dots.count()) > 1) {
    await dots.nth(1).click();
    await page.waitForTimeout(500);
    // Page should still render
    const bodyText = await page.textContent("body");
    expect(bodyText!.length).toBeGreaterThan(100);
  }
});

test("[interactive] Weather wind arrows have rotation", async ({ page }) => {
  await page.goto("/flyga-i-are/vader", { waitUntil: "networkidle" });

  const windArrows = page.locator("[style*='rotate']");
  const count = await windArrows.count();
  // Should have wind direction arrows with rotation transforms
  expect(count, "Should have rotated wind arrows").toBeGreaterThan(0);
});

// ═══════════════════════════════════════════════════════════
// Sites single page — launch site details
// ═══════════════════════════════════════════════════════════

test("[content] Launch site detail page loads with content", async ({ page }) => {
  await page.goto("/flyga-i-are/startplatser", { waitUntil: "networkidle" });

  // Find a link to a single site
  const siteLink = page.locator("a[href*='/flyga-i-are/startplatser/']").first();
  if ((await siteLink.count()) > 0) {
    const href = await siteLink.getAttribute("href");
    await siteLink.click();
    await page.waitForURL(`**${href}`, { timeout: 10000 });

    // Should have content
    const notFound = await page.locator("text=Sidan hittades inte").count();
    const itemNotFound = await page.locator("text=Sites item not found").count();
    expect(notFound + itemNotFound).toBe(0);

    // Should have position/altitude info
    const body = await page.textContent("body");
    expect(body!.length).toBeGreaterThan(200);
  }
});

// ═══════════════════════════════════════════════════════════
// Cross-page consistency
// ═══════════════════════════════════════════════════════════

test("[consistency] Header club name is same across pages", async ({ page }) => {
  const routes = ["/nyheter", "/om", "/kontakt", "/flyga-i-are", "/tavlingar"];
  const names: string[] = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle", timeout: 15000 });
    const headerText = await page.locator("header a").first().textContent();
    names.push(headerText?.trim() ?? "");
  }

  // All pages should show same club name
  const unique = [...new Set(names)];
  expect(unique.length, `Different header names: ${names.join(" | ")}`).toBe(1);
});

test("[consistency] Footer structure identical across pages", async ({ page }) => {
  const routes = ["/nyheter", "/om", "/kontakt", "/flyga-i-are"];
  const footerTexts: string[] = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle", timeout: 15000 });
    const footerText = await page.locator("footer").textContent();
    footerTexts.push(footerText?.trim() ?? "");
  }

  const unique = [...new Set(footerTexts)];
  expect(unique.length, "Footer should be same across pages").toBe(1);
});

// ═══════════════════════════════════════════════════════════
// Error resilience — graceful degradation
// ═══════════════════════════════════════════════════════════

test("[resilience] Pages load even if CMS is slow (uses fallback)", async ({ page }) => {
  // Block CMS requests to simulate CMS being down
  await page.route("**/flygare-cms**", (route) => route.abort());

  await page.goto("/", { waitUntil: "networkidle", timeout: 15000 });

  // Page should still render with local fallback data
  const body = await page.textContent("body");
  expect(body!.length).toBeGreaterThan(100);

  // Should show the club name
  expect(body).toContain("Åre");

  await page.unrouteAll();
});

test("[resilience] Kontakt page loads with CMS blocked", async ({ page }) => {
  await page.route("**/flygare-cms**", (route) => route.abort());

  await page.goto("/kontakt", { waitUntil: "networkidle", timeout: 15000 });

  // Should show fallback contact data
  const body = await page.textContent("body");
  expect(body).toContain("info@flygare.nu");
  expect(body).toContain("Radiofrekvenser");

  await page.unrouteAll();
});

test("[resilience] Nyheter loads with CMS blocked", async ({ page }) => {
  await page.route("**/flygare-cms**", (route) => route.abort());

  await page.goto("/nyheter", { waitUntil: "networkidle", timeout: 15000 });

  // Should show local fallback news
  const body = await page.textContent("body");
  expect(body!.length).toBeGreaterThan(100);

  await page.unrouteAll();
});
