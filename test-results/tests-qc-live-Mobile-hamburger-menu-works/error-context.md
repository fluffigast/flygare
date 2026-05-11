# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Mobile hamburger menu works
- Location: tests/qc-live.spec.ts:71:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('header nav')
Expected: visible
Error: strict mode violation: locator('header nav') resolved to 2 elements:
    1) <nav class="hidden @md:flex flex-1 items-center gap-6 justify-center">…</nav> aka getByText('HemFlygguidenVäderStartplatserNyheterOm klubben', { exact: true })
    2) <nav class="@md:hidden flex flex-col gap-4 pt-4">…</nav> aka getByText('HemFlygguidenVäderStartplatserNyheterOm klubbenBli medlem', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('header nav')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "Åre Skärm- och Drakflygklubb" [ref=e6] [cursor=pointer]:
          - /url: /
        - button "Stäng meny" [active] [ref=e7]:
          - img [ref=e8]
      - navigation [ref=e10]:
        - link "Hem" [ref=e11] [cursor=pointer]:
          - /url: /
        - link "Flygguiden" [ref=e12] [cursor=pointer]:
          - /url: /information
        - link "Väder" [ref=e13] [cursor=pointer]:
          - /url: /vader
        - link "Startplatser" [ref=e14] [cursor=pointer]:
          - /url: /startplatser
        - link "Nyheter" [ref=e15] [cursor=pointer]:
          - /url: /nyheter
        - link "Om klubben" [ref=e16] [cursor=pointer]:
          - /url: /om
        - link "Bli medlem" [ref=e17] [cursor=pointer]:
          - /url: /bli-medlem
  - generic [ref=e18]:
    - img "Hero banner" [ref=e19]
    - generic [ref=e20]:
      - heading "Skandinaviens mest spektakulära flygplats" [level=1] [ref=e21]
      - paragraph [ref=e22]: Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.
  - main [ref=e23]:
    - generic [ref=e24]:
      - generic [ref=e25]:
        - heading "50 år av flygning från Skutan" [level=2] [ref=e26]
        - paragraph [ref=e27]: Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.
      - img "50 år av flygning från Skutan" [ref=e29]
    - generic [ref=e31]:
      - generic [ref=e32]:
        - paragraph [ref=e33]: "1975"
        - paragraph [ref=e34]: Grundat
      - generic [ref=e35]:
        - paragraph [ref=e36]: ~100
        - paragraph [ref=e37]: Aktiva medlemmar
      - generic [ref=e38]:
        - paragraph [ref=e39]: 230 km
        - paragraph [ref=e40]: Distansrekord (skärm)
      - generic [ref=e41]:
        - paragraph [ref=e42]: "9"
        - paragraph [ref=e43]: Startplatser
    - generic [ref=e44]:
      - generic [ref=e45]:
        - heading "Nyheter" [level=2] [ref=e47]
        - generic [ref=e48]:
          - button "Previous" [disabled] [ref=e49]:
            - img [ref=e50]
          - button "Next" [ref=e52]:
            - img [ref=e53]
      - generic [ref=e56]:
        - link [ref=e58] [cursor=pointer]:
          - /url: /nyheter/sasongsstart-i-arefjallen
          - article [ref=e59]:
            - img "Säsongsstart i Årefjällen" [ref=e61]
            - generic [ref=e62]:
              - heading "Säsongsstart i Årefjällen" [level=4] [ref=e63]
              - paragraph [ref=e64]: 1 mars, 2026
        - link [ref=e66] [cursor=pointer]:
          - /url: /nyheter/uppdaterad-information-om-starter-pa-areskutan
          - article [ref=e67]:
            - img "Uppdaterad information om starter på Åreskutan" [ref=e69]
            - generic [ref=e70]:
              - heading "Uppdaterad information om starter på Åreskutan" [level=4] [ref=e71]
              - paragraph [ref=e72]: 5 mars, 2026
        - link [ref=e74] [cursor=pointer]:
          - /url: /nyheter/paminnelse-om-luftrum-i-areomradet
          - article [ref=e75]:
            - img "Påminnelse om luftrum i Åreområdet" [ref=e77]
            - generic [ref=e78]:
              - heading "Påminnelse om luftrum i Åreområdet" [level=4] [ref=e79]
              - paragraph [ref=e80]: 8 mars, 2026
      - radiogroup "Nyhetskarusell, välj sida" [ref=e81]:
        - radio "Gå till sida 1" [checked] [ref=e82]
        - radio "Gå till sida 2" [ref=e83]
        - radio "Gå till sida 3" [ref=e84]
        - radio "Gå till sida 4" [ref=e85]
    - generic [ref=e86]:
      - generic [ref=e87]:
        - article [ref=e88]:
          - link "Starter och landningar i Åre" [ref=e89] [cursor=pointer]:
            - /url: /information/starter-och-landningar
            - img "Starter och landningar i Åre" [ref=e90]
          - generic [ref=e91]:
            - link "Starter och landningar i Åre" [ref=e92] [cursor=pointer]:
              - /url: /information/starter-och-landningar
              - heading "Starter och landningar i Åre" [level=3] [ref=e93]
            - paragraph [ref=e94]: Översikt av etablerade start- och landningsplatser i Åreområdet.
        - article [ref=e95]:
          - link "Luftrum i Åreområdet" [ref=e96] [cursor=pointer]:
            - /url: /information/luftrum-are
            - img "Luftrum i Åreområdet" [ref=e97]
          - generic [ref=e98]:
            - link "Luftrum i Åreområdet" [ref=e99] [cursor=pointer]:
              - /url: /information/luftrum-are
              - heading "Luftrum i Åreområdet" [level=3] [ref=e100]
            - paragraph [ref=e101]: Viktig information om luftrum, restriktioner och höjdbegränsningar.
        - article [ref=e102]:
          - link "Väder och lokala vindar" [ref=e103] [cursor=pointer]:
            - /url: /information/vader-och-vind
            - img "Väder och lokala vindar" [ref=e104]
          - generic [ref=e105]:
            - link "Väder och lokala vindar" [ref=e106] [cursor=pointer]:
              - /url: /information/vader-och-vind
              - heading "Väder och lokala vindar" [level=3] [ref=e107]
            - paragraph [ref=e108]: Så påverkar väder och vind flygning i fjällmiljö.
        - article [ref=e109]:
          - link "Säkerhet och ansvar" [ref=e110] [cursor=pointer]:
            - /url: /information/sakerhet-och-ansvar
            - img "Säkerhet och ansvar" [ref=e111]
          - generic [ref=e112]:
            - link "Säkerhet och ansvar" [ref=e113] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
              - heading "Säkerhet och ansvar" [level=3] [ref=e114]
            - paragraph [ref=e115]: Grundläggande säkerhetsprinciper för flygning i Åre.
        - article [ref=e116]:
          - link "Nödinformation" [ref=e117] [cursor=pointer]:
            - /url: /information/nodinformation
            - img "Nödinformation" [ref=e118]
          - generic [ref=e119]:
            - link "Nödinformation" [ref=e120] [cursor=pointer]:
              - /url: /information/nodinformation
              - heading "Nödinformation" [level=3] [ref=e121]
            - paragraph [ref=e122]: Vad du ska göra vid olycka eller incident.
        - article [ref=e123]:
          - link "Klubbbussen" [ref=e124] [cursor=pointer]:
            - /url: /information/klubbbussen
            - img "Klubbbussen" [ref=e125]
          - generic [ref=e126]:
            - link "Klubbbussen" [ref=e127] [cursor=pointer]:
              - /url: /information/klubbbussen
              - heading "Klubbbussen" [level=3] [ref=e128]
            - paragraph [ref=e129]: Information om klubbens buss och hur den används.
      - generic [ref=e131]:
        - generic [ref=e132]: Föregående sida
        - link "Go to page 1" [ref=e134] [cursor=pointer]:
          - /url: /information
          - text: "1"
        - generic [ref=e135]: Nästa sida
    - generic [ref=e136]:
      - generic [ref=e137]:
        - paragraph [ref=e138]: Väder
        - heading "Väderprognos för Åreskutan" [level=2] [ref=e139]
      - paragraph [ref=e140]: "Kunde inte ladda väderdata: Failed to fetch SMHI forecast:"
      - generic [ref=e141]:
        - generic [ref=e142]:
          - generic [ref=e143]:
            - heading "Tisdag" [level=3] [ref=e144]
            - paragraph [ref=e145]: 3 februari
          - generic [ref=e146]:
            - generic [ref=e147]:
              - paragraph [ref=e148]: Vindriktning
              - generic [ref=e149]:
                - img [ref=e151]
                - text: Nordlig
            - generic [ref=e153]:
              - paragraph [ref=e154]: Temperatur
              - paragraph [ref=e155]: 12°C
            - generic [ref=e156]:
              - paragraph [ref=e157]: Vindstyrka
              - paragraph [ref=e158]: 2-6 m/s
            - generic [ref=e159]:
              - paragraph [ref=e160]: Nederbörd
              - paragraph [ref=e161]: 0 mm
        - generic [ref=e162]:
          - generic [ref=e163]:
            - heading "Onsdag" [level=3] [ref=e164]
            - paragraph [ref=e165]: 4 februari
          - generic [ref=e166]:
            - generic [ref=e167]:
              - paragraph [ref=e168]: Vindriktning
              - generic [ref=e169]:
                - img [ref=e171]
                - text: Västlig
            - generic [ref=e173]:
              - paragraph [ref=e174]: Temperatur
              - paragraph [ref=e175]: 10°C
            - generic [ref=e176]:
              - paragraph [ref=e177]: Vindstyrka
              - paragraph [ref=e178]: 3-7 m/s
            - generic [ref=e179]:
              - paragraph [ref=e180]: Nederbörd
              - paragraph [ref=e181]: 2 mm
        - generic [ref=e182]:
          - generic [ref=e183]:
            - heading "Torsdag" [level=3] [ref=e184]
            - paragraph [ref=e185]: 5 februari
          - generic [ref=e186]:
            - generic [ref=e187]:
              - paragraph [ref=e188]: Vindriktning
              - generic [ref=e189]:
                - img [ref=e191]
                - text: Östlig
            - generic [ref=e193]:
              - paragraph [ref=e194]: Temperatur
              - paragraph [ref=e195]: 8°C
            - generic [ref=e196]:
              - paragraph [ref=e197]: Vindstyrka
              - paragraph [ref=e198]: 1-4 m/s
            - generic [ref=e199]:
              - paragraph [ref=e200]: Nederbörd
              - paragraph [ref=e201]: 5 mm
    - generic [ref=e202]:
      - paragraph [ref=e203]: Bli en del av klubben
      - heading "Redo att flyga?" [level=2] [ref=e204]
      - generic [ref=e205]:
        - link "Bli medlem — 600 kr/år" [ref=e206] [cursor=pointer]:
          - /url: /bli-medlem
        - link "Se startplatser" [ref=e207] [cursor=pointer]:
          - /url: /startplatser
  - contentinfo [ref=e209]:
    - generic [ref=e210]:
      - generic [ref=e211]:
        - heading "Flyga i Åre" [level=4] [ref=e212]
        - list [ref=e213]:
          - listitem [ref=e214]:
            - link "Startplatser" [ref=e215] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e216]:
            - link "Luftrum" [ref=e217] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e218]:
            - link "Säkerhet och ansvar" [ref=e219] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e220]:
            - link "Nödinformation" [ref=e221] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e222]:
            - link "Etik och hänsyn" [ref=e223] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e224]:
        - heading "Klubben" [level=4] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - link "Nyheter" [ref=e228] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e229]:
            - link "Information" [ref=e230] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e231]:
            - link "Tävlingar" [ref=e232] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e233]:
            - link "Bli medlem" [ref=e234] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e235]:
            - link "Väder" [ref=e236] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e237]:
        - heading "Om Oss" [level=4] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Om klubben" [ref=e241] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e242]:
            - link "Kontakt" [ref=e243] [cursor=pointer]:
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
> 84  |   await expect(mobileNav).toBeVisible();
      |                           ^ Error: expect(locator).toBeVisible() failed
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