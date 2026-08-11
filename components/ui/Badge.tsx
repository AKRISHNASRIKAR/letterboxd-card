// In Letterboxd's palette the brand colour and the success colour are the same
// green, so v2's separate `accent` and `green` variants collapsed into one.
// `orange` and `blue` complete the brand trio.
type Variant = 'accent' | 'orange' | 'blue' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  dot?: boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  accent: 'bg-accentbg text-accent border-accentline',
  orange: 'bg-orangebg text-orange border-orangeline',
  blue:   'bg-bluebg   text-blue   border-blueline',
  muted:  'bg-white/[0.04] text-muted border-border2',
}

// v1 had a `live` variant, unused, whose class string was the only reason
// Tailwind emitted @keyframes pulse — which the hero dot then relied on via an
// inline `animation: pulse`. That coupling is gone: the hero uses
// .animate-soft-pulse, defined explicitly in globals.css.
const dotStyles: Record<Variant, string> = {
  accent: 'bg-accent',
  orange: 'bg-orange',
  blue:   'bg-blue',
  muted:  'bg-muted',
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
      {dot && <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`} />}
      {children}
    </span>
  )
}
