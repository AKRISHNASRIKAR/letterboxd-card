'use client'

import { useState, useCallback } from 'react'
import { getCardUrl } from '@/lib/api'
import type { Theme } from '@/types/letterboxd'

interface CopyableLinkProps {
  username: string
  theme:    Theme
}

type CopiedKey = 'markdown' | 'html' | 'url' | null

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function CopyableLink({ username, theme }: CopyableLinkProps) {
  const [copied, setCopied] = useState<CopiedKey>(null)

  const url      = getCardUrl(username, theme)
  const markdown = `![Letterboxd Stats](${url})`
  const html     = `<img src="${url}" alt="Letterboxd Stats" />`

  const copyText = useCallback(async (text: string, key: CopiedKey) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea')
      el.value = text
      el.style.cssText = 'position:fixed;pointer-events:none;opacity:0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(key)
    setTimeout(() => setCopied(null), 2400)
  }, [])

  const snippets: {
    key:   CopiedKey
    label: string
    lang:  string
    text:  string
    hint:  string
  }[] = [
    {
      key:   'markdown',
      label: 'Markdown',
      lang:  'md',
      text:  markdown,
      hint:  'GitHub READMEs, Notion, any markdown',
    },
    {
      key:   'html',
      label: 'HTML',
      lang:  'html',
      text:  html,
      hint:  'Portfolio sites, personal pages',
    },
    {
      key:   'url',
      label: 'Direct URL',
      lang:  'url',
      text:  url,
      hint:  'Paste anywhere that renders images',
    },
  ]

  return (
    <div className="space-y-3">
      {snippets.map(s => {
        const isCopied = copied === s.key
        return (
          <div key={s.key}>
            {/* label row */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] uppercase tracking-widest font-medium"
                  style={{ color: 'var(--muted2)', fontFamily: 'var(--sans)' }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: 'var(--muted2)', fontFamily: 'var(--sans)' }}
                >
                  · {s.hint}
                </span>
              </div>
              {isCopied && (
                <span
                  className="flex items-center gap-1 text-[11px] font-medium animate-fade-in"
                  style={{ color: 'var(--green)', fontFamily: 'var(--sans)' }}
                >
                  <CheckIcon />
                  Copied!
                </span>
              )}
            </div>

            {/* snippet block */}
            <button
              type="button"
              onClick={() => copyText(s.text, s.key)}
              className="group w-full text-left relative rounded-xl overflow-hidden transition-all duration-150 active:scale-[0.995]"
              style={{
                background:   'var(--surface2)',
                border:       isCopied
                  ? '1px solid rgba(82,194,122,0.35)'
                  : '1px solid var(--border2)',
                boxShadow:    isCopied ? '0 0 0 3px rgba(82,194,122,0.07)' : 'none',
              }}
              title={`Click to copy ${s.label}`}
            >
              {/* lang tag */}
              <span
                className="absolute top-2.5 left-3 text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background:  'var(--surface3)',
                  color:       'var(--muted)',
                  fontFamily:  'var(--mono)',
                  userSelect:  'none',
                }}
              >
                {s.lang}
              </span>

              {/* copy / check icon */}
              <span
                className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: isCopied ? 'var(--green)' : 'var(--muted)' }}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </span>

              {/* code text */}
              <p
                className="px-4 pt-8 pb-3 text-xs break-all leading-relaxed"
                style={{
                  color:      isCopied ? 'var(--green)' : 'rgba(212,168,83,0.8)',
                  fontFamily: 'var(--mono)',
                  transition: 'color 0.2s',
                }}
              >
                {s.text}
              </p>
            </button>
          </div>
        )
      })}

      {/* footnote */}
      <p
        className="text-[11px] pt-1"
        style={{ color: 'var(--muted2)', fontFamily: 'var(--sans)' }}
      >
        Cards refresh automatically every hour. No authentication required.
      </p>
    </div>
  )
}
