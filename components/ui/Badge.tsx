type Variant = 'accent' | 'green' | 'muted' | 'live'

interface BadgeProps {
  children:  React.ReactNode
  variant?:  Variant
  dot?:      boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  accent: 'bg-[rgba(212,168,83,0.1)]  text-[#d4a853] border-[rgba(212,168,83,0.22)]',
  green:  'bg-[rgba(82,194,122,0.1)]  text-[#52c27a] border-[rgba(82,194,122,0.22)]',
  muted:  'bg-white/[0.04]            text-[var(--muted)] border-white/[0.07]',
  live:   'bg-[rgba(82,194,122,0.1)]  text-[#52c27a] border-[rgba(82,194,122,0.22)]',
}

const dotStyles: Record<Variant, string> = {
  accent: 'bg-[#d4a853]',
  green:  'bg-[#52c27a]',
  muted:  'bg-[var(--muted)]',
  live:   'bg-[#52c27a] animate-pulse',
}

export function Badge({ children, variant = 'muted', dot = false, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-[5px] rounded-full
        text-[11px] font-medium tracking-wide
        border
        ${variantStyles[variant]}
        ${className}
      `}
      style={{ fontFamily: 'var(--sans)' }}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`}
        />
      )}
      {children}
    </span>
  )
}
