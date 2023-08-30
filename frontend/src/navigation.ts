import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

export const locales = ['en', 'ca'] as const
export const defaultLocale = 'ca'

export const pathnames = {
  '/': '/',

  '/places/beaches': {
    ca: '/llocs/platjes',
    en: '/places/beaches',
  },

  '/places/beaches/[slug]': {
    ca: '/llocs/platjes/[slug]',
    en: '/places/beaches/[slug]',
  },

  '/places/landmarks': {
    ca: '/llocs/monuments',
    en: '/places/landmarks',
  },

  '/places/landmarks/[slug]': {
    ca: '/llocs/monuments/[slug]',
    en: '/places/landmarks/[slug]',
  },
} satisfies Pathnames<typeof locales>

export const {
  Link: MyLink,
  redirect,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames })
