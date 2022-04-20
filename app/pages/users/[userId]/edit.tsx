import React, { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import updateUser from "app/users/mutations/updateUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"
import * as Yup from "yup"
import { Field, Form, Formik } from "formik"
import { createStore } from "state-pool"

const store = createStore()

store.setState("userName", "")

interface UserData {
  name: string
  profile_pic: string
  dob: string
}

const FormSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required!"),
  profile_pic: Yup.string(),
  dob: Yup.string().required("Required!"),
})

export const EditUser = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)
  const [userName, setUserName] = store.useState("userName")
  const [timeoutFlag, setTimeoutFlag] = useState<boolean>(false)
  setUserName(user.name)

  const initValues: UserData = {
    name: user!.name!,
    profile_pic: "",
    dob: user.dob,
  }

  return (
    <>
      <Head>
        <title>Edit User {userName}</title>
      </Head>

      <div>
        <h1>Edit User {userName}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Formik
          initialValues={initValues}
          validationSchema={FormSchema}
          onSubmit={async (values) => {
            setTimeoutFlag(true)
            setTimeout(() => {
              setTimeoutFlag(false)
            }, 1000)
            console.log("Submitting")
            const { profile_pic } = values
            let profile_picFile: string
            const profile_pic_split: string[] | undefined = profile_pic.split("\\")
            profile_picFile = profile_pic_split[profile_pic_split.length - 1]!
            profile_picFile = ""
            console.log({ values })
            try {
              const res = await updateUserMutation({
                id: user.id,
                profile_pic_file: profile_picFile,
                ...values,
              })
              if (res) {
                console.log(res)
                setQueryData(res)
              }
            } catch (error) {
              console.log(error.message)
            }
          }}
        >
          {({ errors, touched, isValidating, isSubmitting }) => (
            <Form>
              <Field name="name" disabled={timeoutFlag}>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <input
                      type="text"
                      placeholder={`${userName}`}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={timeoutFlag}
                      {...field}
                    />
                    {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field type="file" name="profile_pic" disabled={timeoutFlag} />
              <Field type="date" name="dob" disabled={timeoutFlag} />
              <button type="submit" disabled={timeoutFlag}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

const EditUserPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
