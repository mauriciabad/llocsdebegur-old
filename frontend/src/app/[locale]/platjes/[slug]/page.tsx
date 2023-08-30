import { IconBeach } from '@tabler/icons-react'
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
} from '@/lib/gql'

const getBeachQuery = graphql(`
  query getBeach($locale: I18NLocaleCode, $slug: String!) {
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

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
      <h2 className="font-bold text-4xl">{beach.name}</h2>
      <p className="max-w-[80ch] mx-auto text-left mt-4">{beach.description}</p>

      <h3 className="text-center text-xl font-bold">{t('photos')}</h3>
      <img
        src={`${BACKEND_URL}${beach.cover?.url}`}
        alt=""
        className="rounded-xl shadow-2xl max-w-xl mx-auto w-full mt-4"
        height={String(beach.cover?.height)}
        width={String(beach.cover?.width)}
      />
    </main>
  )
}
