#!/usr/bin/env node
// Post-build prerender for a Vite SPA: loads the built app in headless Chrome and saves each public route's
// rendered HTML into dist/, so crawlers that don't run JavaScript (Bing, link previews, AI crawlers) get the
// real page. Users still get the SPA: the saved HTML boots the same bundle, and React re-renders over it.
//
// Copy into the app as scripts/prerender.mjs, then:  "build": "vite build && node scripts/prerender.mjs"
//
//   node scripts/prerender.mjs [--site https://example.com] [--style html|dir] [--not-found] [--strict] [/route ...]
//
// Routes, first found: arguments, seo/routes.txt (one path per line, # comments), dist/sitemap.xml.
// With --site and seo/routes.txt it also writes dist/sitemap.xml, so the sitemap can't drift from the routes.
// --style html writes dist/about.html (Cloudflare Pages serves it at /about with no redirect); dir writes
// dist/about/index.html (Vercel, Netlify). Check after deploy: `curl -sI https://site/about` must be 200, not 30x.
// Browser: puppeteer if the app has it installed, else the system Chrome (GitHub Actions runners have one).
// Without --strict a failure warns and leaves the plain SPA in place; the weekly seokit audit will notice.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const SITE = (opt("--site", process.env.SITE_URL) || "").replace(/\/$/, "");
const STYLE = opt("--style", "html");
const STRICT = args.includes("--strict");
// --not-found renders the router's catch-all page to dist/404.html, so unknown URLs get a real 404 status.
const NOT_FOUND = args.includes("--not-found") ? "/__no-such-page__" : null;
const DIST = "dist";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml" };

const fail = (msg) => {
  console.warn(`[prerender] ${msg}`);
  process.exit(STRICT ? 1 : 0);
};

async function routes() {
  const given = args.filter((a, i) => a.startsWith("/") && !["--site", "--style"].includes(args[i - 1]));
  if (given.length) return given;
  if (existsSync("seo/routes.txt")) {
    return (await readFile("seo/routes.txt", "utf8")).split("\n").map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
  }
  if (existsSync(join(DIST, "sitemap.xml"))) {
    const xml = await readFile(join(DIST, "sitemap.xml"), "utf8");
    return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  }
  return ["/"];
}

function serve(shell) {
  const server = createServer(async (req, res) => {
    const p = decodeURIComponent((req.url || "/").split("?")[0]);
    const file = join(DIST, p);
    if (p !== "/" && existsSync(file) && (await stat(file)).isFile()) {
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
      return res.end(await readFile(file));
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(shell); // the untouched shell for every route, as in production
  });
  return new Promise((r) => server.listen(0, "127.0.0.1", () => r(server)));
}

function chromePath() {
  return [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
    .find((p) => p && existsSync(p));
}

async function renderer() {
  try {
    const puppeteer = (await import("puppeteer")).default;
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
    return {
      async render(url) {
        const page = await browser.newPage();
        await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true; });
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        await page.waitForFunction(() => (document.querySelector("#root")?.childElementCount || 0) > 0, { timeout: 15000 }).catch(() => {});
        const html = await page.evaluate(() => document.documentElement.outerHTML);
        await page.close();
        return html;
      },
      close: () => browser.close(),
    };
  } catch {
    const chrome = chromePath();
    if (!chrome) return null;
    return {
      render: (url) => new Promise((resolve, reject) => {
        const p = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
          "--virtual-time-budget=10000", "--dump-dom", url]);
        let out = "";
        p.stdout.on("data", (d) => (out += d));
        p.on("close", (code) => (code === 0 ? resolve(out) : reject(new Error(`chrome exited ${code}`))));
      }),
      close: async () => {},
    };
  }
}

// Runtime-injected scripts (analytics, chat widgets) would load twice once the saved page boots: keep only the
// scripts the shell already had, plus JSON-LD.
function clean(html, shell) {
  const keep = new Set([...shell.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]));
  html = html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g, (tag, src) => (keep.has(src) ? tag : ""));
  return "<!doctype html>\n" + html.replace(/^<!doctype html>\s*/i, "");
}

function outPath(route) {
  if (route === "/") return join(DIST, "index.html");
  const clean = route.replace(/^\/|\/$/g, "");
  return STYLE === "dir" ? join(DIST, clean, "index.html") : join(DIST, `${clean}.html`);
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) fail("dist/index.html missing: run vite build first");
  // Rendering "/" overwrites index.html. Keep the bare shell for app-only routes, so they don't flash the home
  // page or inherit its canonical. On a second run index.html is already rendered: reuse the saved shell.
  const saved = join(DIST, "shell.html");
  const shell = await readFile(existsSync(saved) ? saved : join(DIST, "index.html"), "utf8");
  await writeFile(saved, shell);
  const list = [...(await routes()), ...(NOT_FOUND ? [NOT_FOUND] : [])];
  if (SITE && existsSync("seo/routes.txt")) {
    const urls = list.filter((r) => r !== NOT_FOUND).map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc></url>`).join("\n");
    await writeFile(join(DIST, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  }
  const r = await renderer();
  if (!r) fail("no browser: install puppeteer as a devDependency or set CHROME_PATH. The SPA ships unrendered.");
  const server = await serve(shell);
  const base = `http://127.0.0.1:${server.address().port}`;
  let ok = 0;
  for (const route of list) {
    try {
      const html = await r.render(base + route);
      const words = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
      if (words < 30) throw new Error(`only ${words} words rendered (error boundary, auth wait, or slow data?)`);
      const file = route === NOT_FOUND ? join(DIST, "404.html") : outPath(route);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, clean(html, shell).replaceAll(base, SITE || ""));
      ok++;
    } catch (e) {
      console.warn(`[prerender] ✗ ${route}: ${e.message}`);
    }
  }
  await r.close();
  server.close();
  console.log(`[prerender] ${ok}/${list.length} routes → ${DIST}/ (${STYLE} style)`);
  if (ok < list.length && STRICT) process.exit(1);
}

main().catch((e) => fail(`failed: ${e?.message || e}`));
