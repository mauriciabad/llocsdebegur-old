import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
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
          description
          cover {
            data {
              attributes {
                url
                height
                width
                alternativeText
              }
            }
          }
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

  if (!places)
    throw new Error(
      `Error fetching data of place type list "${placeTypePluralTranslated}"`
    )

  return <SubPage type={type} places={places.filter(nonNullable)} />
}

function SubPage({
  type,
  places,
}: {
  type: PlaceType
  places: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'slug'
    | 'description'
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
  >[]
}) {
  const t = useTranslations('Enums.placeType')

  return (
    <main className="mx-auto max-w-6xl p-4">
      <PlaceIcon
        type={type}
        className="mx-auto text-brand-600 mb-4 mt-8 h-12 w-12 stroke-1"
      />
      <h2 className="font-bold text-4xl font-title text-stone-800 text-center">
        {t(type, { count: 2 })}
      </h2>
      <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.64),1fr))] gap-6">
        {places.map(
          (place) =>
            place && (
              <li key={place.slug}>
                <MyLink
                  href={{
                    pathname: `/${type}/[placeSlug]`,
                    params: { placeSlug: place.slug ?? 'null' },
                  }}
                  className="block overflow-hidden shadow-md border border-stone-200 bg-white rounded-2xl group outline-2 hover:outline outline-brand-100"
                >
                  {place.cover && (
                    <StrapiImage
                      image={place.cover}
                      className="aspect-[4/3] object-cover"
                    />
                  )}
                  <h2 className="mx-4 mt-3 text-xl font-title font-bold text-stone-800">
                    {place.name}
                  </h2>
                  <p className="mx-4 mt-1 mb-4">{place.description}</p>
                </MyLink>
              </li>
            )
        )}
      </ul>
    </main>
  )
}
