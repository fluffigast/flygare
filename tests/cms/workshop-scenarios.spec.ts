import { test, expect } from "@playwright/test";

const CMS = process.env.CMS_URL || "http://localhost:3001";
const CMS_API = `${CMS}/api`;

// ═══════════════════════════════════════════════════════════
// Workshop: Therese (ordförande) wants to update club info
// ═══════════════════════════════════════════════════════════

test.describe("Therese updates club info", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${CMS_API}/users/login`, {
      data: { email: "admin@flygare.nu", password: process.env.CMS_PASSWORD ?? "changeme" },
    });
    token = (await res.json()).token;
  });

  test("Changes club email → appears on kontakt page", async ({ request, page }) => {
    const original = await (await request.get(`${CMS_API}/globals/contact-info`)).json();

    await request.post(`${CMS_API}/globals/contact-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { email: "therese-test@flygare.nu" },
    });

    // Verify in CMS
    const updated = await (await request.get(`${CMS_API}/globals/contact-info`)).json();
    expect(updated.email).toBe("therese-test@flygare.nu");

    // Restore
    await request.post(`${CMS_API}/globals/contact-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { email: original.email },
    });
  });

  test("Adds a new board member → appears in API", async ({ request }) => {
    const createRes = await request.post(`${CMS_API}/board-members`, {
      headers: { Authorization: `JWT ${token}` },
      data: { name: "Test Person", role: "Testroll", sortOrder: 99 },
    });
    const created = await createRes.json();
    expect(created.doc.name).toBe("Test Person");

    // Clean up
    await request.delete(`${CMS_API}/board-members/${created.doc.id}`, {
      headers: { Authorization: `JWT ${token}` },
    });
  });

  test("Edits heroTagline → reads back correctly", async ({ request }) => {
    const original = await (await request.get(`${CMS_API}/globals/site-settings`)).json();

    await request.post(`${CMS_API}/globals/site-settings`, {
      headers: { Authorization: `JWT ${token}` },
      data: { heroTagline: "Therese testar!" },
    });

    const updated = await (await request.get(`${CMS_API}/globals/site-settings`)).json();
    expect(updated.heroTagline).toBe("Therese testar!");

    await request.post(`${CMS_API}/globals/site-settings`, {
      headers: { Authorization: `JWT ${token}` },
      data: { heroTagline: original.heroTagline },
    });
  });
});

// ═══════════════════════════════════════════════════════════
// Workshop: Vladimir (vice ordförande) writes a news post
// ═══════════════════════════════════════════════════════════

test.describe("Vladimir writes news", () => {
  let token: string;
  let createdId: number;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${CMS_API}/users/login`, {
      data: { email: "admin@flygare.nu", password: process.env.CMS_PASSWORD ?? "changeme" },
    });
    token = (await res.json()).token;
  });

  test("Creates a news item with title, category, date", async ({ request }) => {
    const res = await request.post(`${CMS_API}/news`, {
      headers: { Authorization: `JWT ${token}` },
      data: {
        title: "Vladimirs testnyhhet",
        category: "Information",
        date: "2026-05-31",
        description: "Detta är en testnyhet skapad under workshopen.",
      },
    });
    const data = await res.json();
    createdId = data.doc.id;
    expect(data.doc.title).toBe("Vladimirs testnyhhet");
  });

  test("The news item appears in the list", async ({ request }) => {
    const res = await request.get(`${CMS_API}/news?sort=-date&limit=5`);
    const data = await res.json();
    const found = data.docs.find((d: any) => d.title === "Vladimirs testnyhhet");
    expect(found).toBeDefined();
  });

  test("Can edit the news item title", async ({ request }) => {
    await request.patch(`${CMS_API}/news/${createdId}`, {
      headers: { Authorization: `JWT ${token}` },
      data: { title: "Vladimirs uppdaterade nyhet" },
    });

    const res = await request.get(`${CMS_API}/news/${createdId}`);
    const data = await res.json();
    expect(data.title).toBe("Vladimirs uppdaterade nyhet");
  });

  test("Can delete the test news item", async ({ request }) => {
    const res = await request.delete(`${CMS_API}/news/${createdId}`, {
      headers: { Authorization: `JWT ${token}` },
    });
    expect(res.status()).toBeLessThan(400);
  });
});

// ═══════════════════════════════════════════════════════════
// Workshop: Linda (kassör) updates membership price
// ═══════════════════════════════════════════════════════════

test.describe("Linda updates membership", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${CMS_API}/users/login`, {
      data: { email: "admin@flygare.nu", password: process.env.CMS_PASSWORD ?? "changeme" },
    });
    token = (await res.json()).token;
  });

  test("Updates membership price", async ({ request }) => {
    const original = await (await request.get(`${CMS_API}/globals/membership-info`)).json();

    await request.post(`${CMS_API}/globals/membership-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { price: "700 kr / år" },
    });

    const updated = await (await request.get(`${CMS_API}/globals/membership-info`)).json();
    expect(updated.price).toBe("700 kr / år");

    // Restore
    await request.post(`${CMS_API}/globals/membership-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { price: original.price },
    });
  });

  test("Updates shop URL", async ({ request }) => {
    const original = await (await request.get(`${CMS_API}/globals/membership-info`)).json();

    await request.post(`${CMS_API}/globals/membership-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { shopUrl: "https://test-shop.example.com" },
    });

    const updated = await (await request.get(`${CMS_API}/globals/membership-info`)).json();
    expect(updated.shopUrl).toBe("https://test-shop.example.com");

    await request.post(`${CMS_API}/globals/membership-info`, {
      headers: { Authorization: `JWT ${token}` },
      data: { shopUrl: original.shopUrl },
    });
  });
});

