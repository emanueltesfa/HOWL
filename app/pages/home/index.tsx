import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { UserInfo } from "."

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  const [userInput, setUserInput] = useState<string>("")

  const handleSUbmit = (event: any) => {
    event.preventDefault()
    console.log("Submit")
    console.log(userInput)
  }
  return (
    <div className="container">
      <Suspense fallback="Loading..">
        <UserInfo />{" "}
      </Suspense>
    </div>
  )
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => <Layout title="HomePage">{page}</Layout>

export default HomePage
