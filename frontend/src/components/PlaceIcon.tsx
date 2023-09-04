import { PlaceTypeSlug } from '@/lib/gql/placeTypes'
import {
  IconBeach,
  IconBuildingCastle,
  Icon,
  IconCircle,
  IconFlag,
} from '@tabler/icons-react'

const iconsByPlaceType = {
  beach: IconBeach,
  monument: IconBuildingCastle,
  viewpoint: IconFlag,
} as const satisfies Record<PlaceTypeSlug, Icon>

export default function PlaceIcon({
  type,
  className,
}: {
  type?: PlaceTypeSlug
  className?: string
}) {
  const Icon = type ? iconsByPlaceType[type] : IconCircle

  return <Icon className={className} />
}
