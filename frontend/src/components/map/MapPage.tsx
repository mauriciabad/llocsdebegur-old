'use client'

import Header from '@/components/Header'
import Map from '@/components/Map'
import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
import { Place, SimpleType } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import { useState } from 'react'
import classNames from 'classnames'

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

  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768)

  return (
    <div
      className={classNames(
        {
          'grid-cols-1 md:grid-cols-[475px,auto]': isExpanded,
          'grid-cols-1 grid-rows-[auto,1fr]': !isExpanded,
        },
        'h-[calc(100svh)]!important grid h-screen'
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
              <ul className="">
                {places.map((place) => (
                  <li key={place.slug} className="">
                    <Link
                      href={`/${place.type?.slug ?? 'null'}/${place.slug}`}
                      className="group"
                    >
                      <article className="grid grid-cols-[1fr,auto] rounded-xl border border-transparent p-2 group-hover:bg-gray-100">
                        <div className="pr-4">
                          <h1 className="font-title text-lg font-semibold leading-none text-stone-800">
                            {place.name}
                          </h1>
                          <span className="mt-1 inline-block rounded border border-stone-200 bg-stone-100 px-2 py-1 text-xs font-medium capitalize text-stone-700">
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
                    </Link>
                  </li>
                ))}
              </ul>
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
          <div className="pointer-events-none fixed bottom-1 left-0 right-0 z-20 flex justify-center">
            <button
              className="pointer-events-auto mb-2 mr-2 rounded-full border-2 border-brand-200 bg-white px-5 py-2.5 text-center font-title text-sm font-bold uppercase text-brand-800 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
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
