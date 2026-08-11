import { ImageResponse } from 'next/og'

// Generated at build time so link previews have something to show. Deliberately
// not `runtime = 'edge'`: on the Node runtime this is prerendered to a static PNG
// instead of being rendered per request.
//
// Palette matches the site and the card — see app/globals.css.

export const alt = 'Letterboxd Card — embeddable stat cards for Letterboxd profiles'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG = '#14181c'
const TRIO = ['#ff8000', '#00e054', '#40bcf4']

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 90px',
          background: BG,
          color: '#ddeeff',
        }}
      >
        {/* film-strip rule, cycling the trio like the site header */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 48 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: TRIO[i % 3] }} />
          ))}
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#00e054', letterSpacing: 4 }}>
          LETTERBOXD-CARD
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Your Letterboxd stats,</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, color: '#00e054' }}>
            everywhere you write.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#b8c6d4', marginTop: 36 }}>
          One URL. Any README. No auth required.
        </div>
      </div>
    ),
    size,
  )
}
