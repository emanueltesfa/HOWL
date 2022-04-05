import React, { useEffect, useState } from "react"
import { createStore } from "state-pool"
import GoogleMapReact from "google-map-react"
import Autocomplete from "react-google-autocomplete"

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
          <Autocomplete
            apiKey={"AIzaSyBZ7J4C-qvLiiMBw2sRB-NY1JjPAa4vdXA"}
            onPlaceSelected={(place) => console.log(place)}
          />

          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDPvjz2zDJPV8idrYK1PeAIX9elkfGzgDk" }}
            defaultCenter={point}
            defaultZoom={11}
          >
            <AnyReactComponent text="My Marker" />
          </GoogleMapReact> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostForm
