'use client'

import Link from 'next-intl/link'

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
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 mb-4 font-title text-7xl font-extrabold tracking-tight lg:text-9xl">
            500
          </h1>
          <p className="mb-8 font-title text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            {t('internal-server-error')}
          </p>

          <p className="mb-2 text-lg font-light text-stone-500">
            {t('message')}
          </p>
          <p className="mx-auto mb-8 inline-block rounded-md bg-stone-200 p-2 font-mono font-bold leading-none">
            {error.digest}
          </p>

          <p className="mb-2 text-lg font-light text-stone-500">
            {t('error-message')}
          </p>
          <pre className="mb-8 whitespace-normal break-normal rounded-md bg-stone-800 px-6 py-4 text-left font-mono text-sm text-white">
            {error.message}
          </pre>

          <p className="mb-2 text-lg font-light text-stone-500">
            {t('actions')}
          </p>
          <div>
            <Link
              href="/"
              className="mb-2 mr-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-300"
            >
              {t('go-home')}
            </Link>
            <button
              className="mb-2 mr-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-300"
              onClick={() => reset()}
            >
              {t('try-again')}
            </button>
            <a
              href="mailto:hello@mauriciabad.com"
              target="_blank"
              className="mb-2 mr-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-300"
            >
              {t('contact-support')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
