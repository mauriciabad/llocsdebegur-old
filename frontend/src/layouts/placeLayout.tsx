import PlaceIcon from '@/components/PlaceIcon'
import StrapiImage from '@/components/StrapiImage'
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
    | 'cover.url'
    | 'cover.height'
    | 'cover.width'
    | 'cover.alternativeText'
  >
  children: React.ReactNode
}) {
  const t = useTranslations('PlaceLayout')

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <PlaceIcon
        type={place.type}
        className="mx-auto text-sky-950 mb-4 mt-8 h-12 w-12 stroke-1"
      />
      <h1 className="font-bold text-4xl">{place.name}</h1>
      <p className="max-w-[80ch] mx-auto text-left mt-4">{place.description}</p>
      <div className="flex flex-wrap [&>:nth-child(1)]:flex-grow [&>:nth-child(1)]:basis-32 [&>:nth-child(2)]:max-h-72 [&>:nth-child(2)]:basis-32 justify-center gap-4 my-8">
        <div className="border border-gray-300 bg-gray-100 rounded-xl p-4 text-center max-w-xs">
          <div className="h-full w-full flex justify-center items-center">
            {t('map')}
          </div>
        </div>

        {place.cover && (
          <StrapiImage
            image={place.cover}
            className="rounded-xl shadow-2xl w-full aspect-[4/3] object-cover"
          />
        )}
      </div>

      <div className="text-left mt-8">{children}</div>
    </main>
  )
}
