/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
  locales: ['ca', 'en'],
  defaultLocale: 'ca',
  images: {
    domains: [
      process.env.NODE_ENV === 'production'
        ? 'https://cms.begur.s.mauri.app'
        : 'http://localhost:1337',
    ],
  },
}

const withNextIntl = require('next-intl/plugin')('./i18n.ts')

module.exports = withNextIntl(nextConfig)
