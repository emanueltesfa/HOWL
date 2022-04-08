import { PetProfile } from "app/auth/validations"
import createDogProfile from "app/dog-profiles/mutations/createDogProfile"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import { PromiseReturnType, useMutation, useQuery, useRouter } from "blitz"
import React, { useState } from "react"
import CustomPetForm from "../CustomPetForm"
import { Form } from "../Form"
import LabeledTextField from "../LabeledTextField"

const styles = require("app/core/components/petForm/index.module.scss")

//If at some point you want to do something with the response do props.onSuccess.(OBJECT)
type PetFormProps = {
  onSuccess?: (NewDog: PromiseReturnType<typeof createDogProfile>) => void
}

const PetForm = ({ user }) => {
  const [createDog, { isLoading }] = useMutation(createDogProfile)
  const router = useRouter()
  const [state, setState] = useState<boolean>(false)
  const [{ DogProfiles }, { refetch }] = useQuery(
    getDogProfiles,
    {
      where: { user_id: user!.id },
    },
    { refetchInterval: false }
  )

  return (
    <React.Fragment>
      <main className={!isLoading ? styles.formContainer : styles.formLoading}>
        <CustomPetForm
          submitText="Create"
          schema={PetProfile}
          initialValues={{
            created_by: user!.id,
            dog_profile_pic: "",
            pet_name: "",
            breed: "",
            age: 0,
            sex: "",
            temperament: "",
            user_id: user!.id,
          }}
          onSubmit={async (values) => {
            console.log(values)
            try {
              const res = await createDog(values)
              await refetch()
              router.push("/home")
            } catch (error) {
              console.log(error.message)
            }
          }}
        >
          <LabeledTextField name="pet_name" label="Pet Name" />
          <LabeledTextField name="breed" label="Breed" />
          <LabeledTextField type="number" name="age" label="Age" />
          <LabeledTextField name="sex" label="Sex" />
          <LabeledTextField name="temperament" label="Temperament" />
        </CustomPetForm>
      </main>
    </React.Fragment>
  )
}

export default PetForm
