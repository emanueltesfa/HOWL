import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProfile from "app/profiles/queries/getProfile"
import deleteProfile from "app/profiles/mutations/deleteProfile"

export const Profile = () => {
  const router = useRouter()
  const profileId = useParam("profileId", "number")
  const [deleteProfileMutation] = useMutation(deleteProfile)
  const [profile] = useQuery(getProfile, { id: profileId })

  return (
    <>
      <Head>
        <title>Profile {profile.id}</title>
      </Head>

      <div>
        <h1>Profile {profile.id}</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <Link href={Routes.EditProfilePage({ profileId: profile.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProfileMutation({ id: profile.id })
              router.push(Routes.ProfilesPage())
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

const ShowProfilePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProfilesPage()}>
          <a>Profiles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    </div>
  )
}

ShowProfilePage.authenticate = true
ShowProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProfilePage
