import { Modal } from "@mui/material"
import getPosts from "app/posts/queries/getPosts"
import getUser from "app/users/queries/getUser"
import { Link, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import { createStore } from "state-pool"
import PostForm from "../postForm"

const store = createStore()

store.setState("updateComp", false)

//Will fetch the user name and return a component
export const GetUserName = ({ userId }) => {
  const [user] = useQuery(getUser, { id: userId })

  return <React.Fragment>{user.name}</React.Fragment>
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
      <div>
        {posts.map((post, idx) => (
          <React.Fragment key={idx}>
            {post != undefined && (
              <div>
                <Link href={`/users/${post.created_by}`}>
                  <div>
                    <GetUserName userId={post.created_by} />
                  </div>
                </Link>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  )
}

//Props will just be the current user
const PostButton = ({ props }) => {
  //Gets user location and it will ask for the users permission
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Lat: ", position.coords.latitude)
      console.log("Long: ", position.coords.longitude)
    })
  }

  const [updateComp, setUpdateComp] = store.useState("updateComp")
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <React.Fragment>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setUpdateComp(true)
        }}
      >
        <React.Fragment>
          <div>
            <PostForm props={props} />
          </div>
        </React.Fragment>
      </Modal>
      <div>
        <Suspense fallback={"Lodaing..."}>
          <ShowRecentUsers />
        </Suspense>
        <div>
          <button
            onClick={() => {
              setShowModal(true)
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
