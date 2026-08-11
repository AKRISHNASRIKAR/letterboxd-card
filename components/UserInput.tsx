'use client'

import { useState, useRef, useId } from 'react'
import { Button } from '@/components/ui/Button'

interface UserInputProps {
  /** Seeds the field on a deep link like /?user=akrishnasrikar */
  initialValue?: string
  onGenerate: (username: string) => void
  loading: boolean
}

export function UserInput({ initialValue = '', onGenerate, loading }: UserInputProps) {
  const [value, setValue] = useState(initialValue)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = value.trim().replace(/^@/, '').toLowerCase()
    if (clean) onGenerate(clean)
  }

  const isEmpty = !value.trim()

  return (
    // A real <form> so Enter submits and password managers/mobile keyboards
    // behave; v1 hand-rolled this with an onKeyDown handler.
    <form onSubmit={submit} className="flex gap-3 items-stretch">
      <label htmlFor={inputId} className="sr-only">
        Letterboxd username
      </label>

      <div
        className="relative flex-1 transition-all duration-200 bg-surface2 rounded"
        style={{
          border: `1px solid ${focused ? 'var(--accentline)' : 'var(--border2)'}`,
          boxShadow: focused
            ? '0 0 0 3px var(--accentbg), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <span
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-sm font-mono transition-colors duration-150"
          style={{ color: focused || value ? 'var(--accent)' : 'var(--muted2)' }}
        >
          @
        </span>

        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your-username"
          disabled={loading}
          className="w-full bg-transparent text-sm outline-none disabled:opacity-50 text-text font-mono"
          style={{ padding: '13px 16px 13px 30px', caretColor: 'var(--accent)' }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />

        {value && !loading && (
          <button
            onClick={() => { setValue(''); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors text-muted hover:text-text2 bg-transparent"
            tabIndex={-1}
            type="button"
            aria-label="Clear username"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <Button type="submit" disabled={isEmpty} loading={loading} size="md" variant="primary">
        {loading ? 'Fetching' : 'Generate'}
        {!loading && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </Button>
    </form>
  )
}
