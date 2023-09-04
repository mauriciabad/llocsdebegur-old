import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
import {
  Place,
  PlaceType,
  SimpleType,
  gqlClient,
  graphql,
  nonNullable,
  simplifyResponse,
} from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import Link from 'next-intl/link'

const getPlaceTypeQuery = graphql(`
  query getPlaceType($locale: I18NLocaleCode!, $slug: String!) {
    placeTypes(locale: $locale, filters: { slug: { eq: $slug } }) {
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

const getAllPlacesOfTypeQuery = graphql(`
  query getAllPlacesOfType($locale: I18NLocaleCode!, $placeTypeSlug: String!) {
    places(
      locale: $locale
      pagination: { limit: 1000 }
      filters: { type: { slug: { eq: $placeTypeSlug } } }
    ) {
      data {
        attributes {
          name
          slug
          description
          cover {
            data {
              attributes {
                url
                height
                width
                alternativeText
                placeholder
              }
            }
          }
        }
      }
    }
  }
`)

export default async function Page({
  params: { placeTypeSlug },
}: {
  params: { placeTypeSlug: string }
}) {
  const locale = useLocale()
  const { data: rawPlaces } = await gqlClient().query({
    query: getAllPlacesOfTypeQuery,
    variables: {
      locale,
      placeTypeSlug,
    },
  })
  const places = simplifyResponse(rawPlaces)
  if (!places) notFound()

  const { data: rawPlaceType } = await gqlClient().query({
    query: getPlaceTypeQuery,
    variables: { locale, slug: placeTypeSlug },
  })
  const placeType = simplifyResponse(rawPlaceType)?.[0]
  if (!placeType) notFound()

  return <SubPage placeType={placeType} places={places.filter(nonNullable)} />
}

function SubPage({
  places,
  placeType,
}: {
  placeType: DeepPick<
    SimpleType<PlaceType>,
    'name' | 'namePlural' | 'nameGender' | 'slug'
  >
  places: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'slug'
    | 'description'
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
    | 'cover.placeholder'
  >[]
}) {
  const t = useTranslations('Enums.placeType')

  return (
    <main className="mx-auto max-w-6xl p-4">
      <PlaceIcon
        type={placeType.slug}
        className="mx-auto mb-4 mt-8 h-12 w-12 stroke-1 text-brand-600"
      />
      <h2 className="text-center font-title text-4xl font-bold capitalize text-stone-800">
        {placeType.namePlural}
      </h2>
      <p className="mt-4 text-center font-semibold text-stone-500">
        {t('showing-n-places', { count: places.length })}
      </p>
      <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.64),1fr))] gap-6">
        {places.map(
          (place) =>
            place && (
              <li key={place.slug} className="h-full">
                <Link
                  href={`/${placeType.slug}/${place.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md outline-2 outline-brand-100 hover:outline"
                >
                  {place.cover && (
                    <StrapiImage
                      image={place.cover}
                      className="aspect-[4/3] w-full"
                      width={256 * 2 + 64}
                    />
                  )}
                  <h2 className="mx-4 mt-3 font-title text-xl font-bold text-stone-800">
                    {place.name}
                  </h2>
                  <p className="mx-4 mb-4 mt-1 line-clamp-3">
                    {place.description}
                  </p>
                </Link>
              </li>
            )
        )}
      </ul>
    </main>
  )
}
