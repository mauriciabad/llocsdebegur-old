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

  '/beaches/[place-slug]': {
    ca: '/platjes/[place-slug]',
    en: '/beaches/[place-slug]',
  },

  '/landmarks': {
    ca: '/monuments',
    en: '/landmarks',
  },

  '/landmarks/[place-slug]': {
    ca: '/monuments/[place-slug]',
    en: '/landmarks/[place-slug]',
  },
} satisfies Pathnames<typeof locales>

export const {
  Link: MyLink,
  redirect,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames })
