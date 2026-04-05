import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
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
