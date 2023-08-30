import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import { useLocale } from 'next-intl'
import { ApolloWrapper } from './ApolloWrapper'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
const inter = Inter({ subsets: ['latin'] })

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

  return (
    <html lang={locale}>
      <body className={classNames([inter.className, 'min-h-screen'])}>
        <Header />
        <ApolloWrapper>{children}</ApolloWrapper>
        <Footer />
      </body>
    </html>
  )
}
