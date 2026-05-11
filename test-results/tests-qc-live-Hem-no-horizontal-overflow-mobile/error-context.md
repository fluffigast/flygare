# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Hem no horizontal overflow @ mobile
- Location: tests/qc-live.spec.ts:47:5

# Error details

```
Error: Horizontal overflow on / @ mobile

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "Åre Skärm- och Drakflygklubb" [ref=e6] [cursor=pointer]:
        - /url: /
      - button "Öppna meny" [ref=e7]:
        - img [ref=e8]
  - generic [ref=e10]:
    - img "Hero banner" [ref=e11]
    - generic [ref=e12]:
      - heading "Skandinaviens mest spektakulära flygplats" [level=1] [ref=e13]
      - paragraph [ref=e14]: Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.
  - main [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - heading "50 år av flygning från Skutan" [level=2] [ref=e18]
        - paragraph [ref=e19]: Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.
      - img "50 år av flygning från Skutan" [ref=e21]
    - generic [ref=e23]:
      - generic [ref=e24]:
        - paragraph [ref=e25]: "1975"
        - paragraph [ref=e26]: Grundat
      - generic [ref=e27]:
        - paragraph [ref=e28]: ~100
        - paragraph [ref=e29]: Aktiva medlemmar
      - generic [ref=e30]:
        - paragraph [ref=e31]: 230 km
        - paragraph [ref=e32]: Distansrekord (skärm)
      - generic [ref=e33]:
        - paragraph [ref=e34]: "9"
        - paragraph [ref=e35]: Startplatser
    - generic [ref=e36]:
      - generic [ref=e37]:
        - heading "Nyheter" [level=2] [ref=e39]
        - generic [ref=e40]:
          - button "Previous" [disabled] [ref=e41]:
            - img [ref=e42]
          - button "Next" [ref=e44]:
            - img [ref=e45]
      - generic [ref=e48]:
        - link [ref=e50] [cursor=pointer]:
          - /url: /nyheter/sasongsstart-i-arefjallen
          - article [ref=e51]:
            - img "Säsongsstart i Årefjällen" [ref=e53]
            - generic [ref=e54]:
              - heading "Säsongsstart i Årefjällen" [level=4] [ref=e55]
              - paragraph [ref=e56]: 1 mars, 2026
        - link [ref=e58] [cursor=pointer]:
          - /url: /nyheter/uppdaterad-information-om-starter-pa-areskutan
          - article [ref=e59]:
            - img "Uppdaterad information om starter på Åreskutan" [ref=e61]
            - generic [ref=e62]:
              - heading "Uppdaterad information om starter på Åreskutan" [level=4] [ref=e63]
              - paragraph [ref=e64]: 5 mars, 2026
        - link [ref=e66] [cursor=pointer]:
          - /url: /nyheter/paminnelse-om-luftrum-i-areomradet
          - article [ref=e67]:
            - img "Påminnelse om luftrum i Åreområdet" [ref=e69]
            - generic [ref=e70]:
              - heading "Påminnelse om luftrum i Åreområdet" [level=4] [ref=e71]
              - paragraph [ref=e72]: 8 mars, 2026
      - radiogroup "Nyhetskarusell, välj sida" [ref=e73]:
        - radio "Gå till sida 1" [checked] [ref=e74]
        - radio "Gå till sida 2" [ref=e75]
        - radio "Gå till sida 3" [ref=e76]
        - radio "Gå till sida 4" [ref=e77]
    - generic [ref=e78]:
      - generic [ref=e79]:
        - article [ref=e80]:
          - link "Starter och landningar i Åre" [ref=e81] [cursor=pointer]:
            - /url: /information/starter-och-landningar
            - img "Starter och landningar i Åre" [ref=e82]
          - generic [ref=e83]:
            - link "Starter och landningar i Åre" [ref=e84] [cursor=pointer]:
              - /url: /information/starter-och-landningar
              - heading "Starter och landningar i Åre" [level=3] [ref=e85]
            - paragraph [ref=e86]: Översikt av etablerade start- och landningsplatser i Åreområdet.
        - article [ref=e87]:
          - link "Luftrum i Åreområdet" [ref=e88] [cursor=pointer]:
            - /url: /information/luftrum-are
            - img "Luftrum i Åreområdet" [ref=e89]
          - generic [ref=e90]:
            - link "Luftrum i Åreområdet" [ref=e91] [cursor=pointer]:
              - /url: /information/luftrum-are
              - heading "Luftrum i Åreområdet" [level=3] [ref=e92]
            - paragraph [ref=e93]: Viktig information om luftrum, restriktioner och höjdbegränsningar.
        - article [ref=e94]:
          - link "Väder och lokala vindar" [ref=e95] [cursor=pointer]:
            - /url: /information/vader-och-vind
            - img "Väder och lokala vindar" [ref=e96]
          - generic [ref=e97]:
            - link "Väder och lokala vindar" [ref=e98] [cursor=pointer]:
              - /url: /information/vader-och-vind
              - heading "Väder och lokala vindar" [level=3] [ref=e99]
            - paragraph [ref=e100]: Så påverkar väder och vind flygning i fjällmiljö.
        - article [ref=e101]:
          - link "Säkerhet och ansvar" [ref=e102] [cursor=pointer]:
            - /url: /information/sakerhet-och-ansvar
            - img "Säkerhet och ansvar" [ref=e103]
          - generic [ref=e104]:
            - link "Säkerhet och ansvar" [ref=e105] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
              - heading "Säkerhet och ansvar" [level=3] [ref=e106]
            - paragraph [ref=e107]: Grundläggande säkerhetsprinciper för flygning i Åre.
        - article [ref=e108]:
          - link "Nödinformation" [ref=e109] [cursor=pointer]:
            - /url: /information/nodinformation
            - img "Nödinformation" [ref=e110]
          - generic [ref=e111]:
            - link "Nödinformation" [ref=e112] [cursor=pointer]:
              - /url: /information/nodinformation
              - heading "Nödinformation" [level=3] [ref=e113]
            - paragraph [ref=e114]: Vad du ska göra vid olycka eller incident.
        - article [ref=e115]:
          - link "Klubbbussen" [ref=e116] [cursor=pointer]:
            - /url: /information/klubbbussen
            - img "Klubbbussen" [ref=e117]
          - generic [ref=e118]:
            - link "Klubbbussen" [ref=e119] [cursor=pointer]:
              - /url: /information/klubbbussen
              - heading "Klubbbussen" [level=3] [ref=e120]
            - paragraph [ref=e121]: Information om klubbens buss och hur den används.
      - generic [ref=e123]:
        - generic [ref=e124]: Föregående sida
        - link "Go to page 1" [ref=e126] [cursor=pointer]:
          - /url: /information
          - text: "1"
        - generic [ref=e127]: Nästa sida
    - generic [ref=e128]:
      - generic [ref=e129]:
        - paragraph [ref=e130]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e131]
      - paragraph [ref=e132]: "Kunde inte ladda väderdata: Failed to fetch SMHI forecast:"
      - generic [ref=e133]:
        - generic [ref=e134]:
          - generic [ref=e135]:
            - heading "Tisdag" [level=3] [ref=e136]
            - paragraph [ref=e137]: 3 februari
          - generic [ref=e138]:
            - generic [ref=e139]:
              - paragraph [ref=e140]: Vindriktning
              - generic [ref=e141]:
                - img [ref=e143]
                - text: Nordlig
            - generic [ref=e145]:
              - paragraph [ref=e146]: Temperatur
              - paragraph [ref=e147]: 12°C
            - generic [ref=e148]:
              - paragraph [ref=e149]: Vindstyrka
              - paragraph [ref=e150]: 2-6 m/s
            - generic [ref=e151]:
              - paragraph [ref=e152]: Nederbörd
              - paragraph [ref=e153]: 0 mm
        - generic [ref=e154]:
          - generic [ref=e155]:
            - heading "Onsdag" [level=3] [ref=e156]
            - paragraph [ref=e157]: 4 februari
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: Vindriktning
              - generic [ref=e161]:
                - img [ref=e163]
                - text: Västlig
            - generic [ref=e165]:
              - paragraph [ref=e166]: Temperatur
              - paragraph [ref=e167]: 10°C
            - generic [ref=e168]:
              - paragraph [ref=e169]: Vindstyrka
              - paragraph [ref=e170]: 3-7 m/s
            - generic [ref=e171]:
              - paragraph [ref=e172]: Nederbörd
              - paragraph [ref=e173]: 2 mm
        - generic [ref=e174]:
          - generic [ref=e175]:
            - heading "Torsdag" [level=3] [ref=e176]
            - paragraph [ref=e177]: 5 februari
          - generic [ref=e178]:
            - generic [ref=e179]:
              - paragraph [ref=e180]: Vindriktning
              - generic [ref=e181]:
                - img [ref=e183]
                - text: Östlig
            - generic [ref=e185]:
              - paragraph [ref=e186]: Temperatur
              - paragraph [ref=e187]: 8°C
            - generic [ref=e188]:
              - paragraph [ref=e189]: Vindstyrka
              - paragraph [ref=e190]: 1-4 m/s
            - generic [ref=e191]:
              - paragraph [ref=e192]: Nederbörd
              - paragraph [ref=e193]: 5 mm
    - generic [ref=e194]:
      - paragraph [ref=e195]: Bli en del av klubben
      - heading "Redo att flyga?" [level=2] [ref=e196]
      - generic [ref=e197]:
        - link "Bli medlem — 600 kr/år" [ref=e198] [cursor=pointer]:
          - /url: /bli-medlem
        - link "Se startplatser" [ref=e199] [cursor=pointer]:
          - /url: /startplatser
  - contentinfo [ref=e201]:
    - generic [ref=e202]:
      - generic [ref=e203]:
        - heading "Flyga i Åre" [level=4] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - link "Startplatser" [ref=e207] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e208]:
            - link "Luftrum" [ref=e209] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e210]:
            - link "Säkerhet och ansvar" [ref=e211] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e212]:
            - link "Nödinformation" [ref=e213] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e214]:
            - link "Etik och hänsyn" [ref=e215] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e216]:
        - heading "Klubben" [level=4] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - link "Nyheter" [ref=e220] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e221]:
            - link "Information" [ref=e222] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e223]:
            - link "Tävlingar" [ref=e224] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e225]:
            - link "Bli medlem" [ref=e226] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e227]:
            - link "Väder" [ref=e228] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e229]:
        - heading "Om Oss" [level=4] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - link "Om klubben" [ref=e233] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e234]:
            - link "Kontakt" [ref=e235] [cursor=pointer]:
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
      |                                                                            ^ Error: Horizontal overflow on / @ mobile
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