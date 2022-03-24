import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import updateUser from "app/users/mutations/updateUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"

export const EditUser = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <Head>
        <title>Edit User {user.id}</title>
      </Head>

      <div>
        <h1>Edit User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <UserForm
          submitText="Update User"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateUser}
          initialValues={user}
          onSubmit={async (values) => {
            try {
              const updated = await updateUserMutation({
                id: user.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowUserPage({ userId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditUserPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>

      <p>
        <Link href={Routes.UsersPage()}>
          <a>Users</a>
        </Link>
      </p>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
