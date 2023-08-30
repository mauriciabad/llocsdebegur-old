import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('Header')

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <MyLink href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            {t('title')}
          </span>
        </MyLink>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-white sm:">
            <li>
              <MyLink
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 sm::text-blue-500:bg-gray-700:text-white sm::bg-transparent"
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
