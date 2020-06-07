import React from 'react'

import ContactTheme from '../layout/ContactTheme'
import Contact from '../contact/form'

import './hero.scss'

const Hero = () => (
  <div className='hero-container'>
    <div className='hero-content'>
      <ContactTheme>
        <p>Send us your book request and someone from our friendly staff will be in touch soon.</p>
        <Contact />
      </ContactTheme>
    </div>
  </div>
)

export default Hero
