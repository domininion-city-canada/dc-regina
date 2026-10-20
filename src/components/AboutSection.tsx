import React from 'react';
import { Link } from 'react-router-dom';
import { PROGRAMS } from '@/data/site';

const EYEBROW_COLOURS = ['text-accent-coral', 'text-accent-indigo', 'text-accent-yellow'];

const AboutSection: React.FC = () => (
  <section id="about-us-section" className="bg-[hsl(40_20%_97%)] text-[hsl(222_47%_11%)] py-24 md:py-40">
    <div className="container mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
      <div>
        <div className="mb-10">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(222_47%_11%/0.75)]">
            <span className="w-8 h-px bg-accent-blue" />
            Who We Are
          </span>
        </div>
        <h2 className="text-[2rem] sm:text-4xl md:text-6xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight mb-8 md:mb-10">
          Find your <span className="serif-italic text-accent-blue">place</span> in Regina.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[hsl(222_15%_35%)] font-normal leading-relaxed max-w-xl mb-8 md:mb-10">
          We help each other grow spiritually, build a relationship with God, and
          develop as people, raising leaders and model Christians who positively
          impact their environment.
        </p>
        <Link
          to="/about"
          className="touch-target inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-[hsl(222_47%_11%)] border-b border-[hsl(222_47%_11%/0.2)] pb-1 hover:border-accent-blue hover:text-accent-blue transition-all"
        >
          More about us →
        </Link>
      </div>

      <div className="space-y-10 md:space-y-12 lg:pt-16">
        {PROGRAMS.map((p, i) => (
          <div key={p.title}>
            <span className={`block mb-4 text-xs font-semibold uppercase tracking-[0.14em] ${EYEBROW_COLOURS[i % 3]}`}>
              {p.when}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{p.title}</h3>
            <p className="text-sm md:text-base font-normal leading-relaxed text-[hsl(222_15%_35%)] max-w-md">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
