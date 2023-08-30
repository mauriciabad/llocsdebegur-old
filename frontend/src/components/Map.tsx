import dynamic from 'next/dynamic'
import { IconLoader } from '@tabler/icons-react'

const Map = dynamic(() => import('./MapRaw'), {
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center bg-[#f2efe9]">
      <IconLoader className="h-4 w-4 animate-spin" />
      <span className="animate-pulse">Loading map...</span>
    </div>
  ),
  ssr: false,
})

export default Map
