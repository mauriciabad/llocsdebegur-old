import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
import Map from '@/components/Map'
import { Place, SimpleType } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useTranslations } from 'next-intl'

export default function PlaceLayout({
  place,
  children,
}: {
  place: DeepPick<
    SimpleType<Place>,
    | 'name'
    | 'type'
    | 'description'
    | 'latitude'
    | 'longitude'
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
  >
  children: React.ReactNode
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
          className="rounded-xl shadow-2xl aspect-[4/3] object-cover"
        />
      )}

      <h2 className="font-bold text-2xl mt-8 mb-2 leading-none text-center font-title text-stone-800">
        {t('map')}
      </h2>
      <div
        className="border border-stone-300 bg-stone-100 rounded-xl"
        style={{ overflow: 'hidden' }}
      >
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

      <div className="text-left mt-8">{children}</div>
    </main>
  )
}
