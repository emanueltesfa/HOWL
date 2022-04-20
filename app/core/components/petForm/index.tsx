import { PetProfile } from "app/auth/validations"
import createDogProfile from "app/dog-profiles/mutations/createDogProfile"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import { PromiseReturnType, useMutation, useQuery, useRouter } from "blitz"
import React, { useMemo, useState } from "react"
import CustomPetForm from "../CustomPetForm"
import LabeledTextField from "../LabeledTextField"
import dogBreeds from "dog-breeds"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { createStore } from "state-pool"
import { CheckBody } from "app/pages/post/new"

const store = createStore()

store.setState("breed", "")
store.setState("breedList", [])

const styles = require("app/core/components/petForm/index.module.scss")

//If at some point you want to do something with the response do props.onSuccess.(OBJECT)
type PetFormProps = {
  onSuccess?: (NewDog: PromiseReturnType<typeof createDogProfile>) => void
}

interface initialValues {
  pet_name: string
  breed: string
  age: number
  sex: string
  temperament: string
}

const FormSchema = Yup.object().shape({
  pet_name: Yup.string().min(1, "Too Short!").max(50, "Too Long!").required("Required!"),
  breed: Yup.string().min(1, "Too Short!").max(70, "Too Long!").required("Required!"),
  age: Yup.number(),
  sex: Yup.string(),
  temperament: Yup.string().min(3, "Too Short!").max(180, "Too Long!").required("Required!"),
})

const PetForm = ({ user }) => {
  const [createDog, { isLoading }] = useMutation(createDogProfile)
  const router = useRouter()
  const [state, setState] = useState<boolean>(false)
  const [test, setTest] = useState<string>("")
  const [breedName, setBreedName] = store.useState("breed")
  const [breedList, setBreedList] = store.useState("breedList")
  const initvalues: initialValues = {
    pet_name: "",
    breed: "",
    age: 0,
    sex: "",
    temperament: "",
  }
  const [{ DogProfiles }, { refetch }] = useQuery(
    getDogProfiles,
    {
      where: { user_id: user!.id },
    },
    { refetchInterval: false }
  )

  const checkSelect = (values) => {
    let error
    if (values === " ") {
      error = "Required!"
    }
    return error
  }

  return (
    <React.Fragment>
      <main className={!isLoading ? styles.formContainer : styles.formLoading}>
        <Formik
          initialValues={initvalues}
          validationSchema={FormSchema}
          onSubmit={async (values, actions) => {
            console.log({ values })
            actions.setSubmitting(false)
            try {
              const res = await createDog({
                created_by: user!.id,
                dog_profile_pic: "",
                user_id: user!.id,
                ...values,
              })
              await refetch()
              router.push("/home")
            } catch (error) {
              console.log(error.message)
            }
          }}
        >
          {({ errors, touched, isValidating }) => (
            <React.Fragment>
              <Form>
                <Field name="pet_name" placeholder="Pet Name" validate={CheckBody} />
                {errors.pet_name && touched.pet_name && <div>{errors.pet_name}</div>}
                <Field name="breed" validate={checkSelect}>
                  {({ meta }) => (
                    <div>
                      <Field as="select" name="breed">
                        <option value={" "} label={" "}>
                          {" "}
                        </option>
                        <option value={"Mutt"} label={"Mutt"}>
                          {"Mutt"}
                        </option>
                        {dogBreeds.all.map((dog, idx) => (
                          <React.Fragment key={idx}>
                            <option value={dog.name} label={dog.name}>
                              {dog.name}
                            </option>
                          </React.Fragment>
                        ))}
                      </Field>
                      {meta.touched && meta.error && <div>{meta.error}</div>}
                    </div>
                  )}
                </Field>

                <Field type="number" name="age" placeholder="Age" />
                {errors.age && touched.age && <div>{errors.age}</div>}

                <Field name="sex" validate={checkSelect}>
                  {({ meta }) => (
                    <div>
                      <Field as="select" name="sex">
                        <option value={" "} label={" "}>
                          {" "}
                        </option>
                        <option value={"Male"} label={"Male"}>
                          {"Male"}
                        </option>
                        <option value={"Female"} label={"Female"}>
                          {"Female"}
                        </option>
                      </Field>
                      {meta.touched && meta.error && <div>{meta.error}</div>}
                    </div>
                  )}
                </Field>

                <Field
                  name="temperament"
                  as="textarea"
                  placeholder="Temperament"
                  validate={CheckBody}
                />
                {errors.temperament && touched.temperament && <div>{errors.temperament}</div>}

                <button type="submit">Submit</button>
              </Form>
            </React.Fragment>
          )}
        </Formik>
      </main>
    </React.Fragment>
  )
}

export default PetForm
