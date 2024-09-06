import Styles from  "./navbar.module.css"
import Link from "next/link"
import { auth } from '@clerk/nextjs/server';
import {
  UserButton, SignedOut, SignedIn
} from "@clerk/nextjs";


const navbar = () => {

  return (
    <>    
    <header className={Styles.header}>
      <article>
        <h1 className={Styles.logo}>Logo</h1>
        <img src="" alt="" />
        <ul>
          <SignedOut>
            <li>
              <Link  href="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>            
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </article>   
    </header>
    </>

  )
}

export default navbar