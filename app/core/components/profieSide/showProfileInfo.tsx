/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import blitz, { useQuery } from "blitz"
import "bootstrap/dist/css/bootstrap.min.css"
import { GetAvatar } from "app/pages/users/[userId]/edit"

const styles = require("app/core/components/profieSide/index.module.scss")

const ProfileInfo = ({ user }) => {
  //console.log(user)
  const { id } = user

  //const [dogProfile] = useQuery(getDogProfile, { id: id })
  //const [{dogProfile}] = useQuery(getDogProfiles, { where: {} })

  return (
    <React.Fragment>
      <div className={styles.conatiner}>
        <h3>{user.name}</h3>
        <GetAvatar width={90} height={65} userId={id} />
      </div>
    </React.Fragment>
  )
}

export default ProfileInfo
