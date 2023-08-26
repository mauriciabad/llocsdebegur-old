import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Llocs de Begur',
  description: "Descobreix llocs increhibles d'es teu poble.",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()

  if (params.locale !== locale) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={classNames([inter.className, '[&>main]:min-h-screen'])}>
        {children}
      </body>
    </html>
  )
}
