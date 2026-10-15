import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MapPin, Phone, Menu, X, Clock, Copy, Check } from "lucide-react";
import { church } from "@/data";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/give", label: "Give" },
  { to: "/find-us", label: "Find Us" },
  { to: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Dominion City Regina home">
      <img src="/images/dominion-city-logo.png" alt="Dominion City logo" width={48} height={33} className="h-9 w-auto md:h-10" />
      <span className="text-[11px] font-medium tracking-[0.35em] text-muted-foreground uppercase">Regina</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `text-sm tracking-wide transition-colors hover:text-white ${isActive ? "text-white" : "text-muted-foreground"}`}>{l.label}</NavLink>
          ))}
        </nav>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-5 py-3 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="block py-3 text-muted-foreground" onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{church.tagline}</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Visit</p>
          <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{church.addressFull}</p>
          <p className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-primary" />Sundays · 10:00 AM</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Connect</p>
          {church.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex gap-2 hover:text-white"><Phone className="mt-0.5 size-4 text-primary" />{p}</a>
          ))}
          <div className="flex gap-4 pt-2">
            <a href={church.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram {church.handle}</a>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">© {YEAR} Dominion City Regina. Hero photo: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Wascana_Lake_-_Regina_(29125839967).jpg" target="_blank" rel="noreferrer">Wascana Lake</a> by Haydn Blackey, <a className="underline" href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">CC BY-SA 2.0</a>. Part of <a className="underline" href="https://dominioncitycanada.org" target="_blank" rel="noreferrer">Dominion City Canada</a>.</p>
    </footer>
  );
}

export function PageHead({ eyebrow, title, em }: { eyebrow: string; title: string; em?: string }) {
  return (
    <section className="section-pad border-b border-white/10 bg-gradient-to-b from-card to-background">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="text-4xl font-light md:text-6xl">{title} {em && <span className="font-serif italic text-primary">{em}</span>}</h1>
      </div>
    </section>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); } catch { /* clipboard blocked: user can select the text */ } }}
      className="inline-flex items-center gap-2 rounded border border-white/20 px-4 py-2 text-xs tracking-widest uppercase hover:bg-white/5"
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}{done ? "Copied" : "Copy email"}
    </button>
  );
}
