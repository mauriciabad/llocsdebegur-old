import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import Link from 'next/link'
import { IconBeach } from '@tabler/icons-react'
import Footer from '@/components/footer'
import { useTranslations, useLocale } from 'next-intl'

export default async function PageWrapper() {
  const locale = useLocale()

  const queryGetAllBeaches = gql`
    query {
      detailsBeaches(locale: "${locale}") {
        data {
          attributes {
          name
          slug
          }
        }
      }
    }
  `
  const beaches = (await graphqlClient.request(queryGetAllBeaches)) as any

  return <Page beaches={beaches} />
}

function Page({ beaches }: { beaches: any }) {
  const t = useTranslations('Landing')

  return (
    <main>
      <section className="text-center mx-auto max-w-2xl p-4">
        <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
        <h2 className="font-bold text-4xl">{t('beaches')}</h2>
        <ul className="mt-6">
          {beaches.detailsBeaches.data.map((beach) => (
            <li key={beach.attributes.slug}>
              <Link
                href={`/platjes/${beach.attributes.slug}`}
                className="underline text-xl py-2 px-4 inline-block"
              >
                {' '}
                {beach.attributes.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
