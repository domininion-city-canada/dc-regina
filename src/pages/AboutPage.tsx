import React from 'react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import RevealOnScroll from '@/components/RevealOnScroll';

const VALUES = [
  {
    title: 'Our value',
    text: 'We help each other grow spiritually, build a relationship with God, and develop as people, raising leaders and model Christians who positively impact their environment.',
  },
  {
    title: 'Leadership',
    text: 'We believe in leadership and transformation. We raise and develop sons and daughters in Christ who will transform society across every sphere of life.',
  },
  {
    title: 'Our belief',
    text: 'Our beliefs are shaped by biblical truth and our decisions are guided by Scripture.',
  },
];

const AboutPage = () => (
  <Page>
    <SEO
      title="About"
      description="Who we are: Dominion City Regina helps people grow in faith and raises leaders who transform society, at 2144B Broad Street, Regina."
    />
    <PageIntro eyebrow="Who we are" title="About" accent="Dominion City Regina" />
    <section className="section-padding">
      <div className="container mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <RevealOnScroll className="lg:col-span-6">
          <img
            src="/media/dominion-city-regina-banner.jpg"
            alt="Dominion City Regina at 2144B Broad Street"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="w-full bg-foreground/5"
          />
        </RevealOnScroll>
        <div className="lg:col-span-6 border-t border-foreground/10">
          {VALUES.map((v, i) => (
            <div key={v.title} className="border-b border-foreground/10 py-8">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65 tabular-nums">
                0{i + 1}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{v.title}</h2>
              <p className="text-base font-normal leading-relaxed text-foreground/60">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Page>
);

export default AboutPage;
