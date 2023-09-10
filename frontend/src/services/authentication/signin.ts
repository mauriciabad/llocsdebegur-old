import { gqlClient, graphql, simplifyResponse } from '@/lib/gql'

export async function signIn({
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

  if (!rawLoginInfo) throw new Error('Error while login')
  const loginInfo = simplifyResponse(rawLoginInfo)

  if (!loginInfo.jwt) throw new Error('Missing JWT after login')

  return {
    user: loginInfo.user,
    jwt: loginInfo.jwt,
  }
}

const loginMutation = graphql(`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`)
