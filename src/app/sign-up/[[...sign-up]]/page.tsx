import React from 'react'
import { SignUp } from '@clerk/nextjs'
import Styles from "./signup.module.css"

const page = () => {
  return (
    <div className={Styles.signup}>
      <SignUp />
    </div>
  )
}

export default page