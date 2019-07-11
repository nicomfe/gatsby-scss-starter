import React from 'react'

import './landing.scss'
import dunamLogo from '../images/dunam-logo.png'

const Landing = () => (
  <div className='landing-content'>
    <img src={dunamLogo} alt='Dunam Ingenieria' />
    <a href='mailto:info@dunamingenieria.com'>info@dunamingenieria.com</a>
    <a href='tel:3517609890'>351 760 9890</a>
  </div>
)

export default Landing
