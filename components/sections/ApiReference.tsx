import { apiBase, MAX_COUNT, MIN_COUNT } from '@/lib/api'
import { DEMO_USER } from '@/lib/site'

// Kept deliberately literal about what the backend does. v1 advertised a `theme`
// parameter that had already been removed, a `width` the renderer ignores, a
// `count` range twice what it honours, and described the SVG endpoint as PNG.

const ENDPOINTS = [
  {
    path: '/api/card',
    desc: 'SVG stat card — use directly in an img src',
    params: `?user= &count=${MIN_COUNT}-${MAX_COUNT}`,
  },
  { path: '/api/stats', desc: 'Full profile stats as JSON', params: '?user=' },
  { path: '/api/films', desc: 'Recent watches as JSON',     params: '?user= &count=1-20' },
  { path: '/api/lists', desc: "Public lists as JSON",       params: '?user=' },
]

const RESPONSES = [
  { code: '200', tone: 'accent' as const, desc: 'Card or JSON payload' },
  { code: '404', tone: 'muted'  as const, desc: 'No such Letterboxd member' },
  { code: '429', tone: 'orange' as const, desc: 'Rate limited — back off and retry' },
  { code: '502', tone: 'red'    as const, desc: "Letterboxd's bot protection blocked the scrape" },
]

const TONE: Record<'accent' | 'orange' | 'muted' | 'red', string> = {
  accent: 'bg-accentbg text-accent border-accentline',
  orange: 'bg-orangebg text-orange border-orangeline',
  muted:  'bg-white/[0.04] text-muted2 border-border2',
  red:    'bg-redbg text-red border-redline',
}

export function ApiReference() {
  const base = apiBase() || 'https://letterboxd-card-backend.vercel.app'

  return (
    <section id="api" className="max-w-2xl mx-auto px-6 py-20 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-3 font-serif font-bold text-text" style={{ letterSpacing: '-0.02em' }}>
          API reference
        </h2>
        <p className="text-sm text-text2">
          Every endpoint takes <code className="code-pill">?user=USERNAME</code>. Nothing else is required.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-border">
        {ENDPOINTS.map((ep, i) => (
          <div
            key={ep.path}
            className={`flex items-center gap-4 px-5 py-4 transition-colors bg-surface hover:bg-surface2 ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <span className="text-xs font-semibold px-2 py-1 rounded-lg shrink-0 bg-accentbg text-accent border border-accentline font-mono text-center" style={{ minWidth: '42px' }}>
              GET
            </span>
            <code className="text-sm shrink-0 text-accent font-mono">{ep.path}</code>
            <span className="text-xs flex-1 hidden sm:block text-muted font-sans">{ep.desc}</span>
            <code className="text-[11px] hidden md:block shrink-0 text-muted2 font-mono">{ep.params}</code>
          </div>
        ))}
      </div>

      {/* Response codes — the 502 in particular, since a blocked scrape looks
          nothing like a missing user and callers need to tell them apart. */}
      <div className="mt-6">
        <p className="text-xs mb-2 text-muted2 font-sans">Responses</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RESPONSES.map(r => (
            <div key={r.code} className="flex items-center gap-3 rounded px-3 py-2.5 bg-surface border border-border">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border font-mono shrink-0 ${TONE[r.tone]}`}>
                {r.code}
              </span>
              <span className="text-xs text-muted font-sans">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs mb-2 text-muted2 font-sans">Example</p>
        <div className="rounded px-4 py-3.5 overflow-x-auto bg-surface2 border border-border">
          <code className="text-xs whitespace-nowrap font-mono text-accent">
            curl &quot;{base}/api/stats?user={DEMO_USER}&quot;
          </code>
        </div>
      </div>
    </section>
  )
}
