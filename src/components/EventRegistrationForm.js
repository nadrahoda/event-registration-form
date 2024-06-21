import React, { useState } from 'react'

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleBlur
  }
}

const validate = values => {
  let errors = {}
  if (!values.name) {
    errors.name = 'Name is required'
  }
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid'
  }
  if (!values.age) {
    errors.age = 'Age is required'
  } else if (values.age <= 0) {
    errors.age = 'Age must be greater than 0'
  }
  if (values.isAttendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required'
  }
  return errors
}

const EventRegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showErrors, setShowErrors] = useState(false) // Add state for showing errors
  const { values, errors, setErrors, handleChange, handleBlur } =
    useFormValidation(
      {
        name: '',
        email: '',
        age: '',
        isAttendingWithGuest: '',
        guestName: ''
      },
      validate
    )

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (
      Object.keys(validationErrors).length === 0 &&
      values.isAttendingWithGuest
    ) {
      setIsSubmitted(true)
    } else {
      setShowErrors(true)
      setIsSubmitted(false)
    }
    if (!values.isAttendingWithGuest) {
      alert('Please select whether you are attending with a guest.')
    }
  }

  return (
    <div className='form-container'>
      {isSubmitted ? (
        <div className='summary'>
          <h2 className='summary-header'>Registration Summary</h2>
          <div className='summary-details'>
            <p>
              <strong>Name:</strong> <span>{values.name}</span>
            </p>
            <p>
              <strong>Email:</strong> <span>{values.email}</span>
            </p>
            <p>
              <strong>Age:</strong> <span>{values.age}</span>
            </p>
            <p>
              <strong>Attending with Guest:</strong>{' '}
              <span>
                {values.isAttendingWithGuest === 'yes' ? 'Yes' : 'No'}
              </span>
            </p>
            {values.isAttendingWithGuest === 'yes' && (
              <p>
                <strong>Guest Name:</strong> <span>{values.guestName}</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showErrors && errors.name && (
              <p className='error'>{errors.name}</p>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showErrors && errors.email && (
              <p className='error'>{errors.email}</p>
            )}
          </div>
          <div>
            <label>Age:</label>
            <input
              type='number'
              name='age'
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showErrors && errors.age && <p className='error'>{errors.age}</p>}
          </div>
          <div className='input-container'>
            <label>Are you attending with a guest?</label>
            <div className='radio-group'>
              <input
                type='radio'
                id='yes'
                name='isAttendingWithGuest'
                value='yes'
                checked={values.isAttendingWithGuest === 'yes'}
                onChange={handleChange}
              />
              <label htmlFor='yes'>Yes</label>

              <input
                type='radio'
                id='no'
                name='isAttendingWithGuest'
                value='no'
                checked={values.isAttendingWithGuest === 'no'}
                onChange={handleChange}
              />
              <label htmlFor='no'>No</label>
            </div>
          </div>
          {values.isAttendingWithGuest === 'yes' && (
            <div>
              <label>Guest Name:</label>
              <input
                type='text'
                name='guestName'
                value={values.guestName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {showErrors && errors.guestName && (
                <p className='error'>{errors.guestName}</p>
              )}
            </div>
          )}
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default EventRegistrationForm
