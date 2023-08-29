'use client'

import { gqlClient } from '@/lib/gql'
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={gqlClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
