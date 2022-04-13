import React, { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import ProfileInfo from "app/core/components/profieSide/showProfileInfo"
import PostButton from "app/core/components/postButton"
import InfiniteScroll from "react-infinite-scroll-component"
import ScrollPost from "app/core/components/scrollPost"
import Autocomplete from "react-google-autocomplete"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import { Modal } from "@mui/material"
import { createStore } from "state-pool"
import PetForm from "app/core/components/petForm"
import DogInfo from "app/core/components/dogInfo"

const styles = require("app/pages/home/home.module.scss")

const store = createStore()

store.setState("CreateDog", false)

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [createDog, setCreateDog] = store.useState("CreateDog")
  const user = useCurrentUser()
  const router = useRouter()

  const [{ dogProfiles }, { setQueryData }] = useQuery(
    getDogProfiles,
    {
      where: { user_id: user!.id },
    },
    { refetchInterval: false }
  )

  if (dogProfiles.length == 0) {
    router.push(`/users/${user!.id}/CreatePet`)
  }

  return (
    <div className={styles.container}>
      {user != undefined && (
        <React.Fragment>
          <div className={styles.homeSide}>
            <div>Profile Pic</div>
            <div>
              <Suspense fallback={"Loading..."}>
                <ProfileInfo user={user} />
                <DogInfo owner={user} />
              </Suspense>
            </div>
            <div></div>
          </div>
          <div className={styles.verLine} />
          <div className={styles.content}>
            <Suspense fallback={"Loading..."}>
              <ScrollPost />
            </Suspense>
          </div>
          <div className={styles.verLine} />
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
