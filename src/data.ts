export const church = {
  name: "Dominion City Regina",
  tagline: "Raising leaders that transform society.",
  address: "2144B Broad Street, Regina, SK",
  addressFull: "2144B Broad Street, Regina, Saskatchewan, Canada",
  phones: ["+1 (639) 997-1522", "+1 (639) 525-4711"],
  handle: "@dominioncityregina",
  instagram: "https://www.instagram.com/dominioncityregina",
  interac: "dcregina@dominioncitycanada.org",
  mapsLink: "https://maps.app.goo.gl/ooak9WK3rL9PQfus8",
  mapsEmbed: "https://www.google.com/maps?q=Dominion+City+Regina,+2144B+Broad+St,+Regina,+SK+S4P+1Y5&output=embed",
};

export const circles = [
  { area: "East Regina", address: "105-2175 Heseltine Rd, Regina" },
  { area: "West Regina", address: "7-8950 Canola Avenue, Regina" },
  { area: "Moose Jaw", address: "1242 Vaughan St, Moose Jaw" },
].map((c) => ({ ...c, when: "Every Friday · 6:30 PM", maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}` }));

export const programs = [
  { title: "Sunday Service", when: "Every Sunday · 10:00 AM", text: "A weekly gathering for prayer, worship, biblical teaching, and spiritual growth." },
  { title: "Believers' Circle", when: "Every Friday · 6:30 PM", text: "Small-group fellowship across East Regina, West Regina, and Moose Jaw." },
  { title: "Foundation School", when: "Saturdays in October · Online · 6:45–9:00 AM", text: "Know your faith, know your church, discover your place." },
];

export const events = [
  { title: "Divine Acceleration", sub: "with Pastor Kenneth Emeana · Prayer, Word, Worship", when: "Sunday, October 25, 2026 · 10:00 AM", where: "2144B Broad Street, Regina", img: "/images/divine-acceleration.jpg" },
  { title: "Dominion City Academy: Basic", sub: "Saturdays, Oct 3 – Nov 7, 2026 · 8–10 AM", when: "Saturdays · Oct 3 – Nov 7, 2026", where: "Dominion City Regina", img: "/images/dca-basic.jpg" },
];
