import React from 'react'
import ReactGA from 'react-ga'
import { navigate } from 'gatsby'

import Button from '../../button'
import '../contact.scss'

import { CONTACT_FORM } from '../../../config/analytics-events'

const emptyFields = {
  inputEmail: '',
}

const StepOne = () => {
  const [fields, setField] = React.useState(emptyFields)
  const [sending, setSending] = React.useState(false)
  const [contactMessage, setContactMessage] = React.useState(null)

  const handleChange = (event) => {
    setField({ ...fields, [event.target.name]: event.target.value })
  }

  const formEncode = (obj) => {
    const str = []
    Object.keys(obj).forEach((key) => {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    })
    return str.join('&')
  }
  const submitForm = (e) => {
    if (e.isDefaultPrevented()) {
      // handle the invalid form...
      return false
    }
    const {
      inputEmail,
    } = fields

    e.preventDefault()
    setSending(true)
    fetch('/php/contact-step-1.php', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: formEncode({
        inputEmail,
      }),
    })
      .then((res) => {
        setSending(false)
        if (res.ok) {
          ReactGA.event({
            category: CONTACT_FORM.category,
            action: CONTACT_FORM.stepOne,
          })
          return res.json()
        }
        ReactGA.event({
          category: CONTACT_FORM.category,
          action: CONTACT_FORM.errorSubmitAction,
        })
        const error = 'Error sending form, please try again later.'
        return { error }
      })
      .then((data) => {
        if (data.error) {
          setContactMessage({ success: false, message: data.error })
        } else {
          // TODO: go to next page
          navigate(`/contactBySteps/step2?email=${inputEmail}`)
        }
      })
      .catch((error) => {
        console.error(error)
        ReactGA.event({
          category: CONTACT_FORM.category,
          action: CONTACT_FORM.errorSubmitAction,
        })
        setSending(false)
      })
  }

  const {
    inputEmail,
  } = fields
  return (
    <form
      id='contact_form'
      className='contact-form'
      name='contactform'
      data-toggle='validator'
      onSubmit={submitForm}
    >
      <p>
        for information about bookings or events, send us your details and we will be in touch soon.
      </p>
      <div className='form-group'>
        <label htmlFor='inputEmail'>
          <span>Email</span>
          <input
            value={inputEmail}
            onChange={handleChange}
            name='inputEmail'
            id='inputEmail'
            placeholder='Email'
            type='email'
            required
          />
        </label>
      </div>

      <Button type='submit' disabled={sending}>
        Next
      </Button>

      <div className='contact-message-container'>
        {contactMessage && contactMessage.success
          && <p className='contact-message-success'>{contactMessage.message}</p>
        }
        {contactMessage && !contactMessage.success
          && <p className='contact-message-error'>{contactMessage.message}</p>
        }
      </div>
    </form>)
}

StepOne.propTypes = {}

export default StepOne
