/* eslint-disable @next/next/no-img-element */
import React, { Suspense, useState } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  Image,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import updateUser from "app/users/mutations/updateUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"
import * as Yup from "yup"
import { Field, Form, Formik, yupToFormErrors } from "formik"
import { createStore } from "state-pool"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"
import updateDogProfile from "app/dog-profiles/mutations/updateDogProfile"
import { User } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { CheckBody } from "app/pages/post/new"
import dogBreeds from "dog-breeds"
import { StyleSharp } from "@mui/icons-material"

const styles = require("app/pages/users/[userId]/edit.module.scss")

const store = createStore()

store.setState("userName", "")
store.setState("timeoutFlag", false)

interface UserData {
  name: string
  profile_pic: string
  dob: string
}

interface DogData {
  dog_profile_pic: string
  pet_name: string
  breed: string
  age: number
  sex: string
  temperament: string
  user_id: number
}

const DogFormSchema = Yup.object().shape({
  dog_profile_pic: Yup.string(),
  pet_name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required!"),
  breed: Yup.string().required("Required!"),
  age: Yup.number().required("Required"),
  sex: Yup.string().required("Required!"),
  temperament: Yup.string().min(3, "Too Short!").max(280, "Too Long!").required("Required!"),
})

const FormSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(25, "Too Long!").required("Required!"),
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
  const currentUser = useCurrentUser()
  if (user.id !== currentUser!.id) {
    router.push(`/users/${user.id}`)
  }
  const [updateUserMutation] = useMutation(updateUser)
  const [userName, setUserName] = store.useState("userName")
  const [timeoutFlag, setTimeoutFlag] = store.useState("timeoutFlag")
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

      <div className={styles.editContainer}>
        <div>
          <Formik
            initialValues={initValues}
            validationSchema={FormSchema}
            onSubmit={async (values) => {
              setTimeoutFlag(true)
              setTimeout(() => {
                setTimeoutFlag(false)
              }, 500)
              console.log("Submitting")
              const { profile_pic } = values
              let profile_picFile: string
              const profile_pic_split: string[] | undefined = profile_pic.split("\\")
              profile_picFile = profile_pic_split[profile_pic_split.length - 1]!
              /////////////////////////////
              profile_picFile = ""
              /////////////////////////////
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
              <Form className={styles.formUser}>
                <h1>Edit {userName}</h1>
                <GetAvatar userId={user.id} height={100} width={140} />
                <div>
                  <label>
                    User Name
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
                            className={styles.inputField}
                          />
                          {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                        </div>
                      )}
                    </Field>
                  </label>
                  {/* <label className={styles.labelContainer}>
                    Profile Picture
                    <Field
                      type="file"
                      name="profile_pic"
                      disabled={timeoutFlag}
                      className={styles.inputFieldFile}
                    />
                    {errors.profile_pic && touched.profile_pic && <div>{errors.profile_pic}</div>}
                  </label> */}
                  <label className={styles.labelContainer}>
                    Birthday
                    <Field
                      type="date"
                      name="dob"
                      disabled={timeoutFlag}
                      className={styles.inputField}
                    />
                    {errors.dob && touched.dob && <div>{errors.dob}</div>}
                  </label>
                </div>

                <button type="submit" disabled={timeoutFlag} className={styles.submitBtn}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <UpdatePet user={user} />
      </div>
    </>
  )
}

const checkSelect = (values) => {
  let error
  if (values === " ") {
    error = "Required!"
  }
  return error
}

