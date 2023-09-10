import { BACKEND_URL, IS_PRODUCTION_ENV } from '@/constants'
import { ApolloLink, HttpLink } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

if (!IS_PRODUCTION_ENV) {
  loadDevMessages()
  loadErrorMessages()
}

const GRAPHQL_API_URL = `${BACKEND_URL}/graphql` as const

export function gqlClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL,
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}
