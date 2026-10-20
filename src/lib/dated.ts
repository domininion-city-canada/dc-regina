import { useEffect, useState } from 'react';

/**
 * Flyers and events carry `ends`: the last day they matter (YYYY-MM-DD), read
 * off the flyer when it is added. A series ends on its last session. `null`
 * marks something that never expires, such as the weekly service.
 *
 * Past items leave the site on their own, with no deploy: the browser checks
 * the date on every visit (and hourly while a page stays open). The
 * prerendered HTML is checked at build time, so it can only lag until the
 * next deploy, and the template audit (dc-skill audit-site.sh) fails while a
 * past item is still in the code, so its entry and image get deleted at the
 * next change.
 */
export type Dated = { ends: string | null };

/** True until `ends` is over everywhere in Canada (midnight, Pacific time). */
export function isCurrent({ ends }: Dated, now = Date.now()): boolean {
  return !ends || now <= Date.parse(`${ends}T23:59:59-08:00`);
}

/** The items still current, re-checked every hour while the page is open. */
export function useCurrent<T extends Dated>(items: readonly T[]): T[] {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return items.filter((item) => isCurrent(item, now));
}
