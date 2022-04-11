import { DogProfile } from "@prisma/client"
import PostForm from "app/core/components/postForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import createPost from "app/posts/mutations/createPost"
import { useMutation, useQuery, useRouter } from "blitz"
import db from "db"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BlitzPage } from "next"
import React, { useState } from "react"
import * as Yup from "yup"
import Filter from "bad-words"

const filter = new Filter()

interface FormValues {
  location: string
  body: string
  pet: string
}

const FormSchema = Yup.object().shape({
  location: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required!"),
  body: Yup.string().min(3, "Too Short!").max(280, "Too Long!").required("Required!"),
  pet: Yup.string().required("Required!"),
})

export const CheckBody = (values) => {
  let error
  if (values) {
    const cleaned: string = filter.clean(values)
    const compare = Diff(values, cleaned)
    if (compare.length != 0) {
      error = "Restricted Word(s)"
    }
  }
  return error
}

const Diff = (diffMe, diffBy) => diffMe.split(diffBy).join("")

const NewPost: BlitzPage = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [createAPost] = useMutation(createPost)
  const badWords: string[] = ["fuck", "bitch", "ass"]

  ///////////////////////////////////
  const initValues: FormValues = {
    location: "",
    body: "",
    pet: "",
  }
  ////////////////////////////////////

  const [{ dogProfiles }] = useQuery(getDogProfiles, { where: { user_id: user!.id } })

  const checkSelect = (values) => {
    let error
    if (values === " ") {
      error = "Required!"
    }
    return error
  }

  return (
    <React.Fragment>
      <div>New Post</div>
      <Formik
        initialValues={initValues}
        validationSchema={FormSchema}
        onSubmit={async (values, actions) => {
          console.log({ values })
          let pet_id: number = 0
          dogProfiles.forEach((pet) => {
            if (pet.pet_name == values.pet) {
              // console.log("Pet Found")
              pet_id = pet.id
            }
          })
          try {
            const res = await createAPost({
              created_by: user!.id,
              is_disabled: false,
              dog_id: pet_id,
              ...values,
            })
            if (res) {
              alert(JSON.stringify(res, null, 2))
              router.push("/home")
            }
          } catch (error) {
            console.log(error.message)
          }
          // alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Field as="select" id="pet" name="pet" validate={checkSelect}>
              <option value={" "} label={" "}>
                {" "}
              </option>
              {dogProfiles.map((pets, idx) => (
                <React.Fragment key={idx}>
                  <option value={pets.pet_name} label={pets.pet_name}>
                    {pets.pet_name}
                  </option>
                </React.Fragment>
              ))}
            </Field>
            {errors.pet && touched.pet && <div>{errors.pet}</div>}

            <Field id="location" name="location" placeholder="Location" validate={CheckBody} />
            {errors.location && touched.location && <div>{errors.location}</div>}

            <Field
              as="textarea"
              id="body"
              name="body"
              placeholder={`What are you doing?`}
              validate={CheckBody}
            />
            {errors.body && touched.body && <div>{errors.body}</div>}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <Layout title="HomePage">{page}</Layout>
export default NewPost
