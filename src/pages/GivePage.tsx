import React from 'react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import GiveSection from '@/components/GiveSection';

const GivePage = () => (
  <Page>
    <SEO
      title="Give"
      description="Give to Dominion City Regina by Interac e-Transfer: offerings, tithes and partnership."
    />
    <PageIntro eyebrow="Give cheerfully" title="Offerings &" accent="contributions" />
    <GiveSection id="give" />
  </Page>
);

export default GivePage;
