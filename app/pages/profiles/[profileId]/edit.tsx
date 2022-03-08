import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProfile from "app/profiles/queries/getProfile"
import updateProfile from "app/profiles/mutations/updateProfile"
import { ProfileForm, FORM_ERROR } from "app/profiles/components/ProfileForm"

export const EditProfile = () => {
  const router = useRouter()
  const profileId = useParam("profileId", "number")
  const [profile, { setQueryData }] = useQuery(
    getProfile,
    { id: profileId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProfileMutation] = useMutation(updateProfile)

  return (
    <>
      <Head>
        <title>Edit Profile {profile.id}</title>
      </Head>

      <div>
        <h1>Edit Profile {profile.id}</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <ProfileForm
          submitText="Update Profile"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProfile}
          initialValues={profile}
          onSubmit={async (values) => {
            try {
              const updated = await updateProfileMutation({
                id: profile.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowProfilePage({ profileId: updated.id }))
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

const EditProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProfile />
      </Suspense>

      <p>
        <Link href={Routes.ProfilesPage()}>
          <a>Profiles</a>
        </Link>
      </p>
    </div>
  )
}

EditProfilePage.authenticate = true
EditProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProfilePage
