import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export default function Page() {
  const t = useTranslations('NotFoundPage')

  return (
    <main className="flex flex-col items-center justify-center py-32">
      <h1 className="mb-8 mt-4 text-center font-title text-6xl text-stone-800">
        {t('title')}
      </h1>
      <MyLink
        href="/"
        className="mb-2 mr-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-300"
      >
        {t('go-home')}
      </MyLink>
    </main>
  )
}
