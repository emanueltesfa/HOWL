import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import NavBar from "../components/NavBar/Navbar"
import { useCurrentUser } from "../hooks/useCurrentUser"

const styles = require("app/core/layouts/layout.module.scss")

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const user = useCurrentUser()

  return (
    <>
      <Head>

        <title>{title || "Howl-App"}</title>
        <link rel="icon" href="/HowlH.png" />
      </Head>

      <Suspense fallback="Loading...">
        {user != undefined && (
          <Suspense fallback="Loading...">
            <NavBar />
          </Suspense>
        )}

        <main className={styles.layoutContainer}>
          <main className={styles.layoutContent}>{children}</main>
        </main>
      </Suspense>
    </>
  )
}

export default Layout
