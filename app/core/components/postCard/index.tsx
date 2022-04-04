import React, { Suspense, useState } from "react"
import { GetUserName } from "../postButton"
import { Post } from "prisma"
import { useMutation, useQuery } from "blitz"
import UpdatePost from "../../../posts/mutations/updatePost"
import getPost from "app/posts/queries/getPost"
import getUserLikes from "app/user-likes/queries/getUserLikes"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import updateUserLike from "app/user-likes/mutations/updateUserLike"
import createUserLike from "app/user-likes/mutations/createUserLike"
import deleteUserLike from "app/user-likes/mutations/deleteUserLike"
import { createStore } from "state-pool"

const store = createStore()

store.setState("unLikeId", -1)
store.setState("unLikeFlag", false)

const styles = require("app/core/components/postCard/index.module.scss")

const PostCard = ({ props }) => {
  //Have a query for the number of likes to give it a real time update with setQuerydata
  //console.log("Post Card:", props)
  const user = useCurrentUser()
  const [currentPost, setCurrentPost] = useState<typeof Post>(props)
  const [unLikeFlag, setUnLikeFlag] = store.useState("unLikeFlag")
  const [unLikeId, setUnLikeId] = store.useState("unLikeId")
  const [updateCurrentPost] = useMutation(UpdatePost)
  const [post, { setQueryData }] = useQuery(getPost, { id: props.id })
  const [{ userLikes }, { refetch }] = useQuery(getUserLikes, { where: { post_id: post.id } })
  const [updateLikes] = useMutation(createUserLike)
  const [deleteLike] = useMutation(deleteUserLike)

  let unLike: boolean = false

  //console.log("Likes for this post:", userLikes)

  const resetValues = () => {
    unLike = false
    setUnLikeFlag(false)
    setUnLikeId(-1)
  }

  return (
    <React.Fragment>
      <div className={styles.keep}>
        <main className={styles.container}>
          <header>
            <GetUserName userId={props.created_by} />
          </header>
          <div>{props.body}</div>
          <footer>
            <Suspense fallback={"Loading..."}>{userLikes.length}</Suspense>

            <button
              onClick={async () => {
                //Wille search to see if the current user has liked the post
                //If so then it will flag it and make sure to remove the like
                userLikes.forEach((like) => {
                  if (like.user_id == user!.id) {
                    unLike = true
                    setUnLikeFlag(true)
                    setUnLikeId(like.id)
                  }
                })
                try {
                  if (unLike == true) {
                    //If unliking a post then it will check to make sure the number of post
                    //stay above -1 and the database doesn't overwrite itself
                    if (props!.like_count! >= 0) {
                      let numLikes: number = props.like_count - 1
                      if (numLikes < 0) {
                        numLikes = 0
                      }
                      const removeLike = await deleteLike({
                        post_id: props.id,
                        user_id: user!.id,
                      })
                      const res = await updateCurrentPost({
                        like_count: numLikes,
                        id: props.id,
                        body: props.body,
                        created_by: props.created_by,
                        is_disabled: false,
                      })
                      setQueryData(res)
                      refetch()
                    }
                    resetValues()
                  } else {
                    const createLike = await updateLikes({
                      post_id: props.id,
                      user_id: user!.id,
                      created_by: user!.id,
                    })
                    const res = await updateCurrentPost({
                      like_count: props.like_count + 1,
                      id: props.id,
                      body: props.body,
                      created_by: props.created_by,
                      is_disabled: false,
                    })
                    setQueryData(res)
                    refetch()
                  }
                } catch (error) {
                  console.log(error.message)
                }
              }}
            >
              Like
            </button>
          </footer>
        </main>
        <div className={styles.underLine} />
      </div>
    </React.Fragment>
  )
}

export default PostCard
