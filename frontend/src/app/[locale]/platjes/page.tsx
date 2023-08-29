import { IconBeach } from '@tabler/icons-react'
import { useTranslations, useLocale } from 'next-intl'
import { MyLink } from '@/navigation'
import { GetAllBeachesQuery, graphql, gqlClient, simplifyResponse, SimpleResponse } from '@/lib/gql'

const getAllBeachesQuery = graphql(`
  query getAllBeaches($locale: I18NLocaleCode!) {
    detailsBeaches(locale: $locale) {
      data {
        attributes {
          name
          slug
        }
      }
    }
  }
`)

export default async function PageWrapper() {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getAllBeachesQuery,
    variables: { locale },
  })

  const beaches = simplifyResponse(data)

  if (!beaches) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return <Page beaches={beaches} />
}
function Page({ beaches }: { beaches: NonNullable<SimpleResponse<GetAllBeachesQuery>> }) {
  const t = useTranslations('AllBeachesView')

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
      <h2 className="font-bold text-4xl">{t('beaches')}</h2>
      <ul className="mt-6">
        {beaches.map((beach) => beach && (
          <li key={beach.slug}>
            <MyLink
              href={{
                pathname: '/platjes/[slug]',
                params: { slug: beach.slug ?? 'null' },
              }}
              className="underline text-xl py-2 px-4 inline-block"
            >
              {' '}
              {beach.name}
            </MyLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
