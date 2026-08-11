// The three step numbers carry the Letterboxd trio — the same orange/green/blue
// that runs along the top of the hero and sits in the card's own footer.
const STEPS = [
  { num: '01', tone: 'text-orange', title: 'Enter your username', desc: 'Type your Letterboxd username above and hit Generate. No account, no token.' },
  { num: '02', tone: 'text-accent', title: 'Preview and tune',    desc: 'See the card render live, check the numbers against the data panel, and pick how many posters to show.' },
  { num: '03', tone: 'text-blue',   title: 'Copy and paste',      desc: 'Click any snippet to copy it. Paste the markdown straight into your GitHub README — done.' },
]

export function Steps() {
  return (
    <section id="docs" className="max-w-2xl mx-auto px-6 py-20 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-3 font-serif font-bold text-text" style={{ letterSpacing: '-0.02em' }}>
          Three steps, done.
        </h2>
        <p className="text-sm text-text2">No accounts, no API keys, no maintenance.</p>
      </div>

      <ol className="space-y-3 list-none">
        {STEPS.map(s => (
          <li
            key={s.num}
            className="flex items-start gap-5 rounded-lg px-6 py-5 transition-colors duration-200 bg-surface border border-border hover:border-border2"
          >
            <span
              aria-hidden="true"
              className={`text-2xl font-bold shrink-0 leading-none mt-0.5 select-none font-mono ${s.tone}`}
            >
              {s.num}
            </span>
            <div>
              <p className="text-sm font-semibold mb-1 text-text font-sans">{s.title}</p>
              <p className="text-xs leading-relaxed text-muted font-sans">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
