import React from 'react';

/** The opening block of a sub-page: eyebrow, headline with one italic word, intro. */
const PageIntro: React.FC<{ eyebrow: string; title: string; accent: string; children?: React.ReactNode }> = ({
  eyebrow,
  title,
  accent,
  children,
}) => (
  <section className="border-b border-foreground/10 pt-32 md:pt-44 pb-16 md:pb-20">
    <div className="container mx-auto">
      <span className="eyebrow mb-8 block animate-fade-in-up stagger-1">{eyebrow}</span>
      <h1 className="headline text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl animate-fade-in-up stagger-2">
        {title} <span className="serif-italic text-accent-blue">{accent}</span>
      </h1>
      {children && (
        <div className="mt-6 max-w-2xl text-lg md:text-xl font-normal leading-relaxed text-foreground/60 animate-fade-in-up stagger-3">
          {children}
        </div>
      )}
    </div>
  </section>
);

export default PageIntro;
