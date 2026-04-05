'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/Button'

interface UserInputProps {
  onGenerate: (username: string) => void
  loading:    boolean
}

export function UserInput({ onGenerate, loading }: UserInputProps) {
  const [value,   setValue]   = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(() => {
    // strip leading @ if user types it
    const clean = value.trim().replace(/^@/, '').toLowerCase()
    if (clean) onGenerate(clean)
  }, [value, onGenerate])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const isEmpty = !value.trim()

  return (
    <div className="flex gap-3 items-stretch">
      {/* ── input ── */}
      <div
        className="relative flex-1 transition-all duration-200"
        style={{
          background:   'var(--surface2)',
          border:       `1px solid ${focused ? 'rgba(212,168,83,0.4)' : 'var(--border2)'}`,
          borderRadius: 'var(--radius)',
          boxShadow:    focused
            ? '0 0 0 3px rgba(212,168,83,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* @ symbol */}
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-sm"
          style={{
            color:      focused || value ? 'rgba(212,168,83,0.55)' : 'var(--muted2)',
            fontFamily: 'var(--mono)',
            transition: 'color 0.15s',
          }}
        >
          @
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your-username"
          disabled={loading}
          className="w-full bg-transparent text-sm outline-none disabled:opacity-50"
          style={{
            color:      'var(--text)',
            fontFamily: 'var(--mono)',
            padding:    '13px 16px 13px 30px',
            caretColor: 'var(--accent)',
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />

        {/* clear button */}
        {value && !loading && (
          <button
            onClick={() => { setValue(''); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
            style={{ color: 'var(--muted)', background: 'transparent' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text2)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
            tabIndex={-1}
            type="button"
            title="Clear"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── submit ── */}
      <Button
        onClick={handleSubmit}
        disabled={isEmpty}
        loading={loading}
        size="md"
        variant="primary"
      >
        {loading ? 'Fetching' : 'Generate'}
        {!loading && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        )}
      </Button>
    </div>
  )
}
