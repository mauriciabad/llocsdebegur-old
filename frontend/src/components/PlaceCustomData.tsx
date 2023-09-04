import {
  IconCalendar,
  IconCompass,
  IconCurrencyEuro,
  IconGrain,
  IconTicket,
  type Icon,
} from '@tabler/icons-react'

const icons = {
  sandType: IconGrain,
  orientation: IconCompass,
  visitable: IconTicket,
  year: IconCalendar,
  'reference-price': IconCurrencyEuro,
} as const satisfies Record<string, Icon>

type IconName = keyof typeof icons
export type PlaceCustomDataArray = { icon: IconName; text: string }[]

export default function PlaceCustomData({
  data,
}: {
  data: PlaceCustomDataArray
}) {
  return (
    <div className="rounded-xl border border-stone-300 bg-stone-100 p-4">
      <div className="space-y-2">
        {data.map((d) => {
          const Icon = icons[d.icon]
          return (
            <div key={d.text} className="flex items-center">
              <Icon className="mr-1 inline-block shrink-0" />
              <div>{d.text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
