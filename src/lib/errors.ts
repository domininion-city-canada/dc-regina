/**
 * One place that turns whatever was thrown into a sentence written for a
 * person.
 *
 * Nobody visiting a church website should be shown
 * `duplicate key value violates unique constraint "user_roles_user_id_role_key"`.
 * Raw messages belong in the console; this is what reaches the screen.
 */

export type FriendlyError = {
  title: string;
  description: string;
  /** Whether trying the same thing again could plausibly work. */
  retryable: boolean;
};

function messageOf(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message ?? '');
  }
  return '';
}

function codeOf(error: unknown): string {
  if (error && typeof error === 'object') {
    const e = error as { code?: unknown; status?: unknown };
    if (e.code != null) return String(e.code);
    if (e.status != null) return String(e.status);
  }
  return '';
}

/**
 * Errors that should never become a toast.
 *
 * An aborted request usually means the visitor navigated away mid-flight —
 * telling them about it is noise for something they caused deliberately.
 */
export function isBenignError(error: unknown): boolean {
  const name = error && typeof error === 'object' ? String((error as Error).name ?? '') : '';
  if (name === 'AbortError' || name === 'CanceledError') return true;
  return /aborted|cancell?ed/i.test(messageOf(error));
}

export function describeError(error: unknown, fallbackTitle = 'Something went wrong'): FriendlyError {
  const msg = messageOf(error);
  const code = codeOf(error);

  // Network trouble first: it can surface as almost any other error shape, so
  // matching it later would mean showing the wrong explanation.
  if (/failed to fetch|networkerror|load failed/i.test(msg) || (typeof navigator !== 'undefined' && !navigator.onLine)) {
    return {
      title: 'No connection',
      description: 'Check your internet connection and try again.',
      retryable: true,
    };
  }

  // --- Auth ---------------------------------------------------------------
  if (/invalid login credentials/i.test(msg)) {
    return {
      title: "That didn't match",
      description: 'Check the email address and password, then try again.',
      retryable: true,
    };
  }
  if (/email not confirmed/i.test(msg)) {
    return {
      title: 'Confirm your email first',
      description: 'We sent you a link when you signed up. Open it, then sign in.',
      retryable: false,
    };
  }
  if (/user already registered|already been registered/i.test(msg)) {
    return {
      title: 'You already have an account',
      description: 'Sign in instead, or reset your password if you have forgotten it.',
      retryable: false,
    };
  }
  if (/password.*(6|at least)/i.test(msg)) {
    return {
      title: 'Password is too short',
      description: 'Use at least six characters.',
      retryable: true,
    };
  }
  if (/rate limit|too many requests/i.test(msg) || code === '429') {
    return {
      title: 'Too many attempts',
      description: 'Wait a minute or two, then try once more.',
      retryable: true,
    };
  }

  // --- Postgres / PostgREST ----------------------------------------------
  if (code === '23505') {
    return {
      title: 'That already exists',
      description: 'It looks like this was already saved.',
      retryable: false,
    };
  }
  if (code === '23514' || code === '23502') {
    return {
      title: 'Something was missing',
      description: 'Please check the form and fill in anything left blank.',
      retryable: true,
    };
  }
  if (code === '42501' || code === '401' || code === '403' || /permission denied/i.test(msg)) {
    return {
      title: 'Not allowed',
      description: 'You do not have access to that. Try signing in again.',
      retryable: false,
    };
  }
  if (code === 'PGRST116' || code === '404') {
    return {
      title: 'Not found',
      description: "We couldn't find that. It may have been moved or removed.",
      retryable: false,
    };
  }
  if (/^5\d\d$/.test(code)) {
    return {
      title: 'That is on us',
      description: 'Something broke on our side. Please try again in a moment.',
      retryable: true,
    };
  }

  return { title: fallbackTitle, description: 'Please try again.', retryable: true };
}

/** The common call shape: `toast(errorToast(err, 'Could not sign in'))`. */
export function errorToast(error: unknown, fallbackTitle?: string) {
  const { title, description } = describeError(error, fallbackTitle);
  return { variant: 'destructive' as const, title, description };
}
