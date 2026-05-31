# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qc-live.spec.ts >> [functional] Desktop nav has all links
- Location: tests/qc-live.spec.ts:75:1

# Error details

```
Error: Missing nav link: Flygguiden

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
    - img "Hero banner" [ref=e22]
    - generic [ref=e23]:
      - heading "Skandinaviens mest spektakulära flygplats" [level=1] [ref=e24]
      - paragraph [ref=e25]: Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.
  - main [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "50 år av flygning från Skutan" [level=2] [ref=e29]
        - paragraph [ref=e30]: Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.
      - img "50 år av flygning från Skutan" [ref=e32]
    - generic [ref=e34]:
      - generic [ref=e35]:
        - paragraph [ref=e36]: "1975"
        - paragraph [ref=e37]: Grundat
      - generic [ref=e38]:
        - paragraph [ref=e39]: ~100
        - paragraph [ref=e40]: Aktiva medlemmar
      - generic [ref=e41]:
        - paragraph [ref=e42]: 230 km
        - paragraph [ref=e43]: Distansrekord (skärm)
      - generic [ref=e44]:
        - paragraph [ref=e45]: "9"
        - paragraph [ref=e46]: Startplatser
    - generic [ref=e47]:
      - generic [ref=e48]:
        - heading "Nyheter" [level=2] [ref=e50]
        - generic [ref=e51]:
          - button "Previous" [disabled] [ref=e52]:
            - img [ref=e53]
          - button "Next" [ref=e55]:
            - img [ref=e56]
      - generic [ref=e59]:
        - link [ref=e61] [cursor=pointer]:
          - /url: /nyheter/sasongsstart-i-arefjallen
          - article [ref=e62]:
            - img "Säsongsstart i Årefjällen" [ref=e64]
            - generic [ref=e65]:
              - heading "Säsongsstart i Årefjällen" [level=4] [ref=e66]
              - paragraph [ref=e67]: 1 mars, 2026
        - link [ref=e69] [cursor=pointer]:
          - /url: /nyheter/uppdaterad-information-om-starter-pa-areskutan
          - article [ref=e70]:
            - img "Uppdaterad information om starter på Åreskutan" [ref=e72]
            - generic [ref=e73]:
              - heading "Uppdaterad information om starter på Åreskutan" [level=4] [ref=e74]
              - paragraph [ref=e75]: 5 mars, 2026
        - link [ref=e77] [cursor=pointer]:
          - /url: /nyheter/paminnelse-om-luftrum-i-areomradet
          - article [ref=e78]:
            - img "Påminnelse om luftrum i Åreområdet" [ref=e80]
            - generic [ref=e81]:
              - heading "Påminnelse om luftrum i Åreområdet" [level=4] [ref=e82]
              - paragraph [ref=e83]: 8 mars, 2026
      - radiogroup "Nyhetskarusell, välj sida" [ref=e84]:
        - radio "Gå till sida 1" [checked] [ref=e85]
        - radio "Gå till sida 2" [ref=e86]
        - radio "Gå till sida 3" [ref=e87]
        - radio "Gå till sida 4" [ref=e88]
    - generic [ref=e89]:
      - generic [ref=e90]:
        - article [ref=e91]:
          - link "Starter och landningar i Åre" [ref=e92] [cursor=pointer]:
            - /url: /information/starter-och-landningar
            - img "Starter och landningar i Åre" [ref=e93]
          - generic [ref=e94]:
            - link "Starter och landningar i Åre" [ref=e95] [cursor=pointer]:
              - /url: /information/starter-och-landningar
              - heading "Starter och landningar i Åre" [level=3] [ref=e96]
            - paragraph [ref=e97]: Översikt av etablerade start- och landningsplatser i Åreområdet.
        - article [ref=e98]:
          - link "Luftrum i Åreområdet" [ref=e99] [cursor=pointer]:
            - /url: /information/luftrum-are
            - img "Luftrum i Åreområdet" [ref=e100]
          - generic [ref=e101]:
            - link "Luftrum i Åreområdet" [ref=e102] [cursor=pointer]:
              - /url: /information/luftrum-are
              - heading "Luftrum i Åreområdet" [level=3] [ref=e103]
            - paragraph [ref=e104]: Viktig information om luftrum, restriktioner och höjdbegränsningar.
        - article [ref=e105]:
          - link "Väder och lokala vindar" [ref=e106] [cursor=pointer]:
            - /url: /information/vader-och-vind
            - img "Väder och lokala vindar" [ref=e107]
          - generic [ref=e108]:
            - link "Väder och lokala vindar" [ref=e109] [cursor=pointer]:
              - /url: /information/vader-och-vind
              - heading "Väder och lokala vindar" [level=3] [ref=e110]
            - paragraph [ref=e111]: Så påverkar väder och vind flygning i fjällmiljö.
        - article [ref=e112]:
          - link "Säkerhet och ansvar" [ref=e113] [cursor=pointer]:
            - /url: /information/sakerhet-och-ansvar
            - img "Säkerhet och ansvar" [ref=e114]
          - generic [ref=e115]:
            - link "Säkerhet och ansvar" [ref=e116] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
              - heading "Säkerhet och ansvar" [level=3] [ref=e117]
            - paragraph [ref=e118]: Grundläggande säkerhetsprinciper för flygning i Åre.
        - article [ref=e119]:
          - link "Nödinformation" [ref=e120] [cursor=pointer]:
            - /url: /information/nodinformation
            - img "Nödinformation" [ref=e121]
          - generic [ref=e122]:
            - link "Nödinformation" [ref=e123] [cursor=pointer]:
              - /url: /information/nodinformation
              - heading "Nödinformation" [level=3] [ref=e124]
            - paragraph [ref=e125]: Vad du ska göra vid olycka eller incident.
        - article [ref=e126]:
          - link "Klubbbussen" [ref=e127] [cursor=pointer]:
            - /url: /information/klubbbussen
            - img "Klubbbussen" [ref=e128]
          - generic [ref=e129]:
            - link "Klubbbussen" [ref=e130] [cursor=pointer]:
              - /url: /information/klubbbussen
              - heading "Klubbbussen" [level=3] [ref=e131]
            - paragraph [ref=e132]: Information om klubbens buss och hur den används.
      - generic [ref=e134]:
        - generic [ref=e135]: Föregående sida
        - link "Go to page 1" [ref=e137] [cursor=pointer]:
          - /url: /information
          - text: "1"
        - generic [ref=e138]: Nästa sida
    - generic [ref=e139]:
      - generic [ref=e140]:
        - paragraph [ref=e141]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e142]
      - generic [ref=e143]:
        - generic [ref=e144]:
          - generic [ref=e145]:
            - heading "Söndag" [level=3] [ref=e146]
            - paragraph [ref=e147]: 31 maj
          - generic [ref=e148]:
            - generic [ref=e149]:
              - paragraph [ref=e150]: Vindriktning
              - generic [ref=e151]:
                - img [ref=e153]
                - text: Östlig
            - generic [ref=e156]:
              - paragraph [ref=e157]: Temperatur
              - paragraph [ref=e158]: 15°C
            - generic [ref=e159]:
              - paragraph [ref=e160]: Vindstyrka
              - paragraph [ref=e161]: 3-5 m/s
            - generic [ref=e162]:
              - paragraph [ref=e163]: Nederbörd
              - paragraph [ref=e164]: 0 mm
        - generic [ref=e165]:
          - generic [ref=e166]:
            - heading "Måndag" [level=3] [ref=e167]
            - paragraph [ref=e168]: 1 juni
          - generic [ref=e169]:
            - generic [ref=e170]:
              - paragraph [ref=e171]: Vindriktning
              - generic [ref=e172]:
                - img [ref=e174]
                - text: Nordostlig
            - generic [ref=e177]:
              - paragraph [ref=e178]: Temperatur
              - paragraph [ref=e179]: 13°C
            - generic [ref=e180]:
              - paragraph [ref=e181]: Vindstyrka
              - paragraph [ref=e182]: 2-3 m/s
            - generic [ref=e183]:
              - paragraph [ref=e184]: Nederbörd
              - paragraph [ref=e185]: 0 mm
        - generic [ref=e186]:
          - generic [ref=e187]:
            - heading "Tisdag" [level=3] [ref=e188]
            - paragraph [ref=e189]: 2 juni
          - generic [ref=e190]:
            - generic [ref=e191]:
              - paragraph [ref=e192]: Vindriktning
              - generic [ref=e193]:
                - img [ref=e195]
                - text: Nordostlig
            - generic [ref=e198]:
              - paragraph [ref=e199]: Temperatur
              - paragraph [ref=e200]: 13°C
            - generic [ref=e201]:
              - paragraph [ref=e202]: Vindstyrka
              - paragraph [ref=e203]: 2-2 m/s
            - generic [ref=e204]:
              - paragraph [ref=e205]: Nederbörd
              - paragraph [ref=e206]: 0 mm
    - generic [ref=e207]:
      - paragraph [ref=e208]: Bli en del av klubben
      - heading "Redo att flyga?" [level=2] [ref=e209]
      - generic [ref=e210]:
        - link "Bli medlem — 600 kr/år" [ref=e211] [cursor=pointer]:
          - /url: /bli-medlem
        - link "Se startplatser" [ref=e212] [cursor=pointer]:
          - /url: /startplatser
  - contentinfo [ref=e214]:
    - generic [ref=e215]:
      - generic [ref=e216]:
        - heading "Flyga i Åre" [level=4] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - link "Startplatser" [ref=e220] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e221]:
            - link "Luftrum" [ref=e222] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e223]:
            - link "Säkerhet och ansvar" [ref=e224] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e225]:
            - link "Nödinformation" [ref=e226] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e227]:
            - link "Etik och hänsyn" [ref=e228] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e229]:
        - heading "Klubben" [level=4] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - link "Nyheter" [ref=e233] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e234]:
            - link "Information" [ref=e235] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e236]:
            - link "Tävlingar" [ref=e237] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e238]:
            - link "Bli medlem" [ref=e239] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e240]:
            - link "Väder" [ref=e241] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e242]:
        - heading "Om Oss" [level=4] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Om klubben" [ref=e246] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e247]:
            - link "Kontakt" [ref=e248] [cursor=pointer]:
              - /url: /kontakt
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import AxeBuilder from "@axe-core/playwright";
  3   | 
  4   | const BASE = "https://brave-tree-08c5f0c03.4.azurestaticapps.net";
  5   | const CMS_API =
  6   |   "https://flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io/api";
  7   | 
  8   | const pages = [
  9   |   { path: "/", name: "Hem" },
  10  |   { path: "/nyheter", name: "Nyheter" },
  11  |   { path: "/information", name: "Flygguiden" },
  12  |   { path: "/startplatser", name: "Startplatser" },
  13  |   { path: "/vader", name: "Väder" },
  14  |   { path: "/om", name: "Om klubben" },
  15  |   { path: "/bli-medlem", name: "Bli medlem" },
  16  |   { path: "/kontakt", name: "Kontakt" },
  17  |   { path: "/tavlingar", name: "Tävlingar" },
  18  | ];
  19  | 
  20  | const viewports = [
  21  |   { name: "desktop", width: 1280, height: 800 },
  22  |   { name: "mobile", width: 375, height: 812 },
  23  | ];
  24  | 
  25  | // ═══════════════════════════════════════════════════════════
  26  | // LAYER 1: Functional — pages load, no errors, no overflow
  27  | // ═══════════════════════════════════════════════════════════
  28  | 
  29  | for (const page of pages) {
  30  |   test(`[functional] ${page.name} loads without console errors`, async ({
  31  |     page: p,
  32  |   }) => {
  33  |     const errors: string[] = [];
  34  |     p.on("console", (msg) => {
  35  |       if (msg.type() === "error") errors.push(msg.text());
  36  |     });
  37  |     p.on("pageerror", (err) => errors.push(err.message));
  38  | 
  39  |     const res = await p.goto(`${BASE}${page.path}`, {
  40  |       waitUntil: "networkidle",
  41  |     });
  42  |     expect(res?.status()).toBeLessThan(400);
  43  | 
  44  |     const critical = errors.filter(
  45  |       (e) =>
  46  |         !e.includes("SMHI") &&
  47  |         !e.includes("fetch") &&
  48  |         !e.includes("NetworkError") &&
  49  |         !e.includes("404") &&
  50  |         !e.includes("the server responded with a status of")
  51  |     );
  52  |     expect(critical).toEqual([]);
  53  |   });
  54  | }
  55  | 
  56  | for (const vp of viewports) {
  57  |   for (const page of pages) {
  58  |     test(`[overflow] ${page.name} @ ${vp.name}`, async ({ page: p }) => {
  59  |       await p.setViewportSize({ width: vp.width, height: vp.height });
  60  |       await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  61  | 
  62  |       const overflow = await p.evaluate(
  63  |         () =>
  64  |           document.documentElement.scrollWidth >
  65  |           document.documentElement.clientWidth
  66  |       );
  67  |       expect(
  68  |         overflow,
  69  |         `Horizontal overflow on ${page.path} @ ${vp.name}`
  70  |       ).toBe(false);
  71  |     });
  72  |   }
  73  | }
  74  | 
  75  | test("[functional] Desktop nav has all links", async ({ page: p }) => {
  76  |   await p.setViewportSize({ width: 1280, height: 800 });
  77  |   await p.goto(BASE, { waitUntil: "networkidle" });
  78  | 
  79  |   const navLinks = await p.locator("header nav a").allTextContents();
  80  |   const expected = [
  81  |     "Hem",
  82  |     "Flygguiden",
  83  |     "Väder",
  84  |     "Startplatser",
  85  |     "Nyheter",
  86  |     "Om klubben",
  87  |   ];
  88  |   for (const label of expected) {
  89  |     expect(
  90  |       navLinks.some((t) => t.includes(label)),
  91  |       `Missing nav link: ${label}`
> 92  |     ).toBe(true);
      |       ^ Error: Missing nav link: Flygguiden
  93  |   }
  94  | });
  95  | 
  96  | test("[functional] Mobile hamburger menu works", async ({ page: p }) => {
  97  |   await p.setViewportSize({ width: 375, height: 812 });
  98  |   await p.goto(BASE, { waitUntil: "networkidle" });
  99  | 
  100 |   const hamburger = p.locator("header button[aria-label]");
  101 |   await expect(hamburger).toBeVisible();
  102 |   await hamburger.click();
  103 | 
  104 |   const mobileNav = p.locator("header nav").nth(1);
  105 |   await expect(mobileNav).toBeVisible();
  106 | });
  107 | 
  108 | test("[functional] Home page images load", async ({ page: p }) => {
  109 |   await p.goto(BASE, { waitUntil: "networkidle" });
  110 | 
  111 |   const images = await p.locator("img").all();
  112 |   expect(images.length).toBeGreaterThan(0);
  113 | 
  114 |   for (const img of images) {
  115 |     const naturalWidth = await img.evaluate(
  116 |       (el: HTMLImageElement) => el.naturalWidth
  117 |     );
  118 |     const src = await img.getAttribute("src");
  119 |     expect(naturalWidth, `Broken image: ${src}`).toBeGreaterThan(0);
  120 |   }
  121 | });
  122 | 
  123 | // ═══════════════════════════════════════════════════════════
  124 | // LAYER 2: API — CMS and SMHI proxy
  125 | // ═══════════════════════════════════════════════════════════
  126 | 
  127 | test("[api] CMS returns site settings", async ({ request }) => {
  128 |   const res = await request.get(`${CMS_API}/globals/site-settings`);
  129 |   expect(res.status()).toBe(200);
  130 |   const data = await res.json();
  131 |   expect(data.clubName).toBe("Åre Skärm- och Drakflygklubb");
  132 | });
  133 | 
  134 | test("[api] CMS returns news", async ({ request }) => {
  135 |   const res = await request.get(`${CMS_API}/news?limit=1`);
  136 |   expect(res.status()).toBe(200);
  137 |   const data = await res.json();
  138 |   expect(data.totalDocs).toBeGreaterThan(0);
  139 | });
  140 | 
  141 | test("[api] SMHI proxy returns weather data", async ({ request }) => {
  142 |   const res = await request.get(`${BASE}/api/smhi?lat=63.4&lon=13.1`);
  143 |   expect(res.status()).toBe(200);
  144 |   const data = await res.json();
  145 |   expect(data.timeSeries).toBeDefined();
  146 |   expect(data.timeSeries.length).toBeGreaterThan(0);
  147 |   expect(data.timeSeries[0].data.air_temperature).toBeDefined();
  148 | });
  149 | 
  150 | // ═══════════════════════════════════════════════════════════
  151 | // LAYER 3: Visual regression — screenshot baselines
  152 | // ═══════════════════════════════════════════════════════════
  153 | 
  154 | for (const vp of viewports) {
  155 |   for (const page of pages) {
  156 |     test(`[visual] ${page.name} @ ${vp.name}`, async ({ page: p }) => {
  157 |       await p.setViewportSize({ width: vp.width, height: vp.height });
  158 |       await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  159 | 
  160 |       // Wait for animations/transitions to settle
  161 |       await p.waitForTimeout(500);
  162 | 
  163 |       await expect(p).toHaveScreenshot(
  164 |         `${vp.name}-${page.name.toLowerCase().replace(/\s+/g, "-")}.png`,
  165 |         {
  166 |           fullPage: true,
  167 |           animations: "disabled",
  168 |           maxDiffPixelRatio: 0.02,
  169 |         }
  170 |       );
  171 |     });
  172 |   }
  173 | }
  174 | 
  175 | // ═══════════════════════════════════════════════════════════
  176 | // LAYER 4: Accessibility — axe-core WCAG scan
  177 | // ═══════════════════════════════════════════════════════════
  178 | 
  179 | for (const page of pages) {
  180 |   test(`[a11y] ${page.name} passes accessibility scan`, async ({
  181 |     page: p,
  182 |   }) => {
  183 |     await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
  184 | 
  185 |     const results = await new AxeBuilder({ page: p })
  186 |       .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  187 |       .exclude(".maplibregl-map") // map widget has its own a11y concerns
  188 |       .analyze();
  189 | 
  190 |     const serious = results.violations.filter(
  191 |       (v) => v.impact === "critical" || v.impact === "serious"
  192 |     );
```