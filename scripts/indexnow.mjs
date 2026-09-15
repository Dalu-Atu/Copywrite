import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://noteocr.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const key = process.env.INDEXNOW_KEY || "43c31d3c34494d32933b5da6b361d533";
console.log(key);

if (!key) {
  console.error("❌ INDEXNOW_KEY is not set.");
  process.exit(1);
}

const sitemapPath = path.join(process.cwd(), "public", "sitemap-0.xml");

async function getUrlsFromSitemap() {
  const sitemap = await fs.readFile(sitemapPath, "utf8");

  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  return [...new Set(urls)];
}

async function submitToIndexNow(urls) {
  if (urls.length === 0) {
    console.log("⚠️ No URLs found in sitemap.");
    return;
  }

  console.log(`📡 Submitting ${urls.length} URLs to IndexNow...`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: "noteocr.com",
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: urls,
    }),
  });

  const body = await response.text();

  if (!response.ok) {
    console.error(`❌ IndexNow submission failed: ${response.status}`);

    console.error(body);
    process.exit(1);
  }

  console.log(`✅ IndexNow accepted ${urls.length} URLs.`);

  console.log(`HTTP ${response.status}`);
}

async function main() {
  try {
    const urls = await getUrlsFromSitemap();

    console.log("URLs found:");
    console.log(urls);

    await submitToIndexNow(urls);
  } catch (error) {
    console.error("❌ IndexNow error:");
    console.error(error);

    process.exit(1);
  }
}

main();
