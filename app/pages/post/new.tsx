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

interface FormValues {
  location: string
  body: string
  pet: string
}

interface FormErrors {
  errorMessage: string
}

const NewPost: BlitzPage = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [createAPost] = useMutation(createPost)
  const [pet, setPet] = useState<string>("")
  ///////////////////////////////////
  const initValues: FormValues = {
    location: "",
    body: "",
    pet: "",
  }
  ////////////////////////////////////
  const [{ dogProfiles }] = useQuery(getDogProfiles, { where: { user_id: user!.id } })

  return (
    <React.Fragment>
      <div>New Post</div>
      {/* <PostForm props={user} /> */}
      <Formik
        initialValues={initValues}
        validate={(values) => {
          const errors: any = {}
          if (values.pet === " " || values.pet === "") {
            errors.errorMessage = "You must select a pet"
          }
          if (values.pet !== " ") {
            console.log(values.pet)
            setPet(values.pet)
          }
          return errors
        }}
        onSubmit={async (values, actions) => {
          console.log({ values })

          try {
            // const res = await createAPost({
            //   created_by: user!.id,
            //   is_disabled: false,
            //   ...values,
            // })
            // if (res) {
            //   alert("Post made")
            //   router.push("/home")
            // }
          } catch (error) {
            console.log(error.message)
          }
          // alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        <Form>
          <label htmlFor="location">Where are you taking</label>
          <Field as="select" id="pet" name="pet">
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

          <Field id="location" name="location" placeholder="Location" />
          <label htmlFor="body">Body</label>
          <Field id="body" name="body" placeholder={`Where are you taking ${pet}?`} />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <Layout title="HomePage">{page}</Layout>
export default NewPost
