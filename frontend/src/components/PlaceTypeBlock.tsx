'use client'

import { PlaceType, placeTypeGenderByLocale, placeTypePlural } from '@/lib/gql'
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

  const typePlural = placeTypePlural[type]
  const typeGender = placeTypeGenderByLocale[locale][type]
  console.log(typeGender)

  return (
    <MyLink
      href={`/${typePlural}`}
      className={classNames([
        className,
        'border border-stone-200 bg-white rounded-2xl p-4 group outline-2 hover:outline outline-brand-100',
      ])}
    >
      <PlaceIcon
        type={type}
        className="mx-auto text-brand-600 mb-4 mt-6 h-12 w-12 stroke-1"
      />
      <h2 className="font-bold text-3xl font-title text-stone-800">
        {t2(type, { count: 2 })}
      </h2>
      <span className="px-8 py-3 leading-none bg-brand-600 text-white uppercase rounded-full inline-block mt-6 outline-none group-hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-stone-700">
        {t('view-all', { gender: typeGender })}
      </span>
    </MyLink>
  )
}
