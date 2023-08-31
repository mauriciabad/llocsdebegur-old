import PlaceIcon from '@/components/PlaceIcon'
import { Place, PlaceType, SimpleType, placeTypePlural } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'

export default function PlaceTypeLayout({
  type,
  places,
}: {
  type: PlaceType
  places: DeepPick<SimpleType<Place>, 'name' | 'slug'>[]
}) {
  const t = useTranslations('Enums.placeType')
  const typePlural = placeTypePlural[type]

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <PlaceIcon
        type={type}
        className="mx-auto text-brand-600 mb-4 mt-8 h-12 w-12 stroke-1"
      />
      <h2 className="font-bold text-4xl font-title text-stone-800">
        {t(type, { count: 2 })}
      </h2>
      <ul className="mt-6">
        {places.map(
          (place) =>
            place && (
              <li key={place.slug}>
                <MyLink
                  href={{
                    pathname: `/${typePlural}/[placeSlug]`,
                    params: { placeSlug: place.slug ?? 'null' },
                  }}
                  className="underline text-xl py-2 px-4 inline-block"
                >
                  {' '}
                  {place.name}
                </MyLink>
              </li>
            )
        )}
      </ul>
    </main>
  )
}
