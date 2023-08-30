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
import ReactMarkdown from 'react-markdown'

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
          content
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
      <div className="flex flex-wrap [&>:nth-child(1)]:flex-grow [&>:nth-child(1)]:basis-32 [&>:nth-child(2)]:max-h-72 [&>:nth-child(2)]:basis-32 justify-center gap-4 my-8">
        <div className="border border-gray-300 bg-gray-100 rounded-xl p-4 text-center max-w-xs">
          <h3 className="text-center text-xl font-bold mb-4 leading-none">
            {t('data')}
          </h3>
          <div className="text-left space-y-2">
            <div className="flex items-center">
              <IconGrain className="inline-block mr-1 shrink-0" />
              <div>{te(`sandType.${detailsGlobal.sandType}`)}</div>
            </div>
            <div className="flex items-center">
              <IconCompass className="inline-block mr-1 shrink-0" />
              <div>{te(`orientation.${detailsGlobal.orientation}`)}</div>
            </div>
          </div>
        </div>

        <img
          src={`${BACKEND_URL}${beach.cover?.url}`}
          alt=""
          className="rounded-xl shadow-2xl w-full aspect-[4/3] object-cover"
          height={String(beach.cover?.height)}
          width={String(beach.cover?.width)}
        />
      </div>
      <div className="text-left mt-8 prose prose-h2:mt-4 prose-h2:mb-2">
        {beach.content && <ReactMarkdown>{beach.content}</ReactMarkdown>}
      </div>
    </main>
  )
}
