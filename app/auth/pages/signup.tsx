import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import React from "react"

const styles = require("app/styles/global.module.scss")

const SignupPage: BlitzPage = () => {
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
        <div className={styles.containerCenter}>
          <React.Fragment>
            <div className={styles.signUpContainer}>
              <SignupForm onSuccess={() => router.push(Routes.Home())} />
            </div>
          </React.Fragment>
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

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
