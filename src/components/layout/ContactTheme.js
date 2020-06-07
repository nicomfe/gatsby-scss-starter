import React from 'react'
import PropTypes from 'prop-types'

import './layoutTheme.scss'

const ContactTheme = ({ children }) => (
  <div className='contact-theme-container'>
    <div className='red-circle' />
    {children}
  </div>
)

ContactTheme.propTypes = {
  children: PropTypes.element,
}

export default ContactTheme
