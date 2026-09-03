import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        xs: ['0.6875rem', { lineHeight: '1rem' }],
        sm: ['0.9375rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        ink: '#14231F',
        'ink-2': '#1D302A',
        paper: '#F7F3E8',
        marquee: '#E8A33D',
        'marquee-dark': '#C6832A',
        mint: '#4F9D80',
        ember: '#C1443C',
        slate: '#6B7A73',
      },
      boxShadow: {
        ticket: '0 1px 0 rgba(20,35,31,0.4), 0 8px 20px -8px rgba(0,0,0,0.5)',
        tile: 'inset 0 -3px 0 rgba(0,0,0,0.35), 0 6px 14px -6px rgba(0,0,0,0.6)',
      },
    },

    variants: {
      extend: {
        backgroundColor: ['hover', 'focus'],
        borderColor: ['hover', 'focus'],
        textColor: ['hover', 'focus'],
        borderWidth: ['hover', 'focus'],
      },
    },
  },
  plugins: [],
};
export default config;
