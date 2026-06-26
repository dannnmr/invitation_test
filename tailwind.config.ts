import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:        'var(--color-black)',
        'black-soft': 'var(--color-black-soft)',
        surface:      'var(--color-surface)',
        gold: {
          DEFAULT: 'var(--color-gold)',
          light:   'var(--color-gold-light)',
          dark:    'var(--color-gold-dark)',
        },
        cream: {
          DEFAULT: 'var(--color-cream)',
          muted:   'var(--color-cream-muted)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'elastic':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
