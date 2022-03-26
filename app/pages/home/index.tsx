import React, { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import getLoginAttempts from "app/login-attempts/queries/getLoginAttempts"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  //Checking the number of user Logins for creation of Pet Profile
  const user = useCurrentUser()
  const [{ loginAttempts }] = useQuery(
    getLoginAttempts,
    {
      where: { user_id: user?.id },
    },
    {
      //This stops it from refetching
      refetchInterval: false,
    }
  )
  const [userInput, setUserInput] = useState<string>("")

  const handleSUbmit = (event: any) => {
    event.preventDefault()
    console.log("Submit")
    console.log(userInput)
  }
  return (
    <div className="container">
      Home page
      {loginAttempts.length < 2 && (
        <React.Fragment>
          <div>Create a Dog Profile Please!</div>
        </React.Fragment>
      )}
      {/* <Link href={"/profiles"}>
        <button>Profile</button>
      </Link> */}
    </div>
  )
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => (
  <Suspense fallback={"Loading..."}>
    <Layout title="HomePage">{page}</Layout>
  </Suspense>
)

export default HomePage
