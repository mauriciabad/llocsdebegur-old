import { gqlClient, graphql } from '@/lib/gql'
import { useLocalStorage } from 'usehooks-ts'

const loginMutation = graphql(`
  mutation loginMutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        id
      }
    }
  }
`)

export type User = {
  jwt: string
  username: string
  id: string
}

export function useAuthentication() {
  const [user, setUser] = useLocalStorage<User | null>(
    'authentication-user',
    null
  )

  async function login({
    identifier,
    password,
  }: {
    identifier: string
    password: string
  }) {
    const { data: rawLoginInfo } = await gqlClient().mutate({
      mutation: loginMutation,
      variables: { identifier, password },
    })

    const loginInfo = rawLoginInfo?.login

    if (!loginInfo?.jwt) throw new Error('Missing JWT after login')

    setUser({
      username: loginInfo.user.username,
      jwt: loginInfo.jwt,
      id: loginInfo.user.id,
    })
  }

  return {
    user,
    login,
  }
}
