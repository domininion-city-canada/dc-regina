import React from 'react';
import { SITE } from '@/data/site';

/**
 * Event JSON-LD for the next six Sunday services, rendered into the page so
 * the prerendered HTML carries it. Saskatchewan keeps UTC-6 all year (no
 * daylight time), so the offset is fixed. The prerendered dates are those of
 * the last build; after JavaScript runs they are always current.
 */
const WEEKS = 6;
const START = { hour: 10, minute: 0 };
const OFFSET = '-06:00';

function nextSundays(now: Date, count: number): string[] {
  // Wall-clock "now" in Saskatchewan (UTC-6, no DST).
  const local = new Date(now.getTime() - 6 * 3_600_000);
  const day = local.getUTCDay();
  const startedToday =
    day === 0 && local.getUTCHours() * 60 + local.getUTCMinutes() >= START.hour * 60 + START.minute;
  let ahead = (7 - day) % 7;
  if (startedToday) ahead = 7;
  const pad = (n: number) => String(n).padStart(2, '0');
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() + ahead + 7 * i));
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(START.hour)}:${pad(START.minute)}:00${OFFSET}`;
  });
}

const ServiceEvents: React.FC = () => {
  const graph = nextSundays(new Date(), WEEKS).map((startDate) => ({
    '@type': 'Event',
    name: `Sunday Service at ${SITE.name}`,
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    image: `${SITE.url}/og-image.jpg`,
    url: `${SITE.url}/`,
    location: {
      '@type': 'Place',
      name: SITE.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2144B Broad Street',
        addressLocality: 'Regina',
        addressRegion: 'SK',
        postalCode: 'S4P 1Y5',
        addressCountry: 'CA',
      },
    },
    organizer: { '@id': `${SITE.url}/#org` },
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
};

export default ServiceEvents;
