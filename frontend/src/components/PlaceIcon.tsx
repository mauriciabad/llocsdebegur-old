import { Enum_Place_Type } from '@/lib/gql'
import { IconBeach, IconBuildingCastle, Icon } from '@tabler/icons-react'

const iconsByPlaceType = {
  beach: IconBeach,
  landmark: IconBuildingCastle,
} as const satisfies Record<`${Enum_Place_Type}`, Icon>

export default function PlaceIcon({
  type,
  className,
}: {
  type: `${Enum_Place_Type}`
  className: string
}) {
  const Icon = iconsByPlaceType[type]

  return <Icon className={className} />
}
