import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
import Map from '@/components/Map'
import { Place, SimpleType } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useTranslations } from 'next-intl'
import PlaceCustomData, {
  PlaceCustomDataArray,
} from '@/components/PlaceCustomData'
import ReactMarkdown from 'react-markdown'
import ViewInGoogleMaps from '@/components/ViewInGoogleMaps'
import Link from 'next-intl/link'
import UserProfilePlacesAddButtons from '@/components/UserProfilePlacesAddButtons'
import { ImageProperties } from '@/components/StrapiImage'

export default function PlaceLayout({
  place,
  customData,
}: {
  place: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'slug'
    | 'content'
    | 'description'
    | 'latitude'
    | 'longitude'
    | 'googleMapsPlaceId'
    | 'type.slug'
    | `cover.${ImageProperties}`
  >
  customData?: PlaceCustomDataArray
}) {
  const t = useTranslations('PlaceLayout')

  return (
    <main>
      {place.cover && (
        <StrapiImage
          image={place.cover}
          className="mx-auto aspect-[4/3] w-full md:mt-4 md:max-w-2xl md:rounded-lg md:shadow-2xl"
          width={640 * 2}
        />
      )}
      <div className="mx-auto max-w-2xl px-4">
        <PlaceIcon
          type={place.type?.slug}
          className="mx-auto mb-4 mt-8 h-12 w-12 stroke-1 text-brand-600"
        />
        <h1 className="text-center font-title text-4xl font-bold text-stone-800">
          {place.name}
        </h1>
        <UserProfilePlacesAddButtons
          placeSlug={place.slug}
          className="mt-4 justify-center"
        />
        <p className="mx-auto mb-4 mt-4 max-w-[80ch] text-left">
          {place.description}
        </p>
        <h2 className="mb-2 mt-8 text-center font-title text-2xl font-bold leading-none text-stone-800">
          {t('map')}
        </h2>
        <div className="relative h-64 overflow-hidden rounded-xl border border-stone-300 bg-stone-100">
          <Map
            location={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            markers={[
              {
                text: place.name,
                location: {
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
              },
            ]}
          />
          <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 flex justify-center">
            <Link
              href="/map"
              className="pointer-events-auto flex h-12 items-center rounded-full border-2 border-black/20 bg-white bg-clip-padding px-5 text-center font-title text-sm font-bold uppercase leading-none text-brand-800 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
            >
              {t('explore-full-map')}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(theme(spacing.64),1fr))] items-stretch gap-6">
          {customData && (
            <div>
              <h3 className="mb-2 text-center font-title text-2xl font-bold leading-none text-stone-800">
                {t('data')}
              </h3>
              <PlaceCustomData data={customData} />
            </div>
          )}

          {place.googleMapsPlaceId && (
            <div className="flex flex-col">
              <h2 className="mb-2 text-center font-title text-2xl font-bold leading-none text-stone-800">
                {t('links')}
              </h2>
              <div className="flex grow flex-col items-center justify-center">
                <ViewInGoogleMaps googleMapsPlaceId={place.googleMapsPlaceId} />
              </div>
            </div>
          )}
        </div>

        {place.content && (
          <div className="prose mt-8 prose-headings:font-title prose-headings:text-stone-800 prose-h2:mb-2 prose-h2:mt-4">
            <ReactMarkdown>{place.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  )
}
