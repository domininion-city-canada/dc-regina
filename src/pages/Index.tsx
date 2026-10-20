import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import CirclesSection from '@/components/CirclesSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import GiveSection from '@/components/GiveSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServiceEvents from '@/components/ServiceEvents';
import { ADDRESS, SERVICE_TIME, SITE } from '@/data/site';

const Index = () => (
  <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
    <SEO
      title="A Church in Regina, Saskatchewan"
      description={`${SITE.name}: Sunday worship at ${SERVICE_TIME}, ${ADDRESS.street}, Regina, SK. Believers' Circle on Fridays in East Regina, West Regina and Moose Jaw.`}
    />
    <ServiceEvents />
    <Header />
    <main className="flex-grow" id="home">
      <Hero />
      <AboutSection />
      <EventsSection />
      <CirclesSection />
      <GoogleMapEmbed />
      <GiveSection />
    </main>
    <Footer />
  </div>
);

export default Index;
