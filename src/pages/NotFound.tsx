import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "404:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      {/*
        Without this, a 404 kept whatever <title> and canonical the previous
        route had set — Helmet only replaces what a page declares — and carried
        no robots tag, so every mistyped URL was a soft 404 that crawlers were
        free to index under another page's canonical.
      */}
      <SEO
        title="Page not found"
        description="That page does not exist."
        index={false}
      />
      <span className="eyebrow mb-8">404</span>
      <h1 className="mb-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
        We couldn't find that <span className="serif-italic text-accent-blue">page</span>.
      </h1>
      <p className="mb-10 max-w-sm text-base font-light leading-relaxed text-foreground/60">
        The link may be out of date. Everything else is still where you left it.
      </p>
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Link to="/" className="btn-nb-primary w-full justify-center">
          Back to home
        </Link>
        <Link to="/find-us" className="btn-nb-outline w-full justify-center">
          Plan your visit
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
