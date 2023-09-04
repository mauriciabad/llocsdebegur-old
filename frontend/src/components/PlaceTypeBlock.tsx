'use client'

import { PlaceType, SimpleType } from '@/lib/gql'
import { useTranslations } from 'use-intl'
import PlaceIcon from './PlaceIcon'
import classNames from 'classnames'
import Link from 'next-intl/link'
import { DeepPick } from '@/lib/types'

export default function PlaceTypeBlock({
  placeType,
  className,
}: {
  placeType: DeepPick<
    SimpleType<PlaceType>,
    'name' | 'namePlural' | 'nameGender' | 'slug'
  >
  className?: string
}) {
  const t = useTranslations('Landing')

  return (
    <Link
      href={`/${placeType.slug}`}
      className={classNames([
        className,
        'group rounded-2xl border border-stone-200 bg-white p-4 shadow-md outline-2 outline-brand-100 hover:outline',
      ])}
    >
      <PlaceIcon
        type={placeType.slug}
        className="mx-auto mb-4 mt-6 h-12 w-12 stroke-1 text-brand-600"
      />
      <h2 className="font-title text-3xl font-bold capitalize text-stone-800">
        {placeType.namePlural}
      </h2>
      <span className="mt-6 inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800">
        {t('view-all', { gender: placeType.nameGender })}
      </span>
    </Link>
  )
}
