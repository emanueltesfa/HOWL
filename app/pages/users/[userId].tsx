import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteUser from "app/users/mutations/deleteUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })

  const currentUser = useCurrentUser()
  console.log(user.id)
  console.log(currentUser)
  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div>
        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <div>Hellofdsafjdsafjdsfa</div>
        <div> </div>

        <Link href={Routes.EditUserPage({ userId: user.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({ id: user.id })
              router.push(Routes.UsersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.UsersPage()}>
          <a>Users</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage

//
