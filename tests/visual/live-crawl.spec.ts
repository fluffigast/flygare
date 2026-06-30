import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const LIVE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";

const PAGES = [
  "/",
  "/flyga-i-are",
  "/flyga-i-are/flygregler",
  "/flyga-i-are/startplatser",
  "/flyga-i-are/startplatser/1000-meter-syd",
  "/flyga-i-are/startplatser/vasterskutan-nord",
  "/flyga-i-are/startplatser/morvikshummeln",
  "/flyga-i-are/startplatser/tvaravalvet",
  "/flyga-i-are/vader",
  "/flyga-i-are/klubbuss",
  "/flyga-i-are/xc",
  "/flyga-i-are/sakerhet",
  "/flyga-i-are/klubbprodukter",
  "/flyga-i-are/stadgar",
  "/nyheter",
  "/aktiviteter",
  "/tavlingar",
  "/om",
  "/om/styrelsen",
  "/kontakt",
  "/bli-medlem",
  "/ovrigt/foton",
  "/ovrigt/dokument",
];

interface Finding {
  page: string;
  kind: string;
  detail: string;
}
const findings: Finding[] = [];
const outDir = "tests/screenshots/live-crawl";
fs.mkdirSync(outDir, { recursive: true });

test.use({ viewport: { width: 1440, height: 900 } });

for (const url of PAGES) {
  test(`live ${url}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

    const netErrors: string[] = [];
    page.on("response", (resp) => {
      if (resp.status() >= 400) {
        netErrors.push(`${resp.status()} ${resp.url()}`);
      }
    });

    let navStatus = 0;
    try {
      const resp = await page.goto(LIVE + url, { waitUntil: "networkidle", timeout: 25_000 });
      navStatus = resp?.status() ?? 0;
    } catch (err) {
      findings.push({ page: url, kind: "nav-fail", detail: String(err).slice(0, 200) });
    }

    if (navStatus >= 400) {
      findings.push({ page: url, kind: "nav-status", detail: `HTTP ${navStatus}` });
    }

    await page.waitForTimeout(400);

    // Capture screenshot
    const slug = url === "/" ? "_home" : url.replace(/^\//, "").replace(/\//g, "_");
    try {
      await page.screenshot({ path: path.join(outDir, `${slug}.png`), fullPage: true });
    } catch {/* ignore */}

    // Visible error text scan
    const errorTexts = await page.locator(
      "text=/Sidan hittades inte|Kunde inte ladda|Unexpected token|module\\.exp|TypeError|undefined is not|Error:/i"
    ).allTextContents().catch(() => []);
    for (const t of errorTexts) {
      findings.push({ page: url, kind: "visible-error", detail: t.trim().slice(0, 200) });
    }

    // Console errors
    for (const e of consoleErrors) {
      findings.push({ page: url, kind: "console", detail: e.slice(0, 200) });
    }

    // Failed network requests
    for (const n of netErrors) {
      findings.push({ page: url, kind: "network", detail: n.slice(0, 200) });
    }

    // Body sanity: at least a heading visible
    const headingCount = await page.locator("h1, h2").count().catch(() => 0);
    if (headingCount === 0) {
      findings.push({ page: url, kind: "empty-page", detail: "no h1/h2 rendered" });
    }

    // Horizontal overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const elems = Array.from(document.querySelectorAll("body *"));
      const offenders: { tag: string; w: number; right: number; cls: string }[] = [];
      for (const el of elems) {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1) {
          const style = getComputedStyle(el);
          if (style.position === "fixed") continue;
          offenders.push({
            tag: el.tagName.toLowerCase(),
            w: Math.round(r.width),
            right: Math.round(r.right),
            cls: (el as HTMLElement).className?.toString().slice(0, 80) ?? "",
          });
        }
      }
      const seen = new Set<string>();
      return offenders.filter((o) => {
        const key = o.tag + o.cls;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 5);
    }).catch(() => [] as { tag: string; w: number; right: number; cls: string }[]);
    for (const o of overflow) {
      findings.push({
        page: url,
        kind: "x-overflow",
        detail: `<${o.tag} class="${o.cls}"> w=${o.w} right=${o.right}`,
      });
    }
    expect(true).toBe(true);
  });
}

test.afterAll(() => {
  const summary = findings
    .map((f) => `[${f.kind}] ${f.page} :: ${f.detail}`)
    .join("\n");
  fs.writeFileSync(path.join(outDir, "_findings.txt"), summary || "no findings");
  console.log("\n==== LIVE CRAWL FINDINGS ====");
  console.log(summary || "no findings");
  console.log("==== END FINDINGS ====\n");
});
