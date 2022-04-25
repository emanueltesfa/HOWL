import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import updateUser from "app/users/mutations/updateUser"
import createLoginAttempt from "app/login-attempts/mutations/createLoginAttempt"
import React from "react"

const styles = require("app/styles/global.module.scss")

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [userNameUpdate] = useMutation(updateUser)
  const [createlogin] = useMutation(createLoginAttempt)

  return (
    <React.Fragment>
      <div className={styles.signUpForm}>
        <h1>Come Howl with Us!</h1>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              console.log("Values", values)
              const user = await signupMutation(values)
              const updateUser = await userNameUpdate({
                id: user!.id,
                name: values.name,
                dob: "",
                profile_pic_file: "",
              })
              console.log("UserName updated", updateUser)
              await createlogin({
                user_id: user.id,
                created_by: user.id,
              })
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                console.log("Error being thrown")
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField
            name="email"
            label="Email"
            placeholder="Email"
            className={styles.loginField}
          />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            className={styles.loginField}
          />
          <LabeledTextField
            name="name"
            label="Name"
            placeholder="User Name"
            className={styles.loginField}
          />
        </Form>
      </div>
    </React.Fragment>
  )
}

export default SignupForm
