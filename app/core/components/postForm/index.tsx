import React, { useEffect, useState } from "react"
import { createStore } from "state-pool"
import GoogleMapReact from "google-map-react"

const store = createStore()

store.setState("user_key", "")

const PostForm = ({ props, point }) => {
  const [userInput, setUserInput] = store.useState("user_key")
  console.log("Point: ", point)

  const handleChange = (e) => {
    e.preventDefault()
  }
  const AnyReactComponent = ({ text }) => <div>{text}</div>

  return (
    <React.Fragment>
      <div>
        Create a Post
        <div style={{ height: "50vh", width: "50vw" }}>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDPvjz2zDJPV8idrYK1PeAIX9elkfGzgDk" }}
            defaultCenter={point}
            defaultZoom={11}
          >
            <AnyReactComponent text="My Marker" />
          </GoogleMapReact> */}
        </div>
        <form>
          <input value={userInput} type="text" onChange={(e) => handleChange(e)} />
        </form>
      </div>
    </React.Fragment>
  )
}

export default PostForm
