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
        poppins: ['Poppins', 'sans-serif'],
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
        primary: '#2B3499',
        yellow: '#FF9209',
        dark: '#111729',
        'dark-2': '#677489',
        light: '#FFD099',
        white: '#FFFFFF',
        black: '#000000',
        background: '#232946',
        headline: '#fffffe',
        paragraph: '#b8c1ec',
        button: '#F8C660',
        'button-2': '#004643',
        'button-3': '#ABD1C6',
        'button-text': '#232946',
        stroke: '#121629',
        main: '#004643B2',
        secondary: '#fffffe',
      },
      boxShadow: {
        'bottom-right': '0px 0px 28px 0px rgba(21,21,21,0.55)',
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
