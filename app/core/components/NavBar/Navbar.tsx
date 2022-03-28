import logout from "app/auth/mutations/logout"
import { useMutation, useRouter } from "blitz"
import React from "react"

const NavBar = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  return (
    <React.Fragment>
      <div>Navbar</div>
      <button
        className="button small"
        onClick={async () => {
          await logoutMutation()
          router.push("/")
        }}
      >
        Logout
      </button>
    </React.Fragment>
  )
}

export default NavBar
