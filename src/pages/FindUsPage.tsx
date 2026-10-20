import React from 'react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import CirclesSection from '@/components/CirclesSection';
import { ADDRESS, SERVICE_TIME } from '@/data/site';

const FindUsPage = () => (
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
  </Page>
);

export default FindUsPage;
