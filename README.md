# Dominion City Regina

dominioncityregina.com, built on the Dominion City (Brampton) template shared
by every Dominion City Canada site. The `dc-skill` brand repo holds the house
style and the starting point for anything new.

- Facts, nav and copy: `src/data/site.ts` (also repeated in `index.html` JSON-LD and `public/llms.txt`).
- Hosting: Cloudflare Pages project `dc-regina`, building `main` with `npm run build`
  (Vite, then `scripts/prerender.mjs` saves every route in `seo/routes.txt` as HTML,
  writes `dist/sitemap.xml` and a real `dist/404.html`).
- Hero photo: Wascana Lake by Haydn Blackey, CC BY-SA 2.0 (credited in the footer).
