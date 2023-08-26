import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import { IconBeach } from '@tabler/icons-react'
import Footer from '@/components/footer'
import { BACKEND_URL } from '../../../../consts'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const locale = useLocale()

  const queryGetBeach = gql`
  query {
    detailsBeaches(filters: { slug: { eq: "${slug}" } }, locale: "${locale}") {
      data {
        attributes {
          name
          basicDetails {
            shortDescription
            cover {
              data{
                attributes{
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  `

  const beaches = (await graphqlClient.request(queryGetBeach)) as any

  const beach = beaches.detailsBeaches.data[0]

  if (!beach) notFound()

  return (
    <main>
      <section className="text-center mx-auto max-w-2xl p-4">
        <IconBeach className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1" />
        <h2 className="font-bold text-4xl">
          {beach.attributes.name}
        </h2>
        <p className="max-w-[80ch] mx-auto text-left mt-4">
          {
            beach.attributes.basicDetails
              .shortDescription
          }
        </p>
        <img
          src={`${BACKEND_URL}${beach.attributes.basicDetails.cover.data.attributes.url}`}
          alt=""
          className="rounded-xl shadow-2xl max-w-xl mx-auto w-full mt-4"
          height={
            beach.attributes.basicDetails.cover.data
              .attributes.height
          }
          width={
            beach.attributes.basicDetails.cover.data
              .attributes.width
          }
        />
      </section>

      <Footer />
    </main>
  )
}
