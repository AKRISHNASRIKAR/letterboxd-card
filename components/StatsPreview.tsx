'use client'

import type { LetterboxdStats } from '@/types/letterboxd'

interface StatsPreviewProps {
  stats: LetterboxdStats
}

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString())

const STAT_ITEMS = (profile: LetterboxdStats) => {
  const s = profile.stats
  const info = profile.thisYearInfo
  const unavailable = !info || info.accuracy === 'unavailable'
  const partial = info?.accuracy === 'lower_bound'
  const yearValue = unavailable ? '—' : `${s.thisYear.toLocaleString()}${partial ? '+' : ''}`
  const yearTitle = unavailable
    ? 'Yearly count unavailable'
    : partial
      ? `At least ${s.thisYear.toLocaleString()} distinct films in ${info.year}; the RSS feed is incomplete`
      : `${s.thisYear.toLocaleString()} films in ${info.year}`
  return [
    { label: 'Films',     value: fmt(s.totalFilms), title: s.totalFilms.toLocaleString() },
    { label: 'This year', value: yearValue, title: yearTitle },
    { label: 'Lists',     value: fmt(s.lists),      title: s.lists.toLocaleString()      },
    { label: 'Following', value: fmt(s.following),  title: s.following.toLocaleString()  },
    { label: 'Followers', value: fmt(s.followers),  title: s.followers.toLocaleString()  },
  ]
}

/**
 * The same numbers as the card, rendered as HTML from /api/stats.
 *
 * Worth having for two reasons: it proves the data is real when the SVG is still
 * loading or has failed to render, and it shows what the JSON API returns to
 * anyone thinking about building their own UI on top of it. v1 shipped this
 * component but never imported it.
 */
export function StatsPreview({ stats }: StatsPreviewProps) {
  const initials = (stats.displayName || stats.username)
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="rounded-lg overflow-hidden animate-fade-in bg-surface border border-border2">
      {/* ── header ── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        {stats.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={stats.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-border2"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-accentbg text-accent border border-accentline font-serif"
          >
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-text font-sans">
            {stats.displayName || stats.username}
          </p>
          <p className="text-xs truncate text-muted font-mono">
            @{stats.username}
            {/* Letterboxd dropped the join date from the profile page, so the
                backend returns "" here — render nothing rather than a stray dot. */}
            {stats.memberSince && <span className="text-muted2"> · {stats.memberSince}</span>}
          </p>
        </div>

        <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-accentbg text-accent border border-accentline font-sans">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          live
        </span>
      </div>

      {/* ── stats grid ── */}
      <dl className="grid grid-cols-5 gap-px bg-[color:var(--border)]">
        {STAT_ITEMS(stats).map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center py-4 px-2 bg-surface2"
          >
            <dd className="text-xl font-semibold leading-none mb-1 text-accent font-serif" title={item.title}>
              {item.value}
            </dd>
            <dt className="text-[10px] uppercase tracking-wider text-center leading-tight text-muted font-sans">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>

      {stats.thisYearInfo?.accuracy === 'lower_bound' && (
        <p className="px-5 py-2 text-xs text-muted">
          This year shows a minimum of distinct films from recent diary entries; the full count could not be retrieved.
        </p>
      )}

      {/* ── recent films strip ── */}
      {stats.recentFilms.length > 0 && (
        <div className="px-5 py-4">
          <p className="text-[11px] uppercase tracking-widest mb-3 text-muted2 font-sans">
            Recent watches
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-1 list-none" style={{ scrollbarWidth: 'none' }}>
            {stats.recentFilms.slice(0, 12).map((film, i) => (
              <li
                key={`${film.slug}-${i}`}
                className="group relative shrink-0 rounded overflow-hidden bg-surface3 border border-border"
                style={{ width: '44px', aspectRatio: '2/3' }}
                title={`${film.name}${film.year ? ` (${film.year})` : ''}${film.rating ? ` — ${film.rating}` : ''}`}
              >
                {film.posterUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={film.posterUrl}
                    alt={film.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                {film.rating && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}
                  >
                    <span className="text-[8px] font-medium text-accent3 font-mono">{film.rating}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
