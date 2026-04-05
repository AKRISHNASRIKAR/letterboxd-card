'use client'

import { useState, useEffect } from 'react'
import { getCardUrl } from '@/lib/api'
import type { Theme } from '@/types/letterboxd'

interface PreviewCardProps {
  username: string
  theme:    Theme
}

const THEME_BG: Record<Theme, string> = {
  default: '#ffffff',
  dark:    '#0d0d0f',
  minimal: '#f7f5f0',
}

export function PreviewCard({ username, theme }: PreviewCardProps) {
  const [status,  setStatus]  = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imgKey,  setImgKey]  = useState(0)

  const url = getCardUrl(username, theme)

  // reset to loading when url changes
  useEffect(() => {
    setStatus('loading')
    setImgKey(k => k + 1)
  }, [url])

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border:     '1px solid var(--border2)',
        background: 'var(--surface)',
      }}
    >
      {/* ── browser chrome bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{
          background:   'var(--surface2)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <span
              key={c}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c, opacity: 0.75 }}
            />
          ))}
        </div>

        {/* address bar */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md"
          style={{ background: 'var(--surface3)' }}
        >
          {/* lock icon */}
          <svg
            width="10" height="10" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round"
            style={{ color: 'var(--muted)', flexShrink: 0 }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <span
            className="text-[11px] truncate"
            style={{ color: 'var(--muted2)', fontFamily: 'var(--mono)' }}
          >
            {url.replace(/^https?:\/\//, '')}
          </span>
        </div>

        {/* status indicator */}
        <div className="shrink-0">
          {status === 'loading' && (
            <svg
              className="animate-spin"
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ color: 'var(--muted)' }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          )}
          {status === 'loaded' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--green)' }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
          {status === 'error' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--red)' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
        </div>
      </div>

      {/* ── card image area ── */}
      <div
        className="relative"
        style={{
          background: THEME_BG[theme],
          minHeight:  '200px',
        }}
      >
        {/* loading skeleton */}
        {status === 'loading' && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: THEME_BG[theme] }}
          >
            {/* skeleton rows */}
            <div className="w-full px-6 space-y-4 py-6">
              <div className="flex items-center gap-3">
                <div className="skeleton w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 rounded w-28" />
                  <div className="skeleton h-2.5 rounded w-20" />
                </div>
              </div>
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-1 space-y-1.5">
                    <div className="skeleton h-7 rounded w-full" />
                    <div className="skeleton h-2 rounded w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton flex-1 rounded-lg" style={{ aspectRatio: '2/3' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* error state */}
        {status === 'error' && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 py-12"
            style={{ background: 'var(--surface)' }}
          >
            <span style={{ fontSize: '28px' }}>🎬</span>
            <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--sans)' }}>
              Could not render card preview
            </p>
            <button
              className="text-xs mt-1 transition-colors"
              style={{ color: 'var(--accent)', fontFamily: 'var(--sans)' }}
              onClick={() => { setStatus('loading'); setImgKey(k => k + 1) }}
            >
              Try again →
            </button>
          </div>
        )}

        {/* actual card PNG from backend */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={imgKey}
          src={url}
          alt={`${username} Letterboxd stats card`}
          className="w-full block"
          style={{
            opacity:    status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.35s ease',
            display:    status === 'error' ? 'none' : 'block',
          }}
          onLoad={()  => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      </div>
    </div>
  )
}
