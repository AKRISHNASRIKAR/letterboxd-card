'use client'

import { useState, useEffect } from 'react'
import { getCardUrl } from '@/lib/api'

export type CardStatus = 'loading' | 'loaded' | 'error' | 'not_found' | 'rate_limit'

interface PreviewCardProps {
  username: string
  onStatusChange?: (status: CardStatus) => void
}

export function PreviewCard({ username, onStatusChange }: PreviewCardProps) {
  const [status,  setStatus]  = useState<CardStatus>('loading')
  const [imgKey,  setImgKey]  = useState(0)

  const url = getCardUrl(username)

  useEffect(() => {
    setStatus('loading')
    setImgKey(k => k + 1)
  }, [url])

  useEffect(() => {
    onStatusChange?.(status)
  }, [status, onStatusChange])

  const handleImageError = async () => {
    try {
      const res = await fetch(url)
      if (res.status === 404) {
        setStatus('not_found')
        return
      }
      if (res.status === 429) {
        setStatus('rate_limit')
        return
      }
    } catch {
      // ignore network errors
    }
    setStatus('error')
  }

  return (
    <div
      className="rounded-2xl overflow-hidden relative bg-[#14181c]"
      style={{ border: '1px solid var(--border2)', aspectRatio: '1100 / 340', width: '100%' }}
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

      {/* not found state */}
      {status === 'not_found' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface">
          <span style={{ fontSize: '28px' }}>👤</span>
          <p className="text-sm font-medium text-text font-sans">No account exists</p>
          <p className="text-xs text-muted font-sans">No Letterboxd account found for @{username}</p>
        </div>
      )}

      {/* rate limit state */}
      {status === 'rate_limit' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface">
          <span style={{ fontSize: '28px' }}>⏳</span>
          <p className="text-sm font-medium text-text font-sans">Too many requests</p>
          <p className="text-xs text-muted font-sans">Please wait a moment before trying again</p>
          <button
            className="text-xs mt-1 transition-colors text-accent font-sans"
            onClick={() => { setStatus('loading'); setImgKey(k => k + 1) }}
          >
            Try again →
          </button>
        </div>
      )}

      {/* error state */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface">
          <span style={{ fontSize: '28px' }}>🎬</span>
          <p className="text-xs text-muted font-sans">Could not render card preview</p>
          <button
            className="text-xs mt-1 transition-colors text-accent font-sans"
            onClick={() => { setStatus('loading'); setImgKey(k => k + 1) }}
          >
            Try again →
          </button>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={imgKey}
        src={url}
        alt={`${username} Letterboxd stats card`}
        className="w-full h-full block object-cover absolute inset-0 transition-opacity duration-[350ms] ease-out"
        style={{
          opacity: status === 'loaded' ? 1 : 0,
          display: status === 'loaded' || status === 'loading' ? 'block' : 'none',
        }}
        onLoad={()  => setStatus('loaded')}
        onError={handleImageError}
      />
    </div>
  )
}
