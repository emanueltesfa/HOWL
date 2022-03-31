import React from "react"
import blitz, { useQuery } from "blitz"

const ProfileInfo = ({ user }) => {
  console.log(user)
  const { id } = user

  //const [dogProfile] = useQuery(getDogProfile, { id: id })
  //const [{dogProfile}] = useQuery(getDogProfiles, { where: {} })

  return (
    <React.Fragment>
      <div>{id}</div>
    </React.Fragment>
  )
}

export default ProfileInfo
