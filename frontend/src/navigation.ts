import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'
import { plural } from './lib/gql'

export const locales = ['en', 'ca'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale = 'ca'

export const pathnames = {
  '/': '/',

  '/beach': {
    ca: `/${plural('beach', 'ca')}`,
    en: `/${plural('beach', 'en')}`,
  },

  '/beach/[placeSlug]': {
    ca: `/${plural('beach', 'ca')}/[placeSlug]`,
    en: `/${plural('beach', 'en')}/[placeSlug]`,
  },

  '/landmark': {
    ca: `/${plural('landmark', 'ca')}`,
    en: `/${plural('landmark', 'en')}`,
  },

  '/landmark/[placeSlug]': {
    ca: `/${plural('landmark', 'ca')}/[placeSlug]`,
    en: `/${plural('landmark', 'en')}/[placeSlug]`,
  },
} as const satisfies Pathnames<typeof locales>

export const {
  Link: MyLink,
  redirect,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames })
