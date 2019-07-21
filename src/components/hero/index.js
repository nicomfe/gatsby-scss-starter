import React from 'react'
import { Link } from 'gatsby'

import DesignMock from '../../images/design.jpg'
import NavBar from '../navbar'
import Button from '../button'
import './hero.scss'

const Hero = () => (
  <div className='hero-container'>
    <div className='hero-content'>
      <NavBar />
      <div className='hero-text'>
        <h1>Gatsby SCSS Template</h1>
        <ul>
         <li>Super easy to start.</li>
         <li>Styling using scss.</li>
        </ul>
        <Button><Link to='/notify-me'>Get Started</Link></Button>
      </div>
      <div className='img-container'><img src={DesignMock} alt='Cloud wise dashboard' /></div>
    </div>
    <div className='background-container'>
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default Hero
