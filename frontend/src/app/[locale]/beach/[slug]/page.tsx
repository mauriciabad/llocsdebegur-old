import PlaceLayout from '@/layouts/placeLayout'
import {
  GetBeachQuery,
  NonNullableItem,
  SimpleResponse,
  gqlClient,
  graphql,
  simplifyResponse,
  typeDynamicZone,
} from '@/lib/gql'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'

const getBeachQuery = graphql(`
  query getBeach($locale: I18NLocaleCode!, $slug: String!) {
    places(
      locale: $locale
      filters: { and: [{ type: { eq: "beach" }, slug: { eq: $slug } }] }
    ) {
      data {
        attributes {
          name
          slug
          description
          content
          type
          latitude
          longitude
          googleMapsPlaceId
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
          detailsGlobal {
            ... on ComponentPlaceDetailsGlobalBeachGlobal {
              waterEntry
              sandType
              orientation
            }
          }
        }
      }
    }
  }
`)

export default async function PageWrapper({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getBeachQuery,
    variables: { locale, slug },
  })
  const beaches = simplifyResponse(data)
  const beach = beaches?.[0]

  if (!beach) notFound()

  return <Page beach={beach} />
}

function Page({
  beach,
}: {
  beach: NonNullableItem<SimpleResponse<GetBeachQuery>>
}) {
  const t = useTranslations('Enums')

  const detailsGlobal = typeDynamicZone(beach.detailsGlobal[0])
  if (!detailsGlobal)
    throw new Error(`Error fetching data of place "${beach.slug}"`)

  return (
    <PlaceLayout
      place={beach}
      customData={[
        { icon: 'sandType', text: t(`sandType.${detailsGlobal.sandType}`) },
        {
          icon: 'orientation',
          text: t(`orientation.${detailsGlobal.orientation}`),
        },
      ]}
    />
  )
}
