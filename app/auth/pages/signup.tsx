import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import React from "react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <React.Fragment>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </React.Fragment>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
