import React from 'react'
import Link from 'next/link'
import Styles from "./footer.module.css"

const pageFooter = () => {
  return (
    <footer className={Styles.footer}>
        <p>&copy; 2024 Douaa El Mahraoui, All rights reserved</p>
        <ul>
          <li>
            <Link href="#">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#">
              Stores
            </Link>
          </li>
          <li>
            <Link href="#">
              Settings
            </Link>
          </li>
        </ul>
    </footer>
  )
}

export default pageFooter