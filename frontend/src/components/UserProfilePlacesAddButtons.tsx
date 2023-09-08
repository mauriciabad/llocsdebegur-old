'use client'

import { useAuthentication } from '@/services/authentication'
import { IconBookmark, IconCheck, IconHeart } from '@tabler/icons-react'
import classNames from 'classnames'

export default function UserProfilePlacesAddButtons({
  placeSlug,
  className,
}: {
  className?: string
  placeSlug: string
}) {
  const { userProfile, user, login } = useAuthentication()
  const isInVisitedPlaces = userProfile?.visitedPlaces?.some(
    (place) => place?.slug === placeSlug
  )
  const isInFavoritePlaces = userProfile?.favoritePlaces?.some(
    (place) => place?.slug === placeSlug
  )
  const isInWantToGoPlaces = userProfile?.wantToGoPlaces?.some(
    (place) => place?.slug === placeSlug
  )

  function addTo(list: 'visitedPlaces' | 'favoritePlaces' | 'wantToGoPlaces') {
    // TODO: Add to list only if user is correct
    console.log('addTo', list)
  }

  async function handleLogin() {
    return login({
      // TODO: Remove hardcoded test login credentials
      identifier: 'test',
      password: '123456',
    })
  }
  return (
    <>
      <div className={classNames(className, 'flex gap-4')}>
        {user ? (
          <>
            <button
              onClick={() => addTo('visitedPlaces')}
              className={classNames(
                {
                  'border-blue-200 bg-blue-50 text-blue-950': isInVisitedPlaces,
                  'border-stone-200 bg-stone-50 text-stone-950':
                    !isInVisitedPlaces,
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
              onClick={() => addTo('favoritePlaces')}
              className={classNames(
                {
                  'border-pink-200 bg-pink-50 text-pink-950':
                    isInFavoritePlaces,
                  'border-stone-200 bg-stone-50 text-stone-950':
                    isInFavoritePlaces,
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
              <span>
                {isInFavoritePlaces ? 'Favorite' : 'Add to favorites'}
              </span>
            </button>

            <button
              onClick={() => addTo('wantToGoPlaces')}
              className={classNames(
                {
                  'border-green-200 bg-green-50 text-green-950':
                    isInWantToGoPlaces,
                  'border-stone-200 bg-stone-50 text-stone-950':
                    !isInWantToGoPlaces,
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
              <span>
                {isInWantToGoPlaces ? 'Want to go' : 'Add to want to go'}
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="rounded-lg border-2 border-stone-200 bg-stone-50 px-6 py-2 font-medium text-stone-950"
          >
            Login to add to bookmarks
          </button>
        )}
      </div>
    </>
  )
}
