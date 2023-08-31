import { useLocale } from 'next-intl'
import { graphql, gqlClient, simplifyResponse, nonNullable } from '@/lib/gql'
import PlaceTypeLayout from '@/layouts/placeTypeLayout'

const getAllLandmarksQuery = graphql(`
  query getAllLandmarks($locale: I18NLocaleCode!) {
    places(locale: $locale, filters: { type: { eq: "landmark" } }) {
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
    query: getAllLandmarksQuery,
    variables: { locale },
  })

  const landmarks = simplifyResponse(data)

  if (!landmarks) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return (
    <PlaceTypeLayout type="landmark" places={landmarks.filter(nonNullable)} />
  )
}
