import type { LetterboxdStats } from '@/types/letterboxd'

// Strip any trailing slash so we never generate double-slash URLs
const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '')

if (!BASE && typeof window !== 'undefined') {
  console.warn(
    '[letterboxd-card] NEXT_PUBLIC_API_URL is not set. ' +
    'Set it in your Vercel project settings to your backend URL ' +
    '(e.g. https://letterboxd-card-backend.vercel.app) and redeploy.'
  )
}

export const apiBase = () => BASE

// ── Card parameters ───────────────────────────────────────────────────────────
// Only what the backend honours. It also accepts `width` and ignores it (the card
// is a fixed 1100×340), and has no `theme` at all — v1 advertised both, so every
// copied embed URL carried dead parameters. Anything added here must be real.

/** Posters the renderer will draw. Its POSTER_COUNT caps the row at 4. */
export const MIN_COUNT = 1
export const MAX_COUNT = 4
export const DEFAULT_COUNT = 4

export const clampCount = (n: number): number =>
  Number.isFinite(n) ? Math.min(MAX_COUNT, Math.max(MIN_COUNT, Math.round(n))) : DEFAULT_COUNT

export interface CardOptions {
  count?: number
}

/**
 * Builds the card SVG URL. This string goes straight into an <img src="...">;
 * the browser fetches the image itself, so no JS is involved in rendering it.
 */
export function getCardUrl(username: string, { count = DEFAULT_COUNT }: CardOptions = {}): string {
  const params = new URLSearchParams({
    user:  username,
    count: String(clampCount(count)),
  })
  return `${BASE}/api/card?${params}`
}

// ── Errors ────────────────────────────────────────────────────────────────────
// The backend distinguishes three failure modes and the UI needs to as well: a
// blocked scrape is a temporary upstream problem, not a missing user.

export type ApiErrorKind = 'not_found' | 'rate_limit' | 'blocked' | 'network' | 'unknown'

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }
}

/** Maps an HTTP status onto the states the UI knows how to render. */
export function errorKindForStatus(status: number): ApiErrorKind {
  if (status === 404) return 'not_found'
  if (status === 429) return 'rate_limit'
  // 502 is the backend's "Letterboxd is blocking automated requests" response.
  if (status === 502 || status === 503) return 'blocked'
  return 'unknown'
}

const MESSAGES: Record<ApiErrorKind, string> = {
  not_found:  'No Letterboxd account found with that username',
  rate_limit: 'Too many requests — give it a moment and try again',
  blocked:    'Letterboxd is blocking automated requests right now. This usually clears in a few minutes.',
  network:    'Could not reach the card service',
  unknown:    'Something went wrong generating the card',
}

export const messageFor = (kind: ApiErrorKind): string => MESSAGES[kind]

// ── JSON ──────────────────────────────────────────────────────────────────────

/** Full stats for the HTML data panel, and for anyone building their own UI. */
export async function fetchStats(username: string, signal?: AbortSignal): Promise<LetterboxdStats> {
  let res: Response
  try {
    res = await fetch(
      `${BASE}/api/stats?user=${encodeURIComponent(username)}`,
      { cache: 'no-store', signal },
    )
  } catch (err) {
    // An aborted request is the caller changing their mind, not a failure.
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new ApiError('network', MESSAGES.network)
  }

  if (!res.ok) {
    const kind = errorKindForStatus(res.status)
    throw new ApiError(kind, MESSAGES[kind], res.status)
  }

  const json = await res.json()
  return json.data as LetterboxdStats
}
