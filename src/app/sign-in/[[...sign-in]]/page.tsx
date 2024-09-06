import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Styles from "./signin.module.css"

const page = () => {
  return (
    <div className={Styles.signin}>
      <SignIn />
    </div>
  )
}

export default page