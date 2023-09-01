import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import classNames from 'classnames'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { ApolloWrapper } from '@/components/wrappers/ApolloWrapper'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Llocs de Begur',
  description: "Descobreix llocs increïbles d'és teu poble.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()
  const messages = (await import(`../../messages/${locale}.json`)).default

  return (
    <html lang={locale}>
      <body
        className={classNames([
          inter.className,
          poppins.variable,
          inter.variable,
          'min-h-screen bg-stone-50',
        ])}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <ApolloWrapper>{children}</ApolloWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
