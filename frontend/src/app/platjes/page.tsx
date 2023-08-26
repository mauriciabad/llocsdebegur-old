import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import Link from 'next/link'

const queryGetAllBeaches = gql`
  query {
    detailsBeaches {
      data {
        attributes {
        name
        slug
        }
      }
    }
  }
`

export default async function Platjes() {
  const beaches = (await graphqlClient.request(queryGetAllBeaches)) as any

  return (
    <main>
      <section className='text-center mx-auto max-w-2xl p-4'>
        <h2 className='font-bold text-4xl mt-6'>Platjes</h2>
        <ul className='mt-6'>
          {beaches.detailsBeaches.data.map((beach) => (
            <li key={beach.attributes.slug}>
              <Link href={`/platjes/${beach.attributes.slug}`} className='underline text-xl'> {beach.attributes.name}</Link>


            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
