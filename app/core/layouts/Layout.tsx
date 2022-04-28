import { Head, BlitzLayout, useParam } from "blitz"
import { Suspense, useEffect, useState } from "react"
import NavBar from "../components/NavBar/Navbar"
import { useCurrentUser } from "../hooks/useCurrentUser"

const styles = require("app/core/layouts/layout.module.scss")

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const user = useCurrentUser()
  const [flag, setFlag] = useState<boolean>(false)

  useEffect(() => {
    if (window.location.pathname === "/signup") {
      setFlag(true)
    }
  }, [])

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

        <main className={flag === false ? styles.layoutContainer : styles.layoutContent2}>
          <main className={styles.layoutContent}>{children}</main>
        </main>
      </Suspense>
    </>
  )
}

export default Layout
