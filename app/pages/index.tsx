import React, { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Howl2 from "public/Howl2.png"
import { Form } from "react-final-form"
import LoginForm from "app/auth/components/LoginForm"
import LayoutLanding from "app/core/layouts/LayoutLanding"

const styles = require("../styles/global.module.scss")

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
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
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        {/* <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link> */}
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const router = useRouter()

  return (
    <React.Fragment>
      <div className={styles.backGround}>
        {/* For background landing page */}
        <div className={styles.customshapedividerbottom1648429665}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={styles.shapefill}
            ></path>
          </svg>
        </div>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <div className={styles.howlTitle}>
              {/* <img alt="" src="HOWL/public/Howl2.png" /> */}
              <Image alt="" src={Howl2} width={400} height={180} />
            </div>
            <hr className={styles.underLine2} />
            <div className={styles.howlSubText}>Come sniff out some new friends.</div>
          </div>

          <div>
            <LoginForm
              onSuccess={(_user) => {
                const next = router.query.next
                  ? decodeURIComponent(router.query.next as string)
                  : "/"
                router.push(next)
              }}
            />
          </div>
          {/* <div className="buttons">
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  )
}

Home.suppressFirstRenderFlicker = true
Home.redirectAuthenticatedTo = "/home"

Home.getLayout = (page) => <LayoutLanding title="Home">{page}</LayoutLanding>

export default Home
