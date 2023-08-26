import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import { IconBeach } from '@tabler/icons-react';

export default async function Platjes({ params: { slug } }: { params: { slug: string } }) {
  const queryGetBeach = gql`
  query {
    detailsBeaches(filters: { slug: { eq: "${slug}" } }) {
      data {
        attributes {
          name
          basicDetails {
            shortDescription
          }
        }
      }
    }
  }
  `

  const beaches = (await graphqlClient.request(queryGetBeach)) as any

  console.log('--------------------');

  console.log(JSON.stringify(beaches));

  return (
    <main>
      <section className="text-center mx-auto max-w-2xl p-4">
        <IconBeach className='mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1' />
        <h2 className="font-bold text-4xl">{beaches.detailsBeaches.data[0].attributes.name}</h2>
        <p className='max-w-[80ch] mx-auto text-left mt-4'>{beaches.detailsBeaches.data[0].attributes.basicDetails.shortDescription}</p>
      </section>
    </main>
  )
}
