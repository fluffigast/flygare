# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Väder (/vader) loads without console errors
- Location: tests/qc-live.spec.ts:26:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Failed to load resource: the server responded with a status of 404 ()",
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
        - link "Flygguiden" [ref=e10] [cursor=pointer]:
          - /url: /information
        - link "Väder" [ref=e11] [cursor=pointer]:
          - /url: /vader
        - link "Startplatser" [ref=e12] [cursor=pointer]:
          - /url: /startplatser
        - link "Nyheter" [ref=e13] [cursor=pointer]:
          - /url: /nyheter
        - link "Om klubben" [ref=e14] [cursor=pointer]:
          - /url: /om
      - link "Bli medlem" [ref=e16] [cursor=pointer]:
        - /url: /bli-medlem
  - generic [ref=e18]:
    - generic [ref=e20]:
      - paragraph [ref=e21]: Väder
      - heading "Väder i Åre" [level=2] [ref=e22]
    - generic [ref=e23]:
      - generic [ref=e24]:
        - paragraph [ref=e25]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e26]
      - paragraph [ref=e27]: "Kunde inte ladda väderdata: Failed to fetch SMHI forecast:"
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]:
            - heading "Tisdag" [level=3] [ref=e31]
            - paragraph [ref=e32]: 3 februari
          - generic [ref=e33]:
            - generic [ref=e34]:
              - paragraph [ref=e35]: Vindriktning
              - generic [ref=e36]:
                - img [ref=e38]
                - text: Nordlig
            - generic [ref=e40]:
              - paragraph [ref=e41]: Temperatur
              - paragraph [ref=e42]: 12°C
            - generic [ref=e43]:
              - paragraph [ref=e44]: Vindstyrka
              - paragraph [ref=e45]: 2-6 m/s
            - generic [ref=e46]:
              - paragraph [ref=e47]: Nederbörd
              - paragraph [ref=e48]: 0 mm
        - generic [ref=e49]:
          - generic [ref=e50]:
            - heading "Onsdag" [level=3] [ref=e51]
            - paragraph [ref=e52]: 4 februari
          - generic [ref=e53]:
            - generic [ref=e54]:
              - paragraph [ref=e55]: Vindriktning
              - generic [ref=e56]:
                - img [ref=e58]
                - text: Västlig
            - generic [ref=e60]:
              - paragraph [ref=e61]: Temperatur
              - paragraph [ref=e62]: 10°C
            - generic [ref=e63]:
              - paragraph [ref=e64]: Vindstyrka
              - paragraph [ref=e65]: 3-7 m/s
            - generic [ref=e66]:
              - paragraph [ref=e67]: Nederbörd
              - paragraph [ref=e68]: 2 mm
        - generic [ref=e69]:
          - generic [ref=e70]:
            - heading "Torsdag" [level=3] [ref=e71]
            - paragraph [ref=e72]: 5 februari
          - generic [ref=e73]:
            - generic [ref=e74]:
              - paragraph [ref=e75]: Vindriktning
              - generic [ref=e76]:
                - img [ref=e78]
                - text: Östlig
            - generic [ref=e80]:
              - paragraph [ref=e81]: Temperatur
              - paragraph [ref=e82]: 8°C
            - generic [ref=e83]:
              - paragraph [ref=e84]: Vindstyrka
              - paragraph [ref=e85]: 1-4 m/s
            - generic [ref=e86]:
              - paragraph [ref=e87]: Nederbörd
              - paragraph [ref=e88]: 5 mm
    - generic [ref=e89]:
      - heading "Vädertjänster" [level=3] [ref=e90]
      - generic [ref=e91]:
        - link "SMHI Fjällväder www.smhi.se" [ref=e92] [cursor=pointer]:
          - /url: https://www.smhi.se/vader/prognoser/fjallvader
          - paragraph [ref=e93]: SMHI Fjällväder
          - paragraph [ref=e94]: www.smhi.se
        - link "Yr.no Åreskutan www.yr.no" [ref=e95] [cursor=pointer]:
          - /url: https://www.yr.no/nb/detaljer/tabell/2-2720396/
          - paragraph [ref=e96]: Yr.no Åreskutan
          - paragraph [ref=e97]: www.yr.no
        - link "XCMeteo xcmeteo.com" [ref=e98] [cursor=pointer]:
          - /url: https://xcmeteo.com/
          - paragraph [ref=e99]: XCMeteo
          - paragraph [ref=e100]: xcmeteo.com
        - link "Windguru www.windguru.cz" [ref=e101] [cursor=pointer]:
          - /url: https://www.windguru.cz/
          - paragraph [ref=e102]: Windguru
          - paragraph [ref=e103]: www.windguru.cz
        - link "Windy www.windy.com" [ref=e104] [cursor=pointer]:
          - /url: https://www.windy.com/
          - paragraph [ref=e105]: Windy
          - paragraph [ref=e106]: www.windy.com
        - link "MetOffice Isobarer www.metoffice.gov.uk" [ref=e107] [cursor=pointer]:
          - /url: https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure
          - paragraph [ref=e108]: MetOffice Isobarer
          - paragraph [ref=e109]: www.metoffice.gov.uk
        - link "TAF/METAR Frösön www.aro.lfv.se" [ref=e110] [cursor=pointer]:
          - /url: https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET
          - paragraph [ref=e111]: TAF/METAR Frösön
          - paragraph [ref=e112]: www.aro.lfv.se
        - link "MEAC Hummeln meac.se" [ref=e113] [cursor=pointer]:
          - /url: https://meac.se/sub_2/hummeln/wind.asp
          - paragraph [ref=e114]: MEAC Hummeln
          - paragraph [ref=e115]: meac.se
  - contentinfo [ref=e117]:
    - generic [ref=e118]:
      - generic [ref=e119]:
        - heading "Flyga i Åre" [level=4] [ref=e120]
        - list [ref=e121]:
          - listitem [ref=e122]:
            - link "Startplatser" [ref=e123] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e124]:
            - link "Luftrum" [ref=e125] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e126]:
            - link "Säkerhet och ansvar" [ref=e127] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e128]:
            - link "Nödinformation" [ref=e129] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e130]:
            - link "Etik och hänsyn" [ref=e131] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e132]:
        - heading "Klubben" [level=4] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - link "Nyheter" [ref=e136] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e137]:
            - link "Information" [ref=e138] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e139]:
            - link "Tävlingar" [ref=e140] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e141]:
            - link "Bli medlem" [ref=e142] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e143]:
            - link "Väder" [ref=e144] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e145]:
        - heading "Om Oss" [level=4] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - link "Om klubben" [ref=e149] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e150]:
            - link "Kontakt" [ref=e151] [cursor=pointer]:
              - /url: /kontakt
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
  4   | const CMS_API = "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";
  5   | 
  6   | const pages = [
  7   |   { path: "/", name: "Hem" },
  8   |   { path: "/nyheter", name: "Nyheter" },
  9   |   { path: "/information", name: "Flygguiden" },
  10  |   { path: "/startplatser", name: "Startplatser" },
  11  |   { path: "/vader", name: "Väder" },
  12  |   { path: "/om", name: "Om klubben" },
  13  |   { path: "/bli-medlem", name: "Bli medlem" },
  14  |   { path: "/kontakt", name: "Kontakt" },
  15  |   { path: "/tavlingar", name: "Tävlingar" },
  16  | ];
  17  | 
  18  | // Desktop + Mobile viewports
  19  | const viewports = [
  20  |   { name: "desktop", width: 1280, height: 800 },
  21  |   { name: "mobile", width: 375, height: 812 },
  22  | ];
  23  | 
  24  | // 1. Every page loads without errors
  25  | for (const page of pages) {
  26  |   test(`${page.name} (${page.path}) loads without console errors`, async ({ page: p }) => {
  27  |     const errors: string[] = [];
  28  |     p.on("console", (msg) => {
  29  |       if (msg.type() === "error") errors.push(msg.text());
  30  |     });
  31  |     p.on("pageerror", (err) => errors.push(err.message));
  32  | 
  33  |     const res = await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  34  |     expect(res?.status()).toBeLessThan(400);
  35  | 
  36  |     // Filter out known non-critical errors (SMHI fetch if proxy not ready)
  37  |     const critical = errors.filter(
  38  |       (e) => !e.includes("SMHI") && !e.includes("fetch") && !e.includes("NetworkError")
  39  |     );
> 40  |     expect(critical).toEqual([]);
      |                      ^ Error: expect(received).toEqual(expected) // deep equality
  41  |   });
  42  | }
  43  | 
  44  | // 2. Every page renders at desktop and mobile without horizontal overflow
  45  | for (const vp of viewports) {
  46  |   for (const page of pages) {
  47  |     test(`${page.name} no horizontal overflow @ ${vp.name}`, async ({ page: p }) => {
  48  |       await p.setViewportSize({ width: vp.width, height: vp.height });
  49  |       await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  50  | 
  51  |       const overflow = await p.evaluate(() => {
  52  |         return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  53  |       });
  54  |       expect(overflow, `Horizontal overflow on ${page.path} @ ${vp.name}`).toBe(false);
  55  |     });
  56  |   }
  57  | }
  58  | 
  59  | // 3. Navigation works — all nav links exist and are clickable
  60  | test("Desktop nav has all links", async ({ page: p }) => {
  61  |   await p.setViewportSize({ width: 1280, height: 800 });
  62  |   await p.goto(BASE, { waitUntil: "networkidle" });
  63  | 
  64  |   const navLinks = await p.locator("header nav a").allTextContents();
  65  |   const expected = ["Hem", "Flygguiden", "Väder", "Startplatser", "Nyheter", "Om klubben"];
  66  |   for (const label of expected) {
  67  |     expect(navLinks.some((t) => t.includes(label)), `Missing nav link: ${label}`).toBe(true);
  68  |   }
  69  | });
  70  | 
  71  | test("Mobile hamburger menu works", async ({ page: p }) => {
  72  |   await p.setViewportSize({ width: 375, height: 812 });
  73  |   await p.goto(BASE, { waitUntil: "networkidle" });
  74  | 
  75  |   // Hamburger button should be visible
  76  |   const hamburger = p.locator("header button[aria-label]");
  77  |   await expect(hamburger).toBeVisible();
  78  | 
  79  |   // Click it
  80  |   await hamburger.click();
  81  | 
  82  |   // Mobile nav should appear with links
  83  |   const mobileNav = p.locator("header nav");
  84  |   await expect(mobileNav).toBeVisible();
  85  | });
  86  | 
  87  | // 4. Images load on home page
  88  | test("Home page images load", async ({ page: p }) => {
  89  |   await p.goto(BASE, { waitUntil: "networkidle" });
  90  | 
  91  |   const images = await p.locator("img").all();
  92  |   expect(images.length).toBeGreaterThan(0);
  93  | 
  94  |   for (const img of images) {
  95  |     const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
  96  |     const src = await img.getAttribute("src");
  97  |     expect(naturalWidth, `Broken image: ${src}`).toBeGreaterThan(0);
  98  |   }
  99  | });
  100 | 
  101 | // 5. CMS API responds
  102 | test("CMS API returns site settings", async ({ request }) => {
  103 |   const res = await request.get(`${CMS_API}/globals/site-settings`);
  104 |   expect(res.status()).toBe(200);
  105 |   const data = await res.json();
  106 |   expect(data.clubName).toBe("Åre Skärm- och Drakflygklubb");
  107 | });
  108 | 
  109 | test("CMS API returns news", async ({ request }) => {
  110 |   const res = await request.get(`${CMS_API}/news?limit=1`);
  111 |   expect(res.status()).toBe(200);
  112 |   const data = await res.json();
  113 |   expect(data.totalDocs).toBeGreaterThan(0);
  114 | });
  115 | 
  116 | // 6. SMHI proxy works
  117 | test("SMHI proxy returns weather data", async ({ request }) => {
  118 |   const res = await request.get(`${BASE}/api/smhi?lat=63.4&lon=13.1`);
  119 |   // May be 404 if proxy not deployed yet — mark as soft fail
  120 |   if (res.status() === 200) {
  121 |     const data = await res.json();
  122 |     expect(data.timeSeries).toBeDefined();
  123 |   } else {
  124 |     console.warn(`SMHI proxy returned ${res.status()} — not deployed yet`);
  125 |   }
  126 | });
  127 | 
  128 | // 7. Screenshot every page at both viewports
  129 | for (const vp of viewports) {
  130 |   for (const page of pages) {
  131 |     test(`Screenshot: ${page.name} @ ${vp.name}`, async ({ page: p }) => {
  132 |       await p.setViewportSize({ width: vp.width, height: vp.height });
  133 |       await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  134 |       await p.screenshot({
  135 |         path: `tests/screenshots/${vp.name}-${page.path.replace(/\//g, "_") || "home"}.png`,
  136 |         fullPage: true,
  137 |       });
  138 |     });
  139 |   }
  140 | }
```