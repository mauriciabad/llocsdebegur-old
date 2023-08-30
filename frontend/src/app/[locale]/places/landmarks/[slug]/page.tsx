import { IconTicket, IconCurrencyEuro, IconCalendar } from '@tabler/icons-react'
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
import ReactMarkdown from 'react-markdown'
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
          description
          content
          type
          latitude
          longitude
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
  if (!detailsGlobal) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return (
    <PlaceLayout place={landmark}>
      <h3 className="text-center text-2xl font-bold mb-2 leading-none">
        {t('data')}
      </h3>
      <div className="border border-gray-300 bg-gray-100 rounded-xl p-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <IconTicket className="inline-block mr-1 shrink-0" />
            <div>
              {detailsGlobal.isVisitable ? t('visitable') : t('not-visitable')}
            </div>
          </div>
          <div className="flex items-center">
            <IconCalendar className="inline-block mr-1 shrink-0" />
            <div>{t('year', { year: detailsGlobal.year })}</div>
          </div>
          <div className="flex items-center">
            <IconCurrencyEuro className="inline-block mr-1 shrink-0" />
            <div>
              {t('reference-price', {
                price: `${detailsGlobal.referencePrice?.toFixed(2)}€`,
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="prose mt-8 prose-h2:mt-4 prose-h2:mb-2">
        {landmark.content && <ReactMarkdown>{landmark.content}</ReactMarkdown>}
      </div>
    </PlaceLayout>
  )
}
