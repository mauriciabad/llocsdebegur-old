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
        '-ml-3.5 -mt-3.5 inline-block rounded-full border-2 border-white p-0.5 shadow',
        {
          'bg-gray-700': !type,
          'bg-blue-500': type === 'beach',
          'bg-red-500': type === 'monument',
          'bg-yellow-500': type === 'viewpoint',
        }
      )}
    >
      <PlaceIcon type={type} className="text-white" size={20} />
    </div>
  )
}
