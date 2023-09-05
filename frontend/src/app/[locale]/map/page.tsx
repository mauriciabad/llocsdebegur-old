import Map from '@/components/Map'
import {
  Place,
  SimpleType,
  gqlClient,
  graphql,
  nonNullable,
  simplifyResponse,
} from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'

const getAllPlacesQuery = graphql(`
  query getAllPlaces($locale: I18NLocaleCode!) {
    places(locale: $locale, pagination: { limit: 1000 }) {
      data {
        attributes {
          name
          slug
          latitude
          longitude
          type {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`)

export default async function Page() {
  const locale = useLocale()
  const { data: rawPlaces } = await gqlClient().query({
    query: getAllPlacesQuery,
    variables: {
      locale,
    },
  })
  const places = simplifyResponse(rawPlaces)
  if (!places) notFound()

  return <SubPage places={places.filter(nonNullable)} />
}

function SubPage({
  places,
}: {
  places: DeepPick<
    SimpleType<Place>,
    'name' | 'slug' | 'type.slug' | 'latitude' | 'longitude'
  >[]
}) {
  const t = useTranslations('Explore')

  return (
    <main className="">
      <h1>{t('map')}</h1>
      <Map
        className="h-[80vh]"
        markers={places.map((place) => ({
          text: place.name,
          location: {
            latitude: place.latitude,
            longitude: place.longitude,
          },
        }))}
      />
    </main>
  )
}
