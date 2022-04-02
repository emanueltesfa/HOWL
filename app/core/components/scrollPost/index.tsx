import getPosts from "app/posts/queries/getPosts"
import { usePaginatedQuery, useQuery } from "blitz"
import { type } from "os"
import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { createStore } from "state-pool"

const store = createStore()
store.setState("post_key", typeof Object)
store.setState("page_key", 1)

const ITEMS_PER_PAGE = 2

const ScrollPost = () => {
  const [scrollData, setScrollData] = store.useState("post_key")
  const [page, setPage] = store.useState("page_key")

  let [{ posts }, { setQueryData }] = usePaginatedQuery(getPosts, {
    where: { is_disabled: false },
    orderBy: { created_at: "desc" },
    skip: 0,
    take: ITEMS_PER_PAGE * page,
  })

  setScrollData(posts)

  const fetchMoreData = () => {
    console.log("Fetching")
    // console.log("Page type: ", typeof page)
    // count += 1
    setPage(page + 1)
    console.log("Page: ", page)
    // console.log("Scroll: ", scrollData)
  }

  return (
    <React.Fragment>
      {/* <div>
        {posts.map((post, idx) => (
          <React.Fragment key={idx}>
            <div>{idx} : index</div>
            <div style={{ height: "30rem" }}>{post.body}</div>
          </React.Fragment>
        ))}
        <button onClick={fetchMoreData}>Show more...</button>
      </div> */}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {scrollData.map((i, index) => (
          <div key={index} style={{ height: "30rem" }}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default ScrollPost
