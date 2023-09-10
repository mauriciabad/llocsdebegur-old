'use client'

import { graphql, simplifyResponse } from '@/lib/gql'
import { useQuery } from '@apollo/client'
import { IconBookmark, IconCheck, IconHeart } from '@tabler/icons-react'
import classNames from 'classnames'
import { useMemo } from 'react'

const getUserProfilePlacesQuery = graphql(`
  query getUserProfilePlaces($userId: ID!) {
    userProfiles(filters: { user: { id: { eq: $userId } } }) {
      data {
        attributes {
          visitedPlaces {
            data {
              attributes {
                slug
              }
            }
          }
          favoritePlaces {
            data {
              attributes {
                slug
              }
            }
          }
          wantToGoPlaces {
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
`)

export default function UserProfilePlacesAddButtonsButtons({
  placeSlug,
  userId,
}: {
  className?: string
  placeSlug: string
  userId: string
}) {
  const { data: rawUserProfile, loading } = useQuery(
    getUserProfilePlacesQuery,
    {
      variables: { userId },
    }
  )

  const userProfile = useMemo(
    () => rawUserProfile && simplifyResponse(rawUserProfile)?.[0],
    [rawUserProfile]
  )

  const isInVisitedPlaces = useMemo(
    () =>
      userProfile?.visitedPlaces?.some((place) => place?.slug === placeSlug),
    [userProfile, placeSlug]
  )
  const isInFavoritePlaces = useMemo(
    () =>
      userProfile?.favoritePlaces?.some((place) => place?.slug === placeSlug),
    [userProfile, placeSlug]
  )
  const isInWantToGoPlaces = useMemo(
    () =>
      userProfile?.wantToGoPlaces?.some((place) => place?.slug === placeSlug),
    [userProfile, placeSlug]
  )

  function addTo(list: 'visitedPlaces' | 'favoritePlaces' | 'wantToGoPlaces') {
    // TODO: Add to list only if user is correct
    console.log('addTo', list)
  }

  return (
    <>
      <button
        disabled={loading}
        onClick={() => addTo('visitedPlaces')}
        className={classNames(
          {
            'border-blue-300   text-blue-950': isInVisitedPlaces,
            'border-stone-200 bg-stone-50 text-stone-950': !isInVisitedPlaces,
          },
          'flex gap-3 rounded-lg border-2 px-3 py-2 font-medium'
        )}
      >
        <IconCheck
          size={24}
          className={classNames({
            ' text-blue-400': isInVisitedPlaces,
            ' text-stone-400': !isInVisitedPlaces,
          })}
        />
        <span>{isInVisitedPlaces ? 'Visited' : 'Add to visited'}</span>
      </button>

      <button
        disabled={loading}
        onClick={() => addTo('favoritePlaces')}
        className={classNames(
          {
            'border-pink-300   text-pink-950': isInFavoritePlaces,
            'border-stone-200 bg-stone-50 text-stone-950': !isInFavoritePlaces,
          },
          'flex gap-3 rounded-lg border-2 px-3 py-2 font-medium'
        )}
      >
        <IconHeart
          size={24}
          className={classNames({
            ' text-pink-400': isInFavoritePlaces,
            ' text-stone-400': !isInFavoritePlaces,
          })}
        />
        <span>{isInFavoritePlaces ? 'Favorite' : 'Add to favorites'}</span>
      </button>

      <button
        disabled={loading}
        onClick={() => addTo('wantToGoPlaces')}
        className={classNames(
          {
            'border-green-300   text-green-950': isInWantToGoPlaces,
            'border-stone-200 bg-stone-50 text-stone-950': !isInWantToGoPlaces,
          },
          'flex gap-3 rounded-lg border-2 px-3 py-2 font-medium'
        )}
      >
        <IconBookmark
          size={24}
          className={classNames({
            ' text-green-400': isInWantToGoPlaces,
            ' text-stone-400': !isInWantToGoPlaces,
          })}
        />
        <span>{isInWantToGoPlaces ? 'Want to go' : 'Add to want to go'}</span>
      </button>
    </>
  )
}
