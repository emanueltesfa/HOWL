import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

const styles = require("app/styles/global.module.scss")

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className={styles.loginFormBack}>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" className={styles.loginField} />
        <LabeledTextField
          name="password"
          label="Password"
          type="password"
          className={styles.loginField}
        />
        {/* <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a className={styles.passwordLink}>Forgot your password?</a>
          </Link>
        </div> */}
      </Form>

      <div className={styles.passwordLink}>
        <Link href={Routes.SignupPage()}>
          <button className={styles.passwordLinkBtn}>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
