import UserProfileSection from '@/components/userProfile/UserProfileSection'
import { getServerSessionCustom } from '@/services/authentication'
import { IconUser } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default async function PageWrapper({
  params: { username, provider },
}: {
  params: { username: string; provider: string }
}) {
  const session = await getServerSessionCustom()
  const isMe =
    !!session &&
    session.user.username === username &&
    session.user.provider === provider
  return <Page username={username} provider={provider} isMe={isMe} />
}

function Page({
  username,
  provider,
  isMe,
}: {
  username: string
  provider: string
  isMe: boolean
}) {
  const t = useTranslations('Profile')

  return (
    <>
      <main className="mx-auto max-w-6xl p-4">
        <IconUser className="mx-auto mb-4 mt-8 h-12 w-12 stroke-1 text-brand-600" />
        <h2 className="mb-4 text-center font-title text-4xl font-bold capitalize text-stone-800">
          {isMe ? t('my-profile') : t('profile')}
        </h2>

        {isMe && (
          <div className="mb-4 flex justify-center">
            <Link
              className="inline-block rounded-full bg-brand-600 px-8 py-3 uppercase leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-1 group-hover:bg-brand-800"
              href="/api/auth/signout"
            >
              {t('logout')}
            </Link>
          </div>
        )}

        <UserProfileSection username={username} provider={provider} />
      </main>
    </>
  )
}
