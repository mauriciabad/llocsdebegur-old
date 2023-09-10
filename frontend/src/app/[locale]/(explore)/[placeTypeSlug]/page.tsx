import PlaceIcon from '@/components/PlaceIcon'
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
import ReactMarkdown from 'react-markdown'
import PlaceListLarge from '@/components/PlaceListLarge'
import { ImageProperties } from '@/components/StrapiImage'

const getPlaceTypeQuery = graphql(`
  query getPlaceType($locale: I18NLocaleCode!, $slug: String!) {
    placeTypes(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          name
          namePlural
          nameGender
          slug
          content
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
          type {
            data {
              attributes {
                slug
                name
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
    'name' | 'namePlural' | 'nameGender' | 'slug' | 'content'
  >
  places: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'slug'
    | 'description'
    | `cover.${ImageProperties}`
    | 'type.slug'
    | 'type.name'
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

      {placeType.content && (
        <div className="prose mx-auto mt-8 max-w-sm text-center prose-headings:font-title prose-headings:text-stone-800 prose-h2:mb-2 prose-h2:mt-4">
          <ReactMarkdown>{placeType.content}</ReactMarkdown>
        </div>
      )}
      <PlaceListLarge className="mt-6" places={places} />
    </main>
  )
}
