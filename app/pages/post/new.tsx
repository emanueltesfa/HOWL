import PostForm from "app/core/components/postForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { useRouter } from "blitz"
import { BlitzPage } from "next"
import React from "react"

const NewPost: BlitzPage = () => {
  const user = useCurrentUser()
  const router = useRouter()

  return (
    <React.Fragment>
      <div>New Post</div>
      <PostForm props={user} />
    </React.Fragment>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <Layout title="HomePage">{page}</Layout>
export default NewPost
