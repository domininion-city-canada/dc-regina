import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ADDRESS, SERVICE_TIME } from '@/data/site';

const Hero: React.FC = () => (
  <header className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-background">
    {/* Background. Preloaded from head-boot.js on "/" only. */}
    <div className="absolute inset-0 z-0">
      <img
        src="/media/wascana-lake.jpg"
        alt="Wascana Lake in Regina on a summer evening"
        width={1600}
        height={1068}
        // React 18 passes only the lowercase attribute through to the DOM.
        {...{ fetchpriority: 'high' }}
        decoding="async"
        className="w-full h-full object-cover opacity-40 animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
    </div>

    <div className="container mx-auto relative z-10 pt-28 pb-52 sm:pb-40 md:py-40">
      <div className="max-w-4xl">
        <div className="animate-fade-in-up stagger-1 mb-10">
          <span className="eyebrow">Welcome Home</span>
        </div>

        <h1 className="headline text-[2.75rem] leading-[1.05] sm:text-7xl md:text-8xl mb-6 animate-fade-in-up stagger-2">
          Dominion City
          <br />
          <span className="serif-italic text-accent-blue">Regina</span>.
        </h1>

        <p className="text-lg md:text-2xl text-foreground/70 font-medium mb-8 md:mb-14 max-w-3xl animate-fade-in-up stagger-2">
          Raising leaders that transform society.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-8 gap-y-7 items-start animate-fade-in-up stagger-3">
          <Link to="/find-us" className="btn-nb-primary w-full sm:w-auto">
            Join us this Sunday
          </Link>
          <Link to="/events" className="btn-nb-link">
            What's happening
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom info strip */}
    <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-foreground/10 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto py-5 md:py-6 safe-bottom flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
        <div className="flex flex-wrap gap-x-12 gap-y-2 text-xs md:text-xs uppercase tracking-[0.1em] md:tracking-[0.14em] font-medium text-foreground/70">
          <div>
            <span className="text-accent-blue">Sundays</span>
            <span className="ml-2 md:ml-3 text-foreground/80">{SERVICE_TIME}</span>
          </div>
          <a href={ADDRESS.directionsUrl} target="_blank" rel="noopener noreferrer" className="touch-target">
            <span className="text-accent-blue">Location</span>
            <span className="ml-2 md:ml-3 text-foreground/80 underline decoration-foreground/20 underline-offset-4">
              {ADDRESS.streetShort}, {ADDRESS.locality}
            </span>
          </a>
          <Link to="/#circles-section" className="touch-target">
            <span className="text-accent-blue">Believers' Circle</span>
            <span className="ml-2 md:ml-3 text-foreground/80 underline decoration-foreground/20 underline-offset-4">
              Fridays 6:30 PM
            </span>
          </Link>
        </div>
        <span className="hidden md:inline text-xs uppercase tracking-[0.14em] text-foreground/60">
          Scroll ↓
        </span>
      </div>
    </div>
  </header>
);

export default Hero;
