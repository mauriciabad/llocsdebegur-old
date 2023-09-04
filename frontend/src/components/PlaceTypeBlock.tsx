'use client'

import { PlaceType, gender } from '@/lib/gql'
import { Locale, MyLink } from '@/navigation'
import { useLocale, useTranslations } from 'use-intl'
import PlaceIcon from './PlaceIcon'
import classNames from 'classnames'

export default function PlaceTypeBlock({
  type,
  className,
}: {
  type: PlaceType
  className?: string
}) {
  const locale = useLocale() as Locale
  const t = useTranslations('Landing')
  const t2 = useTranslations('Enums.placeType')

  const typeGender = gender(type, locale)

  return (
    <MyLink
      href={`/${type}`}
      className={classNames([
        className,
        'group rounded-2xl border border-stone-200 bg-white p-4 shadow-md outline-2 outline-brand-100 hover:outline',
      ])}
    >
      <PlaceIcon
        type={type}
        className="mx-auto mb-4 mt-6 h-12 w-12 stroke-1 text-brand-600"
      />
      <h2 className="font-title text-3xl font-bold text-stone-800">
        {t2(type, { count: 2 })}
      </h2>
      <span className="mt-6 inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800">
        {t('view-all', { gender: typeGender })}
      </span>
    </MyLink>
  )
}
