import createMiddleware from 'next-intl/middleware'

const locales = ['en', 'ca'] as const
export type Locale = (typeof locales)[number]
const defaultLocale = 'ca'

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
