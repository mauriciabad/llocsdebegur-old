import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import {
  GetLandmarkQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
  NonNullableItem,
  typeDynamicZone,
} from '@/lib/gql'
import PlaceLayout from '@/layouts/placeLayout'

const getLandmarkQuery = graphql(`
  query getLandmark($locale: I18NLocaleCode!, $slug: String!) {
    places(
      locale: $locale
      filters: { and: [{ type: { eq: "landmark" }, slug: { eq: $slug } }] }
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
            ... on ComponentPlaceDetailsGlobalLandmarkGlobal {
              isVisitable
              year
              referencePrice
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
    query: getLandmarkQuery,
    variables: { locale, slug },
  })
  const landmarks = simplifyResponse(data)
  const landmark = landmarks?.[0]

  if (!landmark) notFound()

  return <Page landmark={landmark} />
}

function Page({
  landmark,
}: {
  landmark: NonNullableItem<SimpleResponse<GetLandmarkQuery>>
}) {
  const t = useTranslations('LandmarkView')

  const detailsGlobal = typeDynamicZone(landmark.detailsGlobal[0])
  if (!detailsGlobal)
    throw new Error(`Error fetching data of place "${landmark.slug}"`)

  return (
    <PlaceLayout
      place={landmark}
      customData={[
        {
          icon: 'visitable',
          text: detailsGlobal.isVisitable ? t('visitable') : t('not-visitable'),
        },
        {
          icon: 'year',
          text: t('year', { year: detailsGlobal.year }),
        },
        {
          icon: 'reference-price',
          text: t('reference-price', {
            price: `${detailsGlobal.referencePrice?.toFixed(2)}€`,
          }),
        },
      ]}
    />
  )
}
