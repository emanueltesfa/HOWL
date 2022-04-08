import CustomPetForm from "app/core/components/CustomPetForm"
import PetForm from "app/core/components/petForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import { useQuery, useRouter } from "blitz"
import { BlitzPage } from "next"
import React from "react"

const CreatePet: BlitzPage = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [{ dogProfiles }] = useQuery(getDogProfiles, { where: { user_id: user!.id } })

  if (dogProfiles.length >= 1) {
    router.push("/home")
  }
  return (
    <React.Fragment>
      <PetForm user={user} />
    </React.Fragment>
  )
}

CreatePet.authenticate = true
CreatePet.getLayout = (page) => <Layout>{page}</Layout>

export default CreatePet
