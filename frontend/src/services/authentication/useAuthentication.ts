import {
  GetUserProfileQuery,
  SimpleResponse,
  gqlClient,
  graphql,
  simplifyResponse,
} from '@/lib/gql'
import { useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const getUserProfileQuery = graphql(`
  query getUserProfile($userId: ID!) {
    userProfiles(filters: { user: { id: { eq: $userId } } }) {
      data {
        attributes {
          biography
          name
          isPublic
          visitedPlaces {
            data {
              attributes {
                slug
                name
                type {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
          favoritePlaces {
            data {
              attributes {
                slug
                name
                type {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
          wantToGoPlaces {
            data {
              attributes {
                slug
                name
                type {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

const loginMutation = graphql(`
  mutation login($identifier: String!, $password: String!) {
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

  const [userProfile, setUserProfile] = useState<NonNullable<
    SimpleResponse<GetUserProfileQuery>
  > | null>(null)

  useEffect(() => {
    if (user?.id) {
      gqlClient()
        .query({
          query: getUserProfileQuery,
          variables: { userId: user.id },
        })
        .then(({ data: rawUserProfile }) => {
          const newUserProfile = simplifyResponse(rawUserProfile)
          if (!newUserProfile) throw new Error('Missing user-profile')
          setUserProfile(newUserProfile)
        })
    }
  }, [user])

  return {
    user,
    login,
    userProfile,
  }
}
