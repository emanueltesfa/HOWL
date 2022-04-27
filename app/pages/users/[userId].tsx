import React, { Suspense, useState, useEffect, Component, Fragment } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteUser from "app/users/mutations/deleteUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getPosts from "app/posts/queries/getPosts"
import ScrollPost from "app/core/components/scrollPost"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { IoAddCircleSharp } from "react-icons/io5"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"
import "app/pages/users/userId.module.scss"
import getUserLikes from "app/user-likes/queries/getUserLikes"
import PostCard from "app/core/components/postCard"
import getPost from "app/posts/queries/getPost"
import { Tab, Tabs, Box } from "@mui/material"

const styles = require("app/pages/users/userId.module.scss")

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })
  const currentUser = useCurrentUser()
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: user.id })
  const [{ userLikes }] = useQuery(
    getUserLikes,
    { where: { user_id: currentUser?.id } },
    { refetchInterval: 1000 }
  ) // for profile likes
  const [tabState, setTabState] = useState(0)

  useEffect(() => {
    //geoLoc()
  }, [])

  const handleChange = (event: any, newTab: number) => {
    setTabState(newTab)
  }

  // Check if user is the same user that is logged in or visitor
  // {flag ? <MYprofile /> :<otherprofile />}
  // Potential Merge Conflict with getDogProfileUserId.ts
  // wrap handleChange in useEffect

  return (
    <React.Fragment>
      <div className="post">
        <p>New Post!</p>
        <button
          onClick={() => {
            router.push("/post/new")
          }}
        >
          <IoAddCircleSharp />
        </button>
      </div>
      <div className={styles.container}>
        <div className="HumanProf">
          <h1>Welcome {user.name}!</h1>
          <p>
            <CalendarMonthIcon />
            &ensp; User since {user.createdAt.toDateString()}
          </p>
        </div>

        {/* Feed/Likes page */}
        <div className="likes feed">
          {/* <div className="button">
            <button
              onClick={() => {
                router.push(`/users/${user.id}/edit`)
              }}
            >
              Edit Profile Page
            </button>
          </div>*/}

          <div className="miniMenu">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs aria-label="basic tabs example" onChange={handleChange} centered>
                <Tab label="Feed" />
                <Tab label="Likes" />
              </Tabs>
            </Box>
          </div>

          {/*mui TABS*/}

          {tabState === 1 && (
            <React.Fragment>
              <div>
                {userLikes.map((likes, idx) => (
                  <React.Fragment key={idx}>
                    <Feed postId={likes.post_id} />
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}
          {tabState === 0 && (
            <React.Fragment>
              <ScrollPost />
            </React.Fragment>
          )}
        </div>

        <div>
          <h1>Hey {dogProfile.pet_name}!</h1>
          <p>
            <CalendarMonthIcon />
            &ensp;Pet since {user.createdAt.toDateString()}
          </p>
        </div>

        {/* <Link href={Routes.EditUserPage({ userId: user.id })}>
          <a>Edit</a>
        </Link> */}
      </div>
    </React.Fragment>
  )
}

const Feed = (postId: any) => {
  const [post] = useQuery(getPost, { id: postId.postId })
  return (
    <React.Fragment>
      <PostCard props={post} />
    </React.Fragment>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      {/* {
        <p>
          <Link href={Routes.UsersPage()}>
            <a>Users</a>
          </Link>
        </p>
      } */}

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
