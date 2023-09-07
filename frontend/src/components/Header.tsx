import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import Logo from './Logo'
import classNames from 'classnames'

export default function Header({ fullWidth = false }: { fullWidth?: boolean }) {
  const t = useTranslations('Header')

  return (
    <nav className="border-stone-200 bg-brand text-white">
      <div
        className={classNames(
          { 'max-w-screen-xl': !fullWidth },
          'mx-auto flex flex-wrap items-center justify-between p-4'
        )}
      >
        <Link href="/" className="flex items-center">
          <Logo className="mr-3 h-10" />
          <span className="self-center whitespace-nowrap text-2xl font-bold">
            {t('title')}
          </span>
        </Link>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-dropdown">
          <ul className="mt-4 flex flex-col rounded-lg border border-stone-100 p-4 font-medium sm:mt-0 sm:flex-row sm:space-x-8 sm:border-0 sm:p-0">
            <li>
              <Link
                href="/"
                className="block rounded px-4 py-2 hover:bg-white/20"
              >
                {t('home')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
