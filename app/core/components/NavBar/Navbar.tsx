import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Link, useMutation, useRouter } from "blitz"
import React from "react"

const styles = require("app/core/components/NavBar/navbar.module.scss")

const NavBar = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  const user = useCurrentUser()

  return (
    <React.Fragment>
      <nav className={styles.container}>
        <header>
          <Link href={"/home"}>
            {/* Will link to home page */}
            <div className={styles.tag}>HOWL</div>
          </Link>
        </header>
        <main className={styles.mainContent}>
          <Link href={"/search"}>
            {/* Will link to search page */}
            <div className={styles.tag}>Search</div>
          </Link>
          <Link href={`/users/${user!.id}`}>
            {/* Will link to users/id page */}
            <div className={styles.tag}>Profile</div>
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
              Logout
            </div>
          </Link>
        </footer>
      </nav>
    </React.Fragment>
  )
}

export default NavBar