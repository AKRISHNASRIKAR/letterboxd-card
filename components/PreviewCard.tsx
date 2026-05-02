'use client'

import { useState, useEffect } from 'react'
import { getCardUrl } from '@/lib/api'

interface PreviewCardProps {
  username: string
}

export function PreviewCard({ username }: PreviewCardProps) {
  const [status,  setStatus]  = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imgKey,  setImgKey]  = useState(0)

  const url = getCardUrl(username)

  useEffect(() => {
    setStatus('loading')
    setImgKey(k => k + 1)
  }, [url])

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        border:      '1px solid var(--border2)',
        background:  '#14181c',
        aspectRatio: '1100 / 340',
        width:       '100%'
      }}
    >
      {/* loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-full px-6 space-y-4 py-6 opacity-50">
            <div className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3.5 rounded w-28" />
                <div className="skeleton h-2.5 rounded w-20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* error state */}
      {status === 'error' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
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

      {/* actual card SVG from backend */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={imgKey}
        src={url}
        alt={`${username} Letterboxd stats card`}
        className="w-full h-full block object-cover absolute inset-0"
        style={{
          opacity:    status === 'loaded' ? 1 : 0,
          transition: 'opacity 0.35s ease',
          display:    status === 'error' ? 'none' : 'block',
        }}
        onLoad={()  => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}
