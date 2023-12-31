import { BACKEND_URL } from '@/constants'
import classNames from 'classnames'
import Image from 'next/image'

type ImageObject = {
  url: string
  width?: number | null
  height?: number | null
  alternativeText?: string | null
  placeholder?: string | null
}

export type ImageProperties = keyof ImageObject

export default function StrapiImage({
  image,
  className,
  height,
  width,
}: {
  image: ImageObject
  height?: number
  width?: number
  className?: string
}) {
  const imgHeight = (() => {
    if (height) return height
    if (width) {
      if (!image.height || !image.width) return undefined
      return (image.height / image.width) * width
    }
    return image.height ?? undefined
  })()

  const imgWidth = (() => {
    if (width) return width
    if (height) {
      if (!image.width || !image.height) return undefined
      return (image.width / image.height) * height
    }
    return image.width ?? undefined
  })()

  const imageUrl = `${BACKEND_URL}${image.url}?${new URLSearchParams({
    format: 'webp',
    ...(imgWidth ? { width: imgWidth.toFixed() } : {}),
    ...(imgHeight ? { height: imgHeight.toFixed() } : {}),
  })}`

  return (
    <Image
      className={classNames('object-cover', className)}
      src={imageUrl}
      alt={image.alternativeText ?? ''}
      height={imgHeight}
      width={imgWidth}
      unoptimized
      placeholder="blur"
      blurDataURL={image.placeholder ?? undefined}
    />
  )
}
