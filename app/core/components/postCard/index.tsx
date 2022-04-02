import React, { Suspense, useState } from "react"
import { GetUserName } from "../postButton"
import { Post } from "prisma"
import { useMutation, useQuery } from "blitz"
import UpdatePost from "../../../posts/mutations/updatePost"
import getPost from "app/posts/queries/getPost"

const styles = require("app/core/components/postCard/index.module.scss")

const PostCard = ({ props }) => {
  //Have a query for the number of likes to give it a real time update with setQuerydata
  //console.log("Post Card:", props)
  const [currentPost, setCurrentPost] = useState<typeof Post>(props)
  const [updateCurrentPost] = useMutation(UpdatePost)
  const [post, { setQueryData }] = useQuery(getPost, { id: props.id })

  return (
    <React.Fragment>
      <div className={styles.keep}>
        <main className={styles.container}>
          <header>
            <GetUserName userId={props.created_by} />
          </header>
          <div>{props.body}</div>
          <footer>
            <Suspense fallback={"Loading..."}>{post.like_count}</Suspense>

            <button
              onClick={async () => {
                try {
                  let count: number = currentPost.like_count + 1
                  const res = await updateCurrentPost({
                    like_count: props.like_count + 1,
                    id: props.id,
                    body: props.body,
                    created_by: props.created_by,
                    is_disabled: false,
                  })
                  console.log("Updated Likes: ", res)
                  setQueryData(res)
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
