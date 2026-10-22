import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Users, HandHeart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import RevealOnScroll from '@/components/RevealOnScroll';
import TempleForm from '@/components/TempleForm';
import { CONTACT, SITE, TEMPLE_FORMS } from '@/data/site';

const cards = [
  {
    icon: Heart,
    accent: 'text-accent-coral',
    title: 'You made a decision',
    body: "You don't have to work out what comes next on your own. Someone will pray with you and answer whatever you want to ask.",
  },
  {
    icon: Users,
    accent: 'text-accent-blue',
    title: 'You want people around you',
    body: "Believers' Circles meet on Fridays in Regina and Moose Jaw. It is the difference between attending a church and belonging to one.",
  },
  {
    icon: HandHeart,
    accent: 'text-accent-indigo',
    title: 'You want to serve',
    body: 'Welcome, worship, kids, media, prayer. There is a place for what you carry, and people glad to train you.',
  },
];

const NextStepsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () =>
    document.getElementById('next-steps-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <SEO
        title="Next Steps"
        description={`Took a step of faith at ${SITE.name}? Tell us where you are and someone from our team will reach out.`}
      />
      <Header />

      <main className="flex-grow pt-24">
        <section className="section-padding">
          <div className="container mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-8 inline-flex">After the service</span>
            <h1 className="headline mb-8 text-4xl md:text-6xl">
              What God started in you was{' '}
              <span className="serif-italic text-accent-blue">not meant to end</span> when the
              gathering did.
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg font-normal leading-relaxed text-foreground/60">
              Tell us where you are. Someone from our team will reach out — the way you ask, and
              without any fuss.
            </p>
            <button onClick={scrollToForm} className="btn-nb-primary">
              Choose my next step <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="section-padding bg-secondary">
          <div className="container mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {cards.map(({ icon: Icon, accent, title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 70}>
                <div className="nb-card nb-card-hover h-full">
                  <Icon className={`mb-5 h-6 w-6 ${accent}`} />
                  <h2 className="mb-3 text-xl font-bold tracking-tight">{title}</h2>
                  <p className="text-sm font-normal leading-relaxed text-foreground/60">{body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section id="next-steps-form" className="section-padding scroll-mt-24">
          <div className="container mx-auto max-w-2xl">
            {submitted ? (
              <div className="nb-card text-center">
                <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-accent-blue" />
                <h2 className="headline mb-4 text-3xl">Thank you.</h2>
                <p className="mx-auto mb-10 max-w-md text-base font-normal leading-relaxed text-foreground/60">
                  We have your details, and someone will be in touch the way you asked. If you would
                  rather not wait, email{' '}
                  <a className="text-accent-blue hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
                  .
                </p>
                <Link to="/" className="btn-nb-outline">
                  Back to the home page
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <span className="eyebrow eyebrow-coral mb-6 inline-flex">Tell us</span>
                  <h2 className="headline text-3xl md:text-4xl">Where are you?</h2>
                </div>

                <div className="nb-card">
                  <TempleForm
                    url={TEMPLE_FORMS.nextSteps}
                    title="Next steps"
                    onSubmitted={() => {
                      setSubmitted(true);
                      document.getElementById('next-steps-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NextStepsPage;
