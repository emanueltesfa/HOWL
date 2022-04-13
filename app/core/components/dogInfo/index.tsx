import getDogProfile from "app/dog-profiles/queries/getDogProfile"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"
import { useQuery } from "blitz"
import React from "react"

const DogInfo = ({ owner }) => {
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: owner!.id })

  const { pet_name }: { pet_name: string } = dogProfile
  const { breed }: { breed: string } = dogProfile
  return (
    <React.Fragment>
      <div>Dog Profile</div>
      <main>
        <div>{pet_name}</div>
        <div>{breed}</div>
      </main>
    </React.Fragment>
  )
}

export default DogInfo
