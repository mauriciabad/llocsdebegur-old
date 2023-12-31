import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brand: {
          DEFAULT: '#5F797A',
          50: '#DBE3E1',
          100: '#CDD8D5',
          200: '#B0C2BF',
          300: '#94ABA9',
          400: '#779594',
          500: '#5F797A',
          600: '#4D6163',
          700: '#3B494C',
          800: '#293235',
          900: '#181C1E',
          950: '#0F1113',
        },
      },
      fontFamily: {
        title: [
          'var(--font-poppins)',
          'var(--font-inter)',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        hover: 'hover 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        wiggle: 'wiggle 10s -5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
      },
      keyframes: {
        hover: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
        },
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
