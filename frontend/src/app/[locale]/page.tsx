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

  if (!landingInfo) throw new Error(`Error fetching data of landing page`)

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
      <header className="flex min-h-[50vh] flex-col items-center justify-center bg-stone-100 p-4 text-center text-stone-800">
        <h1 className="font-title text-6xl font-bold text-stone-800">
          {landingInfo.heroTitle}
        </h1>
        <p className="mt-4 text-xl">{landingInfo.heroDescription}</p>
      </header>

      <main className="mx-auto max-w-2xl px-4 text-center ">
        <h2 className="mb-4 mt-8 text-center font-title text-4xl font-bold text-stone-800">
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
