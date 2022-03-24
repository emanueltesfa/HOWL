import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createUser from "app/users/mutations/createUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"

const NewUserPage: BlitzPage = () => {
  const router = useRouter()
  const [createUserMutation] = useMutation(createUser)

  return (
    <div>
      <h1>Create New User</h1>

      <UserForm
        submitText="Create User"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateUser}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const user = await createUserMutation(values)
            router.push(Routes.ShowUserPage({ userId: user.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.UsersPage()}>
          <a>Users</a>
        </Link>
      </p>
    </div>
  )
}

NewUserPage.authenticate = true
NewUserPage.getLayout = (page) => <Layout title={"Create New User"}>{page}</Layout>

export default NewUserPage
