import { Generator } from '@/components/Generator'

interface HeroProps {
  initialUser: string
  initialCount: number
}

/**
 * Static copy renders on the server; only <Generator> ships to the browser.
 * In v1 the whole page was one "use client" component, so every headline and
 * paragraph on the page had to be hydrated before the input worked.
 */
export function Hero({ initialUser, initialCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 50% -80px, rgba(0,224,84,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 500px 400px at 85% 40%,   rgba(64,188,244,0.035) 0%, transparent 60%),
            radial-gradient(ellipse 400px 300px at 15% 60%,   rgba(255,128,0,0.03)  0%, transparent 60%)
          `,
        }}
      />

      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 film-strip-top" />

      <div className="relative max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
        <p
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8 animate-fade-up text-accent font-sans bg-accentbg border border-accentline"
        >
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent animate-soft-pulse" />
          Open source · MIT license · No auth required
        </p>

        <h1
          className="mb-5 leading-[1.05] animate-fade-up stagger-1 font-serif font-bold text-text"
          style={{ fontSize: 'clamp(34px, 6vw, 58px)', letterSpacing: '-0.02em' }}
        >
          Your Letterboxd stats,
          <br />
          <em className="text-accent not-italic sm:italic">everywhere you write.</em>
        </h1>

        <p className="text-base mb-12 max-w-md mx-auto leading-relaxed animate-fade-up stagger-2 text-text2">
          Generate a stat card from any Letterboxd profile. Embed it in your GitHub README,
          portfolio, or anywhere that renders an image URL.
        </p>

        <Generator initialUser={initialUser} initialCount={initialCount} />
      </div>
    </section>
  )
}
