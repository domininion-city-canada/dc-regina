/*
  Two jobs that both have to happen before the first paint, and neither of
  which React can do — it does not run until the bundle has downloaded and
  mounted, which is several hundred milliseconds too late for both.

  Kept as a real file rather than an inline <script> so `script-src 'self'`
  keeps working; see the note at the top of _headers.
*/
(function () {
  var doc = document;

  /*
    1. The theme class on <html>.

    React can only set this in an effect, which runs after the browser has
    already painted. Both the :root palette in index.css and the critical CSS
    in index.html are the dark one, so every visitor who had chosen light saw
    a full-page dark flash on every single load.

    The key must match STORAGE_KEY in src/contexts/ThemeContext.tsx.
  */
  var theme = 'dark';
  try {
    if (localStorage.getItem('dc-regina-theme') === 'light') theme = 'light';
  } catch (e) {
    // Storage can be blocked outright (private mode, blocked site data).
    // Fall through to the default rather than taking the page down.
  }
  // Prerendered pages are saved with the class the headless browser had,
  // so clear it before applying this visitor's choice.
  doc.documentElement.classList.remove('dark', 'light');
  doc.documentElement.classList.add(theme);

  /*
    2. The hero preload, on the home page only.

    index.html is the shell for all nine routes, so a static
    <link rel="preload" href="/media/main-hero.png" fetchpriority="high">
    downloaded 1.4 MB at the highest priority on /live, /giving, /kids and
    every other route — where that image is never rendered. On a phone on
    mobile data that is 1.4 MB of someone's data plan, ahead of the JavaScript
    the page actually needs, for nothing. Chrome says so out loud: "preloaded
    using link preload but not used within a few seconds from the window's
    load event".

    It still belongs on "/", where it is the LCP element: waiting for React to
    render the <img> would push discovery behind the whole bundle.
  */
  // Not while scripts/prerender.mjs saves the page: the link would be baked
  // into dist/index.html and every visitor would get it twice.
  if ((location.pathname === '/' || location.pathname === '/index.html') && window.__PRERENDER__ !== true) {
    var link = doc.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/media/wascana-lake.jpg';
    link.setAttribute('fetchpriority', 'high');
    doc.head.appendChild(link);
  }
})();
