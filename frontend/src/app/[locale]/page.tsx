import { useTranslations, useLocale } from 'next-intl'
import {
  GetLandingQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
} from '@/lib/gql'
import PlaceTypeBlock from '@/components/PlaceTypeBlock'

const getLandingQuery = graphql(`
  query getLanding($locale: I18NLocaleCode!) {
    landing(locale: $locale) {
      data {
        attributes {
          heroTitle
          heroDescription
        }
      }
    }
  }
`)

export default async function PageWrapper() {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getLandingQuery,
    variables: { locale },
  })

  const landingInfo = simplifyResponse(data)

  if (!landingInfo) throw new Error('Error fetching data')

  return <Page landingInfo={landingInfo} />
}

function Page({
  landingInfo,
}: {
  landingInfo: NonNullable<SimpleResponse<GetLandingQuery>>
}) {
  const t = useTranslations('Landing')

  return (
    <>
      <header className="bg-stone-100 text-stone-800 min-h-[50vh] flex items-center justify-center flex-col p-4 text-center">
        <h1 className="font-bold text-6xl font-title text-stone-800">
          {landingInfo.heroTitle}
        </h1>
        <p className="text-xl mt-4">{landingInfo.heroDescription}</p>
      </header>

      <main className="text-center mx-auto max-w-2xl px-4 bg-white">
        <h2 className="text-4xl font-bold text-center mt-8 mb-4 font-title text-stone-800">
          {t('places')}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <PlaceTypeBlock type="beach" />
          <PlaceTypeBlock type="landmark" />
        </div>
      </main>
    </>
  )
}
