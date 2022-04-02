import getPosts from "app/posts/queries/getPosts"
import { usePaginatedQuery, useQuery } from "blitz"
import { type } from "os"
import React, { Suspense, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { createStore } from "state-pool"
import PostCard from "../postCard"

const styles = require("app/core/components/scrollPost/index.module.scss")

const store = createStore()
store.setState("page_key", 1)

const ITEMS_PER_PAGE: number = 5

const ScrollPost = () => {
  const [page, setPage] = store.useState("page_key")

  let [{ posts }, { setQueryData }] = usePaginatedQuery(getPosts, {
    where: { is_disabled: false },
    orderBy: { created_at: "desc" },
    skip: 0,
    take: ITEMS_PER_PAGE * page,
  })

  const fetchMoreData = () => {
    console.log("Fetching")
    setPage(page + 1)
    console.log("Page: ", page)
  }

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className={styles.container}
      >
        {posts.map((post: { post: typeof post }, index: number) => (
          <React.Fragment key={index}>
            <Suspense fallback={"Loading..."}>
              <PostCard props={post} />
            </Suspense>
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default ScrollPost
