import React from 'react'
import { Link } from 'gatsby'

import DesignMock from '../../images/design.png'
import NavBar from '../navbar'
import Button from '../button'
import './hero.scss'

const Hero = () => (
  <div className='hero-container'>
    <div className='hero-content'>
      <NavBar />
      <div className='hero-text'>
        <h1>Get insights & recommendations for your cloud infrastructure</h1>
        <ul>
         <li>Measure and reduce your costs down to 80% by using resources efficiently.</li>
         <li>Get recommendations and best practices for security, cluster reliability and DevOps.</li>
         <li>Get insights and actions to address technical debt.</li>
         <li>Get additional support with our engineers.</li>
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
