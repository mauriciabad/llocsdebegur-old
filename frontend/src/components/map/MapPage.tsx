'use client'

import Header from '@/components/Header'
import Map from '@/components/Map'
import { Place, SimpleType } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import classNames from 'classnames'
import PlaceListSmall from '@/components/PlaceListSmall'

export default function MapPage({
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

  const [isExpanded, setIsExpanded] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )

  return (
    <div
      className={classNames(
        {
          'grid-cols-1 md:grid-cols-[475px,auto]': isExpanded,
          'grid-cols-1 grid-rows-[auto,1fr]': !isExpanded,
        },
        'grid h-screen'
      )}
    >
      {isExpanded && (
        <aside className="relative z-10 h-full overflow-auto shadow-lg">
          <div className="h-full overflow-auto pb-14">
            <Header />
            <div className="p-2">
              <h1 className="mb-4 text-center text-2xl font-bold">
                {t('map')}
              </h1>
              <PlaceListSmall places={places} />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-1 left-0 right-0 z-20 flex justify-center">
            <button
              className="pointer-events-auto mb-2 mr-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
              onClick={() => {
                setIsExpanded(false)
              }}
            >
              {t('collapse')}
            </button>
          </div>
        </aside>
      )}
      {!isExpanded && <Header fullWidth />}
      <main
        className={classNames(
          {
            'hidden md:block': isExpanded,
            '': !isExpanded,
          },
          'h-full'
        )}
      >
        <Map
          className="h-full"
          fullControl
          zoom={14}
          markers={places.map((place) => ({
            text: place.name,
            location: {
              latitude: place.latitude,
              longitude: place.longitude,
            },
            markerType: place.type?.slug,
          }))}
        />

        {!isExpanded && (
          <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-20 flex justify-center">
            <button
              className="pointer-events-auto flex h-12 items-center rounded-full border-2 border-black/20 bg-white bg-clip-padding px-5 text-center font-title text-sm font-bold uppercase leading-none text-brand-800 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
              onClick={() => {
                setIsExpanded(true)
              }}
            >
              {t('expand')}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
