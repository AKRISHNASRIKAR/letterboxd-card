import { GitHubIcon, ArrowRight } from '@/components/icons'
import { REPO_URL } from '@/lib/site'

export function Cta() {
  return (
    <section className="max-w-2xl mx-auto px-6 pb-20">
      <div className="rounded-lg px-8 py-10 text-center relative overflow-hidden bg-surface border border-accentline">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 500px 300px at 50% 100%, rgba(0,224,84,0.07) 0%, transparent 70%)' }}
        />

        <p className="text-xs uppercase tracking-widest mb-4 relative text-accent font-sans">Open source</p>
        <h2 className="text-2xl mb-3 relative font-serif font-bold text-text" style={{ letterSpacing: '-0.02em' }}>
          Love it? Star it.
        </h2>
        <p className="text-sm mb-8 max-w-sm mx-auto relative text-text2 font-sans">
          Fully open source. Fork it, contribute themes, report bugs, or just leave a ★.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all accent-glow no-underline bg-accent text-on-accent font-sans hover:bg-[color:var(--accent-hover)]"
        >
          <GitHubIcon />
          Star on GitHub
          <ArrowRight />
        </a>
      </div>
    </section>
  )
}
