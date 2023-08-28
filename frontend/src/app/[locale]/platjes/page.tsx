
import { IconBeach } from '@tabler/icons-react'
import Footer from '@/components/footer'
import { useTranslations, useLocale } from 'next-intl'
import { MyLink } from '@/navigation'
import { GetAllBeachesQuery } from '@/gql/graphql'
import { graphql } from '@/gql'
import { graphqlClient } from '@/lib/graphql'

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

  const { data: beaches } = await graphqlClient.query({
    query: getAllBeachesQuery,
    variables: { locale }
  });

  if (!beaches) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return <Page beaches={beaches} />
}

function Page({ beaches }: { beaches: GetAllBeachesQuery }) {
  const t = useTranslations('Landing')

  return (
    <main>
      <section className="text-center mx-auto max-w-2xl p-4">
        <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
        <h2 className="font-bold text-4xl">{t('beaches')}</h2>
        <ul className="mt-6">
          {beaches.detailsBeaches?.data.map((beach) => (
            <li key={beach.attributes?.slug}>
              <MyLink
                href={{
                  pathname: '/platjes/[slug]',
                  params: { slug: beach.attributes?.slug ?? 'null' },
                }}
                className="underline text-xl py-2 px-4 inline-block"
              >
                {' '}
                {beach.attributes?.name}
              </MyLink>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
