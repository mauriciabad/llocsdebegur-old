import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import classNames from 'classnames'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { ApolloWrapper } from '@/components/wrappers/ApolloWrapper'
import { AuthProvider } from '@/components/wrappers/AuthProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Llocs de Begur',
  description: "Descobreix llocs increïbles d'és teu poble.",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5F797A' },
    { media: '(prefers-color-scheme: dark)', color: '#222222' },
  ],
  icons: {
    apple: '/favicon/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()
  const messages = (await import(`/messages/${locale}.json`)).default

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
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
