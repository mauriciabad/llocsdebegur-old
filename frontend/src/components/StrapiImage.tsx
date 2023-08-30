import { BACKEND_URL } from '@/constants'
import Image from 'next/image'

export default function StrapiImage({
  image,
  className,
}: {
  image: {
    url: string
    width?: number | null
    height?: number | null
    alternativeText?: string | null
  }
  className?: string
}) {
  return (
    <Image
      className={className}
      src={`${BACKEND_URL}${image.url}`}
      alt={image.alternativeText ?? ''}
      height={image.height ?? undefined}
      width={image.width ?? undefined}
      unoptimized
    />
  )
}
