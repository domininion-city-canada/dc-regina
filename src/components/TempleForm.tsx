import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { CONTACT } from '@/data/site';

const TEMPLE_ORIGIN = 'https://templeadmin.com';
/** Below this, a reported height is Temple's loading screen, not the form. */
const MIN_REPORTED_HEIGHT = 240;

type Props = {
  /** The form's public link in Temple, or null while it isn't published there. */
  url: string | null;
  title: string;
  /** Called once Temple accepts the answers, so the page can show its own thank-you. */
  onSubmitted?: () => void;
};

/**
 * A form hosted on Temple (templeadmin.com), the church's admin system, which
 * stores the answers, adds the person to the church's People and sends the
 * notification and confirmation emails.
 *
 * Loaded with ?embed=1, the form drops Temple's header and footer and posts its
 * height to this page ("temple-form:height"), so the frame grows to fit it and
 * never scrolls on its own. This is what templeadmin.com/embed.js does; it's
 * done here so the site loads no third-party script. The page's own query
 * string is passed on, so a utm_source lands in the form's hidden Source field.
 * After a submit the form posts "temple-form:submitted", which calls onSubmitted.
 *
 * Temple forms always render light, so the frame sits on a white panel in
 * dark mode too. Until the church publishes the form, it shows as not open yet.
 */
const TempleForm: React.FC<Props> = ({ url, title, onSubmitted }) => {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Kept in a ref so the message listener below never needs re-binding.
  const submitted = useRef(onSubmitted);
  submitted.current = onSubmitted;

  // Built after mount: prerendered HTML has no query string to pass on.
  useEffect(() => {
    if (!url) return;
    const next = new URL(url);
    new URLSearchParams(window.location.search).forEach((value, key) => next.searchParams.set(key, value));
    next.searchParams.set('embed', '1');
    setSrc(next.toString());
    setHeight(null);
    setLoaded(false);
  }, [url]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== TEMPLE_ORIGIN || event.source !== frame.current?.contentWindow) return;
      const data = event.data as { type?: unknown; height?: unknown };
      // Temple reports its loading screen (~160px) and, since October 2026, not
      // always the rendered form after it; a height that small would clip the
      // form, so the frame keeps its default until a real one arrives.
      if (data?.type === 'temple-form:height' && typeof data.height === 'number' && data.height >= MIN_REPORTED_HEIGHT) {
        setHeight(Math.min(Math.ceil(data.height), 20000));
      } else if (data?.type === 'temple-form:submitted') {
        submitted.current?.();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!url) {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-sm font-normal leading-relaxed text-foreground/70">
          This form isn't open yet. In the meantime, email us at{' '}
          <a className="text-accent-blue hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          .
        </p>
        <button type="button" disabled className="btn-nb-primary w-full cursor-not-allowed opacity-50">
          Opening soon
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-md bg-white">
        {!loaded && height === null && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-white text-neutral-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Loading form…</span>
          </div>
        )}
        {src && (
          <iframe
            ref={frame}
            src={src}
            title={title}
            onLoad={() => setLoaded(true)}
            className="block w-full border-0 bg-white"
            style={{ height: height ?? 640 }}
          />
        )}
        {!src && <div style={{ height: 640 }} />}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] items-center justify-center gap-2 text-sm font-medium text-foreground/65 transition-colors hover:text-accent-blue"
      >
        <ExternalLink className="h-4 w-4" />
        Having trouble? Open the form in a new tab
      </a>
    </div>
  );
};

export default TempleForm;
