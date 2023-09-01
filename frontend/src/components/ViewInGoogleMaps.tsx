import Image from 'next/image'
import GoogleMapsLogo from '/public/google-maps-logo.svg'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'

export default function ViewInGoogleMaps({
  googleMapsPlaceId,
  className,
}: {
  googleMapsPlaceId: string
  className?: string
}) {
  const t = useTranslations('Links')

  return (
    <a
      href={`https://goo.gl/maps/${googleMapsPlaceId}`}
      className={classNames(
        'max-w-[theme(spacing.48)] shadow-md bg-white outline-2 hover:outline outline-brand-100 inline-block border border-stone-200 rounded-xl mx-auto p-2 text-center',
        className
      )}
    >
      <span className="block font-title font-medium text-sm text-stone-400 tracking-wide leading-none">
        {t('view-in')}
      </span>
      <Image src={GoogleMapsLogo} alt="Google Maps" className=" block" />
    </a>
  )
}
