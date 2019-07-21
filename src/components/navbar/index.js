import React from 'react'
import { Link } from 'gatsby'

import './navbar.scss'

const NavBar = () => (
  <div className='nav-container'>
    <div><h3>Cloudwise</h3></div>
    <div>
      <Link to='/pricing'>Pricing</Link>
      <Link to='/about-us'>About Us</Link>
      <Link to='/contact'>Contact</Link>
    </div>
  </div>
)

export default NavBar
