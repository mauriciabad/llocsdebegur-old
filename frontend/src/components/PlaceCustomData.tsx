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
    <div className="border border-stone-300 bg-stone-100 rounded-xl p-4">
      <div className="space-y-2">
        {data.map((d) => {
          const Icon = icons[d.icon]
          return (
            <div key={d.text} className="flex items-center">
              <Icon className="inline-block mr-1 shrink-0" />
              <div>{d.text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
