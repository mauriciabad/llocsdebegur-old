import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import Link from 'next/link'
import { IconBeach } from '@tabler/icons-react';

const queryLandingInfo = gql`
  query{
    landing {
      data{
        attributes{
          heroTitle
          heroDescription
        }
      }
    } 
  }
`

export default async function Home() {
  const landingInfo = (await graphqlClient.request(queryLandingInfo)) as any

  return (
    <main>
      <header className='bg-sky-900 text-white min-h-[50vh] flex items-center justify-center flex-col p-4 text-center'>
        <h1 className='font-bold text-6xl'>{landingInfo.landing.data.attributes.heroTitle}</h1>
        <p className='text-xl mt-4'>{landingInfo.landing.data.attributes.heroDescription}</p>
      </header>

      <section className='text-center mx-auto max-w-2xl p-4'>
        <IconBeach className='mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1' />
        <h2 className='font-bold text-3xl'>Platjes</h2>
        <Link href="/platjes" className='p-4 leading-none bg-sky-900 text-white uppercase rounded-lg inline-block mt-6'>Veure totes</Link>
      </section>
    </main>
  )
}
