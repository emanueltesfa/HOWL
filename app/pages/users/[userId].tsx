import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteUser from "app/users/mutations/deleteUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getPosts from "app/posts/queries/getPosts"
import ScrollPost from "app/core/components/scrollPost"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })
  const currentUser = useCurrentUser()
  const [{ posts }] = useQuery(getPosts, { where: { created_by: user.id } })
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: user.id })

  console.log(user)
  console.log(currentUser)
  console.log()

  // Check if user is the same user that is logged in or visitor
  // {flag ? <MYprofile /> :<otherprofile />}
  // Potential Merge Conflict with getDogProfileUserId.ts
  return (
    <>
      <div>
        <div className="HumanProf">
          <h1>Welcome {user.name}</h1>
          <button
            onClick={() => {
              router.push("/post/new")
            }}
          >
            Make Post!
          </button>
          <CalendarMonthIcon />
        </div>

        <ScrollPost />
        <div className="DogProf">
          <h1>Hey {dogProfile.pet_name}!</h1>
        </div>

        <Head>
          <h1>Name {user.name}</h1>
        </Head>

        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        {/* <Link href={Routes.EditUserPage({ userId: user.id })}>
          <a>Edit</a>
        </Link> */}

        {/* <button
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
        </button> */}
      </div>
    </>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      {
        <p>
          <Link href={Routes.UsersPage()}>
            <a>Users</a>
          </Link>
        </p>
      }

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
