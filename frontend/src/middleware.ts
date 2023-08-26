import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ca', 'en'],
  defaultLocale: 'ca',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
