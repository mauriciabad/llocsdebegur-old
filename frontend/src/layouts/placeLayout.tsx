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

export default function PlaceLayout({
  place,
  customData,
}: {
  place: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'type'
    | 'content'
    | 'description'
    | 'latitude'
    | 'longitude'
    | 'googleMapsPlaceId'
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
    | 'cover.placeholder'
  >
  customData: PlaceCustomDataArray
}) {
  const t = useTranslations('PlaceLayout')

  return (
    <main className="mx-auto max-w-2xl p-4">
      <PlaceIcon
        type={place.type}
        className="mx-auto text-brand-600 mb-4 mt-8 h-12 w-12 stroke-1"
      />
      <h1 className="font-bold text-4xl text-center font-title text-stone-800">
        {place.name}
      </h1>
      <p className="max-w-[80ch] mx-auto text-left mt-4 mb-4">
        {place.description}
      </p>
      {place.cover && (
        <StrapiImage
          image={place.cover}
          className="rounded-xl shadow-2xl aspect-[4/3] object-cover w-full"
          width={640 * 2}
        />
      )}
      <h2 className="font-bold text-2xl mt-8 mb-2 leading-none text-center font-title text-stone-800">
        {t('map')}
      </h2>
      <div className="border border-stone-300 bg-stone-100 rounded-xl overflow-hidden">
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
      </div>

      <div className="grid mt-8 grid-cols-[repeat(auto-fit,minmax(theme(spacing.64),1fr))] gap-6 items-stretch">
        {customData && (
          <div>
            <h3 className="text-center text-2xl font-bold mb-2 leading-none font-title text-stone-800">
              {t('data')}
            </h3>
            <PlaceCustomData data={customData} />
          </div>
        )}

        {place.googleMapsPlaceId && (
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl mb-2 leading-none text-center font-title text-stone-800">
              {t('links')}
            </h2>
            <div className="grow flex flex-col justify-center items-center">
              <ViewInGoogleMaps googleMapsPlaceId={place.googleMapsPlaceId} />
            </div>
          </div>
        )}
      </div>

      {place.content && (
        <div className="prose mt-8 prose-h2:mt-4 prose-h2:mb-2 prose-headings:font-title prose-headings:text-stone-800">
          <ReactMarkdown>{place.content}</ReactMarkdown>
        </div>
      )}
    </main>
  )
}
