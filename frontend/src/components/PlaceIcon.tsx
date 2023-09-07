import { PlaceTypeSlug } from '@/lib/gql/placeTypes'
import {
  IconBeach,
  IconBuildingCastle,
  Icon,
  IconCircle,
  IconFlag,
  TablerIconsProps,
} from '@tabler/icons-react'

const iconsByPlaceType = {
  beach: IconBeach,
  monument: IconBuildingCastle,
  viewpoint: IconFlag,
} as const satisfies Record<PlaceTypeSlug, Icon>

export default function PlaceIcon({
  type,
  ...tablerIconsProps
}: {
  type?: PlaceTypeSlug
} & TablerIconsProps) {
  const Icon = type ? iconsByPlaceType[type] : IconCircle

  return <Icon {...tablerIconsProps} />
}
