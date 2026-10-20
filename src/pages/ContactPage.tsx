import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import { CONTACT, SOCIALS, telHref } from '@/data/site';

const ContactPage = () => {
  const instagram = SOCIALS.find((s) => s.name === 'Instagram');

  return (
    <Page>
      <SEO title="Contact" description="Call or text Dominion City Regina, email the church, or find us on Instagram." />
      <PageIntro eyebrow="Reach out" title="Contact" accent="us" />
      <section className="section-padding">
        <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {CONTACT.phones.map((phone) => (
            <a key={phone} href={telHref(phone)} className="group bg-background p-7 md:p-8 transition-colors hover:bg-foreground/[0.03]">
              <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">Call or text</span>
              <span className="block text-xl md:text-2xl font-bold tracking-tight group-hover:text-accent-blue transition-colors">{phone}</span>
            </a>
          ))}
          <a href={`mailto:${CONTACT.email}`} className="group bg-background p-7 md:p-8 transition-colors hover:bg-foreground/[0.03]">
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">Email</span>
            <span className="block text-base md:text-lg font-normal break-all group-hover:text-accent-blue transition-colors">{CONTACT.email}</span>
          </a>
          {instagram && (
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="group bg-background p-7 md:p-8 transition-colors hover:bg-foreground/[0.03]">
              <span className="mb-5 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                Instagram <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="block text-xl md:text-2xl font-bold tracking-tight group-hover:text-accent-blue transition-colors">@dominioncityregina</span>
            </a>
          )}
        </div>
      </section>
    </Page>
  );
};

export default ContactPage;
