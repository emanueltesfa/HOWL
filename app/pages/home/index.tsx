import React, { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery, useRouter, Head } from "blitz"
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
import getPostSearch from "app/posts/queries/getPostSearch"
import { RecentActorsRounded } from "@mui/icons-material"
import PostCard from "app/core/components/postCard"
import getUsersSearch from "app/users/queries/getUsersSearch"

const styles = require("app/pages/home/home.module.scss")

const store = createStore()

store.setState("CreateDog", false)
store.setState("userInput", "")
store.setState("flag", false)

const SearchPost = (search_text) => {
  const [posts] = useQuery(
    getPostSearch,
    {
      search_text: search_text,
      take: 50,
    },
    {
      // This ensures the query never refreshes and overwrites
      // the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  return posts
}

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  const [userInput, setUserInput] = store.useState("userInput")
  const [createDog, setCreateDog] = store.useState("CreateDog")
  const user = useCurrentUser()
  const router = useRouter()
  const [flag, setFlag] = store.useState("flag")
  console.log("User: ", user)

  if (user === null) {
    router.push("/")
  }

  const [{ dogProfiles }, { setQueryData }] = useQuery(
    getDogProfiles,
    {
      where: { user_id: user?.id },
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
            <Suspense fallback={"Loading..."}>
              <ProfileInfo user={user} />
              <DogInfo owner={user} />
            </Suspense>
          </div>
          <div className={styles.verLine} />
          <div className={styles.content}>
            <div>
              {userInput.length > 0 ? (
                <Suspense fallback={"Loading..."}>
                  <SearchValue search_text={userInput} />
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <ScrollPost />
                </Suspense>
              )}
            </div>
          </div>
          <div className={styles.verLine} />
          <div className={styles.rightSide}>
            <SearchComponent />
            <PostButton props={user} />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

const SearchComponent = () => {
  const [userInput, setUserInput] = store.useState("userInput")

  const updateSearch = (event) => {
    setUserInput(event.target.value)
  }

  return (
    <React.Fragment>
      <div>
        <input
          value={userInput}
          onChange={(e) => updateSearch(e)}
          placeholder="Search for a Post..."
          className={styles.searchInput}
        />
      </div>
    </React.Fragment>
  )
}

const SearchValue = ({ search_text }) => {
  const data = SearchPost(search_text)
  console.log(data)
  const [userInput, setUserInput] = store.useState("userInput")

  return (
    <React.Fragment>
      {data!.length !== 0 ? (
        <React.Fragment>
          {data?.map((posts, index: number) => (
            <React.Fragment key={index}>
              <PostCard props={posts} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={styles.contentSearch}>
            <NothingFound text={userInput} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export const NothingFound = (props) => {
  const { text } = props
  return (
    <React.Fragment>
      <div className={styles.nothingFound}>
        <label>Nothing Found for </label>
        <label>{text}</label>
      </div>
      <div className={styles.underLine} />
    </React.Fragment>
  )
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => <Layout title="HomePage">{page}</Layout>

export default HomePage
