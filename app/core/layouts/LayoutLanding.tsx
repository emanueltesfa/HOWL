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
        <title>{title || "HOWL"}</title>
        <link rel="icon" href="/Howl.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
