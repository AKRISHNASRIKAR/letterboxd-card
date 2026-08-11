import type { Config } from 'tailwindcss'

// Every colour is a thin alias over the custom properties in app/globals.css, so
// the tokens have exactly one definition. Font families come from next/font,
// which sets --font-* on <html> (see app/layout.tsx).

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        surface2:  'var(--surface2)',
        surface3:  'var(--surface3)',
        text:      'var(--text)',
        text2:     'var(--text2)',
        muted:     'var(--muted)',
        muted2:    'var(--muted2)',
        decor:     'var(--decor)',
        accent:    'var(--accent)',
        accent2:   'var(--accent2)',
        accent3:   'var(--accent3)',
        'on-accent': 'var(--on-accent)',
        orange:    'var(--orange)',
        blue:      'var(--blue)',
        red:       'var(--red)',
      },
      backgroundColor: {
        accentbg:  'var(--accentbg)',
        accentbg2: 'var(--accentbg2)',
        orangebg:  'var(--orangebg)',
        bluebg:    'var(--bluebg)',
        redbg:     'var(--redbg)',
      },
      borderColor: {
        DEFAULT:    'var(--border)',
        border:     'var(--border)',
        border2:    'var(--border2)',
        border3:    'var(--border3)',
        accentline: 'var(--accentline)',
        orangeline: 'var(--orangeline)',
        blueline:   'var(--blueline)',
        redline:    'var(--redline)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease both',
        'fade-in':    'fadeIn 0.4s ease both',
        'soft-pulse': 'softPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        softPulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}

export default config
