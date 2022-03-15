import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProfile from "app/profiles/mutations/createProfile"
import { ProfileForm, FORM_ERROR } from "app/profiles/components/ProfileForm"

const NewProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [createProfileMutation] = useMutation(createProfile)

  return (
    <div>
      <h1>Create New Profile</h1>

      <ProfileForm
        submitText="Create Profile"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProfile}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const profile = await createProfileMutation(values)
            router.push(Routes.ShowProfilePage({ profileId: profile.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ProfilesPage()}>
          <a>Profiles</a>
        </Link>
      </p>
    </div>
  )
}

NewProfilePage.authenticate = true
NewProfilePage.getLayout = (page) => <Layout title={"Create New Profile"}>{page}</Layout>

export default NewProfilePage
