import { Locale } from '@/navigation'
import { Enum_Place_Type } from './__generated__/graphql'

export type PlaceType = `${Enum_Place_Type}`

export const placeTypePlural = {
  beach: 'beaches',
  landmark: 'landmarks',
} as const satisfies Record<PlaceType, string>

export const placeTypeGenderByLocale = {
  ca: {
    beach: 'female',
    landmark: 'male',
  },
  en: {
    beach: null,
    landmark: null,
  },
} as const satisfies Record<Locale, Record<PlaceType, 'male' | 'female' | null>>

export type PlaceTypePlural =
  (typeof placeTypePlural)[keyof typeof placeTypePlural]
