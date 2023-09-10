import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from '@/services/authentication'

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
    jwt: async ({ token, user }) => {
      if (user) {
        token.jwt = user.jwt
        token.id = user.id
        token.username = user.username
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
