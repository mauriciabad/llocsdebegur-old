import { PlaceCustomDataArray } from '@/components/PlaceCustomData'
import PlaceLayout from '@/layouts/placeLayout'
import {
  GetPlaceQuery,
  NonNullableItem,
  PlaceTypeSlug,
  SimpleResponse,
  getOnlyOne,
  gqlClient,
  graphql,
  simplifyResponse,
  typeDynamicZone,
} from '@/lib/gql'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'

const getPlaceQuery = graphql(`
  query getPlace($locale: I18NLocaleCode!, $slug: String!) {
    places(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          name
          slug
          content
          description
          latitude
          longitude
          googleMapsPlaceId
          cover {
            data {
              attributes {
                url
                height
                width
                placeholder
                alternativeText
              }
            }
          }
          detailsGlobal {
            ... on ComponentPlaceDetailsGlobalBeachGlobal {
              sandType
              orientation
            }
            ... on ComponentPlaceDetailsGlobalLandmarkGlobal {
              isVisitable
              year
            }
          }
          type {
            data {
              attributes {
                name
                nameGender
                namePlural
                slug
              }
            }
          }
        }
      }
    }
  }
`)

export default async function PageWrapper({
  params: { placeSlug },
}: {
  params: { placeSlug: string; placeTypeSlug: string }
}) {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getPlaceQuery,
    variables: { locale, slug: placeSlug },
  })
  const place = getOnlyOne(simplifyResponse(data))

  if (!place) notFound()

  return <Page place={place} />
}

function Page({
  place,
}: {
  place: NonNullableItem<SimpleResponse<GetPlaceQuery>>
}) {
  if (!place.type?.slug) throw new Error('Missing placeSlug')

  const customData = useCustomData(place, place.type.slug)

  return <PlaceLayout place={place} customData={customData} />
}

function useCustomData(
  place: NonNullableItem<SimpleResponse<GetPlaceQuery>>,
  placeType: PlaceTypeSlug
): PlaceCustomDataArray | undefined {
  const t = useTranslations('Enums')
  const t2 = useTranslations('MonumentView')

  const detailsGlobal = typeDynamicZone(place.detailsGlobal[0])
  if (!detailsGlobal) return undefined

  switch (placeType) {
    case 'beach': {
      if ('sandType' in detailsGlobal) {
        return [
          { icon: 'sandType', text: t(`sandType.${detailsGlobal.sandType}`) },
          {
            icon: 'orientation',
            text: t(`orientation.${detailsGlobal.orientation}`),
          },
        ]
      }
      break
    }
    case 'monument': {
      if ('isVisitable' in detailsGlobal) {
        return [
          {
            icon: 'visitable',
            text: detailsGlobal.isVisitable
              ? t2('visitable')
              : t2('not-visitable'),
          },
          {
            icon: 'year',
            text: t2('year', { year: detailsGlobal.year }),
          },
        ]
      }
      break
    }
  }

  return undefined
}
