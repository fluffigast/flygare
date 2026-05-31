import { test } from "@playwright/test";

const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
const pages = ["/", "/nyheter", "/flyga-i-are", "/flyga-i-are/startplatser", "/flyga-i-are/vader", "/om", "/bli-medlem", "/kontakt"];
const widths = [320, 375, 412];

test("Find all overflow elements across phone widths", async ({ browser }) => {
  const findings: string[] = [];

  for (const path of pages) {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 812 } });
      const page = await ctx.newPage();
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

      const result = await page.evaluate(() => {
        const html = document.documentElement;
        const overflowElements: string[] = [];

        document.querySelectorAll("*").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > html.clientWidth + 1) {
            const tag = el.tagName.toLowerCase();
            const cls = (el as HTMLElement).className?.toString().slice(0, 80) || "";
            overflowElements.push(
              `${tag}[${cls}] right=${Math.round(rect.right)}px > viewport=${html.clientWidth}px`
            );
          }
        });

        return {
          scrollW: html.scrollWidth,
          clientW: html.clientWidth,
          overflows: overflowElements.slice(0, 5),
        };
      });

      if (result.scrollW > result.clientW || result.overflows.length > 0) {
        findings.push(`\n${path} @ ${w}px (scrollWidth=${result.scrollW} > clientWidth=${result.clientW}):`);
        result.overflows.forEach((o) => findings.push(`  ${o}`));
      }
      await ctx.close();
    }
  }

  if (findings.length > 0) {
    console.log("\n=== OVERFLOW REPORT ===");
    findings.forEach((f) => console.log(f));
    console.log("=== END REPORT ===\n");
  } else {
    console.log("\nNo overflow found at any width.\n");
  }
});
