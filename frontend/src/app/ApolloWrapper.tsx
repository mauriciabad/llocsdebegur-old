'use client'

import { gqlClient } from '@/lib/graphql'
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={gqlClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
