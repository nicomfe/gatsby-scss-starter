import React from 'react'

import './button.scss'

const Button = ({ children, ...rest }) => (
  <button {...rest} type='button' className='primary-button'><span>{children}</span></button>
)

export default Button
