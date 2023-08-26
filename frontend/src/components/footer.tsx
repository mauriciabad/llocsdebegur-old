'use client'

import Link from 'next/link'
import { IconLanguage } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('Footer')
  const pathname = usePathname()
  return (
    <footer className="sticky top-full inset-x-0 p-4 bg-sky-100 text-center">
      <div>
        <IconLanguage className="text-sky-500 inline-block" />
        <span>{t('view-in')}</span>
        <Link href={pathname} locale="ca" className="underline ml-2">
          Català
        </Link>
        <Link href={pathname} locale="en" className="underline ml-2">
          English
        </Link>
      </div>
    </footer>
  )
}
