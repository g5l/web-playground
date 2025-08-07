import React from 'react'
import { useForm } from 'react-hook-form'
import './UseFormDemo.css'

interface FormData {
  firstName: string
  email: string
}

export default function UseFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      email: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // Simulate API call
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2))
      reset()
    }, 1000)
  }

  return (
    <div className="form-container">
      <h2>Simple Form Registration</h2>
      <p className="form-description">
        This demo shows basic form setup with useForm hook, including input registration, 
        validation, and form submission.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">Name</label>
          <input 
            id="firstName" 
            type="text" 
            {...register('firstName', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            {...register('email', { 
              required: 'Email is required',
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: 'Invalid email address' 
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-info">
          <h3>Learning Points:</h3>
          <ul>
            <li><code>useForm()</code> - Initialize the form</li>
            <li><code>register()</code> - Register inputs with validation</li>
            <li><code>handleSubmit()</code> - Handle form submission</li>
            <li><code>formState</code> - Access form state information</li>
          </ul>
        </div>

        {isSubmitSuccessful && (
          <div className="success-message">
            Form submitted successfully!
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}