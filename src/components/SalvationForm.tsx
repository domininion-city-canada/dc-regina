import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TempleForm from '@/components/TempleForm';
import { CONTACT, TEMPLE_FORMS } from '@/data/site';

/**
 * The response point on the New Life page: the church's Temple form, which
 * asks for as little as possible, a name and a number. Temple stores it and
 * emails the church inbox; once it's sent, the card welcomes them.
 */
const SalvationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="card-brutal bg-card text-center">
        <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-accent-blue" />
        <h3 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome to the family.
        </h3>
        <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/70">
          This is the best decision you will ever make, and you are not going to walk it alone.
          Someone from our team will call you soon to pray with you. If you would rather reach us
          first, email{' '}
          <a className="text-accent-blue hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="card-brutal bg-card">
      <div className="mb-8 text-center">
        <span className="sticker-badge sticker-badge-coral mb-6 inline-flex">Say yes</span>
        <h3 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Did you just give your life to Christ?
        </h3>
        <p className="mx-auto max-w-md text-sm font-normal leading-relaxed text-foreground/60">
          Tell us, and someone will call to pray with you and help you take it from here.
        </p>
      </div>

      <TempleForm url={TEMPLE_FORMS.newLife} title="I gave my life to Christ" onSubmitted={() => setSubmitted(true)} />
    </div>
  );
};

export default SalvationForm;
