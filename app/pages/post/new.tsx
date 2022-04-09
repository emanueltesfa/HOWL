import { DogProfile } from "@prisma/client"
import PostForm from "app/core/components/postForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import createPost from "app/posts/mutations/createPost"
import { useMutation, useRouter } from "blitz"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BlitzPage } from "next"
import React from "react"

interface FormValues {
  location: string
  body: string
}

interface FormErrors {
  locationError: string
}

const NewPost: BlitzPage = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [createAPost] = useMutation(createPost)
  const initValues: FormValues = {
    location: "",
    body: "",
  }

  return (
    <React.Fragment>
      <div>New Post</div>
      {/* <PostForm props={user} /> */}
      <Formik
        initialValues={initValues}
        onSubmit={async (values, actions) => {
          console.log({ values })

          try {
            const res = await createAPost({
              created_by: user!.id,
              is_disabled: false,
              ...values,
            })
            if (res) {
              alert("Post made")
            }
          } catch (error) {
            console.log(error.message)
          }
          // alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        <Form>
          <label htmlFor="location">Location</label>
          <Field id="location" name="location" placeholder="Location" />
          <label htmlFor="body">Body</label>
          <Field id="body" name="body" placeholder="Body" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <Layout title="HomePage">{page}</Layout>
export default NewPost
