import { IconBeach } from '@tabler/icons-react'
import { BACKEND_URL } from '@/constants'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import { graphql } from '@/gql'
import { GetBeachQuery } from '@/gql/graphql'
import { gqlClient } from '@/lib/graphql'

const getBeachQuery = graphql(`
  query getBeach($slug: String!, $locale: I18NLocaleCode!) {
    detailsBeaches(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        attributes {
          name
          basicDetails {
            shortDescription
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
  }
`)

export default async function PageWrapper({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const locale = useLocale()

  const { data: beaches } = await gqlClient().query({
    query: getBeachQuery,
    variables: { locale, slug },
  })

  const beach = beaches?.detailsBeaches?.data[0]

  if (!beach) notFound()

  return <Page beach={beach} />
}

type GetBeachQueryBeach = Exclude<
  GetBeachQuery['detailsBeaches'],
  undefined | null
>['data'][number]

function Page({ beach }: { beach: GetBeachQueryBeach }) {
  const t = useTranslations('BeachView')

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
      <h2 className="font-bold text-4xl">{beach.attributes?.name}</h2>
      <p className="max-w-[80ch] mx-auto text-left mt-4">
        {beach.attributes?.basicDetails?.shortDescription}
      </p>

      <h3 className="text-center text-xl font-bold">{t('photos')}</h3>
      <img
        src={`${BACKEND_URL}${beach.attributes?.basicDetails?.cover.data?.attributes?.url}`}
        alt=""
        className="rounded-xl shadow-2xl max-w-xl mx-auto w-full mt-4"
        height={String(
          beach.attributes?.basicDetails?.cover.data?.attributes?.height
        )}
        width={String(
          beach.attributes?.basicDetails?.cover.data?.attributes?.width
        )}
      />
    </main>
  )
}
