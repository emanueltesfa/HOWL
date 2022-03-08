import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProfiles from "app/profiles/queries/getProfiles"

const ITEMS_PER_PAGE = 100

export const ProfilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ profiles, hasMore }] = usePaginatedQuery(getProfiles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <Link href={Routes.ShowProfilePage({ profileId: profile.id })}>
              <a>{profile.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProfilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Profiles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProfilePage()}>
            <a>Create Profile</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProfilesList />
        </Suspense>
      </div>
    </>
  )
}

ProfilesPage.authenticate = true
ProfilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilesPage
