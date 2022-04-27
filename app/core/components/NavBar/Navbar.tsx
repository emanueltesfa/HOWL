import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getPostSearch from "app/posts/queries/getPostSearch"
import { Link, useMutation, useQuery, useRouter } from "blitz"
import React, { useState } from "react"

const styles = require("app/core/components/NavBar/navbar.module.scss")

const NavBar = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  const user = useCurrentUser()
  const [userInput, setUserInput] = useState<string>("")
  const [flag, setFlag] = useState<boolean>(false)

  console.log()

  return (
    <React.Fragment>
      {" "}
      ``
      <nav className={styles.container}>
        <header>
          <Link href={"/home"}>
            {/* Will link to home page */}
            <div className={styles.tag}>
              <strong>HOWL</strong>
            </div>
          </Link>
        </header>

        <main className={styles.mainContent}>
          <Link href={`/users/${user!.id}`}>
            {/* Will link to users/id page */}
            <div className={styles.tag}>
              <strong>Profile</strong>
            </div>
          </Link>
        </main>

        <footer>
          <Link href={"/"}>
            <div
              className={styles.tag}
              onClick={async () => {
                await logoutMutation()
                router.push("/")
              }}
            >
              <strong>Logout</strong>
            </div>
          </Link>
        </footer>
      </nav>
    </React.Fragment>
  )
}

export default NavBar
