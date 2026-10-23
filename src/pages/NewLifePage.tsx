import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Page from './Page';
import PageIntro from '@/components/PageIntro';
import SEO from '@/components/SEO';
import TempleForm from '@/components/TempleForm';
import { CONTACT, TEMPLE_FORMS, telHref } from '@/data/site';

const points = [
  {
    title: "You are God's masterpiece, not an accident",
    body: [
      'The journey begins with your origin. Forget the limits the world has tried to place on you: you are a deliberate masterpiece of a loving Creator.',
      "When God made man, He didn't just create another creature; He created a creator in His own image and likeness. You were designed to rule, innovate and thrive. Any sense of failure or inferiority is a distraction from that truth.",
    ],
  },
  {
    title: 'The great distortion',
    body: [
      'If you were created so perfectly, why is the world so full of pain, sickness, addiction and disappointment?',
      "God is not the source of the world's problems. He gave humanity free will, the power to choose love. When the enemy brought deception and man chose rebellion, the original design was distorted. The broken systems and personal struggles we see are the consequences of that distortion, not God's will.",
    ],
  },
  {
    title: "Christ's complete cure",
    body: [
      'The Creator who saw His masterpiece broken was moved by relentless love, and that love led to the cross.',
      "Jesus Christ stepped in as your substitute. He died on the cross to solve the problem of sin and restore your relationship with God. He didn't patch you up; He restored you completely. This finished work is the power of God unto salvation (Romans 1:16).",
    ],
  },
  {
    title: 'Restoration, mission and power',
    body: [
      'When you receive what Christ offers by faith, you are not just saved; you are restored to your original mandate, a son or daughter of God equipped for a higher purpose.',
      "This is the Kingdom Gospel. Christ's mission becomes yours: to use your platform, whether you are a nurse, a student, in business or an artist, to bring God's kingdom into your sphere of influence.",
    ],
  },
];

const NewLifePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const phone = CONTACT.phones[0];

  return (
    <Page>
      <SEO
        title="New Life"
        description="The message that changes everything: find your true identity, purpose and power in Christ."
      />
      <PageIntro eyebrow="The message that works" title="The message that" accent="changes everything">
        Have you ever felt you were meant for more? There is one message that cuts through the noise and moves you
        from feeling lost or powerless into the purpose you were made for.
      </PageIntro>

      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <ol className="border-t border-foreground/10">
            {points.map(({ title, body }, i) => (
              <li key={title} className="grid gap-4 border-b border-foreground/10 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <span className="text-xs uppercase tracking-[0.14em] text-foreground/65 md:col-span-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="md:col-span-10">
                  <h2 className="mb-5 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
                  <div className="space-y-4 text-lg font-normal leading-relaxed text-foreground/70">
                    {body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The page argues for a decision, so it has to offer somewhere to make one. */}
      <section id="respond" className="section-padding scroll-mt-24 border-t border-foreground/10">
        <div className="container mx-auto max-w-2xl">
          {submitted ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-accent-blue" />
              <h2 className="headline mb-4 text-3xl md:text-4xl">Welcome to the family.</h2>
              <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/70">
                This is the best decision you will ever make, and you are not going to walk it alone. Someone from
                our team will call you soon to pray with you. If you would rather reach us first, we're on{' '}
                <a className="text-accent-blue hover:underline" href={telHref(phone)}>
                  {phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <span className="eyebrow mb-6 inline-flex">Say yes</span>
                <h2 className="headline mb-4 text-3xl md:text-4xl">Did you just give your life to Christ?</h2>
                <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/60">
                  Tell us, and someone will call to pray with you and help you take it from here.
                </p>
              </div>
              <TempleForm
                url={TEMPLE_FORMS.newLife}
                title="I gave my life to Christ"
                onSubmitted={() => setSubmitted(true)}
              />
            </>
          )}
        </div>
      </section>

      <section className="section-padding border-t border-foreground/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="headline mb-6 text-3xl md:text-5xl">Take the next step today</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-normal leading-relaxed text-foreground/60">
            The power of this message is found in community and discipleship. We want to welcome you home and walk
            with you from redemption to restoration and mission.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/next-steps" className="btn-nb-primary">
              Take a next step <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/find-us#plan-a-visit" className="btn-nb-outline">
              Plan your visit
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default NewLifePage;
