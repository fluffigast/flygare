# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Hem (/) loads without console errors
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
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "Åre Skärm- och Drakflygklubb" [ref=e6] [cursor=pointer]:
        - /url: /
      - navigation [ref=e7]:
        - link "Hem" [ref=e8] [cursor=pointer]:
          - /url: /
        - link "Flygguiden" [ref=e9] [cursor=pointer]:
          - /url: /information
        - link "Väder" [ref=e10] [cursor=pointer]:
          - /url: /vader
        - link "Startplatser" [ref=e11] [cursor=pointer]:
          - /url: /startplatser
        - link "Nyheter" [ref=e12] [cursor=pointer]:
          - /url: /nyheter
        - link "Om klubben" [ref=e13] [cursor=pointer]:
          - /url: /om
      - link "Bli medlem" [ref=e15] [cursor=pointer]:
        - /url: /bli-medlem
  - generic [ref=e16]:
    - img "Hero banner" [ref=e17]
    - generic [ref=e18]:
      - heading "Skandinaviens mest spektakulära flygplats" [level=1] [ref=e19]
      - paragraph [ref=e20]: Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - heading "50 år av flygning från Skutan" [level=2] [ref=e24]
        - paragraph [ref=e25]: Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.
      - img "50 år av flygning från Skutan" [ref=e27]
    - generic [ref=e29]:
      - generic [ref=e30]:
        - paragraph [ref=e31]: "1975"
        - paragraph [ref=e32]: Grundat
      - generic [ref=e33]:
        - paragraph [ref=e34]: ~100
        - paragraph [ref=e35]: Aktiva medlemmar
      - generic [ref=e36]:
        - paragraph [ref=e37]: 230 km
        - paragraph [ref=e38]: Distansrekord (skärm)
      - generic [ref=e39]:
        - paragraph [ref=e40]: "9"
        - paragraph [ref=e41]: Startplatser
    - generic [ref=e42]:
      - generic [ref=e43]:
        - heading "Nyheter" [level=2] [ref=e45]
        - generic [ref=e46]:
          - button "Previous" [disabled] [ref=e47]:
            - img [ref=e48]
          - button "Next" [ref=e50]:
            - img [ref=e51]
      - generic [ref=e54]:
        - link [ref=e56] [cursor=pointer]:
          - /url: /nyheter/sasongsstart-i-arefjallen
          - article [ref=e57]:
            - img "Säsongsstart i Årefjällen" [ref=e59]
            - generic [ref=e60]:
              - heading "Säsongsstart i Årefjällen" [level=4] [ref=e61]
              - paragraph [ref=e62]: 1 mars, 2026
        - link [ref=e64] [cursor=pointer]:
          - /url: /nyheter/uppdaterad-information-om-starter-pa-areskutan
          - article [ref=e65]:
            - img "Uppdaterad information om starter på Åreskutan" [ref=e67]
            - generic [ref=e68]:
              - heading "Uppdaterad information om starter på Åreskutan" [level=4] [ref=e69]
              - paragraph [ref=e70]: 5 mars, 2026
        - link [ref=e72] [cursor=pointer]:
          - /url: /nyheter/paminnelse-om-luftrum-i-areomradet
          - article [ref=e73]:
            - img "Påminnelse om luftrum i Åreområdet" [ref=e75]
            - generic [ref=e76]:
              - heading "Påminnelse om luftrum i Åreområdet" [level=4] [ref=e77]
              - paragraph [ref=e78]: 8 mars, 2026
      - radiogroup "Nyhetskarusell, välj sida" [ref=e79]:
        - radio "Gå till sida 1" [checked] [ref=e80]
        - radio "Gå till sida 2" [ref=e81]
        - radio "Gå till sida 3" [ref=e82]
        - radio "Gå till sida 4" [ref=e83]
    - generic [ref=e84]:
      - generic [ref=e85]:
        - article [ref=e86]:
          - link "Starter och landningar i Åre" [ref=e87] [cursor=pointer]:
            - /url: /information/starter-och-landningar
            - img "Starter och landningar i Åre" [ref=e88]
          - generic [ref=e89]:
            - link "Starter och landningar i Åre" [ref=e90] [cursor=pointer]:
              - /url: /information/starter-och-landningar
              - heading "Starter och landningar i Åre" [level=3] [ref=e91]
            - paragraph [ref=e92]: Översikt av etablerade start- och landningsplatser i Åreområdet.
        - article [ref=e93]:
          - link "Luftrum i Åreområdet" [ref=e94] [cursor=pointer]:
            - /url: /information/luftrum-are
            - img "Luftrum i Åreområdet" [ref=e95]
          - generic [ref=e96]:
            - link "Luftrum i Åreområdet" [ref=e97] [cursor=pointer]:
              - /url: /information/luftrum-are
              - heading "Luftrum i Åreområdet" [level=3] [ref=e98]
            - paragraph [ref=e99]: Viktig information om luftrum, restriktioner och höjdbegränsningar.
        - article [ref=e100]:
          - link "Väder och lokala vindar" [ref=e101] [cursor=pointer]:
            - /url: /information/vader-och-vind
            - img "Väder och lokala vindar" [ref=e102]
          - generic [ref=e103]:
            - link "Väder och lokala vindar" [ref=e104] [cursor=pointer]:
              - /url: /information/vader-och-vind
              - heading "Väder och lokala vindar" [level=3] [ref=e105]
            - paragraph [ref=e106]: Så påverkar väder och vind flygning i fjällmiljö.
        - article [ref=e107]:
          - link "Säkerhet och ansvar" [ref=e108] [cursor=pointer]:
            - /url: /information/sakerhet-och-ansvar
            - img "Säkerhet och ansvar" [ref=e109]
          - generic [ref=e110]:
            - link "Säkerhet och ansvar" [ref=e111] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
              - heading "Säkerhet och ansvar" [level=3] [ref=e112]
            - paragraph [ref=e113]: Grundläggande säkerhetsprinciper för flygning i Åre.
        - article [ref=e114]:
          - link "Nödinformation" [ref=e115] [cursor=pointer]:
            - /url: /information/nodinformation
            - img "Nödinformation" [ref=e116]
          - generic [ref=e117]:
            - link "Nödinformation" [ref=e118] [cursor=pointer]:
              - /url: /information/nodinformation
              - heading "Nödinformation" [level=3] [ref=e119]
            - paragraph [ref=e120]: Vad du ska göra vid olycka eller incident.
        - article [ref=e121]:
          - link "Klubbbussen" [ref=e122] [cursor=pointer]:
            - /url: /information/klubbbussen
            - img "Klubbbussen" [ref=e123]
          - generic [ref=e124]:
            - link "Klubbbussen" [ref=e125] [cursor=pointer]:
              - /url: /information/klubbbussen
              - heading "Klubbbussen" [level=3] [ref=e126]
            - paragraph [ref=e127]: Information om klubbens buss och hur den används.
      - generic [ref=e129]:
        - generic [ref=e130]: Föregående sida
        - link "Go to page 1" [ref=e132] [cursor=pointer]:
          - /url: /information
          - text: "1"
        - generic [ref=e133]: Nästa sida
    - generic [ref=e134]:
      - generic [ref=e135]:
        - paragraph [ref=e136]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e137]
      - paragraph [ref=e138]: "Kunde inte ladda väderdata: Failed to fetch SMHI forecast:"
      - generic [ref=e139]:
        - generic [ref=e140]:
          - generic [ref=e141]:
            - heading "Tisdag" [level=3] [ref=e142]
            - paragraph [ref=e143]: 3 februari
          - generic [ref=e144]:
            - generic [ref=e145]:
              - paragraph [ref=e146]: Vindriktning
              - generic [ref=e147]:
                - img [ref=e149]
                - text: Nordlig
            - generic [ref=e151]:
              - paragraph [ref=e152]: Temperatur
              - paragraph [ref=e153]: 12°C
            - generic [ref=e154]:
              - paragraph [ref=e155]: Vindstyrka
              - paragraph [ref=e156]: 2-6 m/s
            - generic [ref=e157]:
              - paragraph [ref=e158]: Nederbörd
              - paragraph [ref=e159]: 0 mm
        - generic [ref=e160]:
          - generic [ref=e161]:
            - heading "Onsdag" [level=3] [ref=e162]
            - paragraph [ref=e163]: 4 februari
          - generic [ref=e164]:
            - generic [ref=e165]:
              - paragraph [ref=e166]: Vindriktning
              - generic [ref=e167]:
                - img [ref=e169]
                - text: Västlig
            - generic [ref=e171]:
              - paragraph [ref=e172]: Temperatur
              - paragraph [ref=e173]: 10°C
            - generic [ref=e174]:
              - paragraph [ref=e175]: Vindstyrka
              - paragraph [ref=e176]: 3-7 m/s
            - generic [ref=e177]:
              - paragraph [ref=e178]: Nederbörd
              - paragraph [ref=e179]: 2 mm
        - generic [ref=e180]:
          - generic [ref=e181]:
            - heading "Torsdag" [level=3] [ref=e182]
            - paragraph [ref=e183]: 5 februari
          - generic [ref=e184]:
            - generic [ref=e185]:
              - paragraph [ref=e186]: Vindriktning
              - generic [ref=e187]:
                - img [ref=e189]
                - text: Östlig
            - generic [ref=e191]:
              - paragraph [ref=e192]: Temperatur
              - paragraph [ref=e193]: 8°C
            - generic [ref=e194]:
              - paragraph [ref=e195]: Vindstyrka
              - paragraph [ref=e196]: 1-4 m/s
            - generic [ref=e197]:
              - paragraph [ref=e198]: Nederbörd
              - paragraph [ref=e199]: 5 mm
    - generic [ref=e200]:
      - paragraph [ref=e201]: Bli en del av klubben
      - heading "Redo att flyga?" [level=2] [ref=e202]
      - generic [ref=e203]:
        - link "Bli medlem — 600 kr/år" [ref=e204] [cursor=pointer]:
          - /url: /bli-medlem
        - link "Se startplatser" [ref=e205] [cursor=pointer]:
          - /url: /startplatser
  - contentinfo [ref=e207]:
    - generic [ref=e208]:
      - generic [ref=e209]:
        - heading "Flyga i Åre" [level=4] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - link "Startplatser" [ref=e213] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e214]:
            - link "Luftrum" [ref=e215] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e216]:
            - link "Säkerhet och ansvar" [ref=e217] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e218]:
            - link "Nödinformation" [ref=e219] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e220]:
            - link "Etik och hänsyn" [ref=e221] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e222]:
        - heading "Klubben" [level=4] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - link "Nyheter" [ref=e226] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e227]:
            - link "Information" [ref=e228] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e229]:
            - link "Tävlingar" [ref=e230] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e231]:
            - link "Bli medlem" [ref=e232] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e233]:
            - link "Väder" [ref=e234] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e235]:
        - heading "Om Oss" [level=4] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - link "Om klubben" [ref=e239] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e240]:
            - link "Kontakt" [ref=e241] [cursor=pointer]:
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