export type DeepPick<T, K extends string> = T extends object
  ? NonNullable<T> extends readonly unknown[]
    ? DeepPick<NonNullable<T>[number], K>[] | Exclude<T, NonNullable<T>>
    : {
        [P in Head<K> & keyof T]: DeepPick<
          T[P],
          Tail<Extract<K, `${P}.${string}`>>
        >
      }
  : T

type Head<T extends string> = T extends `${infer First}.${string}` ? First : T

type Tail<T extends string> = T extends `${string}.${infer Rest}` ? Rest : never
