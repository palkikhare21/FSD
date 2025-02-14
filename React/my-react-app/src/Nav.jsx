import React from 'react'
import './Nav.css'

import {Link} from "react-router-dom"
const Nav = () => {
  return (
    <div>
      <nav>
        <Link>
        <li>home</li>
            </Link>
            
        <Link to={'/'}>
        <li>about us</li>
            </Link>

            <Link to={'/'}>
        <li>signup</li>
            </Link>
            <Link to={'/'}>
        <li>contactus</li>
            </Link>
      </nav>

    </div>
  )
}

export default Nav