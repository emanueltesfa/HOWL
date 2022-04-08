import createDogProfile from "app/dog-profiles/mutations/createDogProfile"
import { useMutation } from "blitz"
import React from "react"

const PetForm = ({ user }) => {
  const [createDog] = useMutation(createDogProfile)
  let data = new FormData()
  const name: string = user.name
  data.append("userId", user.id)
  console.log("Form data: ", data.get("userId"))

  return (
    <React.Fragment>
      <form>
        <div>Pet Form</div>
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
      </form>
    </React.Fragment>
  )
}

export default PetForm
