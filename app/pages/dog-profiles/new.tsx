import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDogProfile from "app/dog-profiles/mutations/createDogProfile"
import { DogProfileForm, FORM_ERROR } from "app/dog-profiles/components/DogProfileForm"

const NewDogProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [createDogProfileMutation] = useMutation(createDogProfile)

  return (
    <div>
      <h1>Create New DogProfile</h1>

      <DogProfileForm
        submitText="Create DogProfile"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDogProfile}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const dogProfile = await createDogProfileMutation(values)
            router.push(Routes.ShowDogProfilePage({ dogProfileId: dogProfile.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.DogProfilesPage()}>
          <a>DogProfiles</a>
        </Link>
      </p>
    </div>
  )
}

NewDogProfilePage.authenticate = true
NewDogProfilePage.getLayout = (page) => <Layout title={"Create New DogProfile"}>{page}</Layout>

export default NewDogProfilePage
