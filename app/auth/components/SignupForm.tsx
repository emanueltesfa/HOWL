import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import createLoginAttempt from "app/login-attempts/mutations/createLoginAttempt"
import updateUser from "app/users/mutations/updateUser"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [loginAttempMutation] = useMutation(createLoginAttempt)
  const [updateUserName] = useMutation(updateUser)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values) => {
          try {
            console.log("Values: ", values)
            const user = await signupMutation(values)
            await updateUserName({
              id: user.id,
              name: values.name,
            })
            await loginAttempMutation({
              created_by: user.id,
              user_id: user.id,
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
        <div>
          {/* User Profiles */}
          <div>
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <LabeledTextField name="name" label="Name" placeholder="User Name" />
            {/* <LabeledTextField name="dob" label="Name" placeholder="MM/DD/YYYY" /> */}
          </div>

          {/* Dog Profile Fields */}
          {/* <div>
            <LabeledTextField
              name="pet_name"
              label="Pet's Name"
              placeholder="What is your pet's name?"
            />
            <LabeledTextField
              name="breed"
              label="Pets Breed"
              placeholder="What is your pet's breed?"
            />
            <LabeledTextField name="age" label="Pet's Age" placeholder="What's your pets age?" />
            <LabeledTextField
              name="temperament"
              label="Temperament"
              placeholder="What is your pet's temperament?"
            />
            <LabeledTextField name="sex" label="Sex" placeholder="What is your pet's sex?" />
          </div> */}
        </div>
      </Form>
    </div>
  )
}

export default SignupForm
