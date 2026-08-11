const FEATURES = [
  { icon: '🎬', title: 'Rich stat cards', desc: 'Total films, films this year, lists, followers, and your most recent watches — one image.' },
  { icon: '⚡', title: 'Edge-cached',     desc: 'Vercel CDN in front of Redis. Cards serve in milliseconds and refresh hourly.' },
  { icon: '🔗', title: 'One URL',         desc: 'Works in any <img> tag — GitHub, Notion, portfolios, personal sites.' },
  { icon: '📦', title: 'JSON API',        desc: 'Prefer raw data? Hit /api/stats and build your own UI on top of it.' },
  { icon: '🛠️', title: 'Self-hostable',   desc: 'One-click Vercel deploy. MIT licensed. Fork it, own it, run it yourself.' },
  { icon: '🔒', title: 'No auth',         desc: 'Nothing to sign up for and nothing to leak — it only reads public profiles.' },
]

export function Features() {
  return (
    <section id="features" className="max-w-2xl mx-auto px-6 py-20 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-3 font-serif font-bold text-text" style={{ letterSpacing: '-0.02em' }}>
          Everything you need
        </h2>
        <p className="text-sm text-text2">No auth. No API key. No setup. Just a URL.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {FEATURES.map(f => (
          <div
            key={f.title}
            className="rounded-lg p-5 transition-colors duration-200 bg-surface border border-border hover:border-border2"
          >
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-4 bg-accentbg border border-accentline"
            >
              {f.icon}
            </div>
            <p className="text-sm font-semibold mb-1.5 text-text font-sans">{f.title}</p>
            <p className="text-xs leading-relaxed text-muted font-sans">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
