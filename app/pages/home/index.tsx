import React, { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import ProfileInfo from "app/core/components/profieSide/showProfileInfo"
import PostButton from "app/core/components/postButton"
import InfiniteScroll from "react-infinite-scroll-component"
import ScrollPost from "app/core/components/scrollPost"
import { ScrollWizard } from "app/core/components/testScroll"

const styles = require("app/pages/home/home.module.scss")

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  const [userInput, setUserInput] = useState<string>("")
  const user = useCurrentUser()

  return (
    <div className={styles.container}>
      {user != undefined && (
        <React.Fragment>
          <div className={styles.homeSide}>
            <div>Profile Pic</div>
            <div>
              <ProfileInfo user={user} />
            </div>
            <div></div>
          </div>
          <div className={styles.content}>
            <Suspense fallback={"Loading..."}>
              <ScrollPost />
            </Suspense>
          </div>
          <div className={styles.rightSide}>
            <PostButton props={user} />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => <Layout title="HomePage">{page}</Layout>

export default HomePage
