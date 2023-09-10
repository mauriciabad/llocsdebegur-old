import { ImageProperties } from '@/components/StrapiImage'
import {
  SimpleType,
  UserProfile,
  gqlClient,
  graphql,
  nonNullable,
  simplifyResponse,
} from '@/lib/gql'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import PlaceListLarge from '../PlaceListLarge'
import { DeepPick } from '@/lib/types'

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
                description
                cover {
                  data {
                    attributes {
                      url
                      height
                      width
                      alternativeText
                      placeholder
                    }
                  }
                }
                type {
                  data {
                    attributes {
                      slug
                      name
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
                description
                cover {
                  data {
                    attributes {
                      url
                      height
                      width
                      alternativeText
                      placeholder
                    }
                  }
                }
                type {
                  data {
                    attributes {
                      slug
                      name
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
                description
                cover {
                  data {
                    attributes {
                      url
                      height
                      width
                      alternativeText
                      placeholder
                    }
                  }
                }
                type {
                  data {
                    attributes {
                      slug
                      name
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

export default async function UserProfileSection({
  user,
}: {
  user: Session['user']
}) {
  const { data: rawUserProfile } = await gqlClient().query({
    query: getUserProfileQuery,
    variables: { userId: user.id },
  })
  const userProfile = simplifyResponse(rawUserProfile)?.[0]
  if (!userProfile) throw new Error('Missing user-profile')

  return <InnerComponent user={user} userProfile={userProfile} />
}

type PlaceListsKey = 'visitedPlaces' | 'favoritePlaces' | 'wantToGoPlaces'

async function InnerComponent({
  user,
  userProfile,
}: {
  user: Session['user']
  userProfile: DeepPick<
    SimpleType<UserProfile>,
    | 'biography'
    | 'name'
    | 'isPublic'
    | `${PlaceListsKey}.name`
    | `${PlaceListsKey}.slug`
    | `${PlaceListsKey}.description`
    | `${PlaceListsKey}.cover.${ImageProperties}`
    | `${PlaceListsKey}.type.slug`
    | `${PlaceListsKey}.type.name`
  >
}) {
  const t = useTranslations('Profile')

  return (
    <div>
      <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
        {t('profile-details')}
      </h3>
      <p>
        {t('username')}: @{user.username}
      </p>
      <p>
        {t('biography')}: {userProfile.biography}
      </p>
      <p>
        {t('name')}: {userProfile.name}
      </p>
      <p>
        {t('visibility')}: {userProfile.isPublic ? 'Public' : 'Private'}
      </p>

      <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
        {t('visited-places')}
      </h3>
      {!userProfile.visitedPlaces ? (
        <p className="my-12 text-stone-400">{t('no-places-yet')}</p>
      ) : (
        <PlaceListLarge
          places={userProfile.visitedPlaces.filter(nonNullable)}
        />
      )}

      <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
        {t('favorite-places')}
      </h3>
      {!userProfile.favoritePlaces ? (
        <p className="my-12 text-stone-400">{t('no-places-yet')}</p>
      ) : (
        <PlaceListLarge
          places={userProfile.favoritePlaces.filter(nonNullable)}
        />
      )}

      <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
        {t('want-to-go-places')}
      </h3>
      {!userProfile.wantToGoPlaces ? (
        <p className="my-12 text-stone-400">{t('no-places-yet')}</p>
      ) : (
        <PlaceListLarge
          places={userProfile.wantToGoPlaces.filter(nonNullable)}
        />
      )}
    </div>
  )
}