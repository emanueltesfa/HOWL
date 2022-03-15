import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"

const ITEMS_PER_PAGE = 100

export const DogProfilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ dogProfiles, hasMore }] = usePaginatedQuery(getDogProfiles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {dogProfiles.map((dogProfile) => (
          <li key={dogProfile.id}>
            <Link href={Routes.ShowDogProfilePage({ dogProfileId: dogProfile.id })}>
              <a>{dogProfile.name}</a>
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

const DogProfilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>DogProfiles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDogProfilePage()}>
            <a>Create DogProfile</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DogProfilesList />
        </Suspense>
      </div>
    </>
  )
}

DogProfilesPage.authenticate = true
DogProfilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default DogProfilesPage
