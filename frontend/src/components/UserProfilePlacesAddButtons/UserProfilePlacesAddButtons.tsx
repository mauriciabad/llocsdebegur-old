import { getServerSessionCustom } from '@/services/authentication'
import classNames from 'classnames'
import UserProfilePlacesAddButtonsButtons from './UserProfilePlacesAddButtonsButtons'
import Link from 'next/link'

export default async function UserProfilePlacesAddButtons({
  placeSlug,
  className,
}: {
  className?: string
  placeSlug: string
}) {
  const session = await getServerSessionCustom()

  return (
    <div className={classNames(className, 'flex flex-wrap gap-4')}>
      {session ? (
        <UserProfilePlacesAddButtonsButtons
          userId={session.user.id}
          placeSlug={placeSlug}
        />
      ) : (
        <Link
          className="rounded-lg border-2 border-stone-200 bg-stone-50 px-6 py-2 font-medium text-stone-950"
          href="/api/auth/signin"
        >
          Login to add to bookmarks
        </Link>
      )}
    </div>
  )
}
