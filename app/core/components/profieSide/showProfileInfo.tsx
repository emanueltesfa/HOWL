import React from "react"
import blitz, { useQuery } from "blitz"
import "bootstrap/dist/css/bootstrap.min.css"

const ProfileInfo = ({ user }) => {
  //console.log(user)
  const { id } = user

  //const [dogProfile] = useQuery(getDogProfile, { id: id })
  //const [{dogProfile}] = useQuery(getDogProfiles, { where: {} })

  return (
    <React.Fragment>
      <div>{id}</div>
      <div className="d-flex p-2 flex-column">
        <div>{user.name}</div>
      </div>
      <div></div>
    </React.Fragment>
  )
}

export default ProfileInfo
