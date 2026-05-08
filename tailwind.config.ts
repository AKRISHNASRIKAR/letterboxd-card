import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        surface2: 'var(--surface2)',
        surface3: 'var(--surface3)',
        border:   'var(--border)',
        border2:  'var(--border2)',
        border3:  'var(--border3)',
        text:     'var(--text)',
        text2:    'var(--text2)',
        muted:    'var(--muted)',
        muted2:   'var(--muted2)',
        accent:   'var(--accent)',
        accent2:  'var(--accent2)',
        accent3:  'var(--accent3)',
        green:    'var(--green)',
        red:      'var(--red)',
      },
      backgroundColor: {
        accentbg:  'var(--accentbg)',
        accentbg2: 'var(--accentbg2)',
        greenbg:   'var(--greenbg)',
        redbg:     'var(--redbg)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        border2: 'var(--border2)',
        border3: 'var(--border3)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        serif: ['Playfair\\ Display', 'Georgia', 'serif'],
        mono:  ['DM\\ Mono', 'Fira Code', 'monospace'],
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow':  'spin 1.4s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-up':    'fadeUp 0.5s ease both',
        'fade-in':    'fadeIn 0.4s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
