import { useTranslations, useLocale } from 'next-intl'
import { MyLink } from '@/navigation'
import {
  GetLandingQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
} from '@/lib/gql'
import PlaceIcon from '@/components/PlaceIcon'

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

  if (!landingInfo) return <h1>Error fetching data</h1> // TODO: Do better error handling

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
      <header className="bg-sky-900 text-white min-h-[50vh] flex items-center justify-center flex-col p-4 text-center">
        <h1 className="font-bold text-6xl">{landingInfo.heroTitle}</h1>
        <p className="text-xl mt-4">{landingInfo.heroDescription}</p>
      </header>

      <main className="text-center mx-auto max-w-2xl px-4">
        <h2 className="text-4xl font-bold text-center mt-8 mb-4">
          {t('places')}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="border border-gray-300 rounded-lg p-4">
            <PlaceIcon
              type="beach"
              className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1"
            />
            <h2 className="font-bold text-3xl">{t('beaches')}</h2>
            <MyLink
              href="/places/beaches"
              className="p-4 leading-none bg-sky-900 text-white uppercase rounded-lg inline-block mt-6 outline-none hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-700"
            >
              {t('view-all')}
            </MyLink>
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <PlaceIcon
              type="landmark"
              className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1"
            />
            <h2 className="font-bold text-3xl">{t('landmarks')}</h2>
            <MyLink
              href="/places/landmarks"
              className="p-4 leading-none bg-sky-900 text-white uppercase rounded-lg inline-block mt-6 outline-none hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-700"
            >
              {t('view-all')}
            </MyLink>
          </div>
        </div>
      </main>
    </>
  )
}
