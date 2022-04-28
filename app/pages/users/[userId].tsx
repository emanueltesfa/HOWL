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
import { Tab, Tabs, Box, Typography } from "@mui/material"
import { GetAvatar, GetDogAvatar } from "./[userId]/edit"
import getLoginAttempts from "app/login-attempts/queries/getLoginAttempts"

const styles = require("app/pages/users/userId.module.scss")

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })
  const currentUser = useCurrentUser()
  const [{ posts }] = useQuery(getPosts, { where: { created_by: user.id } })
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: user.id })
  const [{ userLikes }] = useQuery(getUserLikes, { where: { user_id: user?.id } }) // for profile likes
  const [{ loginAttempts }] = useQuery(getLoginAttempts, { where: { user_id: user.id } })
  const [loc, setLoc] = useState(false) //useEffect set for location on render
  const [tabState, setTabState] = useState(0)
  const date = new Date()
  const [userFlag, setUserFlag] = useState<boolean>(false)
  const [welcomeFlag, setWelcomeFlag] = useState<boolean>(false)

  useEffect(() => {
    //geoLoc()
    if (user.id !== currentUser!.id) {
      setUserFlag(false)
    } else {
      setUserFlag(true)
    }
    console.log("Test")
  }, [userId])

  const handleChange = (event: any, newTab: number) => {
    setTabState(newTab)
  }

  if (loginAttempts.length > 1) {
    setWelcomeFlag(true)
  }

  // Check if user is the same user that is logged in or visitor
  // {flag ? <MYprofile /> :<otherprofile />}
  // Potential Merge Conflict with getDogProfileUserId.ts
  // wrap handleChange in useEffect

  //Dont style like this className="cssClass"
  //Style like this className={styles.cssClass}

  return (
    <React.Fragment>
      <div className={styles.bigContainer}>
        {userFlag === true ? (
          <React.Fragment>
            <div className={styles.post}>
              &emsp; &emsp; <p>New Post! &emsp; Edit Profile</p>
              <p>
                &emsp;
                <button
                  onClick={() => {
                    router.push("/post/new")
                  }}
                >
                  <IoAddCircleSharp />
                </button>{" "}
                &emsp; &emsp; &emsp;
                <button onClick={() => router.push(`/users/${user.id}/edit`)}>Edit</button>
              </p>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className={styles.container}>
          <div className={styles.human}>
            {userFlag === true ? (
              <h1>Welcome {user.name}!</h1>
            ) : (
              <React.Fragment>
                <h1>{user.name}&apos;s Profile</h1>
              </React.Fragment>
            )}

            <p>
              <CalendarMonthIcon />
              &ensp; User since {user.createdAt.toDateString()}
            </p>
          </div>

          {/* Feed/Likes page */}
          <div className={styles.likeFeed}>
            <div className={styles.minimenu}>
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
                <div className={styles.content}>
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
                <div className={styles.content}>
                  <Suspense fallback="Loading...">
                    {posts.map((post, idx) => (
                      <React.Fragment key={idx}>
                        <PostCard props={post} />
                      </React.Fragment>
                    ))}
                  </Suspense>
                </div>
              </React.Fragment>
            )}
          </div>

          <div className={styles.pet}>
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
