# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/qc-live.spec.ts >> Startplatser (/startplatser) loads without console errors
- Location: tests/qc-live.spec.ts:26:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Creating a worker from 'blob:https://brave-tree-08c5f0c03.4.azurestaticapps.net/a9f6a9ca-cb47-477b-9fa2-796f74d8bb98' violates the following Content Security Policy directive: \"script-src 'self'\". Note that 'worker-src' was not explicitly set, so 'script-src' is used as a fallback. The action has been blocked.",
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
  - generic [ref=e17]:
    - generic [ref=e18]:
      - radiogroup "Karttyp" [ref=e19]:
        - radio "Standard" [checked] [ref=e20]
        - radio "Topografisk" [ref=e21]
      - generic [ref=e22]:
        - region "Map" [ref=e23]
        - generic:
          - generic [ref=e24]:
            - button "Zoom in" [ref=e25] [cursor=pointer]
            - button "Zoom out" [ref=e27] [cursor=pointer]
            - button "Drag to rotate map, click to reset north" [ref=e29]
          - group [ref=e31]:
            - generic "Toggle attribution" [ref=e32] [cursor=pointer]
            - generic [ref=e33]:
              - link "MapLibre" [ref=e34] [cursor=pointer]:
                - /url: https://maplibre.org/
              - text: "|"
              - link "OpenFreeMap" [ref=e35] [cursor=pointer]:
                - /url: https://openfreemap.org
              - link "© OpenMapTiles" [ref=e36] [cursor=pointer]:
                - /url: https://www.openmaptiles.org/
              - text: Data from
              - link "OpenStreetMap" [ref=e37] [cursor=pointer]:
                - /url: https://www.openstreetmap.org/copyright
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - paragraph [ref=e41]: Startplatser
          - heading "Åreskutans start- och landningsområden" [level=2] [ref=e42]
        - generic [ref=e43]:
          - paragraph [ref=e44]: Alla väderstreck är orienterade som om Kabinbanan ligger i rak nord-sydlig riktning. Draklanda är den officiella landningsplatsen — alla andra landningar betraktas som utelandningar vid XC-flyg.
          - paragraph [ref=e45]: Vajrarna passeras söder om Stötta 1 vid nedflyg utan höjdvinst. Nya och halverfarna piloter ska alltid följa denna regel. Vajrarna hänger minimum 60 m ovan mark.
        - generic [ref=e46]:
          - heading "Åreskutan" [level=3] [ref=e47]
          - paragraph [ref=e48]: Huvudmassivet med de flesta startplatserna. Nås via Kabinbanan eller till fots. Kontrollera alltid aktuell vindprognos och NOTAM innan start.
        - generic [ref=e49]:
          - heading "Andra flygområden" [level=3] [ref=e50]
          - paragraph [ref=e51]: Tegefjäll och Mörvikshummeln erbjuder alternativ vid annan vindexponering. Kontakta klubben för aktuell status på dessa platser.
        - generic [ref=e52]:
          - heading "Välliste, Trillevallen" [level=3] [ref=e53]
          - paragraph [ref=e54]: V–NV riktning, ~400 m höjdskillnad.
        - generic [ref=e55]:
          - heading "Getryggen, Snasahögarna" [level=3] [ref=e56]
          - paragraph [ref=e57]: S–SV riktning, ~600 m höjdskillnad.
        - generic [ref=e58]:
          - heading "Tossön, Järpen" [level=3] [ref=e59]
          - paragraph [ref=e60]: V riktning, ~350 m höjdskillnad.
        - generic [ref=e61]:
          - heading "Rännberg, Gevsjön" [level=3] [ref=e62]
          - paragraph [ref=e63]: SO riktning, ~250 m höjdskillnad.
      - generic [ref=e65]:
        - article [ref=e66]:
          - link "1000-meter Syd" [ref=e67] [cursor=pointer]:
            - /url: /startplatser/1000-meter-syd
            - img "1000-meter Syd" [ref=e68]
          - generic [ref=e69]:
            - link "1000-meter Syd" [ref=e70] [cursor=pointer]:
              - /url: /startplatser/1000-meter-syd
              - heading "1000-meter Syd" [level=3] [ref=e71]
            - paragraph [ref=e72]: Brant fjällstart på Västerskutan med bra höjd över dalen — kräver god teknik och rätt vind.
        - article [ref=e73]:
          - link "Västerskutan nord" [ref=e74] [cursor=pointer]:
            - /url: /startplatser/vasterskutan-nord
            - img "Västerskutan nord" [ref=e75]
          - generic [ref=e76]:
            - link "Västerskutan nord" [ref=e77] [cursor=pointer]:
              - /url: /startplatser/vasterskutan-nord
              - heading "Västerskutan nord" [level=3] [ref=e78]
            - paragraph [ref=e79]: Nordlig start på Västerskutan — ofta bättre i nordlig till nordvästlig vind än sydliga startar.
        - article [ref=e80]:
          - link "Mörvikshummeln" [ref=e81] [cursor=pointer]:
            - /url: /startplatser/morvikshummeln
            - img "Mörvikshummeln" [ref=e82]
          - generic [ref=e83]:
            - link "Mörvikshummeln" [ref=e84] [cursor=pointer]:
              - /url: /startplatser/morvikshummeln
              - heading "Mörvikshummeln" [level=3] [ref=e85]
            - paragraph [ref=e86]: Öppnare sluttning söder om Åre — populär vid stabil vind från sydväst.
        - article [ref=e87]:
          - link "Kabinbanans topp" [ref=e88] [cursor=pointer]:
            - /url: /startplatser/kabinbanans-topp
            - img "Kabinbanans topp" [ref=e89]
          - generic [ref=e90]:
            - link "Kabinbanans topp" [ref=e91] [cursor=pointer]:
              - /url: /startplatser/kabinbanans-topp
              - heading "Kabinbanans topp" [level=3] [ref=e92]
            - paragraph [ref=e93]: Start i anslutning till kabinbanans övre zon — kort bärväg men trångt vid högsäsong.
        - article [ref=e94]:
          - link "Tegefjäll" [ref=e95] [cursor=pointer]:
            - /url: /startplatser/tegefjalls-starten
            - img "Tegefjäll" [ref=e96]
          - generic [ref=e97]:
            - link "Tegefjäll" [ref=e98] [cursor=pointer]:
              - /url: /startplatser/tegefjalls-starten
              - heading "Tegefjäll" [level=3] [ref=e99]
            - paragraph [ref=e100]: Start i Tegefjällsområdet — annan vindexponering än Åreskutan, bra komplement vid lokal väderlek.
        - article [ref=e101]:
          - link "Tväråvalvet" [ref=e102] [cursor=pointer]:
            - /url: /startplatser/tvaravalvet
            - img "Tväråvalvet" [ref=e103]
          - generic [ref=e104]:
            - link "Tväråvalvet" [ref=e105] [cursor=pointer]:
              - /url: /startplatser/tvaravalvet
              - heading "Tväråvalvet" [level=3] [ref=e106]
            - paragraph [ref=e107]: Nordvästlig start med god höjd — populär vid NV-vind.
        - article [ref=e108]:
          - link "Röda Rappet Väst" [ref=e109] [cursor=pointer]:
            - /url: /startplatser/roda-rappet-vast
            - img "Röda Rappet Väst" [ref=e110]
          - generic [ref=e111]:
            - link "Röda Rappet Väst" [ref=e112] [cursor=pointer]:
              - /url: /startplatser/roda-rappet-vast
              - heading "Röda Rappet Väst" [level=3] [ref=e113]
            - paragraph [ref=e114]: Västlig till nordvästlig start — bra komplement vid V-NV vind.
        - article [ref=e115]:
          - link "Långspannet" [ref=e116] [cursor=pointer]:
            - /url: /startplatser/langspannet
            - img "Långspannet" [ref=e117]
          - generic [ref=e118]:
            - link "Långspannet" [ref=e119] [cursor=pointer]:
              - /url: /startplatser/langspannet
              - heading "Långspannet" [level=3] [ref=e120]
            - paragraph [ref=e121]: Syd-sydvästlig start mellan stötta 3 och 4 — ej rekommenderad för nybörjare.
        - article [ref=e122]:
          - link "Draklanda" [ref=e123] [cursor=pointer]:
            - /url: /startplatser/draklanda
            - img "Draklanda" [ref=e124]
          - generic [ref=e125]:
            - link "Draklanda" [ref=e126] [cursor=pointer]:
              - /url: /startplatser/draklanda
              - heading "Draklanda" [level=3] [ref=e127]
            - paragraph [ref=e128]: Officiell landningsplats — 1 km väster om torget i Åre.
  - contentinfo [ref=e130]:
    - generic [ref=e131]:
      - generic [ref=e132]:
        - heading "Flyga i Åre" [level=4] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - link "Startplatser" [ref=e136] [cursor=pointer]:
              - /url: /startplatser
          - listitem [ref=e137]:
            - link "Luftrum" [ref=e138] [cursor=pointer]:
              - /url: /information/luftrum-are
          - listitem [ref=e139]:
            - link "Säkerhet och ansvar" [ref=e140] [cursor=pointer]:
              - /url: /information/sakerhet-och-ansvar
          - listitem [ref=e141]:
            - link "Nödinformation" [ref=e142] [cursor=pointer]:
              - /url: /information/nodinformation
          - listitem [ref=e143]:
            - link "Etik och hänsyn" [ref=e144] [cursor=pointer]:
              - /url: /information/etik-och-hansyn
      - generic [ref=e145]:
        - heading "Klubben" [level=4] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - link "Nyheter" [ref=e149] [cursor=pointer]:
              - /url: /nyheter
          - listitem [ref=e150]:
            - link "Information" [ref=e151] [cursor=pointer]:
              - /url: /information
          - listitem [ref=e152]:
            - link "Tävlingar" [ref=e153] [cursor=pointer]:
              - /url: /tavlingar
          - listitem [ref=e154]:
            - link "Bli medlem" [ref=e155] [cursor=pointer]:
              - /url: /bli-medlem
          - listitem [ref=e156]:
            - link "Väder" [ref=e157] [cursor=pointer]:
              - /url: /vader
      - generic [ref=e158]:
        - heading "Om Oss" [level=4] [ref=e159]
        - list [ref=e160]:
          - listitem [ref=e161]:
            - link "Om klubben" [ref=e162] [cursor=pointer]:
              - /url: /om
          - listitem [ref=e163]:
            - link "Kontakt" [ref=e164] [cursor=pointer]:
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