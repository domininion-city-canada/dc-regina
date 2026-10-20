import React from 'react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import EventsSection from '@/components/EventsSection';
import CirclesSection from '@/components/CirclesSection';
import { PROGRAMS } from '@/data/site';

const EventsPage = () => (
  <Page>
    <SEO
      title="Events & Programs"
      description="Upcoming events at Dominion City Regina, plus Sunday Service, Believers' Circle on Fridays and Foundation School."
    />
    <PageIntro eyebrow="Gatherings" title="Events &" accent="programs" />
    <EventsSection heading={false} />

    <section className="section-padding border-t border-foreground/10">
      <div className="container mx-auto">
        <span className="eyebrow eyebrow-blue mb-6 block">Every week</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-12">
          Ongoing <span className="serif-italic text-accent-blue">programs</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {PROGRAMS.map((p) => (
            <article key={p.title} className="bg-background p-7 md:p-8">
              <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.14em] text-accent-blue">{p.when}</span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{p.title}</h3>
              <p className="text-sm font-normal leading-relaxed text-foreground/60">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CirclesSection id="circles" />
  </Page>
);

export default EventsPage;
