# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: link-crawler.spec.ts >> Crawl all internal links — every link resolves, no 404s, no dead ends
- Location: tests/link-crawler.spec.ts:5:1

# Error details

```
Error: Broken links found:
/information/starter-och-landningar (from /) → renders 404 page
/information/luftrum-are (from /) → renders 404 page
/information/vader-och-vind (from /) → renders 404 page
/information/sakerhet-och-ansvar (from /) → renders 404 page
/information/nodinformation (from /) → renders 404 page
/information/klubbbussen (from /) → renders 404 page
/information/etik-och-hansyn (from /) → renders 404 page

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 9

- Array []
+ Array [
+   "/information/starter-och-landningar (from /) → renders 404 page",
+   "/information/luftrum-are (from /) → renders 404 page",
+   "/information/vader-och-vind (from /) → renders 404 page",
+   "/information/sakerhet-och-ansvar (from /) → renders 404 page",
+   "/information/nodinformation (from /) → renders 404 page",
+   "/information/klubbbussen (from /) → renders 404 page",
+   "/information/etik-och-hansyn (from /) → renders 404 page",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e6]:
      - link "Åre Skärm- och Drakflygklubb" [ref=e7] [cursor=pointer]:
        - /url: /
      - navigation [ref=e8]:
        - link "Hem" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "Flyga i Åre ▾" [ref=e11] [cursor=pointer]:
          - /url: /flyga-i-are
        - link "Nyheter" [ref=e12] [cursor=pointer]:
          - /url: /nyheter
        - link "Aktiviteter" [ref=e13] [cursor=pointer]:
          - /url: /aktiviteter
        - link "Tävling" [ref=e14] [cursor=pointer]:
          - /url: /tavlingar
        - link "Om klubben ▾" [ref=e16] [cursor=pointer]:
          - /url: /om
        - link "Övrigt ▾" [ref=e18] [cursor=pointer]:
          - /url: /ovrigt
      - link "Bli medlem" [ref=e20] [cursor=pointer]:
        - /url: /bli-medlem
  - generic [ref=e21]:
    - img "Hero banner" [ref=e23]
    - article [ref=e24]:
      - generic [ref=e25]:
        - paragraph [ref=e26]: Startplats
        - heading "Draklanda" [level=1] [ref=e27]
      - generic [ref=e29]:
        - generic [ref=e30]:
          - heading "Översikt" [level=2] [ref=e31]
          - generic [ref=e32]:
            - generic [ref=e33]:
              - heading "Position" [level=3] [ref=e34]
              - generic [ref=e35]:
                - generic [ref=e36]:
                  - generic [ref=e37]: WGS84
                  - generic [ref=e38]: 63,3980° N, 13,0650° Ö
                - generic [ref=e39]:
                  - generic [ref=e40]: Sweref99
                  - generic [ref=e41]: 7 037 200 m Ö, 691 500 m N
            - generic [ref=e42]:
              - heading "Höjd" [level=3] [ref=e43]
              - generic [ref=e44]:
                - generic [ref=e46]:
                  - text: Start ca
                  - generic [ref=e47]: 380 m ö.h.
                - generic [ref=e49]:
                  - text: Höjd över landning ca
                  - generic [ref=e50]: 0 m
            - generic [ref=e51]:
              - heading "Optimala vindförhållanden" [level=3] [ref=e52]
              - generic [ref=e53]:
                - generic [ref=e54]:
                  - generic [ref=e55]:
                    - paragraph [ref=e56]: Vindriktning
                    - paragraph [ref=e57]: Nord till Nord
                  - img [ref=e58]
                - paragraph [ref=e60]: Alla vindriktningar. Officiell landningsplats.
            - generic [ref=e61]:
              - heading "Rekommenderad erfarenhetsnivå" [level=3] [ref=e62]
              - paragraph [ref=e63]: Alla nivåer
            - generic [ref=e64]:
              - heading "Senast uppdaterad" [level=3] [ref=e65]
              - paragraph [ref=e66]: 2026-01-10
        - generic [ref=e67]:
          - generic [ref=e68]:
            - heading "Beskrivning" [level=2] [ref=e69]
            - generic [ref=e70]:
              - paragraph [ref=e71]: Draklanda är den officiella landningsplatsen, belägen ca 1 km väster om Åre torg.
              - paragraph [ref=e72]: Alla andra landningar betraktas som utelandningar vid XC-flyg.
              - paragraph [ref=e73]: Räddningsbåt finns tillgänglig under flygsäsongen.
          - generic [ref=e74]:
            - heading "Potentiella risker och faror" [level=2] [ref=e75]
            - list [ref=e76]:
              - listitem [ref=e77]: Vindbyar vid terrängens kant.
              - listitem [ref=e78]: Respektera avspärrningar och annan verksamhet på fältet.
          - generic [ref=e79]:
            - heading "Nödinformation" [level=2] [ref=e80]
            - generic [ref=e81]:
              - paragraph [ref=e82]:
                - text: Vid olycka ring 112.
                - text: Ange "Draklanda, landningsplats, Åre."
                - text: Klubbens kontaktperson för nödlägen finns under sektionen Nödlägen på webbplatsen.
              - generic [ref=e83]:
                - heading "Position" [level=3] [ref=e84]
                - generic [ref=e85]:
                  - generic [ref=e86]:
                    - generic [ref=e87]: WGS84
                    - generic [ref=e88]: 63,3980° N, 13,0650° Ö
                  - generic [ref=e89]:
                    - generic [ref=e90]: Sweref99
                    - generic [ref=e91]: 7 037 200 m Ö, 691 500 m N
      - generic [ref=e92]:
        - generic [ref=e93]:
          - paragraph [ref=e94]: Väder
          - heading "Väderprognos för Draklanda" [level=2] [ref=e95]
        - generic [ref=e96]:
          - generic [ref=e97]:
            - generic [ref=e98]:
              - heading "Söndag" [level=3] [ref=e99]
              - paragraph [ref=e100]: 31 maj
            - generic [ref=e101]:
              - generic [ref=e102]:
                - paragraph [ref=e103]: Vindriktning
                - generic [ref=e104]:
                  - img [ref=e106]
                  - text: Östlig
              - generic [ref=e109]:
                - paragraph [ref=e110]: Temperatur
                - paragraph [ref=e111]: 15°C
              - generic [ref=e112]:
                - paragraph [ref=e113]: Vindstyrka
                - paragraph [ref=e114]: 3-5 m/s
              - generic [ref=e115]:
                - paragraph [ref=e116]: Nederbörd
                - paragraph [ref=e117]: 0 mm
          - generic [ref=e118]:
            - generic [ref=e119]:
              - heading "Måndag" [level=3] [ref=e120]
              - paragraph [ref=e121]: 1 juni
            - generic [ref=e122]:
              - generic [ref=e123]:
                - paragraph [ref=e124]: Vindriktning
                - generic [ref=e125]:
                  - img [ref=e127]
                  - text: Nordostlig
              - generic [ref=e130]:
                - paragraph [ref=e131]: Temperatur
                - paragraph [ref=e132]: 13°C
              - generic [ref=e133]:
                - paragraph [ref=e134]: Vindstyrka
                - paragraph [ref=e135]: 2-3 m/s
              - generic [ref=e136]:
                - paragraph [ref=e137]: Nederbörd
                - paragraph [ref=e138]: 0 mm
          - generic [ref=e139]:
            - generic [ref=e140]:
              - heading "Tisdag" [level=3] [ref=e141]
              - paragraph [ref=e142]: 2 juni
            - generic [ref=e143]:
              - generic [ref=e144]:
                - paragraph [ref=e145]: Vindriktning
                - generic [ref=e146]:
                  - img [ref=e148]
                  - text: Nordostlig
              - generic [ref=e151]:
                - paragraph [ref=e152]: Temperatur
                - paragraph [ref=e153]: 13°C
              - generic [ref=e154]:
                - paragraph [ref=e155]: Vindstyrka
                - paragraph [ref=e156]: 2-2 m/s
              - generic [ref=e157]:
                - paragraph [ref=e158]: Nederbörd
                - paragraph [ref=e159]: 0 mm
  - contentinfo [ref=e161]:
    - generic [ref=e162]:
      - generic [ref=e163]:
        - heading "Flyga i Åre" [level=4] [ref=e164]
        - list [ref=e165]:
          - listitem [ref=e166]:
            - link "Startplatser" [ref=e167] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e168]:
            - link "Luftrum" [ref=e169] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e170]:
            - link "Säkerhet och ansvar" [ref=e171] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e172]:
            - link "Nödinformation" [ref=e173] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e174]:
            - link "Etik och hänsyn" [ref=e175] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e176]:
        - heading "Klubben" [level=4] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - link "Nyheter" [ref=e180] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e181]:
            - link "Information" [ref=e182] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e183]:
            - link "Tävlingar" [ref=e184] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e185]:
            - link "Bli medlem" [ref=e186] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e187]:
            - link "Väder" [ref=e188] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e189]:
        - heading "Om Oss" [level=4] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - link "Om klubben" [ref=e193] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e194]:
            - link "Kontakt" [ref=e195] [cursor=pointer]:
              - /url: /kontakt
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
  4   | 
  5   | test("Crawl all internal links — every link resolves, no 404s, no dead ends", async ({ page }) => {
  6   |   const visited = new Set<string>();
  7   |   const broken: string[] = [];
  8   |   const queue: { url: string; from: string }[] = [{ url: "/", from: "start" }];
  9   | 
  10  |   while (queue.length > 0) {
  11  |     const { url, from } = queue.shift()!;
  12  |     const normalizedUrl = url.split("?")[0].split("#")[0];
  13  |     if (visited.has(normalizedUrl)) continue;
  14  |     visited.add(normalizedUrl);
  15  | 
  16  |     const res = await page.goto(`${BASE}${normalizedUrl}`, { waitUntil: "networkidle", timeout: 15000 }).catch(() => null);
  17  | 
  18  |     if (!res || res.status() >= 400) {
  19  |       broken.push(`${normalizedUrl} (from ${from}) → ${res?.status() ?? "timeout"}`);
  20  |       continue;
  21  |     }
  22  | 
  23  |     // Check for "Sidan hittades inte" (404 page rendered as 200)
  24  |     const notFound = await page.locator("text=Sidan hittades inte").count();
  25  |     if (notFound > 0 && normalizedUrl !== "/404") {
  26  |       broken.push(`${normalizedUrl} (from ${from}) → renders 404 page`);
  27  |     }
  28  | 
  29  |     // Collect all internal links
  30  |     const links = await page.evaluate(() => {
  31  |       return Array.from(document.querySelectorAll("a[href]"))
  32  |         .map((a) => a.getAttribute("href") ?? "")
  33  |         .filter((h) => h.startsWith("/") && !h.startsWith("//"))
  34  |         .map((h) => h.split("?")[0].split("#")[0]);
  35  |     });
  36  | 
  37  |     for (const link of links) {
  38  |       if (!visited.has(link)) {
  39  |         queue.push({ url: link, from: normalizedUrl });
  40  |       }
  41  |     }
  42  |   }
  43  | 
  44  |   console.log(`\nCrawled ${visited.size} pages`);
  45  |   if (broken.length > 0) {
  46  |     console.log("\n=== BROKEN LINKS ===");
  47  |     broken.forEach((b) => console.log(`  ${b}`));
  48  |     console.log("=== END ===\n");
  49  |   }
  50  | 
> 51  |   expect(broken, `Broken links found:\n${broken.join("\n")}`).toEqual([]);
      |                                                               ^ Error: Broken links found:
  52  | });
  53  | 
  54  | test("Verify all nav dropdown links resolve", async ({ page }) => {
  55  |   await page.setViewportSize({ width: 1280, height: 800 });
  56  |   await page.goto(BASE, { waitUntil: "networkidle" });
  57  | 
  58  |   const navSections = ["Flyga i Åre", "Om klubben", "Övrigt"];
  59  |   const brokenLinks: string[] = [];
  60  | 
  61  |   for (const section of navSections) {
  62  |     // Hover to open dropdown
  63  |     const trigger = page.locator(`header nav >> text="${section}"`).first();
  64  |     if (await trigger.count() === 0) continue;
  65  |     await trigger.hover();
  66  |     await page.waitForTimeout(300);
  67  | 
  68  |     // Get all dropdown links
  69  |     const dropdownLinks = await page.locator("header .absolute a").all();
  70  | 
  71  |     for (const link of dropdownLinks) {
  72  |       const href = await link.getAttribute("href");
  73  |       const text = await link.textContent();
  74  |       if (!href || href.startsWith("http")) continue;
  75  | 
  76  |       // Navigate and check
  77  |       const res = await page.goto(`${BASE}${href}`, { waitUntil: "networkidle", timeout: 10000 }).catch(() => null);
  78  |       const status = res?.status() ?? 0;
  79  |       const is404Page = await page.locator("text=Sidan hittades inte").count();
  80  | 
  81  |       if (status >= 400 || is404Page > 0) {
  82  |         brokenLinks.push(`"${text?.trim()}" → ${href} (${status >= 400 ? status : "renders 404"})`);
  83  |       }
  84  | 
  85  |       // Go back to home for next hover
  86  |       await page.goto(BASE, { waitUntil: "networkidle" });
  87  |     }
  88  |   }
  89  | 
  90  |   if (brokenLinks.length > 0) {
  91  |     console.log("\n=== BROKEN NAV LINKS ===");
  92  |     brokenLinks.forEach((b) => console.log(`  ${b}`));
  93  |     console.log("=== END ===\n");
  94  |   }
  95  | 
  96  |   expect(brokenLinks, `Broken nav links:\n${brokenLinks.join("\n")}`).toEqual([]);
  97  | });
  98  | 
  99  | test("CMS live preview URLs resolve on frontend", async ({ request, page }) => {
  100 |   const CMS_API = "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";
  101 | 
  102 |   // Get the live preview route map from the CMS config by testing each known mapping
  103 |   const previewRoutes = [
  104 |     { collection: "news", expectedPath: "/nyheter" },
  105 |     { collection: "pages", slug: "flygregler", expectedPath: "/flyga-i-are/flygregler" },
  106 |     { collection: "pages", slug: "sakerhet", expectedPath: "/flyga-i-are/sakerhet" },
  107 |     { collection: "pages", slug: "xc", expectedPath: "/flyga-i-are/xc" },
  108 |     { collection: "pages", slug: "acro", expectedPath: "/flyga-i-are/acro" },
  109 |     { collection: "pages", slug: "speedrider", expectedPath: "/flyga-i-are/speedrider" },
  110 |     { collection: "pages", slug: "hangflyg", expectedPath: "/flyga-i-are/hangflyg" },
  111 |     { collection: "pages", slug: "paramotor", expectedPath: "/flyga-i-are/paramotor" },
  112 |     { collection: "pages", slug: "klubbprodukter", expectedPath: "/om/klubbprodukter" },
  113 |     { collection: "pages", slug: "stadgar", expectedPath: "/om/stadgar" },
  114 |     { global: "site-settings", expectedPath: "/" },
  115 |     { global: "membership-info", expectedPath: "/bli-medlem" },
  116 |     { global: "contact-info", expectedPath: "/kontakt" },
  117 |     { global: "bus-rules", expectedPath: "/flyga-i-are/klubbuss" },
  118 |     { global: "club-info", expectedPath: "/om" },
  119 |     { global: "site-navigation", expectedPath: "/" },
  120 |   ];
  121 | 
  122 |   const broken: string[] = [];
  123 | 
  124 |   for (const route of previewRoutes) {
  125 |     const res = await page.goto(`${BASE}${route.expectedPath}`, { waitUntil: "networkidle", timeout: 10000 }).catch(() => null);
  126 |     const status = res?.status() ?? 0;
  127 |     const is404 = await page.locator("text=Sidan hittades inte").count();
  128 | 
  129 |     const label = route.collection ? `${route.collection}/${route.slug ?? "index"}` : route.global;
  130 | 
  131 |     if (status >= 400 || is404 > 0) {
  132 |       broken.push(`${label} → ${route.expectedPath} (${status >= 400 ? status : "renders 404"})`);
  133 |     }
  134 |   }
  135 | 
  136 |   if (broken.length > 0) {
  137 |     console.log("\n=== BROKEN LIVE PREVIEW ROUTES ===");
  138 |     broken.forEach((b) => console.log(`  ${b}`));
  139 |     console.log("=== END ===\n");
  140 |   }
  141 | 
  142 |   expect(broken, `Broken live preview routes:\n${broken.join("\n")}`).toEqual([]);
  143 | });
  144 | 
```