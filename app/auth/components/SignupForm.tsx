import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import updateUser from "app/users/mutations/updateUser"
import createLoginAttempt from "app/login-attempts/mutations/createLoginAttempt"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [userNameUpdate] = useMutation(updateUser)
  const [createlogin] = useMutation(createLoginAttempt)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await signupMutation(values)
            await userNameUpdate({
              id: user!.id,
              name: values.name,
              dob: null,
              profile_pic_file: null,
              num_post: 0,
            })
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
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <LabeledTextField name="name" label="Name" placeholder="User Name" />
      </Form>
    </div>
  )
}

export default SignupForm
