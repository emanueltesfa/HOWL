import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDogProfile from "app/dog-profiles/queries/getDogProfile"
import updateDogProfile from "app/dog-profiles/mutations/updateDogProfile"
import { DogProfileForm, FORM_ERROR } from "app/dog-profiles/components/DogProfileForm"

export const EditDogProfile = () => {
  const router = useRouter()
  const dogProfileId = useParam("dogProfileId", "number")
  const [dogProfile, { setQueryData }] = useQuery(
    getDogProfile,
    { id: dogProfileId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDogProfileMutation] = useMutation(updateDogProfile)

  return (
    <>
      <Head>
        <title>Edit DogProfile {dogProfile.id}</title>
      </Head>

      <div>
        <h1>Edit DogProfile {dogProfile.id}</h1>
        <pre>{JSON.stringify(dogProfile, null, 2)}</pre>

        <DogProfileForm
          submitText="Update DogProfile"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDogProfile}
          initialValues={dogProfile}
          onSubmit={async (values) => {
            try {
              const updated = await updateDogProfileMutation({
                id: dogProfile.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowDogProfilePage({ dogProfileId: updated.id }))
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

const EditDogProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDogProfile />
      </Suspense>

      <p>
        <Link href={Routes.DogProfilesPage()}>
          <a>DogProfiles</a>
        </Link>
      </p>
    </div>
  )
}

EditDogProfilePage.authenticate = true
EditDogProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDogProfilePage
