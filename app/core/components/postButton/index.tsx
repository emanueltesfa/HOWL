import { Modal } from "@mui/material"
import getDogProfiles from "app/dog-profiles/queries/getDogProfiles"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"
import getPosts from "app/posts/queries/getPosts"
import getUser from "app/users/queries/getUser"
import { Image, Link, useQuery, useRouter } from "blitz"
import React, { Suspense, useEffect, useState } from "react"
import { createStore } from "state-pool"

const styles = require("app/core/components/postButton/index.module.scss")

const store = createStore()

store.setState("updateComp", false)

//Will fetch the user name and return a component
export const GetUserName = ({ userId }) => {
  const [user] = useQuery(getUser, { id: userId })

  return (
    <React.Fragment>
      <span style={{ color: "#5AC8CA" }} className={styles.userName}>
        {user.name}&nbsp;
      </span>
    </React.Fragment>
  )
}

export const GetAvatar = ({ userId }) => {
  const [user] = useQuery(getUser, { id: userId })

  return (
    <React.Fragment>
      {user.profile_pic_file === "" ? (
        <Image
          src={"/../public/defaultProfilePic/profileImg.png"}
          alt={`${user.name} Profile Picture`}
          height={30}
          width={40}
          className={styles.Image}
        />
      ) : (
        <Image
          src={user.profile_pic_file}
          alt={`${user.name} Profile Picture`}
          height={30}
          width={40}
          className={styles.Image}
        />
      )}
    </React.Fragment>
  )
}

const ShowRecentUsers = () => {
  const [{ posts }, { refetch }] = useQuery(getPosts, {
    where: { is_disabled: false },
    take: 3,
    orderBy: { created_at: "desc" },
  })

  const [updateComp, setUpdateComp] = store.useState("updateComp")

  //will updated once a user finishes a post
  if (updateComp == true) {
    console.log("refetching")
    refetch()
    setUpdateComp(false)
  }

  //will display the three most recent users that made a post
  return (
    <React.Fragment>
      <div className={styles.threeUsers}>
        {posts.map((post, idx) => (
          <React.Fragment key={idx}>
            {post != undefined && (
              <Link href={`/users/${post.created_by}`}>
                <div className={styles.userLink}>
                  <GetAvatar userId={post.created_by} />
                  <GetUserName userId={post.created_by} />
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  )
}

//Props will just be the current user
const PostButton = ({ props }) => {
  const router = useRouter()
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)
  const [point, setPoint] = useState<typeof center>()

  const center = {
    lat: 0,
    lng: 0,
  }

  //Gets user location and it will ask for the users permission
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      setPoint({ lat: position.coords.latitude, lng: position.coords.longitude })
      console.log("Lat: ", position.coords.latitude)
      console.log("Long: ", position.coords.longitude)
    })
  }

  const [updateComp, setUpdateComp] = store.useState("updateComp")
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.sideContainer}>
        <Suspense fallback={"Lodaing..."}>
          <ShowRecentUsers />
        </Suspense>
        <div>
          <button
            className={styles.postBtn}
            onClick={() => {
              router.push("/post/new")
            }}
          >
            Post
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostButton
