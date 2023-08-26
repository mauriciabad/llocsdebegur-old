import createMiddleware from 'next-intl/middleware'
import { locales, pathnames, defaultLocale } from './navigation'

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
