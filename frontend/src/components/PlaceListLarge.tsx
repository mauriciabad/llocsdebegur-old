import Link from 'next-intl/link'
import StrapiImage from './StrapiImage'
import { SimpleType, Place } from '@/lib/gql'
import { DeepPick } from '@/lib/types'
import classNames from 'classnames'

export default function PlaceListLarge({
  places,
  className,
}: {
  className?: string
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
    | 'type.slug'
    | 'type.name'
  >[]
}) {
  return (
    <ul
      className={classNames(
        className,
        'grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.64),1fr))] gap-6'
      )}
    >
      {places.map(
        (place) =>
          place && (
            <li key={place.slug} className="h-full">
              <Link
                href={`/${place.type?.slug ?? 'null'}/${place.slug}`}
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
  )
}
