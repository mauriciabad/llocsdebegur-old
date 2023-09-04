import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Logo from '/public/logo.svg'

export default function Header() {
  const t = useTranslations('Header')

  return (
    <nav className="border-stone-200 bg-brand text-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <MyLink href="/" className="flex items-center">
          <Image src={Logo} className="mr-3 h-8" alt="Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-bold">
            {t('title')}
          </span>
        </MyLink>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-dropdown">
          <ul className="mt-4 flex flex-col rounded-lg border border-stone-100 p-4 font-medium sm:mt-0 sm:flex-row sm:space-x-8 sm:border-0 sm:p-0">
            <li>
              <MyLink
                href="/"
                className="block rounded px-4 py-2 hover:bg-white/20"
              >
                {t('home')}
              </MyLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
