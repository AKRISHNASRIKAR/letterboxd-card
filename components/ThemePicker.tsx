'use client'

import type { Theme } from '@/types/letterboxd'

const THEMES: {
  value:   Theme
  label:   string
  bg:      string
  preview: string
}[] = [
  {
    value:   'default',
    label:   'Default',
    bg:      '#ffffff',
    preview: 'bg-white border-gray-200',
  },
  {
    value:   'dark',
    label:   'Dark',
    bg:      '#0d0d0f',
    preview: 'bg-[#0d0d0f] border-white/10',
  },
  {
    value:   'minimal',
    label:   'Minimal',
    bg:      '#f7f5f0',
    preview: 'bg-[#f7f5f0] border-stone-200',
  },
]

interface ThemePickerProps {
  value:    Theme
  onChange: (t: Theme) => void
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="text-xs mr-1 shrink-0"
        style={{ color: 'var(--muted)', fontFamily: 'var(--sans)' }}
      >
        Theme
      </span>

      {THEMES.map(t => {
        const isActive = value === t.value
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-150 active:scale-95"
            style={{
              fontFamily:  'var(--sans)',
              border:      isActive
                ? '1px solid rgba(212,168,83,0.45)'
                : '1px solid var(--border2)',
              color:       isActive ? 'var(--accent)' : 'var(--muted)',
              background:  isActive ? 'var(--accentbg)' : 'transparent',
              fontWeight:  isActive ? 500 : 400,
            }}
          >
            {/* colour swatch */}
            <span
              className="w-3 h-3 rounded-full shrink-0 border"
              style={{
                background:   t.bg,
                borderColor:  isActive
                  ? 'rgba(212,168,83,0.4)'
                  : 'rgba(255,255,255,0.14)',
                boxShadow:    isActive ? `0 0 0 2px rgba(212,168,83,0.18)` : 'none',
                transition:   'box-shadow 0.15s',
              }}
            />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
