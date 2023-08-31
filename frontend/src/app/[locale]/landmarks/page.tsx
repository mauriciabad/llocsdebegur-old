import { useTranslations, useLocale } from 'next-intl'
import { MyLink } from '@/navigation'
import {
  GetAllLandmarksQuery,
  graphql,
  gqlClient,
  simplifyResponse,
  SimpleResponse,
} from '@/lib/gql'
import PlaceIcon from '@/components/PlaceIcon'

const getAllLandmarksQuery = graphql(`
  query getAllLandmarks($locale: I18NLocaleCode!) {
    places(locale: $locale, filters: { type: { eq: "landmark" } }) {
      data {
        attributes {
          name
          slug
        }
      }
    }
  }
`)

export default async function PageWrapper() {
  const locale = useLocale()

  const { data } = await gqlClient().query({
    query: getAllLandmarksQuery,
    variables: { locale },
  })

  const landmarks = simplifyResponse(data)

  if (!landmarks) return <h1>Error fetching data</h1> // TODO: Do better error handling

  return <Page landmarks={landmarks} />
}

function Page({
  landmarks,
}: {
  landmarks: NonNullable<SimpleResponse<GetAllLandmarksQuery>>
}) {
  const t = useTranslations('AllLandmarksView')

  return (
    <main className="text-center mx-auto max-w-2xl p-4">
      <PlaceIcon
        type="landmark"
        className="mx-auto text-brand-600 mb-4 mt-8 h-12 w-12 stroke-1"
      />
      <h2 className="font-bold text-4xl font-title text-stone-800">
        {t('landmarks')}
      </h2>
      <ul className="mt-6">
        {landmarks.map(
          (landmark) =>
            landmark && (
              <li key={landmark.slug}>
                <MyLink
                  href={{
                    pathname: '/landmarks/[placeSlug]',
                    params: { placeSlug: landmark.slug ?? 'null' },
                  }}
                  className="underline text-xl py-2 px-4 inline-block"
                >
                  {' '}
                  {landmark.name}
                </MyLink>
              </li>
            )
        )}
      </ul>
    </main>
  )
}
