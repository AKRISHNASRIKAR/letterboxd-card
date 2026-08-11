import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/icons'
import { REPO_URL } from '@/lib/site'

const LINKS = [
  { label: 'How it works', href: '#docs' },
  { label: 'API',          href: '#api' },
]

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-border"
      style={{ background: 'rgba(9,9,11,0.82)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-medium text-accent font-mono">letterboxd-card</span>
        <Badge variant="accent">v2.0</Badge>
      </div>

      <div className="hidden sm:flex items-center gap-1">
        {LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="px-3 py-1.5 rounded-lg text-xs transition-colors text-muted hover:text-text font-sans no-underline"
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all no-underline text-text2 border border-border2 bg-transparent hover:text-text hover:border-border3 hover:bg-surface2 font-sans"
      >
        <GitHubIcon />
        <span>Star on GitHub</span>
      </a>
    </nav>
  )
}
