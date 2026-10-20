import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ADDRESS, CONTACT, SERVICE_TIME, SITE, telHref } from '@/data/site';

/**
 * Where to find the church: the details beside the map, in one bordered
 * grid, the same editorial treatment as every other section. This replaced a
 * floating rounded card with a purple button (plus a second copy of it for
 * phones) left over from before the template.
 */
const GoogleMapEmbed: React.FC = () => (
  <section id="visit-section" className="section-padding bg-background border-t border-foreground/10">
    <div className="container mx-auto">
      <div className="mb-12 md:mb-16 grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <span className="eyebrow eyebrow-coral mb-6 block">Visit Us</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Find <span className="serif-italic text-accent-blue">us</span>.
          </h2>
        </div>
        <p className="lg:col-span-4 text-base text-foreground/60 font-normal leading-relaxed">
          On Broad Street in Regina. Come for worship, the Word and fellowship.
        </p>
      </div>

      {/* Hairline grid: the 1px gap shows the border colour between the panes. */}
      <div className="grid lg:grid-cols-12 gap-px bg-foreground/10 border border-foreground/10">
        <div className="lg:col-span-4 bg-background p-7 md:p-10 flex flex-col">
          <span className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
            Sunday Service
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{SITE.name}</h3>
          <p className="text-xs uppercase tracking-[0.1em] text-accent-blue mb-6">Sundays · {SERVICE_TIME}</p>
          <p className="text-sm md:text-base font-normal leading-relaxed text-foreground/60 mb-10">
            {ADDRESS.line1}
            <br />
            {ADDRESS.line2}
          </p>
          <div className="mt-auto flex flex-col items-start gap-7">
            <a
              href={ADDRESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nb-primary w-full sm:w-auto"
            >
              Get directions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href={telHref(CONTACT.phones[0])} className="btn-nb-link">
              Call the church
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 bg-background hover-saturate h-[320px] sm:h-[400px] lg:h-[520px]">
          <iframe
            src={ADDRESS.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${SITE.name} location map`}
            className="block w-full h-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default GoogleMapEmbed;
