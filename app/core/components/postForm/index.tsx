import React, { Suspense, useEffect, useState } from "react"
import { createStore } from "state-pool"
import GoogleMapReact from "google-map-react"
import Autocomplete from "react-google-autocomplete"
import { useQuery } from "blitz"
import getLocationSearch from "app/locations/queries/getLocationSearch"

export const SearchLocations = (searchString) => {
  const [locations] = useQuery(
    getLocationSearch,
    {
      search_text: searchString,
      take: 50,
    },
    {
      // This ensures the query never refreshes and overwrites
      // the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  return locations
}

const store = createStore()

store.setState("user_key", "")

const PostForm = ({ props }) => {
  const [userInput, setUserInput] = store.useState("user_key")

  const handleChange = (e) => {
    e.preventDefault()
    setUserInput(e.target.value)
  }

  return (
    <React.Fragment>
      <div>
        Create a Post
        <div>
          <form>
            <input value={userInput} onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <Suspense fallback={"Lodaing..."}>
          <ShowLocations search_text={userInput} />
        </Suspense>
      </div>
    </React.Fragment>
  )
}

const ShowLocations = ({ search_text }) => {
  if (search_text === undefined || search_text.length == 0) {
    search_text = "*()&*(&#)*^*&%*(^&#$(*&^@&#$^&#^^$^$^$^&$&&&**(#@)#@_#!@*(*"
  }

  const data = SearchLocations(search_text)
  data?.forEach((item) => console.log(item.location_name))
  //console.log("Data: ", data)
  return (
    <React.Fragment>
      {data?.map((locations, idx) => (
        <React.Fragment key={idx}>
          <div style={{ display: "block" }}> {locations.location_name}</div>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default PostForm
