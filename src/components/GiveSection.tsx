import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { GIVING } from '@/data/site';

/** Interac e-Transfer details on the cream surface, with a copy button. */
const GiveSection: React.FC<{ id?: string }> = ({ id = 'give-section' }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(GIVING.interacEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (older Safari, insecure context): the address is
      // on screen to select by hand.
    }
  };

  return (
    <section id={id} className="bg-[hsl(40_20%_97%)] text-[hsl(222_47%_11%)] py-24 md:py-40">
      <div className="container mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-5">
          <div className="mb-10">
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[hsl(222_47%_11%/0.5)]">
              <span className="w-8 h-px bg-accent-yellow" />
              Give Cheerfully
            </span>
          </div>
          <h2 className="text-[2rem] sm:text-4xl md:text-6xl font-light leading-[1.1] sm:leading-[1.05] tracking-tight mb-8">
            Interac <span className="serif-italic text-accent-blue">giving</span>.
          </h2>
          <blockquote className="text-base sm:text-lg font-light leading-relaxed text-[hsl(222_15%_35%)] max-w-md">
            “{GIVING.verse.text}”
            <span className="block mt-3 text-[11px] uppercase tracking-[0.2em]">{GIVING.verse.ref}</span>
          </blockquote>
        </div>

        <div className="lg:col-span-7 lg:pt-16">
          <div className="border-t border-b border-[hsl(222_47%_11%/0.12)] py-10">
            <span className="block mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-coral">
              Interac e-Transfer
            </span>
            <p className="text-sm font-light text-[hsl(222_15%_35%)] mb-2">Send offerings, tithes and contributions to</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-light break-all mb-6">{GIVING.interacEmail}</p>
            <button
              onClick={copy}
              className="touch-target inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(222_47%_11%)] border-b border-[hsl(222_47%_11%/0.2)] pb-1 hover:border-accent-blue hover:text-accent-blue transition-all"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <ol className="mt-10 space-y-3 text-sm font-light text-[hsl(222_15%_35%)]">
              {GIVING.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(222_47%_11%/0.65)] tabular-nums pt-0.5">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveSection;
