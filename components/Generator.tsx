'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { UserInput } from '@/components/UserInput'
import { OptionsPanel } from '@/components/OptionsPanel'
import { PreviewCard } from '@/components/PreviewCard'
import { StatsPreview } from '@/components/StatsPreview'
import { CopyableLink } from '@/components/CopyableLink'
import type { LetterboxdStats } from '@/types/letterboxd'
import { getCardUrl, fetchStats, ApiError, DEFAULT_COUNT, type ApiErrorKind } from '@/lib/api'

interface GeneratorProps {
  /** Parsed server-side from the query string, so /?user=… renders on first paint. */
  initialUser: string
  initialCount: number
}

export function Generator({ initialUser, initialCount }: GeneratorProps) {
  const [user, setUser] = useState(initialUser)
  const [count, setCount] = useState(initialCount)
  const [stats, setStats] = useState<LetterboxdStats | null>(null)
  const [errorKind, setErrorKind] = useState<ApiErrorKind | null>(null)
  const [loading, setLoading] = useState(false)
  const [reloadToken, setReloadToken] = useState(0)

  const abortRef = useRef<AbortController | null>(null)

  // The card <img> and this JSON request run concurrently and hit the same
  // hour-cached backend record. The image is what the user came for; the JSON
  // powers the HTML panel and, if the image fails, explains why.
  useEffect(() => {
    if (!user) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setErrorKind(null)
    setStats(null)

    fetchStats(user, controller.signal)
      .then(data => { setStats(data); setLoading(false) })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setErrorKind(err instanceof ApiError ? err.kind : 'unknown')
        setLoading(false)
      })

    return () => controller.abort()
  }, [user, reloadToken])

  // Mirror state into the URL so a preview can be linked or refreshed. Done with
  // history.replaceState rather than router.replace: the page is a server
  // component, so a router navigation would round-trip and remount this island
  // on every option change.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams()
    if (user) params.set('user', user)
    if (user && count !== DEFAULT_COUNT) params.set('count', String(count))
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `/?${qs}` : '/')
  }, [user, count])

  const handleGenerate = useCallback((next: string) => {
    setUser(prev => {
      // Re-submitting the same name should still retry rather than no-op.
      if (prev === next) setReloadToken(t => t + 1)
      return next
    })
  }, [])

  const handleRetry = useCallback(() => setReloadToken(t => t + 1), [])

  const cardUrl = user ? getCardUrl(user, { count }) : ''
  // Keep the copyable URL clean; only the preview busts the browser cache.
  const previewUrl = reloadToken > 0 ? `${cardUrl}&_=${reloadToken}` : cardUrl

  const hasResult = !!user
  const canEmbed = hasResult && !errorKind

  return (
    <div
      className="rounded-lg p-6 text-left space-y-5 animate-fade-up stagger-3 bg-surface border border-border2"
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.5)' }}
    >
      <UserInput initialValue={initialUser} onGenerate={handleGenerate} loading={loading} />

      {hasResult && (
        <div className="space-y-6 animate-fade-in border-t border-border pt-5">
          <div>
            <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
              <p className="text-[11px] uppercase tracking-widest text-muted2 font-sans">Card preview</p>
              <span className="text-[11px] text-muted2 font-mono">cached · refreshes hourly</span>
            </div>
            <PreviewCard url={previewUrl} errorKind={errorKind} onRetry={handleRetry} />
          </div>

          {canEmbed && (
            <OptionsPanel count={count} onCountChange={setCount} disabled={loading} />
          )}

          {stats && (
            <div>
              <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                <p className="text-[11px] uppercase tracking-widest text-muted2 font-sans">Live data</p>
                <span className="text-[11px] text-muted2 font-mono">from /api/stats</span>
              </div>
              <StatsPreview stats={stats} />
            </div>
          )}

          {canEmbed && (
            <div>
              <p className="text-[11px] uppercase tracking-widest mb-3 text-muted2 font-sans">Embed code</p>
              <CopyableLink url={cardUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
