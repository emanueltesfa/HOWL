import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDogProfile from "app/dog-profiles/queries/getDogProfile"
import deleteDogProfile from "app/dog-profiles/mutations/deleteDogProfile"

export const DogProfile = () => {
  const router = useRouter()
  const dogProfileId = useParam("dogProfileId", "number")
  const [deleteDogProfileMutation] = useMutation(deleteDogProfile)
  const [dogProfile] = useQuery(getDogProfile, { id: dogProfileId })

  return (
    <>
      <Head>
        <title>DogProfile {dogProfile.id}</title>
      </Head>

      <div>
        <h1>DogProfile {dogProfile.id}</h1>
        <pre>{JSON.stringify(dogProfile, null, 2)}</pre>

        <Link href={Routes.EditDogProfilePage({ dogProfileId: dogProfile.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDogProfileMutation({ id: dogProfile.id })
              router.push(Routes.DogProfilesPage())
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

const ShowDogProfilePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DogProfilesPage()}>
          <a>DogProfiles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <DogProfile />
      </Suspense>
    </div>
  )
}

ShowDogProfilePage.authenticate = true
ShowDogProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDogProfilePage
