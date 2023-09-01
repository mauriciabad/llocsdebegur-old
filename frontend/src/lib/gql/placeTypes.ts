import { Locale } from '@/navigation'
import { Enum_Place_Type } from './__generated__/graphql'

export function defaultName(x: string): PlaceType | null {
  let type: PlaceType
  for (type in placeTypeTranslations) {
    if (Object.values(placeTypeTranslations[type].en).some((t) => t === x))
      return type
  }
  return null
}

export const gender = (x: PlaceType, locale: Locale): Gender =>
  placeTypeTranslations[x][locale].gender

export function plural<P extends PlaceType>(
  x: P
): (typeof placeTypeTranslations)[P]['en']['plural']
export function plural<P extends PlaceType, L extends Locale>(
  x: P,
  locale: L
): (typeof placeTypeTranslations)[P][L]['plural']
export function plural<P extends PlaceType, L extends Locale>(
  x: P,
  locale?: L
): (typeof placeTypeTranslations)[P][L]['plural'] {
  return placeTypeTranslations[x][locale ?? 'en'].plural
}

type Gender = 'male' | 'female' | null

export type PlaceType = `${Enum_Place_Type}`
export type PlaceTypePlural<T extends PlaceType = PlaceType> =
  (typeof placeTypeTranslations)[T]['en']['plural']

const placeTypeTranslations = {
  beach: {
    en: { singular: 'beach', plural: 'beaches', gender: null },
    ca: { singular: 'platja', plural: 'platjes', gender: 'male' },
  },
  landmark: {
    en: { singular: 'landmark', plural: 'landmarks', gender: null },
    ca: { singular: 'monument', plural: 'monuments', gender: 'male' },
  },
} as const satisfies {
  [key in PlaceType]: {
    [key in Locale]: {
      singular: string
      plural: string
      gender: Gender
    }
  }
}
