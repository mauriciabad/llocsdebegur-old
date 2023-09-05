import Header from '@/components/Header'
import Map from '@/components/Map'
import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
import {
  Place,
  SimpleType,
  gqlClient,
  graphql,
  nonNullable,
  simplifyResponse,
} from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'

const getAllPlacesQuery = graphql(`
  query getAllPlaces($locale: I18NLocaleCode!) {
    places(locale: $locale, pagination: { limit: 1000 }) {
      data {
        attributes {
          name
          slug
          description
          latitude
          longitude
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

export default async function Page() {
  const locale = useLocale()
  const { data: rawPlaces } = await gqlClient().query({
    query: getAllPlacesQuery,
    variables: {
      locale,
    },
  })
  const places = simplifyResponse(rawPlaces)
  if (!places) notFound()

  return <SubPage places={places.filter(nonNullable)} />
}

function SubPage({
  places,
}: {
  places: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'slug'
    | 'type.slug'
    | 'type.name'
    | 'latitude'
    | 'longitude'
    | 'description'
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
    | 'cover.placeholder'
  >[]
}) {
  const t = useTranslations('Explore')

  return (
    <div className="h-[calc(100dvh)]!important grid h-screen grid-cols-[475px,auto]">
      <aside className="z-10 h-full overflow-auto shadow-lg">
        <Header />
        <div className="p-4">
          <h1 className="mb-4 text-center text-2xl font-bold">{t('map')}</h1>
          <ul className="space-y-4">
            {places.map((place) => (
              <li key={place.slug} className="">
                <article className="grid grid-cols-[1fr,auto]">
                  <div className="pr-4">
                    <h1 className="font-title text-lg font-semibold text-stone-800">
                      {place.name}
                    </h1>
                    <span className="rounded border border-stone-200 bg-stone-100 px-2 py-1 text-xs font-medium capitalize text-stone-700">
                      <PlaceIcon
                        type={place.type?.slug}
                        className="mr-1.5 inline-block h-4 w-4 align-text-top text-stone-500 [&>path]:stroke-1"
                      />
                      {place.type?.name}
                    </span>

                    <p className="line-clamp-2">{place.description}</p>
                  </div>
                  {place.cover ? (
                    <StrapiImage
                      height={96}
                      image={place.cover}
                      className="aspect-square w-24 rounded-lg object-cover shadow-md"
                    />
                  ) : (
                    <div className="aspect-square w-24 rounded-lg object-cover shadow-md" />
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="h-full">
        <Map
          className="h-full"
          fullControl
          zoom={13}
          markers={places.map((place) => ({
            text: place.name,
            location: {
              latitude: place.latitude,
              longitude: place.longitude,
            },
          }))}
        />
      </main>
    </div>
  )
}
