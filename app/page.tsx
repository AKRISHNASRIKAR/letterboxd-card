import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Steps } from '@/components/sections/Steps'
import { Features } from '@/components/sections/Features'
import { ApiReference } from '@/components/sections/ApiReference'
import { Cta } from '@/components/sections/Cta'
import { SiteFooter } from '@/components/sections/SiteFooter'
import { clampCount, DEFAULT_COUNT } from '@/lib/api'

// A server component. Everything below except <Generator>, which <Hero> renders,
// is static markup that never reaches the browser as JavaScript.

interface PageProps {
  searchParams: { user?: string; count?: string }
}

/** Same shape the backend validator enforces, applied before it reaches state. */
const parseUser = (raw?: string): string => {
  const clean = (raw ?? '').trim().replace(/^@/, '').toLowerCase()
  return /^[a-z0-9_-]{1,50}$/.test(clean) ? clean : ''
}

export default function HomePage({ searchParams }: PageProps) {
  const initialUser = parseUser(searchParams.user)
  const initialCount = searchParams.count
    ? clampCount(Number(searchParams.count))
    : DEFAULT_COUNT

  return (
    <div className="font-sans">
      <Nav />
      <main>
        <Hero initialUser={initialUser} initialCount={initialCount} />
        <Steps />
        <Features />
        <ApiReference />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
