import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Logo from '/public/logo.svg'

export default function Header() {
  const t = useTranslations('Header')

  return (
    <nav className="bg-brand text-white border-stone-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <MyLink href="/" className="flex items-center">
          <Image src={Logo} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            {t('title')}
          </span>
        </MyLink>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 sm:p-0 mt-4 border border-stone-100 rounded-lg sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0">
            <li>
              <MyLink
                href="/"
                className="block py-2 px-4 rounded hover:bg-white/20"
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
