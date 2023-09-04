import { BACKEND_URL } from '@/constants'
import classNames from 'classnames'
import Image from 'next/image'

export default function StrapiImage({
  image,
  className,
  height,
  width,
}: {
  image: {
    url: string
    width?: number | null
    height?: number | null
    alternativeText?: string | null
    placeholder?: string | null
  }
  height?: number
  width?: number | 'full'
  className?: string
}) {
  const widthFull = width === 'full' ? window.screen.width : width

  const imgHeight = (() => {
    if (height) return height
    if (widthFull) {
      if (!image.height || !image.width) return undefined
      return (image.height / image.width) * widthFull
    }
    return image.height ?? undefined
  })()

  const imgWidth = (() => {
    if (widthFull) return widthFull
    if (height) {
      if (!image.width || !image.height) return undefined
      return (image.width / image.height) * height
    }
    return image.width ?? undefined
  })()

  const imageUrl = `${BACKEND_URL}${image.url}?${new URLSearchParams({
    format: 'avif',
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
