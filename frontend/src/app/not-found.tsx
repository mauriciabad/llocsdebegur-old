import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export default function Page() {
  const t = useTranslations('NotFoundPage')

  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-6xl mt-4 mb-8 font-title text-stone-800">
        {t('title')}
      </h1>
      <MyLink
        href="/"
        className="text-white bg-brand-700 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800"
      >
        {t('go-home')}
      </MyLink>
    </main>
  )
}
