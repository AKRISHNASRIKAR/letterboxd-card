import { ImageResponse } from 'next/og'

// iOS ignores SVG favicons and wants a raster touch icon, so this mirrors
// app/icon.svg at the size Apple asks for. Rendered at build time.

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const BARS = ['#ff8000', '#00e054', '#40bcf4']

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 17,
          background: '#1c2228',
        }}
      >
        {BARS.map(color => (
          <div key={color} style={{ width: 34, height: 101, borderRadius: 17, background: color }} />
        ))}
      </div>
    ),
    size,
  )
}
