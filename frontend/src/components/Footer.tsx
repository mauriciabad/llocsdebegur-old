import { MyLink } from '@/navigation'
import { IconLanguage } from '@tabler/icons-react'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const currentLocale = useLocale()
  const targetLocale = currentLocale === 'en' ? 'ca' : 'en'
  const t = useTranslations('Footer')

  return (
    <footer className="sticky top-full inset-x-0 p-4 bg-sky-100 text-center">
      <div>
        <IconLanguage className="text-sky-500 inline-block mr-2" />
        <span>{t('switch-locale-description')}</span>
        <MyLink
          key={targetLocale}
          href={`/`}
          locale={targetLocale}
          hrefLang={targetLocale}
          className="underline"
        >
          {t('switch-locale-name')}
        </MyLink>
      </div>
    </footer>
  )
}
