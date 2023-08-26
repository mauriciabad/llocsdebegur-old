import { gql } from 'graphql-request'
import { graphqlClient } from '@/lib/graphql'
import Link from 'next/link'

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
      <header className='bg-sky-900 text-white min-h-[50vh] flex items-center justify-center flex-col p-4'>
        <h1 className='font-bold text-6xl'>{landingInfo.landing.data.attributes.heroTitle}</h1>
        <p>{landingInfo.landing.data.attributes.heroDescription}</p>
      </header>

      <section className='text-center mx-auto max-w-2xl p-4'>
        <h2 className='font-bold text-3xl mt-4'>Platjes</h2>
        <Link href="/platjes" className='p-4 leading-none bg-sky-900 text-white uppercase rounded-lg inline-block mt-6'>Veure totes</Link>
      </section>
    </main>
  )
}
