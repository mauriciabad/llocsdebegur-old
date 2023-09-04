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
        'mx-auto inline-block max-w-[theme(spacing.48)] rounded-xl border border-stone-200 bg-white p-2 text-center shadow-md outline-2 outline-brand-100 hover:outline',
        className
      )}
    >
      <span className="block font-title text-sm font-medium leading-none tracking-wide text-stone-400">
        {t('view-in')}
      </span>
      <Image src={GoogleMapsLogo} alt="Google Maps" className=" block" />
    </a>
  )
}
