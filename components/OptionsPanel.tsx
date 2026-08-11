'use client'

import { MIN_COUNT, MAX_COUNT } from '@/lib/api'

interface OptionsPanelProps {
  count: number
  onCountChange: (count: number) => void
  disabled?: boolean
}

const COUNTS = Array.from({ length: MAX_COUNT - MIN_COUNT + 1 }, (_, i) => MIN_COUNT + i)

/**
 * Card options. Deliberately just the poster count: that is the only knob the
 * backend honours today. `width` is accepted and ignored by the renderer and
 * there is no `theme`, so neither gets a control here — a toggle that changes
 * nothing is worse than no toggle.
 */
export function OptionsPanel({ count, onCountChange, disabled = false }: OptionsPanelProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted2 font-sans">Posters</p>
        <p className="text-[11px] text-muted2 font-sans">Recent watches shown on the card</p>
      </div>

      <div
        role="radiogroup"
        aria-label="Number of posters"
        className="inline-flex items-center rounded-xl p-1 gap-1 bg-surface2 border border-border2"
      >
        {COUNTS.map(n => {
          const selected = n === count
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onCountChange(n)}
              className={`
                w-8 h-8 rounded-lg text-xs font-mono transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed
                ${selected
                  ? 'bg-accent text-on-accent font-semibold'
                  : 'text-muted hover:text-text hover:bg-white/[0.05]'}
              `}
            >
              {n}
            </button>
          )
        })}
      </div>
    </div>
  )
}
