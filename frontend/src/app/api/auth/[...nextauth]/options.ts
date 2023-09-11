import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from '@/services/authentication'
import { BACKEND_URL } from '@/constants'
import { UsersPermissionsLoginPayload } from '@/lib/gql'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing environment variables')
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        identifier: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const { user, jwt } = await signIn(credentials)
          return { ...user, jwt }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        if (account.provider === 'credentials') {
          token.jwt = user.jwt
          token.id = user.id
          token.username = user.username
        } else {
          const data: UsersPermissionsLoginPayload = await (
            await fetch(
              `${BACKEND_URL}/api/auth/${
                account.provider
              }/callback?access_token=${
                account.access_token ?? account.accessToken
              }`
            )
          ).json()

          if (!data.jwt) throw new Error('Missing JWT at login')

          token.jwt = data.jwt
          token.id = data.user.id
          token.username = data.user.username
        }
      }

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.jwt = token.jwt
      session.user.id = token.id
      session.user.username = token.username

      return Promise.resolve(session)
    },
  },
}
