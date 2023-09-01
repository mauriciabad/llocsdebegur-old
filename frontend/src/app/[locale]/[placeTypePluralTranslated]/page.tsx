import PlaceIcon from '@/components/PlaceIcon'
import {
  Place,
  PlaceType,
  SimpleType,
  defaultName,
  gqlClient,
  graphql,
  nonNullable,
  simplifyResponse,
} from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { MyLink } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'

const getAllPlacesOfTypeQuery = graphql(`
  query getAllPlacesOfType($locale: I18NLocaleCode!, $type: String!) {
    places(locale: $locale, filters: { type: { eq: $type } }) {
      data {
        attributes {
          name
          slug
        }
      }
    }
  }
`)

export default async function Page({
  params: { placeTypePluralTranslated },
}: {
  params: { placeTypePluralTranslated: string }
}) {
  const type = defaultName(placeTypePluralTranslated)
  if (!type) notFound()

  const locale = useLocale()
  const { data } = await gqlClient().query({
    query: getAllPlacesOfTypeQuery,
    variables: { locale, type },
  })

  const places = simplifyResponse(data)

  if (!places) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return <SubPage type={type} places={places.filter(nonNullable)} />
}

function SubPage({
  type,
  places,
}: {
  type: PlaceType
  places: DeepPick<SimpleType<Place>, 'name' | 'slug'>[]
}) {
  const t = useTranslations('Enums.placeType')

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
                    pathname: `/${type}/[placeSlug]`,
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
