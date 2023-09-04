import { MyLink } from '@/navigation'
import { IconLanguage } from '@tabler/icons-react'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const currentLocale = useLocale()
  const targetLocale = currentLocale === 'en' ? 'ca' : 'en'
  const t = useTranslations('Footer')

  return (
    <footer className="sticky inset-x-0 top-full mt-16 bg-stone-100 p-4 text-center text-stone-900">
      <div>
        <IconLanguage className="mr-2 inline-block text-stone-700" />
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
