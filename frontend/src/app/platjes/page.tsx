import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import Link from 'next/link'
import { IconBeach } from '@tabler/icons-react';

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
        <IconBeach className='mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1' />
        <h2 className='font-bold text-4xl'>Platjes</h2>
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
