import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import Navbar from "../components/NavBar"
import { useCurrentUser } from "../hooks/useCurrentUser"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const user = useCurrentUser()
  return (
    <>
      <Head>
        <title>{title || "Howl-App"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={"Loading..."}>
        <Navbar props={user} />
      </Suspense>

      {children}
    </>
  )
}

export default Layout
