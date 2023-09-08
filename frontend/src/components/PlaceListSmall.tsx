import Link from 'next-intl/link'
import PlaceIcon from './PlaceIcon'
import StrapiImage from './StrapiImage'
import { SimpleType, Place } from '@/lib/gql'
import { DeepPick } from '@/lib/types'

export default function PlaceListSmall({
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
    <ul className={className}>
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
  )
}
