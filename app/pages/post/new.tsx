import { DogProfile } from "@prisma/client"
import PostForm from "app/core/components/postForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import createPost from "app/posts/mutations/createPost"
import { Head, useMutation, useQuery, useRouter } from "blitz"
import db from "db"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BlitzPage } from "next"
import React, { useState } from "react"
import * as Yup from "yup"
import Filter from "bad-words"

const styles = require("app/pages/post/post.module.scss")

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
  const [body, setBody] = useState<string>("")

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
      <Head>
        <title>Create a new Post!</title>
      </Head>
      <main>
        <Formik
          initialValues={initValues}
          validationSchema={FormSchema}
          onSubmit={async (values, actions) => {
            console.log({ values })
            let pet_id: number = 0
            dogProfiles.forEach((pet) => {
              if (pet.pet_name == values.pet) {
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
                // alert(JSON.stringify(res, null, 2))
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
            <Form className={styles.formikContent}>
              <header className={styles.formikHeader}></header>
              <div className={styles.topForm}>
                <div className={styles.dogSelect}>
                  <strong>Who is coming along?</strong>
                  <Field
                    as="select"
                    id="pet"
                    name="pet"
                    validate={checkSelect}
                    className={styles.selectField}
                  >
                    <option value={" "} label={" "}>
                      {" "}
                    </option>
                    {dogProfiles.map((pets, idx) => (
                      <React.Fragment key={idx}>
                        <option
                          value={pets.pet_name}
                          label={pets.pet_name}
                          className={styles.optionField}
                        >
                          {pets.pet_name}
                        </option>
                      </React.Fragment>
                    ))}
                  </Field>
                  {errors.pet && touched.pet && (
                    <div className={styles.errorMessage}>{errors.pet}</div>
                  )}
                </div>
                <div className={styles.dogSelect}>
                  <strong>Where are you going?</strong>
                  <Field
                    id="location"
                    name="location"
                    placeholder="Location"
                    validate={CheckBody}
                    className={styles.selectField}
                  />
                  {errors.location && touched.location && (
                    <div className={styles.errorMessage}>{errors.location}</div>
                  )}
                </div>
              </div>
              <div className={styles.underLine} />
              <body className={styles.formikBody}>
                {errors.body && touched.body && <div>{errors.body}</div>}
                <Field
                  as="textarea"
                  id="body"
                  name="body"
                  placeholder={`What are you doing?`}
                  validate={CheckBody}
                  className={styles.bodyContent}
                />

                <button type="submit" className={styles.submitBtn}>
                  Submit
                </button>
              </body>
            </Form>
          )}
        </Formik>
      </main>
    </React.Fragment>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <Layout title="HomePage">{page}</Layout>
export default NewPost
