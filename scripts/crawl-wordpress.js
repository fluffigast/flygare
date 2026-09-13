/**
 * WordPress live-crawl av flygare.nu (nuvarande WP-sajt på Loopia).
 *
 * Rapporterar existerande WP-innehåll (posts, pages, categories, tags)
 * så vi vet vad som ska migreras till nya Payload-strukturen.
 *
 * Kör: node scripts/crawl-wordpress.js [--out=report.json] [--host=flygare.nu]
 *
 * Output: markdown-rapport till scripts/artifacts/wp-content-report.md
 *         + rå JSON till scripts/artifacts/wp-content.json
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "artifacts");

const argv = process.argv.slice(2);
const HOST =
  argv.find((a) => a.startsWith("--host="))?.split("=")[1] ?? "flygare.nu";
const BASE = `https://${HOST}/wp-json/wp/v2`;

async function fetchAll(endpoint) {
  const out = [];
  let page = 1;
  while (true) {
    const url = `${BASE}/${endpoint}?per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "flygare-migrator/1.0" },
    });
    if (res.status === 400) break; // WP returnerar 400 när page > totalPages
    if (!res.ok) throw new Error(`${endpoint} p=${page} → HTTP ${res.status}`);
    const chunk = await res.json();
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    out.push(...chunk);
    if (chunk.length < 100) break;
    page++;
    if (page > 20) break; // safety
  }
  return out;
}

// Sitemap-fallback när wp-json är avstängd
async function fetchSitemap() {
  const url = `https://${HOST}/wp-sitemap.xml`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const xml = await res.text();
    // Extraherar sitemap-URL:er
    const submaps = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const allUrls = [];
    for (const sub of submaps.slice(0, 10)) {
      try {
        const r = await fetch(sub, { signal: AbortSignal.timeout(10000) });
        if (!r.ok) continue;
        const x = await r.text();
        const urls = [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        allUrls.push(...urls);
      } catch { /* skip */ }
    }
    return allUrls.filter((u) => u.startsWith(`https://${HOST}/`) && u !== `https://${HOST}/`);
  } catch (e) {
    console.warn("sitemap failed:", e.message);
    return [];
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Crawling ${BASE}…\n`);

  const [posts, pages, categories, tags, sitemapUrls] = await Promise.all([
    fetchAll("posts").catch((e) => { console.warn("posts:", e.message); return []; }),
    fetchAll("pages").catch((e) => { console.warn("pages:", e.message); return []; }),
    fetchAll("categories").catch((e) => { console.warn("categories:", e.message); return []; }),
    fetchAll("tags").catch((e) => { console.warn("tags:", e.message); return []; }),
    fetchSitemap(),
  ]);

  console.log(`sitemap URLs: ${sitemapUrls.length}`);

  console.log(`posts: ${posts.length}`);
  console.log(`pages: ${pages.length}`);
  console.log(`categories: ${categories.length}`);
  console.log(`tags: ${tags.length}\n`);

  const raw = { host: HOST, crawled: new Date().toISOString(), posts, pages, categories, tags, sitemapUrls };
  await writeFile(join(OUT_DIR, "wp-content.json"), JSON.stringify(raw, null, 2));

  // ── Markdown-rapport ─────────────────────────────
  const md = [];
  md.push(`# WordPress content-migration report`);
  md.push(``);
  md.push(`- **Host:** ${HOST}`);
  md.push(`- **Crawled:** ${new Date().toISOString()}`);
  md.push(`- **Posts:** ${posts.length}`);
  md.push(`- **Pages:** ${pages.length}`);
  md.push(`- **Categories:** ${categories.length}`);
  md.push(`- **Tags:** ${tags.length}`);
  md.push(``);

  md.push(`## Pages (${pages.length})`);
  md.push(``);
  md.push(`| ID | Slug | Titel | Modified | Excerpt (raw) |`);
  md.push(`|----|------|-------|----------|---------------|`);
  for (const p of pages) {
    const title = (p.title?.rendered ?? "").replace(/\|/g, "\\|");
    const excerpt = (p.excerpt?.rendered ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").slice(0, 80).replace(/\|/g, "\\|");
    md.push(`| ${p.id} | \`${p.slug}\` | ${title} | ${(p.modified ?? "").slice(0, 10)} | ${excerpt} |`);
  }
  md.push(``);

  md.push(`## Posts (${posts.length})`);
  md.push(``);
  md.push(`| Date | Slug | Titel | Cat-IDs |`);
  md.push(`|------|------|-------|---------|`);
  const postsByDate = [...posts].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  for (const p of postsByDate) {
    const title = (p.title?.rendered ?? "").replace(/\|/g, "\\|");
    const cats = (p.categories ?? []).join(",");
    md.push(`| ${(p.date ?? "").slice(0, 10)} | \`${p.slug}\` | ${title} | ${cats} |`);
  }
  md.push(``);

  md.push(`## Categories`);
  md.push(``);
  for (const c of categories) {
    md.push(`- **${c.name}** (id=${c.id}, slug=\`${c.slug}\`) — ${c.count ?? 0} posts`);
  }
  md.push(``);

  md.push(`## URL:er från sitemap (${sitemapUrls.length})`);
  md.push(``);
  if (sitemapUrls.length === 0) {
    md.push(`Ingen sitemap tillgänglig eller alla wp-json + sitemap är blockerade.`);
  } else {
    md.push(`Full URL-lista från \`https://${HOST}/wp-sitemap.xml\` — använd för att veta vilket innehåll som exponeras publikt:`);
    md.push(``);
    for (const u of sitemapUrls.slice(0, 100)) {
      const slug = u.replace(`https://${HOST}/`, "").replace(/\/$/, "");
      md.push(`- \`/${slug}\``);
    }
    if (sitemapUrls.length > 100) md.push(`- … +${sitemapUrls.length - 100} till (se JSON)`);
  }
  md.push(``);

  md.push(`## Migrations-checklista`);
  md.push(``);
  md.push(`Jämför WP-pages mot nya sidor. Slugs som finns i WP men INTE i nya:`);
  md.push(``);
  const newSlugs = new Set([
    "flyga-i-are", "sakerhet", "xc", "flygregler", "skistar", "acro",
    "vader", "speedrider", "startplatser", "hangflyg", "klubbuss", "paramotor",
    "nyheter", "aktiviteter", "kalender", "klubbresor", "arsmoten", "ovriga-aktiviteter",
    "tavlingar", "are-ppc", "topplandning", "sverige-cup", "ovriga-tavlingar", "stipendium",
    "om", "styrelsen", "kontakt", "klubbprodukter", "stadgar", "bli-medlem",
    "ovrigt", "foton", "dokument",
  ]);
  const missing = pages.filter((p) => !newSlugs.has(p.slug));
  if (missing.length === 0) {
    md.push(`Alla WP-slugs har motsvarande sida i nya strukturen.`);
  } else {
    for (const p of missing) {
      md.push(`- WP-slug \`${p.slug}\` ("${p.title?.rendered ?? "?"}") — ingen match, kolla om innehåll behövs`);
    }
  }
  md.push(``);

  await writeFile(join(OUT_DIR, "wp-content-report.md"), md.join("\n"));

  console.log(`Rapport: ${join(OUT_DIR, "wp-content-report.md")}`);
  console.log(`Rå JSON: ${join(OUT_DIR, "wp-content.json")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
