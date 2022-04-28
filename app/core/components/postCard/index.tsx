import React, { Suspense, useState } from "react"
import { GetUserName } from "../postButton"
import { Post } from "prisma"
import { Link, useMutation, useQuery, useRouter } from "blitz"
import UpdatePost from "../../../posts/mutations/updatePost"
import getPost from "app/posts/queries/getPost"
import getUserLikes from "app/user-likes/queries/getUserLikes"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import updateUserLike from "app/user-likes/mutations/updateUserLike"
import createUserLike from "app/user-likes/mutations/createUserLike"
import deleteUserLike from "app/user-likes/mutations/deleteUserLike"
import { createStore } from "state-pool"
import createDogProfile from "app/dog-profiles/mutations/createDogProfile"
import getDogProfile from "app/dog-profiles/queries/getDogProfile"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"

const store = createStore()

store.setState("unLikeId", -1)
store.setState("unLikeFlag", false)

const styles = require("app/core/components/postCard/index.module.scss")

const PostCard = ({ props }) => {
  //Have a query for the number of likes to give it a real time update with setQuerydata
  //console.log("Post Card:", props)
  const user = useCurrentUser()
  const router = useRouter()
  const [currentPost, setCurrentPost] = useState<typeof Post>(props)
  const [unLikeFlag, setUnLikeFlag] = store.useState("unLikeFlag")
  const [unLikeId, setUnLikeId] = store.useState("unLikeId")
  const [updateCurrentPost] = useMutation(UpdatePost)
  const [post, { setQueryData }] = useQuery(getPost, { id: props.id })
  const [{ userLikes }, { refetch }] = useQuery(getUserLikes, { where: { post_id: post.id } })
  const [updateLikes] = useMutation(createUserLike)
  const [deleteLike] = useMutation(deleteUserLike)
  const [createDog] = useMutation(createDogProfile)
  const [dogProfile] = useQuery(getDogProfile, { id: props.dog_id })

  let unLike: boolean = false
  let likeText: string = "Like"
  userLikes.forEach((like) => {
    if (like.user_id == user!.id) {
      likeText = "UnLike"
    }
  })

  const resetValues = () => {
    unLike = false
    setUnLikeFlag(false)
    setUnLikeId(-1)
  }

  return (
    <React.Fragment>
      <div className={styles.keep}>
        <main className={styles.container}>
          <header className={styles.headerContent}>
            <div className={styles.subHead}>
              <Link href={`/users/${props.created_by}`}>
                <a style={{ textDecoration: "none" }}>
                  <strong>
                    <GetUserName userId={props.created_by} />
                  </strong>
                </a>
              </Link>
              <strong style={{ display: "flex", flexDirection: "row" }}>
                and <div>&nbsp;{dogProfile!.pet_name}&nbsp;</div> are going to&nbsp;
              </strong>
            </div>

            <Link href={`https://www.google.com/maps?q=${props.location}`}>
              <a target="_blank" className={styles.locationLink}>
                <strong>{props.location}</strong>
              </a>
            </Link>
          </header>

          <div className={styles.postBody}>{props.body}</div>

          <footer className={styles.footerContent}>
            <Suspense fallback={"Loading..."}>{userLikes.length}</Suspense>

            <button
              className={styles.likeBtn}
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
              {likeText == "Like" ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </button>
          </footer>
        </main>
        <div className={styles.underLine} />
      </div>
    </React.Fragment>
  )
}

export default PostCard
