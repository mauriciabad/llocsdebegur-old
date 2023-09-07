import { PlaceTypeSlug } from '@/lib/gql/placeTypes'
import PlaceIcon from '../PlaceIcon'
import classNames from 'classnames'

export default function PlaceMarker({
  type,
  className,
}: {
  type?: PlaceTypeSlug
  className?: string
}) {
  return (
    <div
      className={classNames(
        className,
        {
          'bg-blue-500': type === 'beach',
          'bg-red-500': type === 'monument',
          'bg-yellow-500': type === 'viewpoint',
        },
        '-ml-3.5 -mt-3.5 inline-block rounded-full border-2 border-white bg-current p-0.5 text-gray-700 shadow'
      )}
    >
      <PlaceIcon type={type} className="text-white" size={20} />
    </div>
  )
}
