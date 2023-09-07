import MapPage from '@/components/map/MapPage'
import { gqlClient, graphql, nonNullable, simplifyResponse } from '@/lib/gql'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

const getAllPlacesQuery = graphql(`
  query getAllPlaces($locale: I18NLocaleCode!) {
    places(locale: $locale, pagination: { limit: 1000 }) {
      data {
        attributes {
          name
          slug
          description
          latitude
          longitude
          cover {
            data {
              attributes {
                url
                height
                width
                alternativeText
                placeholder
              }
            }
          }
          type {
            data {
              attributes {
                slug
                name
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

  return <MapPage places={places.filter(nonNullable)} />
}
