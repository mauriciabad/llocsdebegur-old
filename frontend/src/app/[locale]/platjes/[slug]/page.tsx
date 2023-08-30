import { IconBeach, IconGrain, IconCompass } from '@tabler/icons-react'
import { BACKEND_URL } from '@/constants'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import {
  GetBeachQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
  NonNullableItem,
  typeDynamicZone,
} from '@/lib/gql'

const getBeachQuery = graphql(`
  query getBeach($locale: I18NLocaleCode!, $slug: String!) {
    places(
      locale: $locale
      filters: { and: [{ type: { eq: "beach" }, slug: { eq: $slug } }] }
    ) {
      data {
        attributes {
          name
          description
          cover {
            data {
              attributes {
                url
                height
                width
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
  const t = useTranslations('BeachView')
  const te = useTranslations('Enums')

  const detailsGlobal = typeDynamicZone(beach.detailsGlobal[0])
  if (!detailsGlobal) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
      <h2 className="font-bold text-4xl">{beach.name}</h2>
      <p className="max-w-[80ch] mx-auto text-left mt-4">{beach.description}</p>

      <h3 className="text-center text-xl font-bold mt-4">{t('photos')}</h3>
      <img
        src={`${BACKEND_URL}${beach.cover?.url}`}
        alt=""
        className="rounded-xl shadow-2xl max-w-xl mx-auto w-full mt-2"
        height={String(beach.cover?.height)}
        width={String(beach.cover?.width)}
      />

      <div className="max-w-sm mx-auto border border-gray-300 bg-gray-100 rounded-xl p-4 mt-8 text-center">
        <h3 className="text-center text-xl font-bold mb-4 leading-none">
          {t('data')}
        </h3>
        <div className="text-left space-y-2">
          <div>
            <IconGrain className="inline-block mr-1" />
            <span>{te(`sandType.${detailsGlobal.sandType}`)}</span>
          </div>
          <div>
            <IconCompass className="inline-block mr-1" />
            <span>{te(`orientation.${detailsGlobal.orientation}`)}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
