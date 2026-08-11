'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface CopyableLinkProps {
  /** Already built by lib/api's getCardUrl, so options stay in one place. */
  url: string
}

type CopiedKey = 'markdown' | 'html' | 'url' | null

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function CopyableLink({ url }: CopyableLinkProps) {
  const [copied, setCopied] = useState<CopiedKey>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Without this, copying and then navigating away leaves a timer holding a
  // setState on an unmounted component.
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copyText = useCallback(async (text: string, key: CopiedKey) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // navigator.clipboard needs a secure context; fall back for plain http.
      const el = document.createElement('textarea')
      el.value = text
      el.style.cssText = 'position:fixed;pointer-events:none;opacity:0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(key)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 2400)
  }, [])

  const snippets: { key: CopiedKey; label: string; lang: string; text: string; hint: string }[] = [
    { key: 'markdown', label: 'Markdown',   lang: 'md',   text: `![Letterboxd Stats](${url})`,              hint: 'GitHub READMEs, Notion, any markdown' },
    { key: 'html',     label: 'HTML',       lang: 'html', text: `<img src="${url}" alt="Letterboxd Stats" />`, hint: 'Portfolio sites, personal pages' },
    { key: 'url',      label: 'Direct URL', lang: 'url',  text: url,                                        hint: 'Paste anywhere that renders images' },
  ]

  return (
    <div className="space-y-3">
      {/* Announces the copy without stealing focus from the button. */}
      <p aria-live="polite" className="sr-only">
        {copied ? `${snippets.find(s => s.key === copied)?.label} copied to clipboard` : ''}
      </p>

      {snippets.map(s => {
        const isCopied = copied === s.key
        return (
          <div key={s.key}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] uppercase tracking-widest font-medium text-muted2 font-sans">
                  {s.label}
                </span>
                <span className="text-[10px] text-muted2 font-sans">· {s.hint}</span>
              </div>
              {isCopied && (
                <span className="flex items-center gap-1 text-[11px] font-medium animate-fade-in text-accent font-sans">
                  <CheckIcon />
                  Copied!
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => copyText(s.text, s.key)}
              className="group w-full text-left relative rounded overflow-hidden transition-all duration-150 active:scale-[0.995] bg-surface2 border"
              style={{
                borderColor: isCopied ? 'var(--accentline)' : 'var(--border2)',
                boxShadow: isCopied ? '0 0 0 3px var(--accentbg)' : 'none',
              }}
              aria-label={`Copy ${s.label} snippet`}
            >
              <span className="absolute top-2.5 left-3 text-[10px] px-1.5 py-0.5 rounded font-medium bg-surface3 text-muted font-mono select-none">
                {s.lang}
              </span>

              <span
                aria-hidden="true"
                className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                style={{ color: isCopied ? 'var(--accent)' : 'var(--muted)' }}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </span>

              <p
                className="px-4 pt-8 pb-3 text-xs break-all leading-relaxed font-mono transition-colors duration-200"
                style={{ color: isCopied ? 'var(--accent3)' : 'var(--accent)' }}
              >
                {s.text}
              </p>
            </button>
          </div>
        )
      })}

      <p className="text-[11px] pt-1 text-muted2 font-sans">
        Cards refresh automatically every hour. No authentication required.
      </p>
    </div>
  )
}
