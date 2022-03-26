import React from "react"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { Link } from "blitz"

const Navbar = ({ props }) => {
  console.log(props)
  return (
    <React.Fragment>
      <div>
        <div>Nav Bar</div>
        <div>
          <Link href={`/users/${props.id}`}>
            <a>Profile</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
