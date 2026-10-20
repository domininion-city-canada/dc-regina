/**
 * Single source of truth for everything Dominion City Regina "is".
 *
 * Import from here instead of retyping a time, an address or a phone number.
 * The JSON-LD in index.html and public/llms.txt repeat the address and
 * service time for crawlers, so update them alongside.
 *
 * Same shape as src/data/site.ts on the other Dominion City sites (the
 * Brampton template), so the shared Header, Footer and map read the same
 * fields everywhere.
 */

import type { Dated } from '@/lib/dated';

export const SITE = {
  name: 'Dominion City Regina',
  shortName: 'Dominion City',
  locality: 'Regina',
  region: 'SK',
  regionLong: 'Saskatchewan',
  country: 'CA',
  url: 'https://dominioncityregina.com',
  tagline: 'Raising leaders that transform society.',
  /** Saskatchewan keeps Central Standard Time all year: no clock changes. */
  timezone: 'America/Regina',
  timezoneLabel: 'CST',
} as const;

export const CONTACT = {
  phones: ['+1 (639) 997-1522', '+1 (639) 525-4711'],
  email: 'dcregina@dominioncitycanada.org',
} as const;

/** "+1 (639) 997-1522" → "tel:+16399971522" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

export const ADDRESS = {
  street: '2144B Broad Street',
  streetShort: '2144B Broad St',
  locality: 'Regina',
  region: 'SK',
  postalCode: 'S4P 1Y5',
  /** "2144B Broad Street" */
  get line1() {
    return this.street;
  },
  /** "Regina, SK S4P 1Y5" */
  get line2() {
    return `${this.locality}, ${this.region} ${this.postalCode}`;
  },
  directionsUrl: 'https://maps.app.goo.gl/ooak9WK3rL9PQfus8',
  embedUrl:
    'https://www.google.com/maps?q=Dominion+City+Regina,+2144B+Broad+St,+Regina,+SK+S4P+1Y5&output=embed',
} as const;

/** "10:00 AM CST" */
export const SERVICE_TIME = `10:00 AM ${SITE.timezoneLabel}`;

/** Interac e-Transfer, the church's giving channel. */
export const GIVING = {
  interacEmail: 'dcregina@dominioncitycanada.org',
  steps: [
    'Open your online or mobile banking app.',
    'Choose Interac e-Transfer and send to the email above.',
    'Enter your amount and add a note: Tithe, Offering or Partnership.',
    'Send.',
  ],
  verse: {
    text: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
    ref: '2 Corinthians 9:7',
  },
} as const;

export type Program = Dated & { title: string; when: string; text: string };

export const PROGRAMS: Program[] = [
  {
    title: 'Sunday Service',
    when: 'Every Sunday · 10:00 AM',
    ends: null,
    text: 'A weekly gathering for prayer, worship, biblical teaching, and spiritual growth.',
  },
  {
    title: "Believers' Circle",
    when: 'Every Friday · 6:30 PM',
    ends: null,
    text: 'Small-group fellowship across East Regina, West Regina, and Moose Jaw.',
  },
  {
    title: 'Foundation School',
    when: 'Saturdays in October · Online · 6:45–9:00 AM',
    ends: '2026-10-31',
    text: 'Know your faith, know your church, discover your place.',
  },
];

export type Circle = { area: string; address: string; when: string; maps: string };

export const CIRCLES: Circle[] = [
  { area: 'East Regina', address: '105-2175 Heseltine Rd, Regina' },
  { area: 'West Regina', address: '7-8950 Canola Avenue, Regina' },
  { area: 'Moose Jaw', address: '1242 Vaughan St, Moose Jaw' },
].map((c) => ({
  ...c,
  when: 'Every Friday · 6:30 PM',
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`,
}));

/** See src/lib/dated.ts: `ends` is the event's last day, read off its flyer. */
export type ChurchEvent = Dated & { title: string; sub: string; when: string; where: string; img: string };

export const EVENTS: ChurchEvent[] = [
  {
    title: 'Divine Acceleration',
    sub: 'with Pastor Kenneth Emeana · Prayer, Word, Worship',
    when: 'Sunday, October 25, 2026 · 10:00 AM',
    ends: '2026-10-25',
    where: '2144B Broad Street, Regina',
    img: '/media/divine-acceleration.jpg',
  },
  {
    title: 'Dominion City Academy: Basic',
    sub: 'Saturdays, Oct 3 – Nov 7, 2026 · 8–10 AM',
    when: 'Saturdays · Oct 3 – Nov 7, 2026',
    ends: '2026-11-07',
    where: 'Dominion City Regina',
    img: '/media/dca-basic.jpg',
  },
];

export type Social = { name: string; href: string };

export const SOCIALS: Social[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/dominioncityregina' },
];

/**
 * Primary navigation. The same structure feeds the desktop bar, the mobile
 * panel and the footer, so the three can never drift apart.
 */
export type NavItem = {
  name: string;
  href: string;
  internal: boolean;
  external?: boolean;
  /** One line of orientation, shown under the item in the desktop menu. */
  blurb?: string;
};

export type NavGroup = {
  name: string;
  items: NavItem[];
};

/** Regina has five pages, so the bar lists them directly. */
export const NAV_GROUPS: NavGroup[] = [];

export const NAV_SINGLES: NavItem[] = [
  { name: 'About', href: '/about', internal: true },
  { name: 'Events', href: '/events', internal: true },
  { name: 'Give', href: '/give', internal: true },
  { name: 'Contact', href: '/contact', internal: true },
];

/** The bar's one call to action. */
export const NAV_CTA: NavItem = { name: 'Plan a Visit', href: '/find-us', internal: true };

export const FOOTER_EXPLORE: NavItem[] = [...NAV_SINGLES, NAV_CTA];
