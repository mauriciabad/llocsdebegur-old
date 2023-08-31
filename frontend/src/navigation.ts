import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

export const locales = ['en', 'ca'] as const
export const defaultLocale = 'ca'

export const pathnames = {
  '/': '/',

  '/beaches': {
    ca: '/platjes',
    en: '/beaches',
  },

  '/beaches/[placeSlug]': {
    ca: '/platjes/[placeSlug]',
    en: '/beaches/[placeSlug]',
  },

  '/landmarks': {
    ca: '/monuments',
    en: '/landmarks',
  },

  '/landmarks/[placeSlug]': {
    ca: '/monuments/[placeSlug]',
    en: '/landmarks/[placeSlug]',
  },
} satisfies Pathnames<typeof locales>

export const {
  Link: MyLink,
  redirect,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames })
