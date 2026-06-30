import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const PAGES = [
  "/",
  "/flyga-i-are",
  "/flyga-i-are/flygregler",
  "/flyga-i-are/startplatser",
  "/flyga-i-are/startplatser/1000-meter-syd",
  "/flyga-i-are/startplatser/vasterskutan-nord",
  "/flyga-i-are/startplatser/morvikshummeln",
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
  kind: "console" | "network" | "404" | "visible-error" | "x-overflow";
  detail: string;
}

const findings: Finding[] = [];
const outDir = "tests/screenshots/qa-audit";
fs.mkdirSync(outDir, { recursive: true });

test.use({ viewport: { width: 1440, height: 900 } });

for (const url of PAGES) {
  test(`audit ${url}`, async ({ page }) => {
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

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // capture screenshot
    const slug = url === "/" ? "_home" : url.replace(/^\//, "").replace(/\//g, "_");
    await page.screenshot({ path: path.join(outDir, `${slug}.png`), fullPage: true });

    // 1) visible error strings
    const errorTexts = await page.locator(
      "text=/Sidan hittades inte|Kunde inte ladda|Unexpected token|module\\.exp|Error|TypeError|undefined is not/i"
    ).allTextContents();
    for (const t of errorTexts) {
      findings.push({ page: url, kind: "visible-error", detail: t.trim().slice(0, 200) });
    }

    // 2) console errors
    for (const e of consoleErrors) {
      findings.push({ page: url, kind: "console", detail: e.slice(0, 200) });
    }

    // 3) failed network responses
    for (const n of netErrors) {
      findings.push({ page: url, kind: "network", detail: n.slice(0, 200) });
    }

    // 4) horizontal overflow check
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const elems = Array.from(document.querySelectorAll("*"));
      const offenders: { tag: string; w: number; right: number; cls: string }[] = [];
      for (const el of elems) {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            w: Math.round(r.width),
            right: Math.round(r.right),
            cls: (el as HTMLElement).className?.toString().slice(0, 80) ?? "",
          });
        }
      }
      // de-dup by tag+cls
      const seen = new Set<string>();
      return offenders.filter((o) => {
        const key = o.tag + o.cls;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 5);
    });
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
  console.log("\n==== QA AUDIT FINDINGS ====");
  console.log(summary || "no findings");
  console.log("==== END FINDINGS ====\n");
});
