import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUsers from "app/users/queries/getUsers"

const ITEMS_PER_PAGE = 100

export const UsersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ users, hasMore }] = usePaginatedQuery(getUsers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {/* {users.map((user) => (
          <li key={user.id}>
            <Link href={Routes.ShowUserPage({ userId: user.id })}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))} */}
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

const UsersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <div>
        <p>
          {/* <Link href={Routes.NewUserPage()}>
            <a>Create User</a>
          </Link> */}
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UsersList />
        </Suspense>
      </div>
    </>
  )
}

UsersPage.authenticate = true
UsersPage.getLayout = (page) => <Layout>{page}</Layout>

export default UsersPage
