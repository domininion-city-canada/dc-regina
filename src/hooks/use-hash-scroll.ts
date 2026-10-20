import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the element named by the URL hash, once that element exists.
 *
 * Two cases cannot scroll immediately and both were silently broken:
 *
 *   - A hash link followed from another route. The router changes the
 *     location before the home page has rendered, so at click time there is
 *     nothing to scroll to. The nav used to guess at this with a 100ms
 *     timeout, which was short enough that every cross-page hash link — and
 *     the footer now has twelve — landed at the top of the home page instead.
 *   - A cold load of a shared link. The browser looks for the fragment while
 *     the document is still an empty #root, finds nothing, and never tries
 *     again.
 *
 * Waiting for the element to appear handles both, and cannot be wrong the way
 * a fixed delay can: it gives up after two seconds rather than scrolling
 * somewhere unexpected long after the visitor has started reading.
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    const deadline = performance.now() + 2000;
    let timer = 0;

    // Someone who asked for less motion gets the jump, not the glide.
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: 'start' });
        return;
      }
      if (performance.now() < deadline) timer = window.setTimeout(attempt, 50);
    };

    /*
      A timer, not requestAnimationFrame: rAF does not fire while the document
      is not being painted — a background tab, or a link opened into one — so
      an rAF-driven retry would simply never run, and the visitor would switch
      to the tab and find themselves at the top of the page.
    */
    attempt();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
}
