import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Form } from "react-final-form"
import LandingLayout from "app/core/layouts/LandingLayout"

//Keep this sytanx for build production
const styles = require("app/styles/global.module.scss")

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User Name: <code>{currentUser.name}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a>
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a>
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="container">
      <main>
        <div className={styles.landingContainer}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.redirectAuthenticatedTo = "/home"
Home.getLayout = (page) => (
  <Suspense fallback={"Loading..."}>
    <LandingLayout title="Home">{page}</LandingLayout>
  </Suspense>
)

export default Home