const UpdatePet = ({ user }) => {
  const [dogProfile, { setQueryData }] = useQuery(
    getDogProfileUserId,
    { user_id: user.id },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  const initDogValues: DogData = {
    dog_profile_pic: dogProfile.dog_profile_pic,
    pet_name: dogProfile.pet_name,
    breed: dogProfile.breed,
    age: dogProfile.age,
    sex: dogProfile.sex,
    temperament: dogProfile.temperament,
    user_id: user.id,
  }
  const [timeoutFlag, setTimeoutFlag] = store.useState("timeoutFlag")

  const [updateDog] = useMutation(updateDogProfile)

  return (
    <React.Fragment>
      <div>
        <Formik
          initialValues={initDogValues}
          validationSchema={DogFormSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false)
            setTimeoutFlag(true)
            setTimeout(() => {
              setTimeoutFlag(false)
            }, 1000)
            const { dog_profile_pic } = values
            let dog_profile_pics: string
            const dog_profile_pics_split: string[] | undefined = dog_profile_pic.split("\\")
            dog_profile_pics = dog_profile_pics_split[dog_profile_pics_split.length - 1]!
            /////////////////////////////
            dog_profile_pics = ""
            /////////////////////////////
            try {
              const res = await updateDog({
                id: dogProfile!.id,
                ...values,
              })
              if (res) {
                setQueryData(res)
              }
            } catch (error) {
              console.log(error.message)
            }
          }}
        >
          {({ errors, touched, isValidating }) => (
            <React.Fragment>
              <Form className={styles.formDog}>
                <h1>Edit {dogProfile.pet_name}&apos;s Profile</h1>
                <GetDogAvatar userId={user.id} width={140} height={100} />
                <div>
                  <label>
                    Dog&apos;s Name
                    <Field
                      name="pet_name"
                      placeholder="Pet Name"
                      validate={CheckBody}
                      disabled={timeoutFlag}
                      className={styles.inputField}
                    />
                    {errors.pet_name && touched.pet_name && <div>{errors.pet_name}</div>}
                  </label>
                  <label>
                    Breed
                    <Field name="breed" validate={checkSelect} disabled={timeoutFlag}>
                      {({ meta }) => (
                        <div>
                          <Field
                            as="select"
                            name="breed"
                            disabled={timeoutFlag}
                            className={styles.inputField}
                          >
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
                  </label>
                  <label>
                    Age
                    <Field
                      type="number"
                      name="age"
                      placeholder="Age"
                      disabled={timeoutFlag}
                      className={styles.inputField}
                    />
                    {errors.age && touched.age && <div>{errors.age}</div>}
                  </label>
                  <label>
                    Sex
                    <Field name="sex" validate={checkSelect} disabled={timeoutFlag}>
                      {({ meta }) => (
                        <div>
                          <Field
                            as="select"
                            name="sex"
                            disabled={timeoutFlag}
                            className={styles.inputField}
                          >
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
                  </label>
                  <label>
                    Temperament
                    <Field
                      name="temperament"
                      as="textarea"
                      placeholder="Temperament"
                      validate={CheckBody}
                      disabled={timeoutFlag}
                      className={styles.inputField}
                    />
                    {errors.temperament && touched.temperament && <div>{errors.temperament}</div>}
                  </label>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={timeoutFlag}>
                  Submit
                </button>
              </Form>
            </React.Fragment>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export const GetAvatar = ({
  userId,
  height,
  width,
}: {
  userId: number
  height: number
  width: number
}) => {
  const [user] = useQuery(getUser, { id: userId })

  return (
    <React.Fragment>
      {user.profile_pic_file === "" ? (
        <img
          src={"/defaultProfilePic/profileImg.png"}
          alt={`${user.name} Profile Picture`}
          height={height}
          width={width}
          className={styles.Image}
        />
      ) : (
        <img
          src={user.profile_pic_file}
          alt={`${user.name} Profile Picture`}
          height={height}
          width={width}
          className={styles.Image}
        />
      )}
    </React.Fragment>
  )
}

export const GetDogAvatar = ({ userId, width, height }) => {
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: userId })

  return (
    <React.Fragment>
      {dogProfile.dog_profile_pic === "" ? (
        <img
          src={"/defaultProfilePic/default_dog.jpg"}
          alt={`${dogProfile.pet_name} Profile Picture`}
          height={height}
          width={width}
          className={styles.Image}
        />
      ) : (
        <img
          src={dogProfile.dog_profile_pic}
          alt={`${dogProfile.pet_name} Profile Picture`}
          height={height}
          width={width}
          className={styles.Image}
        />
      )}
    </React.Fragment>
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
