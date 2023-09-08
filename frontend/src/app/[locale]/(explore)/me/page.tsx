'use client'

import CodeBox from '@/components/CodeBox'
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

        {userProfile && <CodeBox data={userProfile} />}
      </main>
    </>
  )
}
