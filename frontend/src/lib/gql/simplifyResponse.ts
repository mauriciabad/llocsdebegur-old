/* eslint-disable @typescript-eslint/no-explicit-any */

export function getOnlyOne(array: undefined): undefined
export function getOnlyOne(array: null): null
export function getOnlyOne(array: []): undefined
export function getOnlyOne<T>(array: T[]): T
export function getOnlyOne<T>(
  array: T[] | undefined | null
): T | undefined | null
export function getOnlyOne<T>(array: T[] | undefined | null) {
  if (array === undefined) return undefined
  if (array === null) return null
  if (array.length === 0) return undefined

  if (!Array.isArray(array)) throw new Error('Response is not an array')
  if (array.length >= 2)
    throw new Error('Response has none or more than 1 items')

  return array[0]
}

export function simplifyResponse<T extends ObjectType>(
  response: T
): SimpleResponse<T> {
  const entries = Object.entries(response).filter(([k]) => k !== '__typename')
  if (entries.length >= 2)
    throw new Error(
      'Cannot simplify a Strapi response that contains an object with more than one key'
    )
  return simplify(entries[0][1] as any)
}

export function simplify<T extends ValidType>(value: T): SimpleType<T>
export function simplify<T>(value: T) {
  if (Array.isArray(value)) return value.map(simplify)

  if (isPlainObject(value)) {
    if ('data' in value) return simplify(value.data)
    if ('attributes' in value) return simplify(value.attributes)
    return objectMap(value, simplify)
  }

  return value
}

export function typeDynamicZone<
  T extends { [k in string]: any } | null | undefined,
>(obj: T | { [k in never]: never }): T {
  return obj as T
}

export function optionallyAccess<
  T extends { [k in string]: any } | null | undefined,
  K extends keyof T,
>(obj: T | { [k in never]: never }, key: K) {
  return obj && key in obj && (obj as T)?.[key]
}

function isPlainObject<
  O extends R | any,
  R extends Record<string | number | symbol, any>,
>(obj: O): obj is R {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}

interface Dictionary<T> {
  [key: string]: T
}

function objectMap<TValue, TResult>(
  obj: Dictionary<TValue>,
  valSelector: (val: TValue, obj: Dictionary<TValue>) => TResult,
  keySelector?: (key: string, obj: Dictionary<TValue>) => string,
  ctx?: Dictionary<TValue>
) {
  const ret = {} as Dictionary<TResult>
  for (const key of Object.keys(obj)) {
    if (key === '__typename') continue
    const retKey = keySelector ? keySelector.call(ctx || null, key, obj) : key
    const retVal = valSelector.call(ctx || null, obj[key], obj)
    ret[retKey] = retVal
  }
  return ret
}

type ValidType = UntouchedType | ObjectType | ArrayType

type UntouchedType =
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined
  | bigint
  | Date
type ObjectType = { [key in string]?: ValidType }
type ArrayType = ValidType[]

type IsAny<T> = unknown extends T & string ? true : false

export type SimpleType<T extends ValidType> = IsAny<T> extends true
  ? any
  : T extends UntouchedType
  ? T
  : T extends [...infer Ar extends ValidType[]]
  ? { [Index in keyof Ar]: SimpleType<Ar[Index]> }
  : T extends { [K in 'data']?: infer Ob extends ValidType }
  ? SimpleType<Ob>
  : T extends { [K in 'attributes']?: infer Ob extends ValidType }
  ? SimpleType<Ob>
  : T extends Omit<ObjectType, 'data' | 'attributes'>
  ? { [key in Exclude<keyof T, '__typename'>]: SimpleType<T[key]> }
  : T

type IsUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? false
  : true

type GetOnlyKeyOrNever<
  T extends ObjectType,
  Keys = Exclude<keyof T, '__typename'>,
> = IsUnion<Keys> extends true ? never : Keys

export type SimpleResponse<T extends ObjectType> = SimpleType<
  T[GetOnlyKeyOrNever<T>]
>
export type NonNullableItem<T extends any[] | null | undefined> = NonNullable<
  NonNullable<T>[number]
>

export function nonNullable<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined
}

type Expand<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T

type UnionToIntersection<U> = Expand<
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never
>
