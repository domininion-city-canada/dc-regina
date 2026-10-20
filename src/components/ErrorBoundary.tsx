import React from 'react';
import { CONTACT, SERVICE_TIME, ADDRESS } from '@/data/site';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

/**
 * Last line of defence around the routes.
 *
 * Without one, a single component that throws during render — a lazy chunk
 * that fails to load on a flaky connection, a bad response shape — unmounts
 * the entire tree and leaves a white page. On a church website the worst case
 * should still tell a visitor when and where the service is.
 */
class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled error in the React tree:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-background px-6 py-16 text-center text-foreground">
        <div>
          <span className="eyebrow mb-6 inline-flex">Something went wrong</span>
          <h1 className="headline mb-4 text-3xl md:text-4xl">
            This page didn't load properly.
          </h1>
          <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-foreground/60">
            Sorry about that. Reloading usually fixes it. In the meantime, here is the part you
            probably came for.
          </p>
        </div>

        <dl className="flex flex-col gap-3 text-sm font-normal">
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-foreground/65">Sundays</dt>
            <dd className="text-foreground/80">{SERVICE_TIME}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-foreground/65">Where</dt>
            <dd className="text-foreground/80">
              {ADDRESS.line1}, {ADDRESS.line2}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-foreground/65">Email us</dt>
            <dd>
              <a className="text-accent-blue hover:underline break-all" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={() => window.location.reload()} className="btn-nb-primary">
            Reload the page
          </button>
          {/* A full document load, not a router link: the router is part of
              what may have just failed. */}
          <a href="/" className="btn-nb-outline">
            Go to the home page
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
