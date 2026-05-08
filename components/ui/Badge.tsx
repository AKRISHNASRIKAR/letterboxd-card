type Variant = 'accent' | 'green' | 'muted' | 'live'

interface BadgeProps {
  children:  React.ReactNode
  variant?:  Variant
  dot?:      boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  accent: 'bg-accentbg  text-accent border-[rgba(212,168,83,0.22)]',
  green:  'bg-greenbg   text-green  border-[rgba(82,194,122,0.22)]',
  muted:  'bg-white/[0.04] text-muted border-white/[0.07]',
  live:   'bg-greenbg   text-green  border-[rgba(82,194,122,0.22)]',
}

const dotStyles: Record<Variant, string> = {
  accent: 'bg-accent',
  green:  'bg-green',
  muted:  'bg-muted',
  live:   'bg-green animate-pulse',
}

export function Badge({ children, variant = 'muted', dot = false, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-[5px] rounded-full
        text-[11px] font-sans font-medium tracking-wide
        border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`} />}
      {children}
    </span>
  )
}
