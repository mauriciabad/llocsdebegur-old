import { useTranslations, useLocale } from 'next-intl'
import {
  GetLandingQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
  GetAllPlaceTypesQuery,
} from '@/lib/gql'
import PlaceTypeBlock from '@/components/PlaceTypeBlock'

const getAllPlaceTypesQuery = graphql(`
  query getAllPlaceTypes($locale: I18NLocaleCode!) {
    placeTypes(locale: $locale) {
      data {
        attributes {
          name
          namePlural
          nameGender
          slug
        }
      }
    }
  }
`)

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

  const { data: rawLandingInfo } = await gqlClient().query({
    query: getLandingQuery,
    variables: { locale },
  })

  const landingInfo = simplifyResponse(rawLandingInfo)

  if (!landingInfo) throw new Error(`Error fetching data of landing page`)

  const { data: rawPlaceTypes } = await gqlClient().query({
    query: getAllPlaceTypesQuery,
    variables: { locale },
  })

  const placeTypes = simplifyResponse(rawPlaceTypes)

  if (!placeTypes) throw new Error(`Error fetching data of landing page`)

  getAllPlaceTypesQuery

  return <Page landingInfo={landingInfo} placeTypes={placeTypes} />
}

function Page({
  landingInfo,
  placeTypes,
}: {
  landingInfo: NonNullable<SimpleResponse<GetLandingQuery>>
  placeTypes: NonNullable<SimpleResponse<GetAllPlaceTypesQuery>>
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
          {placeTypes.map(
            (placeType) =>
              placeType && (
                <PlaceTypeBlock key={placeType.slug} placeType={placeType} />
              )
          )}
        </div>
      </main>
    </>
  )
}
