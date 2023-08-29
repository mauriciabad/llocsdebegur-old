'use client'

import { MyLink } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('ErrorPage')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            500
          </h1>
          <p className="mb-8 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            {t('internal-server-error')}
          </p>
          <p className="mb-2 text-lg font-light text-gray-500">
            {t('message')}
          </p>
          <p className="mb-8 font-bold font-mono p-2 leading-none bg-slate-200 rounded-md inline-block mx-auto">
            {error.digest}
          </p>

          <p className="mb-2 text-lg font-light text-gray-500">
            {t('error-message')}
          </p>
          <p className="mb-8 py-4 px-6 rounded-md text-sm font-mono bg-slate-800 text-white text-left">
            {error.message}
          </p>
          <p className="mb-2 text-lg font-light text-gray-500">
            {t('actions')}
          </p>
          <div>
            <MyLink
              href="/"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {t('go-home')}
            </MyLink>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => reset()}
            >
              {t('try-again')}
            </button>
            <a
              href="mailto:hello@mauriciabad.com"
              target="_blank"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {t('contact-support')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
