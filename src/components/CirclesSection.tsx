import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CIRCLES } from '@/data/site';

/** Believers' Circle: Friday small groups, as hairline-grid cards. */
const CirclesSection: React.FC<{ id?: string; heading?: boolean }> = ({ id = 'circles-section', heading = true }) => (
  <section id={id} className="section-padding bg-background border-t border-foreground/10">
    <div className="container mx-auto">
      {heading && (
        <div className="mb-16 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow eyebrow-indigo mb-6 block">Believers' Circle</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Fellowship <span className="serif-italic text-accent-blue">near you</span>.
            </h2>
          </div>
          <p className="lg:col-span-4 text-base text-foreground/60 font-normal leading-relaxed">
            Small groups meet every Friday at 6:30 PM in East Regina, West Regina and Moose Jaw.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
        {CIRCLES.map((c) => (
          <article key={c.area} className="flex flex-col bg-background p-7 md:p-8">
            <span className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">{c.when}</span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.area}</h3>
            <p className="text-sm font-normal leading-relaxed text-foreground/60 mb-8">{c.address}</p>
            <div className="mt-auto">
              <a href={c.maps} target="_blank" rel="noopener noreferrer" className="btn-nb-link">
                Directions
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CirclesSection;
