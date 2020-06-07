import React from 'react'

import './button.scss'

const Button = ({ children, ...rest }) => (
  <button type='button' className='primary-button' {...rest}>{children}</button>
)

export default Button
