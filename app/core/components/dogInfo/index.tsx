import getDogProfile from "app/dog-profiles/queries/getDogProfile"
import getDogProfileUserId from "app/dog-profiles/queries/getDogProfileUserId"
import { GetDogAvatar } from "app/pages/users/[userId]/edit"
import { useQuery } from "blitz"
import React from "react"

const styles = require("app/styles/global.module.scss")

const DogInfo = ({ owner }) => {
  const [dogProfile] = useQuery(getDogProfileUserId, { user_id: owner!.id })

  const { pet_name }: { pet_name: string } = dogProfile
  const { breed }: { breed: string } = dogProfile
  return (
    <React.Fragment>
      <div className={styles.dogContent}>
        <GetDogAvatar userId={owner.id} width={90} height={80} />
        <h3>{pet_name}</h3>
        <h5>{breed}</h5>
        {/* <main>
          <div>{pet_name}</div>
          <div>{breed}</div>
        </main> */}
      </div>
    </React.Fragment>
  )
}

export default DogInfo
