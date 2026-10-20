import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EVENTS } from '@/data/site';

/** Upcoming events: each flyer opens full size, details beside it. */
const EventsSection: React.FC<{ heading?: boolean }> = ({ heading = true }) => (
  <section id="events-section" className="section-padding bg-background">
    <div className="container mx-auto">
      {heading && (
        <div className="mb-16 max-w-2xl">
          <span className="eyebrow eyebrow-coral mb-6 block">Upcoming</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            What's <span className="serif-italic text-accent-blue">happening</span>
          </h2>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
        {EVENTS.map((e) => (
          <article key={e.title} className="flex flex-col bg-background">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`Open the ${e.title} flyer full size`}
                  className="group block overflow-hidden aspect-[4/5] bg-foreground/5"
                >
                  <img
                    src={e.img}
                    alt={`${e.title} flyer: ${e.when}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-[1.02]"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-1.5rem)] max-w-3xl p-0 bg-transparent border-none shadow-none overflow-hidden flex items-center justify-center">
                <DialogTitle className="sr-only">{e.title}</DialogTitle>
                <img src={e.img} alt={`${e.title} flyer: ${e.when}`} className="max-h-[85dvh] w-auto max-w-full object-contain" />
              </DialogContent>
            </Dialog>
            <div className="p-7 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{e.title}</h3>
              <p className="text-sm font-normal text-foreground/60 mb-6">{e.sub}</p>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-accent-blue mb-2">
                <Calendar className="w-3.5 h-3.5" aria-hidden /> {e.when}
              </p>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-foreground/70">
                <MapPin className="w-3.5 h-3.5" aria-hidden /> {e.where}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
