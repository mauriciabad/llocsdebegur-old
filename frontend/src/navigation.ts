import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

export const locales = ['en', 'ca'] as const
export const defaultLocale = 'ca'

export const pathnames = {
  '/': '/',

  '/platjes': {
    ca: '/platjes',
    en: '/beaches',
  },

  '/platjes/[slug]': {
    ca: '/platjes/[slug]',
    en: '/beaches/[slug]',
  },
} satisfies Pathnames<typeof locales>

export const {
  Link: MyLink,
  redirect,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames })
