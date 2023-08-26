import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import { useLocale } from 'next-intl'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Llocs de Begur',
  description: "Descobreix llocs increhibles d'es teu poble.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()

  return (
    <html lang={locale}>
      <body className={classNames([inter.className, '[&>main]:min-h-screen'])}>
        {children}
      </body>
    </html>
  )
}
