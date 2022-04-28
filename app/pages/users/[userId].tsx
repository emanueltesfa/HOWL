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
            <div className={styles.btnContainer}>
              <div className={styles.post}>
                <strong>New Post!</strong>
                <button
                  className={styles.btn}
                  onClick={() => {
                    router.push("/post/new")
                  }}
                >
                  <IoAddCircleSharp />
                </button>{" "}
              </div>
              <div className={styles.post}>
                <strong>Edit Profile</strong>
                <button
                  onClick={() => router.push(`/users/${user.id}/edit`)}
                  className={styles.btn}
                >
                  Edit
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <div className={styles.container}>
          <div className="HumanProf">
            {userFlag === true ? (
              <React.Fragment>
                <div className={styles.profileCotainer}>
                  {welcomeFlag === false ? <h1>Welcome {user.name}!</h1> : <h1>{user.name}</h1>}
                  <GetAvatar userId={user.id} height={125} width={150} />
                  <p className={styles.userSince}>
                    <CalendarMonthIcon />
                    &ensp; User since {user.createdAt.toDateString()}
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={styles.profileCotainer}>
                  <h1>{user.name}&apos;s Profile</h1>
                  <GetAvatar userId={user.id} height={125} width={150} />
                  <p className={styles.userSince}>
                    <CalendarMonthIcon />
                    &ensp; User since {user.createdAt.toDateString()}
                  </p>
                </div>
              </React.Fragment>
            )}
          </div>

          {/* Feed/Likes page */}
          <div className={styles.verLine} />
          <div className={styles.feedsLikes}>
            <div className="miniMenu">
              <Box sx={{ borderBottom: 1, borderColor: "white", width: "48vw" }}>
                <Tabs aria-label="basic tabs example" onChange={handleChange}>
                  <Tab label={<Typography sx={{ color: "white" }}>Feed</Typography>} />
                  <Tab label={<Typography sx={{ color: "white" }}>Likes</Typography>} />
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
          <div className={styles.verLine} />
          <div>
            <div className={styles.profileCotainer}>
              <h1>Hey {dogProfile.pet_name}!</h1>
              <GetDogAvatar userId={user.id} height={125} width={150} />
              <p className={styles.userSince}>
                <CalendarMonthIcon />
                &ensp;Pet since {user.createdAt.toDateString()}
              </p>
              <p>
                {dogProfile.pet_name}
                &nbsp;is&nbsp;
                {dogProfile.age}
              </p>

              <p className={styles.temp}>
                <label>{dogProfile.pet_name}&apos;s &nbsp;Temperment</label>{" "}
                {dogProfile.temperament}
              </p>
            </div>
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
