import { REPO_LINKS } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="px-6 py-8 border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <span className="text-sm text-muted font-mono">letterboxd-card</span>
          {REPO_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors no-underline text-muted2 hover:text-text2 font-sans"
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted2 font-sans">Not affiliated with Letterboxd.</p>
      </div>
    </footer>
  )
}
