'use client'

import { useState, useEffect } from 'react'
import type { ApiErrorKind } from '@/lib/api'
import { messageFor } from '@/lib/api'

interface PreviewCardProps {
  /** The card URL to display. Changing it restarts the load. */
  url: string
  /**
   * Why the request failed, resolved by the stats fetch that runs alongside this
   * image. v1 re-fetched the failing URL from onError just to read its status
   * code, which doubled load on the endpoint that was already struggling and
   * could report a different result than the <img> actually got.
   */
  errorKind?: ApiErrorKind | null
  onRetry?: () => void
}

const ERROR_ART: Record<ApiErrorKind, { icon: string; title: string }> = {
  not_found:  { icon: '👤', title: 'No account exists' },
  rate_limit: { icon: '⏳', title: 'Too many requests' },
  blocked:    { icon: '🛡️', title: 'Letterboxd is blocking us' },
  network:    { icon: '🔌', title: 'Cannot reach the service' },
  unknown:    { icon: '🎬', title: 'Could not render the card' },
}

export function PreviewCard({ url, errorKind, onRetry }: PreviewCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setImageFailed(false)
  }, [url])

  // An image failure with no diagnosis from the stats fetch still needs a state.
  const kind: ApiErrorKind | null = errorKind ?? (imageFailed ? 'unknown' : null)
  const showImage = !kind

  return (
    <div
      // The card renders on --bg, which is now the page colour too, so it would
      // dissolve into the panel without a frame of its own.
      className="rounded-lg overflow-hidden relative bg-bg border border-border2"
      style={{
        aspectRatio: '1100 / 340',
        width: '100%',
        boxShadow: '0 8px 28px rgba(0,0,0,0.45)',
      }}
    >
      {showImage && !loaded && (
        <div className="absolute inset-0 flex items-center px-6" aria-hidden="true">
          <div className="w-full space-y-4 opacity-50">
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

      {kind && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center bg-surface"
        >
          <span style={{ fontSize: '28px' }} aria-hidden="true">{ERROR_ART[kind].icon}</span>
          <p className="text-sm font-medium text-text font-sans">{ERROR_ART[kind].title}</p>
          <p className="text-xs text-muted font-sans max-w-sm">{messageFor(kind)}</p>
          {/* Retrying a missing account just fails again — offer it only where
              waiting actually helps. */}
          {kind !== 'not_found' && onRetry && (
            <button
              type="button"
              className="text-xs mt-1 transition-colors text-accent font-sans hover:text-accent3"
              onClick={onRetry}
            >
              Try again →
            </button>
          )}
        </div>
      )}

      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Letterboxd stats card preview"
          className="w-full h-full block object-contain absolute inset-0 transition-opacity duration-300 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}
