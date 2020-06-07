import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import Button from '../../button'
import '../contact.scss'

import { CONTACT_FORM } from '../../../config/analytics-events'

const emptyFields = {
  inputName: '',
  eventType: '',
  inputPhone: '',
  inputEstimatedGuests: 0,
  inputDate: new Date(),
  inputTime: '',
  inputMessage: '',
}

const StepOne = ({ email }) => {
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
      inputName,
      eventType,
      inputMessage,
      inputPhone,
      inputEstimatedGuests,
      inputDate,
      inputTime,
    } = fields

    e.preventDefault()
    setSending(true)
    fetch('/php/contact-form.php', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: formEncode({
        emailTitle: 'Book Request from website',
        inputEmail: email,
        inputName,
        eventType,
        inputPhone,
        inputEstimatedGuests,
        inputDate,
        inputTime,
        inputMessage,
      }),
    })
      .then((res) => {
        setSending(false)
        if (res.ok) {
          ReactGA.event({
            category: CONTACT_FORM.category,
            action: CONTACT_FORM.successSubmitAction,
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
          setContactMessage({ success: true, message: data.messageEnglish })
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
    inputName,
    eventType,
    inputPhone,
    inputDate,
    inputTime,
    inputEstimatedGuests,
    inputMessage,
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
        for informations about bookings or events, send us your details and we will be in touch soon.
      </p>
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
      <div className='form-group'>
        <label htmlFor='eventType'>
          <span>Ocassion</span>
          <select onChange={handleChange} id='eventType' name='eventType' value={eventType}>
            <option value='Not Selected' disabled defaultValue>Event Type</option>
            <option value='Meeting'>Meeting</option>
            <option value='Conference'>Conference</option>
            <option value='Team Building'>Team Building</option>
            <option value='Company Celebration'>Company Celebration</option>
            <option value='Awards'>Awards</option>
            <option value='Fundraising'>Fundraising</option>
            <option value='Social Christmas'>Social Christmas</option>
            <option value='Work Christmas'>Work Christmas</option>
            <option value='Other'>Other</option>
          </select>
        </label>
      </div>
      <div className='form-group'>
        <label htmlFor='inputDate'>
          <span>Event Date</span>
          <input
            value={inputDate}
            onChange={handleChange}
            name='inputDate'
            id='inputDate'
            placeholder='Date'
            type='date'
            required
          />
        </label>
      </div>

      <div className='form-group'>
        <label htmlFor='inputTime'>
          <span>Event Time</span>
          <input
            value={inputTime}
            onChange={handleChange}
            name='inputTime'
            id='inputTime'
            placeholder='Time'
            type='time'
            required
          />
        </label>
      </div>

      <div className='form-group'>
        <label htmlFor='inputEstimatedGuests'>
          <span>Estimated Guests</span>
          <input
            value={inputEstimatedGuests}
            onChange={handleChange}
            name='inputEstimatedGuests'
            max='999'
            id='inputEstimatedGuests'
            placeholder='Name'
            type='number'
            required
          />
        </label>
      </div>
      <div className='form-group'>
        <label htmlFor='inputMessage'>
          <span>Message</span>
          <textarea
            value={inputMessage}
            onChange={handleChange}
            id='inputMessage'
            name='inputMessage'
            placeholder='Tell us about your event'
            className='form-control'
            type='text'
            rows='6'
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

StepOne.propTypes = {
  email: PropTypes.string.isRequired,
}

export default StepOne
