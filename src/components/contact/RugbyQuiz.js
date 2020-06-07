import React, { useState } from 'react'
import ReactGA from 'react-ga'

import Button from '../button'
import './contact.scss'

import { QUIZ_NIGHT_BOOKING } from '../../config/analytics-events'

const emptyFields = {
  inputName: '',
  inputEmail: '',
  inputPhone: '',
  inputEstimatedGuests: 0,
}

const ContactForm = () => {
  const [fields, setField] = useState(emptyFields)
  const [contactMessage, setContactMessage] = useState(null)
  const [sending, setSending] = useState(false)

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

  const resetForm = () => {
    setField(emptyFields)
  }

  const submitForm = (e) => {
    if (e.isDefaultPrevented()) {
      // handle the invalid form...
      return false
    }
    const {
      inputName,
      inputEmail,
      inputPhone
    } = fields

    e.preventDefault()
    setSending(true)
    fetch('/php/rugby-quiz-form.php', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: formEncode({
        emailTitle: 'Team Booking for Rebel Sport Rugby Quiz',
        inputName,
        inputPhone,
        inputEmail,
      }),
    })
      .then((res) => {
        setSending(false)
        if (res.ok) {
          ReactGA.event({
            category: QUIZ_NIGHT_BOOKING.category,
            action: QUIZ_NIGHT_BOOKING.successSubmitAction,
          })
          return res.json()
        }
        ReactGA.event({
          category: QUIZ_NIGHT_BOOKING.category,
          action: QUIZ_NIGHT_BOOKING.errorSubmitAction,
        })
        const error = 'Error sending form, please try again later.'
        return { error }
      })
      .then((data) => {
        if (data.error) {
          setContactMessage({ success: false, message: data.error })
        } else {
          resetForm()
          setContactMessage({ success: true, message: data.messageEnglish })
        }
      })
      .catch((error) => {
        console.error(error)
        ReactGA.event({
          category: QUIZ_NIGHT_BOOKING.category,
          action: QUIZ_NIGHT_BOOKING.errorSubmitAction,
        })
        setSending(false)
      })
  }

  const {
    inputName,
    inputEmail,
    inputPhone,
  } = fields
  return (
    <form
      id='contact_form'
      className='contact-form rugby-quiz'
      name='contactform'
      data-toggle='validator'
      onSubmit={submitForm}
    >
      <img src='/images/rugbyQuizHeader.jpg' alt='Rebel Sport Rugby Quiz' />
      <p>Register your team in the form below and someone from our friendly staff will be in touch soon.</p>
      <div className='form-group'>
        <label htmlFor='inputName'>
          <span>Name</span>
          <input
            value={inputName}
            onChange={handleChange}
            name='inputName'
            min='2'
            id='inputName'
            placeholder='Name'
            type='text'
            required
          />
        </label>
      </div>

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

      <div className='form-group'>
        <label htmlFor='inputPhone'>
          <span>Phone</span>
          <input
            value={inputPhone}
            onChange={handleChange}
            name='inputPhone'
            id='inputPhone'
            placeholder='Phone'
            type='text'
            required
          />
        </label>
      </div>

      <Button type='submit' disabled={sending}>
        Send
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

export default ContactForm
