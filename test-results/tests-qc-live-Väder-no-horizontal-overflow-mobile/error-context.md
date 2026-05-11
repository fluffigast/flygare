# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Väder no horizontal overflow @ mobile
- Location: tests/qc-live.spec.ts:47:5

# Error details

```
Error: Horizontal overflow on /vader @ mobile

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e6]:
      - link "Åre Skärm- och Drakflygklubb" [ref=e7] [cursor=pointer]:
        - /url: /
      - button "Öppna meny" [ref=e8]:
        - img [ref=e9]
  - generic [ref=e12]:
    - generic [ref=e14]:
      - paragraph [ref=e15]: Väder
      - heading "Väder i Åre" [level=2] [ref=e16]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - paragraph [ref=e19]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e20]
      - paragraph [ref=e21]: "Kunde inte ladda väderdata: Failed to fetch SMHI forecast:"
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - heading "Tisdag" [level=3] [ref=e25]
            - paragraph [ref=e26]: 3 februari
          - generic [ref=e27]:
            - generic [ref=e28]:
              - paragraph [ref=e29]: Vindriktning
              - generic [ref=e30]:
                - img [ref=e32]
                - text: Nordlig
            - generic [ref=e34]:
              - paragraph [ref=e35]: Temperatur
              - paragraph [ref=e36]: 12°C
            - generic [ref=e37]:
              - paragraph [ref=e38]: Vindstyrka
              - paragraph [ref=e39]: 2-6 m/s
            - generic [ref=e40]:
              - paragraph [ref=e41]: Nederbörd
              - paragraph [ref=e42]: 0 mm
        - generic [ref=e43]:
          - generic [ref=e44]:
            - heading "Onsdag" [level=3] [ref=e45]
            - paragraph [ref=e46]: 4 februari
          - generic [ref=e47]:
            - generic [ref=e48]:
              - paragraph [ref=e49]: Vindriktning
              - generic [ref=e50]:
                - img [ref=e52]
                - text: Västlig
            - generic [ref=e54]:
              - paragraph [ref=e55]: Temperatur
              - paragraph [ref=e56]: 10°C
            - generic [ref=e57]:
              - paragraph [ref=e58]: Vindstyrka
              - paragraph [ref=e59]: 3-7 m/s
            - generic [ref=e60]:
              - paragraph [ref=e61]: Nederbörd
              - paragraph [ref=e62]: 2 mm
        - generic [ref=e63]:
          - generic [ref=e64]:
            - heading "Torsdag" [level=3] [ref=e65]
            - paragraph [ref=e66]: 5 februari
          - generic [ref=e67]:
            - generic [ref=e68]:
              - paragraph [ref=e69]: Vindriktning
              - generic [ref=e70]:
                - img [ref=e72]
                - text: Östlig
            - generic [ref=e74]:
              - paragraph [ref=e75]: Temperatur
              - paragraph [ref=e76]: 8°C
            - generic [ref=e77]:
              - paragraph [ref=e78]: Vindstyrka
              - paragraph [ref=e79]: 1-4 m/s
            - generic [ref=e80]:
              - paragraph [ref=e81]: Nederbörd
              - paragraph [ref=e82]: 5 mm
    - generic [ref=e83]:
      - heading "Vädertjänster" [level=3] [ref=e84]
      - generic [ref=e85]:
        - link "SMHI Fjällväder www.smhi.se" [ref=e86] [cursor=pointer]:
          - /url: https://www.smhi.se/vader/prognoser/fjallvader
          - paragraph [ref=e87]: SMHI Fjällväder
          - paragraph [ref=e88]: www.smhi.se
        - link "Yr.no Åreskutan www.yr.no" [ref=e89] [cursor=pointer]:
          - /url: https://www.yr.no/nb/detaljer/tabell/2-2720396/
          - paragraph [ref=e90]: Yr.no Åreskutan
          - paragraph [ref=e91]: www.yr.no
        - link "XCMeteo xcmeteo.com" [ref=e92] [cursor=pointer]:
          - /url: https://xcmeteo.com/
          - paragraph [ref=e93]: XCMeteo
          - paragraph [ref=e94]: xcmeteo.com
        - link "Windguru www.windguru.cz" [ref=e95] [cursor=pointer]:
          - /url: https://www.windguru.cz/
          - paragraph [ref=e96]: Windguru
          - paragraph [ref=e97]: www.windguru.cz
        - link "Windy www.windy.com" [ref=e98] [cursor=pointer]:
          - /url: https://www.windy.com/
          - paragraph [ref=e99]: Windy
          - paragraph [ref=e100]: www.windy.com
        - link "MetOffice Isobarer www.metoffice.gov.uk" [ref=e101] [cursor=pointer]:
          - /url: https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure
          - paragraph [ref=e102]: MetOffice Isobarer
          - paragraph [ref=e103]: www.metoffice.gov.uk
        - link "TAF/METAR Frösön www.aro.lfv.se" [ref=e104] [cursor=pointer]:
          - /url: https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET
          - paragraph [ref=e105]: TAF/METAR Frösön
          - paragraph [ref=e106]: www.aro.lfv.se
        - link "MEAC Hummeln meac.se" [ref=e107] [cursor=pointer]:
          - /url: https://meac.se/sub_2/hummeln/wind.asp
          - paragraph [ref=e108]: MEAC Hummeln
          - paragraph [ref=e109]: meac.se
  - contentinfo [ref=e111]:
    - generic [ref=e112]:
      - generic [ref=e113]:
        - heading "Flyga i Åre" [level=4] [ref=e114]
        - list [ref=e115]:
          - listitem [ref=e116]:
            - link "Startplatser" [ref=e117] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e118]:
            - link "Luftrum" [ref=e119] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e120]:
            - link "Säkerhet och ansvar" [ref=e121] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e122]:
            - link "Nödinformation" [ref=e123] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e124]:
            - link "Etik och hänsyn" [ref=e125] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e126]:
        - heading "Klubben" [level=4] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - link "Nyheter" [ref=e130] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e131]:
            - link "Information" [ref=e132] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e133]:
            - link "Tävlingar" [ref=e134] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e135]:
            - link "Bli medlem" [ref=e136] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e137]:
            - link "Väder" [ref=e138] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e139]:
        - heading "Om Oss" [level=4] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - link "Om klubben" [ref=e143] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e144]:
            - link "Kontakt" [ref=e145] [cursor=pointer]:
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
  40  |     expect(critical).toEqual([]);
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
> 54  |       expect(overflow, `Horizontal overflow on ${page.path} @ ${vp.name}`).toBe(false);
      |                                                                            ^ Error: Horizontal overflow on /vader @ mobile
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
  141 | 
```