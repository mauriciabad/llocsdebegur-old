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
import Logo from '@/components/Logo'
import Link from 'next-intl/link'

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
        <div className="origin-bottom animate-wiggle">
          <Logo
            className="anima mb-4 h-24 animate-hover text-brand-600"
            outline
            stroke={1.25}
          />
        </div>
        <h1 className="font-title text-6xl font-extrabold uppercase text-stone-800">
          {landingInfo.heroTitle}
        </h1>
        <p className="mt-4 text-xl">{landingInfo.heroDescription}</p>

        <Link
          href="/map"
          className=" mt-6 inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white shadow-md outline-none hover:bg-brand-700 hover:outline hover:outline-2 hover:outline-brand-100 focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1"
        >
          {t('explore-map')}
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-4 text-center ">
        <h2 className="mb-4 mt-8 text-center font-title text-4xl font-bold text-stone-800">
          {t('places')}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(theme(spacing.64),1fr))] gap-8">
          {placeTypes.map(
            (placeType) =>
              placeType && (
                <PlaceTypeBlock
                  key={placeType.slug}
                  placeType={placeType}
                  className="flex flex-col justify-between"
                />
              )
          )}
        </div>
      </main>
    </>
  )
}
