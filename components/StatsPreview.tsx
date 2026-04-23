'use client'

import type { LetterboxdStats } from '@/types/letterboxd'

interface StatsPreviewProps {
  stats: LetterboxdStats
}

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString()

const STAT_ITEMS = (s: LetterboxdStats['stats']) => [
  { label: 'Films',     value: fmt(s.totalFilms), title: s.totalFilms.toLocaleString() },
  { label: 'This year', value: fmt(s.thisYear),   title: s.thisYear.toLocaleString()   },
  { label: 'Lists',     value: fmt(s.lists),      title: s.lists.toLocaleString()      },
  { label: 'Following', value: fmt(s.following),  title: s.following.toLocaleString()  },
  { label: 'Followers', value: fmt(s.followers),  title: s.followers.toLocaleString()  },
]

export function StatsPreview({ stats }: StatsPreviewProps) {
  const initials = (stats.displayName || stats.username)
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-in"
      style={{
        background: 'var(--surface)',
        border:     '1px solid var(--border2)',
      }}
    >
      {/* ── header ── */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {/* avatar */}
        {stats.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={stats.avatar}
            alt={stats.displayName}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            style={{ border: '1px solid var(--border2)' }}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{
              background:  'var(--accentbg)',
              color:       'var(--accent)',
              border:      '1px solid rgba(212,168,83,0.22)',
              fontFamily:  'var(--serif)',
            }}
          >
            {initials}
          </div>
        )}

        {/* name + handle */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}
          >
            {stats.displayName || stats.username}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: 'var(--muted)', fontFamily: 'var(--mono)' }}
          >
            @{stats.username}
            {stats.memberSince && (
              <span style={{ color: 'var(--muted2)' }}> · {stats.memberSince}</span>
            )}
          </p>
        </div>

        {/* found badge */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
          style={{
            background:  'var(--greenbg)',
            color:       'var(--green)',
            border:      '1px solid rgba(82,194,122,0.22)',
            fontFamily:  'var(--sans)',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          found
        </div>
      </div>

      {/* ── stats grid ── */}
      <div className="grid grid-cols-5 gap-px" style={{ background: 'var(--border)' }}>
        {STAT_ITEMS(stats.stats).map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center py-4 px-2"
            style={{ background: 'var(--surface2)' }}
            title={item.title}
          >
            <span
              className="text-xl font-semibold leading-none mb-1"
              style={{ color: 'var(--accent)', fontFamily: 'var(--serif)' }}
            >
              {item.value}
            </span>
            <span
              className="text-[10px] uppercase tracking-wider text-center leading-tight"
              style={{ color: 'var(--muted)', fontFamily: 'var(--sans)' }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── recent films strip ── */}
      {stats.recentFilms.length > 0 && (
        <div className="px-5 py-4">
          <p
            className="text-[11px] uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted2)', fontFamily: 'var(--sans)' }}
          >
            Recent watches
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {stats.recentFilms.slice(0, 7).map((film, i) => (
              <div
                key={`${film.slug}-${i}`}
                className="group relative shrink-0 rounded-lg overflow-hidden"
                style={{
                  width:       '44px',
                  aspectRatio: '2/3',
                  background:  'var(--surface3)',
                  border:      '1px solid var(--border)',
                  cursor:      'default',
                }}
                title={`${film.name}${film.rating ? ` — ${film.rating}` : ''}`}
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

                {/* rating overlay on hover */}
                {film.rating && (
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
                  >
                    <span
                      className="text-[8px] font-medium"
                      style={{ color: 'var(--accent3)', fontFamily: 'var(--mono)' }}
                    >
                      {film.rating}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