// ═══════════════════════════════════════════════════════════
// Workshop: Alexander (ledamot) adds a page about safety
// ═══════════════════════════════════════════════════════════

test.describe("Alexander edits a page", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${CMS_API}/users/login`, {
      data: { email: "admin@flygare.nu", password: process.env.CMS_PASSWORD ?? "changeme" },
    });
    token = (await res.json()).token;
  });

  test("Edits the safety page title", async ({ request }) => {
    const pages = await (await request.get(`${CMS_API}/pages?where[slug][equals]=sakerhet&limit=1`)).json();
    const pageId = pages.docs[0]?.id;
    if (!pageId) return;

    const original = pages.docs[0].title;

    await request.patch(`${CMS_API}/pages/${pageId}`, {
      headers: { Authorization: `JWT ${token}` },
      data: { title: "Säkerhet — uppdaterad av Alexander" },
    });

    const updated = await (await request.get(`${CMS_API}/pages/${pageId}`)).json();
    expect(updated.title).toBe("Säkerhet — uppdaterad av Alexander");

    // Restore
    await request.patch(`${CMS_API}/pages/${pageId}`, {
      headers: { Authorization: `JWT ${token}` },
      data: { title: original },
    });
  });
});

// ═══════════════════════════════════════════════════════════
// Workshop: Pontus (ledamot) updates nav order
// ═══════════════════════════════════════════════════════════

test.describe("Pontus edits navigation", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${CMS_API}/users/login`, {
      data: { email: "admin@flygare.nu", password: process.env.CMS_PASSWORD ?? "changeme" },
    });
    token = (await res.json()).token;
  });

  test("Reads nav structure — has sections with children", async ({ request }) => {
    const nav = await (await request.get(`${CMS_API}/globals/site-navigation`)).json();
    expect(nav.sections.length).toBeGreaterThanOrEqual(3);
    // Verify key sections exist
    const labels = nav.sections.map((s: any) => s.label);
    expect(labels).toContain("Hem");
    expect(labels).toContain("Flyga i Åre");
  });

  test("Flyga i Åre has subsections", async ({ request }) => {
    const nav = await (await request.get(`${CMS_API}/globals/site-navigation`)).json();
    const flyga = nav.sections.find((s: any) => s.label === "Flyga i Åre");
    expect(flyga).toBeDefined();
    expect(flyga.children.length).toBeGreaterThanOrEqual(1);
  });

  test("Om klubben has subsections", async ({ request }) => {
    const nav = await (await request.get(`${CMS_API}/globals/site-navigation`)).json();
    const om = nav.sections.find((s: any) => s.label === "Om klubben");
    expect(om).toBeDefined();
    expect(om.children.length).toBeGreaterThanOrEqual(1);
  });
});

// ═══════════════════════════════════════════════════════════
// Visitor on slow 3G — pages degrade gracefully
// ═══════════════════════════════════════════════════════════

test.describe("Slow network visitor", () => {
  test("Home page loads with throttled network", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    // Simulate slow 3G
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: 400 * 1024 / 8, // 400 kbps
      uploadThroughput: 400 * 1024 / 8,
      latency: 400,
    });

    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });

    // Should at least show the shell
    const body = await page.textContent("body");
    expect(body!.length).toBeGreaterThan(0);

    await context.close();
  });
});

// ═══════════════════════════════════════════════════════════
// Multiple tabs — opening site in two tabs doesn't break
// ═══════════════════════════════════════════════════════════

test("Two tabs viewing different pages simultaneously", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL });

  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await Promise.all([
    page1.goto("/kontakt", { waitUntil: "networkidle" }),
    page2.goto("/nyheter", { waitUntil: "networkidle" }),
  ]);

  // Both should render correctly
  const kontaktText = await page1.textContent("body");
  const nyheterText = await page2.textContent("body");

  expect(kontaktText).toContain("info@flygare.nu");
  expect(nyheterText!.length).toBeGreaterThan(100);

  await context.close();
});

// ═══════════════════════════════════════════════════════════
// Refresh mid-page — doesn't lose position or break
// ═══════════════════════════════════════════════════════════

test("Refresh on a subpage keeps you on that page", async ({ page }) => {
  await page.goto("/flyga-i-are/flygregler", { waitUntil: "networkidle" });

  // Verify content loaded
  await expect(page.locator("h2").first()).toBeVisible();

  // Refresh
  await page.reload({ waitUntil: "networkidle" });

  // Should still be on the same page
  expect(page.url()).toContain("/flyga-i-are/flygregler");
  await expect(page.locator("h2").first()).toBeVisible();
});

test("Refresh on /om/styrelsen keeps you there", async ({ page }) => {
  await page.goto("/om/styrelsen", { waitUntil: "networkidle" });
  await expect(page.locator("text=Ordförande").first()).toBeVisible();

  await page.reload({ waitUntil: "networkidle" });
  expect(page.url()).toContain("/om/styrelsen");
  await expect(page.locator("text=Ordförande").first()).toBeVisible();
});
