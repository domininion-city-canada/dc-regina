import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Phone, Calendar, Users } from "lucide-react";
import { church, circles, programs, events } from "@/data";
import { CopyButton, PageHead } from "@/components";

function Give() {
  return (
    <div className="rounded-lg border border-white/10 bg-card p-6 md:p-8">
      <p className="eyebrow mb-3">Interac e-Transfer</p>
      <p className="mb-1 text-sm text-muted-foreground">Send offerings, tithes and contributions to</p>
      <p className="mb-5 break-all text-lg font-medium">{church.interac}</p>
      <CopyButton text={church.interac} />
      <ol className="mt-8 space-y-3 text-sm text-muted-foreground">
        <li>1. Open your online or mobile banking app.</li>
        <li>2. Choose Interac e-Transfer and send to the email above.</li>
        <li>3. Enter your amount and add a note: Tithe, Offering or Partnership.</li>
        <li>4. Send.</li>
      </ol>
    </div>
  );
}

export function Home() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden px-5">
        <img src="/images/regina-legislative-building.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative mx-auto w-full max-w-6xl py-20">
          <p className="eyebrow mb-6">Welcome home</p>
          <h1 className="text-5xl font-light md:text-8xl">Dominion City<br /><span className="font-serif italic text-primary">Regina</span></h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{church.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/find-us" className="rounded bg-primary px-6 py-3 text-sm font-medium hover:opacity-90">Join us this Sunday</Link>
            <Link to="/events" className="rounded border border-white/25 px-6 py-3 text-sm hover:bg-white/5">What's happening</Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Clock className="size-4 text-primary" />Sundays · 10:00 AM</span>
            <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" />{church.address}</span>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-card">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Ongoing programs</p>
          <h2 className="mb-12 text-3xl font-light md:text-5xl">Find your <span className="font-serif italic text-primary">place</span></h2>
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((p) => (
              <article key={p.title} className="rounded-lg border border-white/10 bg-background p-6">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-primary">{p.when}</p>
                <p className="mt-4 text-sm text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Upcoming</p>
          <h2 className="mb-12 text-3xl font-light md:text-5xl">What's <span className="font-serif italic text-primary">happening</span></h2>
          <EventGrid />
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-card">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Believers' Circle</p>
          <h2 className="mb-12 text-3xl font-light md:text-5xl">Fellowship <span className="font-serif italic text-primary">near you</span></h2>
          <CircleGrid />
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Give cheerfully</p>
            <h2 className="mb-4 text-3xl font-light md:text-5xl">Interac <span className="font-serif italic text-primary">giving</span></h2>
            <blockquote className="text-muted-foreground">“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” <span className="whitespace-nowrap">2 Corinthians 9:7</span></blockquote>
          </div>
          <Give />
        </div>
      </section>
    </>
  );
}

function EventGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {events.map((e) => (
        <article key={e.title} className="overflow-hidden rounded-lg border border-white/10 bg-card">
          <img src={e.img} alt={`${e.title} flyer: ${e.when}`} loading="lazy" className="w-full" />
          <div className="space-y-2 p-6">
            <h3 className="text-xl font-medium">{e.title}</h3>
            <p className="text-sm text-muted-foreground">{e.sub}</p>
            <p className="flex items-center gap-2 pt-2 text-sm"><Calendar className="size-4 text-primary" />{e.when}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CircleGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {circles.map((c) => (
        <article key={c.area} className="rounded-lg border border-white/10 bg-background p-6">
          <Users className="mb-4 size-6 text-primary" />
          <h3 className="text-xl font-medium">{c.area}</h3>
          <p className="mt-2 text-sm text-primary">{c.when}</p>
          <p className="mt-4 text-sm text-muted-foreground">{c.address}</p>
          <a href={c.maps} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm hover:text-primary">Directions <ArrowRight className="size-4" /></a>
        </article>
      ))}
    </div>
  );
}

export function About() {
  return (
    <>
      <PageHead eyebrow="Who we are" title="About" em="Dominion City Regina" />
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <img src="/images/dominion-city-regina-banner.jpg" alt="Dominion City Regina, 2144b Broad Street" className="w-full rounded-lg" />
          <div className="space-y-8">
            {[
              ["Our value", "We help each other grow spiritually, build a relationship with God, and develop as people, raising leaders and model Christians who positively impact their environment."],
              ["Leadership", "We believe in leadership and transformation. We raise and develop sons and daughters in Christ who will transform society across every sphere of life."],
              ["Our belief", "Our beliefs are shaped by biblical truth and our decisions are guided by Scripture."],
            ].map(([t, d], i) => (
              <div key={t}>
                <p className="eyebrow mb-2">0{i + 1}</p>
                <h2 className="text-2xl font-light">{t}</h2>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Events() {
  return (
    <>
      <PageHead eyebrow="Gatherings" title="Events &" em="programs" />
      <section className="section-pad">
        <div className="mx-auto max-w-6xl space-y-20">
          <EventGrid />
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((p) => (
              <article key={p.title} className="rounded-lg border border-white/10 bg-card p-6">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-primary">{p.when}</p>
                <p className="mt-4 text-sm text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
          <CircleGrid />
        </div>
      </section>
    </>
  );
}

export function GivePage() {
  return (
    <>
      <PageHead eyebrow="Give cheerfully" title="Offerings &" em="contributions" />
      <section className="section-pad"><div className="mx-auto max-w-xl"><Give /></div></section>
    </>
  );
}

export function FindUs() {
  return (
    <>
      <PageHead eyebrow="Visit" title="Find" em="us" />
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Sunday Worship Service</p>
              <p className="text-2xl font-light">Every Sunday · 10:00 AM</p>
              <p className="mt-2 text-muted-foreground">{church.addressFull}</p>
              <a href={church.mapsLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded bg-primary px-5 py-3 text-sm font-medium"><MapPin className="size-4" />Get directions</a>
            </div>
            <div className="pt-6"><p className="eyebrow mb-4">Believers' Circle</p><CircleGrid /></div>
          </div>
          <iframe title="Map to Dominion City Regina" src={church.mapsEmbed} loading="lazy" className="h-[420px] w-full rounded-lg border-0 md:h-full md:min-h-[520px]" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}

export function Contact() {
  return (
    <>
      <PageHead eyebrow="Reach out" title="Contact" em="us" />
      <section className="section-pad">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {church.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="rounded-lg border border-white/10 bg-card p-6 hover:border-primary">
              <Phone className="mb-3 size-6 text-primary" /><p className="text-xl">{p}</p><p className="mt-1 text-sm text-muted-foreground">Call or text</p>
            </a>
          ))}
          <a href={church.instagram} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-card p-6 hover:border-primary"><p className="text-xl">Instagram</p><p className="mt-1 text-sm text-muted-foreground">{church.handle}</p></a>
          <a href={church.facebook} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-card p-6 hover:border-primary"><p className="text-xl">Facebook</p><p className="mt-1 text-sm text-muted-foreground">{church.handle}</p></a>
        </div>
      </section>
    </>
  );
}
