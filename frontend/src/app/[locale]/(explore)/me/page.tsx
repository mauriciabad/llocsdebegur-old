'use client'

import {
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
  GetUserProfileQuery,
} from '@/lib/gql'
import CodeBox from '@/components/CodeBox'
import { useAuthentication } from '@/services/authentication'
import { useState, useEffect } from 'react'
import { IconUser } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

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

export default function Page() {
  const t = useTranslations('Profile')
  const { user, login } = useAuthentication()

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
          if (!rawUserProfile) return
          const newUserProfile = simplifyResponse(rawUserProfile)
          if (!newUserProfile) return
          setUserProfile(newUserProfile)
        })
    }
  }, [user])

  async function handleLogin() {
    return login({
      // TODO: Remove hardcoded test login credentials
      identifier: 'test',
      password: '123456',
    })
  }

  return (
    <>
      <main className="mx-auto max-w-6xl p-4">
        <IconUser className="mx-auto mb-4 mt-8 h-12 w-12 stroke-1 text-brand-600" />
        <h2 className="mb-4 text-center font-title text-4xl font-bold capitalize text-stone-800">
          {t('profile')}
        </h2>
        {user ? (
          <CodeBox data={userProfile} />
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800"
            >
              {t('login')}
            </button>
          </div>
        )}
      </main>
    </>
  )
}
