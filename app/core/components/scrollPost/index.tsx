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

const ITEMS_PER_PAGE: number = 10

const ScrollPost = () => {
  const [page, setPage] = store.useState("page_key")

  let [{ posts, hasMore }, { setQueryData }] = usePaginatedQuery(getPosts, {
    where: { is_disabled: false },
    orderBy: { created_at: "desc" },
    skip: 0,
    take: ITEMS_PER_PAGE * page,
  })

  const fetchMoreData = () => {
    //console.log("Fetching")
    //console.log(posts.length)
    setPage(page + 1)
    //console.log("Page: ", page)
  }

  //Might need to change the infinite scroll in furture to see more button after x posts
  //Will have to wait and see
  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => {}}
        hasMore={false}
        loader={<React.Fragment></React.Fragment>}
        className={styles.container}
      >
        <Suspense fallback={"Loading..."}>
          {posts.map((post: { post: typeof post }, index: number) => (
            <React.Fragment key={index}>
              <PostCard props={post} />
            </React.Fragment>
          ))}
        </Suspense>
        <div>
          <button
            disabled={!hasMore}
            onClick={fetchMoreData}
            className={hasMore ? styles.moreBtn : styles.disabledBtn}
          >
            {hasMore ? <label>See More...</label> : <label>No More Posts...</label>}
          </button>
        </div>
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default ScrollPost
