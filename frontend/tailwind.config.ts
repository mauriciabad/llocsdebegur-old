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
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
