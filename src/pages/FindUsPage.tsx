import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import CirclesSection from '@/components/CirclesSection';
import TempleForm from '@/components/TempleForm';
import { ADDRESS, CONTACT, SERVICE_TIME, TEMPLE_FORMS } from '@/data/site';

const FindUsPage = () => {
  const [visitSent, setVisitSent] = useState(false);

  return (
  <Page>
    <SEO
      title="Plan a Visit"
      description={`Sunday worship at ${SERVICE_TIME}, ${ADDRESS.street}, Regina, SK. Directions, plus Believers' Circle locations in Regina and Moose Jaw.`}
    />
    <PageIntro eyebrow="Visit" title="Find" accent="us">
      Sunday Worship Service, every Sunday at {SERVICE_TIME}, {ADDRESS.line1}, {ADDRESS.line2}.
    </PageIntro>
    <GoogleMapEmbed />
    <CirclesSection id="circles" />

    {/* "Plan a Visit" lands here: the visitor tells us they're coming. */}
    <section id="plan-a-visit" className="section-padding scroll-mt-24">
      <div className="container mx-auto max-w-2xl">
        {visitSent ? (
          <div className="nb-card text-center">
            <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-accent-blue" />
            <h2 className="headline mb-4 text-3xl">We'll see you soon.</h2>
            <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/60">
              Someone will be looking out for you on Sunday. If anything changes, or you have a question before
              then, email{' '}
              <a className="text-accent-blue hover:underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <span className="eyebrow eyebrow-coral mb-6 inline-flex">Plan a visit</span>
              <h2 className="headline mb-4 text-3xl md:text-4xl">Coming on Sunday?</h2>
              <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/60">
                So someone can look out for you on the day. Come as you are; there is nothing you need to bring.
              </p>
            </div>
            <div className="nb-card">
              <TempleForm url={TEMPLE_FORMS.planVisit} title="Plan a visit" onSubmitted={() => setVisitSent(true)} />
            </div>
          </>
        )}
      </div>
    </section>
  </Page>
  );
};

export default FindUsPage;
