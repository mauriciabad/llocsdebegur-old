'use client'

import PlaceListLarge from '@/components/PlaceListLarge'
import { nonNullable } from '@/lib/gql'
import { useAuthentication } from '@/services/authentication'
import { IconUser } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('Profile')
  const { user, login, userProfile, logout } = useAuthentication()

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

        <div className="mb-4 flex justify-center">
          {user ? (
            <button
              onClick={logout}
              className="inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800"
            >
              {t('logout')}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800"
            >
              {t('login')}
            </button>
          )}
        </div>

        {userProfile && user && (
          <div>
            <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
              {t('profile-details')}
            </h3>
            <p>
              {t('username')}: {user.username}
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
              <p className='my-12 text-stone-400'>{t('no-places-yet')}</p>
            ) : (
              <PlaceListLarge
                places={userProfile.visitedPlaces.filter(nonNullable)}
              />
            )}

            <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
              {t('favorite-places')}
            </h3>
            {!userProfile.favoritePlaces ? (
              <p className='my-12 text-stone-400'>{t('no-places-yet')}</p>
            ) : (
              <PlaceListLarge
                places={userProfile.favoritePlaces.filter(nonNullable)}
              />
            )}

            <h3 className="mt-8 font-title text-2xl font-bold uppercase text-stone-800">
              {t('want-to-go-places')}
            </h3>
            {!userProfile.wantToGoPlaces ? (
              <p className='my-12 text-stone-400'>{t('no-places-yet')}</p>
            ) : (
              <PlaceListLarge
                places={userProfile.wantToGoPlaces.filter(nonNullable)}
              />
            )}
          </div>
        )}
      </main>
    </>
  )
}
