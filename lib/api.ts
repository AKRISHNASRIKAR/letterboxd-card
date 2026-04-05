import type { LetterboxdStats } from '../types/letterboxd'

const BASE = process.env.NEXT_PUBLIC_API_URL

/**
 * Fetches full stats JSON from the Express backend.
 * Throws descriptive errors for 404 / 429 / network failures.
 */
export async function fetchStats(username: string): Promise<LetterboxdStats> {
  const res = await fetch(
    `${BASE}/api/stats?user=${encodeURIComponent(username)}`,
    { cache: 'no-store' }
  )

  if (res.status === 404) throw new Error('User not found on Letterboxd')
  if (res.status === 429) throw new Error('Too many requests — try again in a moment')
  if (!res.ok)            throw new Error(`Failed to fetch stats (${res.status})`)

  const json = await res.json()
  return json.data as LetterboxdStats
}

/**
 * Builds the card PNG URL. This string goes directly into an <img src="...">
 * The browser fetches the image itself — no JS overhead.
 */
export function getCardUrl(
  username: string,
  theme:    string = 'default',
  width:    number = 480,
  count:    number = 4
): string {
  const params = new URLSearchParams({
    user:  username,
    theme,
    width: String(width),
    count: String(count),
  })
  return `${BASE}/api/card?${params}`
}

/**
 * Fetches recent films as JSON (for custom UIs).
 */
export async function fetchFilms(username: string, count = 8) {
  const res = await fetch(
    `${BASE}/api/films?user=${encodeURIComponent(username)}&count=${count}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch films')
  return res.json()
}
