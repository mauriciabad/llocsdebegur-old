import { useLocale } from 'next-intl'
import { graphql, gqlClient, simplifyResponse, nonNullable } from '@/lib/gql'
import PlaceTypeLayout from '@/layouts/placeTypeLayout'

const getAllBeachesQuery = graphql(`
  query getAllBeaches($locale: I18NLocaleCode!) {
    places(locale: $locale, filters: { type: { eq: "beach" } }) {
      data {
        attributes {
          name
          slug
        }
      }
    }
  }
`)

export default async function Page() {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getAllBeachesQuery,
    variables: { locale },
  })

  const beaches = simplifyResponse(data)

  if (!beaches) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return <PlaceTypeLayout type="beach" places={beaches.filter(nonNullable)} />
}
