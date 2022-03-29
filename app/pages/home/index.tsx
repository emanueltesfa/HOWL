import React, { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

const styles = require("app/pages/home/home.module.scss")

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const HomePage: BlitzPage = () => {
  const [userInput, setUserInput] = useState<string>("")
  const user = useCurrentUser()

  return (
    <div>
      {user != undefined && (
        <React.Fragment>
          <h1>{user!.name} </h1>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Varius qolestie nunc non blandit massa enim
            nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan in
            nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat sed lectus
            vestibulum mattis ullamcorper velit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam
            quisque id diam vel quam elementum pulvinar etiam. Viverra accumsan in nisl nisi
            scelerisque eu. Feugiat in fermentum posuere urna nec tincidunt praesent semper.
            Pellentesque habitant morbi tristique senectus et netus. Nisl purus in mollis nunc sed
            id semper risus in. Tellus molestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis ultricies. Purus viverra accumsan in nisl nisi
            scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu. Non tellus
            orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non curabitur
            gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie nunc non
            blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus
            viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque
            egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque gravida.
            Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam sollicitudin
            tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar etiam.
            Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna nec
            tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus. Nisl
            purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa enim
            nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan in
            nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie
            nunc non blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies.
            Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue
            quisque egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque
            gravida. Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam
            sollicitudin tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar
            etiam. Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna
            nec tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus.
            Nisl purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa
            enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie
            nunc non blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies.
            Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue
            quisque egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque
            gravida. Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam
            sollicitudin tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar
            etiam. Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna
            nec tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus.
            Nisl purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa
            enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat suam
            quisque id diam vel quam elementum pulvinar etiam. Viverra accumsan in nisl nisi
            scelerisque eu. Feugiat in fermentum posuere urna nec tincidunt praesent semper.
            Pellentesque habitant morbi tristique senectus et netus. Nisl purus in mollis nunc sed
            id semper risus in. Tellus molestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis olestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis ultricies. Purus viverra accumsan in nisl nisi
            scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu. Non tellus
            orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non curabitur
            gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat sed lectus
            vestibulum mattis ullamcorper velit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam
            quisque id diam vel quam elementum pulvinar etiam. Viverra accumsan in nisl nisi
            scelerisque eu. Feugiat in fermentum posuere urna nec tincidunt praesent semper.
            Pellentesque habitant morbi tristique senectus et netus. Nisl purus in mollis nunc sed
            id semper risus in. Tellus molestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis ultricies. Purus viverra accumsan in nisl nisi
            scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu. Non tellus
            orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non curabitur
            gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie nunc non
            blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus
            viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque
            egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque gravida.
            Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam sollicitudin
            tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar etiam.
            Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna nec
            tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus. Nisl
            purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa enim
            nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan in
            nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie
            nunc non blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies.
            Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue
            quisque egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque
            gravida. Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam
            sollicitudin tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar
            etiam. Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna
            nec tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus.
            Nisl purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa
            enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat solestie
            nunc non blandit massa enim nec dui nunc. In pellentesque massa placerat duis ultricies.
            Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas congue
            quisque egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque
            gravida. Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam
            sollicitudin tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar
            etiam. Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna
            nec tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus.
            Nisl purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa
            enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat s
            ultricies. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Neque egestas
            congue quisque egestas diam in arcu. Non tellus orci ac auctor augue mauris augue neque
            gravida. Volutpat lacus laoreet non curabitur gravida. Ut porttitor leo a diam
            sollicitudin tempor id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar
            etiam. Viverra accumsan in nisl nisi scelerisque eu. Feugiat in fermentum posuere urna
            nec tincidunt praesent semper. Pellentesque habitant morbi tristique senectus et netus.
            Nisl purus in mollis nunc sed id semper risus in. Tellus molestie nunc non blandit massa
            enim nec dui nunc. In pellentesque massa placerat duis ultricies. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu.
            Non tellus orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non
            curabitur gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat sed lectus
            vestibulum mattis ullamcorper velit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam
            quisque id diam vel quam elementum pulvinar etiam. Viverra accumsan in nisl nisi
            scelerisque eu. Feugiat in fermentum posuere urna nec tincidunt praesent semper.
            Pellentesque habitant morbi tristique senectus et netus. Nisl purus in mollis nunc sed
            id semper risus in. Tellus molestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis ultricies. Purus viverra accumsan in nisl nisi
            scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu. Non tellus
            orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non curabitur
            gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat sed lectus
            vestibulum mattis ullamcorper velit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam
            quisque id diam vel quam elementum pulvinar etiam. Viverra accumsan in nisl nisi
            scelerisque eu. Feugiat in fermentum posuere urna nec tincidunt praesent semper.
            Pellentesque habitant morbi tristique senectus et netus. Nisl purus in mollis nunc sed
            id semper risus in. Tellus molestie nunc non blandit massa enim nec dui nunc. In
            pellentesque massa placerat duis ultricies. Purus viverra accumsan in nisl nisi
            scelerisque eu ultrices. Neque egestas congue quisque egestas diam in arcu. Non tellus
            orci ac auctor augue mauris augue neque gravida. Volutpat lacus laoreet non curabitur
            gravida. Ut porttitor leo a diam sollicitudin tempor id. Ac feugiat sed lectus
            vestibulum mattis ullamcorper velit.{" "}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => <Layout title="HomePage">{page}</Layout>

export default HomePage
