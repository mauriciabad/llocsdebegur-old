import { PlaceType } from '@/lib/gql'
import { IconBeach, IconBuildingCastle, Icon } from '@tabler/icons-react'

const iconsByPlaceType = {
  beach: IconBeach,
  landmark: IconBuildingCastle,
} as const satisfies Record<PlaceType, Icon>

export default function PlaceIcon({
  type,
  className,
}: {
  type: PlaceType
  className?: string
}) {
  const Icon = iconsByPlaceType[type]

  return <Icon className={className} />
}
