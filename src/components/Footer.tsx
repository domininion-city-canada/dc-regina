import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';
import { ADDRESS, CONTACT, FOOTER_EXPLORE, NAV_CTA, SERVICE_TIME, SITE, SOCIALS, VERSE, telHref } from '@/data/site';

/** The icon for each social name in SITE's list; the links live in site.ts. */
const socialIcons: Record<string, React.ElementType> = {
  Instagram,
  YouTube: Youtube,
  Facebook,
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-foreground/10 pt-20 md:pt-24 pb-10 safe-bottom">
      <div className="container mx-auto">
        {/* Big call-out */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-24">
          <div className="lg:col-span-8">
            <span className="eyebrow mb-8 block">Join Us</span>
            <h3 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              We'd love to <span className="serif-italic text-accent-blue">meet you</span> this Sunday.
            </h3>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
            <Link to={NAV_CTA.href} className="btn-nb-primary w-full justify-center sm:w-auto">
              {NAV_CTA.name}
            </Link>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pb-12 md:pb-16 border-t border-foreground/10 pt-12 md:pt-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-7 w-auto" />
              <span className="text-xs tracking-[0.14em] uppercase text-foreground/70">{SITE.locality}</span>
            </div>
            <p className="text-sm text-foreground/70 font-normal leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/65 mb-4">Visit</p>
            <a href={ADDRESS.directionsUrl} target="_blank" rel="noopener noreferrer" className="block py-1 text-sm text-foreground/70 hover:text-foreground transition-colors font-normal leading-relaxed">
              {ADDRESS.line1}<br />{ADDRESS.line2}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/65 mb-4">Contact</p>
            {CONTACT.phones.map((phone) => (
              <a key={phone} href={telHref(phone)} className="flex min-h-[44px] items-center text-sm text-foreground/70 hover:text-foreground transition-colors font-normal">
                {phone}
              </a>
            ))}
            <a href={`mailto:${CONTACT.email}`} className="flex min-h-[44px] items-center break-all text-sm text-foreground/70 hover:text-foreground transition-colors font-normal">
              {CONTACT.email}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/65 mb-4">Sunday</p>
            <p className="text-sm text-foreground/70 font-normal">{SERVICE_TIME}</p>
            <p className="text-sm text-foreground/65 font-normal mt-1">In person, every week</p>
          </div>
        </div>

        {/* Explore is derived from the nav in site.ts, so a page added to the
            bar appears here automatically. The sites list no other churches
            (Samuel, 2026-10-20). */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pb-12 md:pb-16 border-t border-foreground/10 pt-12 md:pt-16">
          <div className="col-span-2 md:col-span-4">
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/65 mb-4">Explore</p>
            <ul className="grid grid-cols-2 sm:grid-cols-5 gap-x-6">
              {FOOTER_EXPLORE.map((item) => (
                <li key={item.name}>
                  {item.internal ? (
                    <Link
                      to={item.href}
                      className="flex min-h-[44px] items-center text-sm font-normal text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex min-h-[44px] items-center text-sm font-normal text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* A verse, quietly, linked to it on scriptural.online. */}
        <p className="max-w-2xl pb-8 text-sm font-normal leading-relaxed text-foreground/60">
          “{VERSE.text}”{' '}
          <a
            href={VERSE.href}
            target="_blank"
            rel="noopener"
            className="whitespace-nowrap underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground"
          >
            {VERSE.reference}
          </a>
        </p>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-foreground/10">
          <div className="-ml-3 flex flex-wrap">
            {SOCIALS.map((social) => {
              const Icon = socialIcons[social.name];
              /*
                site.ts is the file the README sends people to when a link
                changes, and it does not know about this map. Adding a social
                there without adding an icon here made `Icon` undefined, which
                React renders as "Element type is invalid" — taking the whole
                page down to the ErrorBoundary over a missing footer glyph.
              */
              if (!Icon) return null;
              return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                aria-label={social.name}
                className="flex h-11 w-11 items-center justify-center text-foreground/65 hover:text-foreground transition-colors"
              >
                <Icon size={18} />
              </a>
              );
            })}
          </div>
          <p className="text-xs uppercase tracking-[0.1em] text-foreground/45">
            © {currentYear} {SITE.name}
          </p>
          <p className="text-xs tracking-[0.1em] text-foreground/60">
            Made by{' '}
            <a
              href="https://syntaxready.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              SyntaxReady
            </a>
          </p>
          <p className="text-xs tracking-[0.1em] text-foreground/45">
            Hero photo: Wascana Lake by Haydn Blackey,{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Wascana_Lake_-_Regina_(29125839967).jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              CC BY-SA 2.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
