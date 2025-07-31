import React from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  password: string
}

export default function FormStateDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  return (
    <div className="form-container">
      <h2>Form State Demo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input 
            id="username" 
            type="text" 
            {...register('username', { 
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' }
            })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input 
            id="password" 
            type="password" 
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-state-info">
          <p>Form State:</p>
          <p>Is Submitting: {isSubmitting ? 'Yes' : 'No'}</p>
          <p>Is Submit Successful: {isSubmitSuccessful ? 'Yes' : 'No'}</p>
          <p>Is Valid: {isValid ? 'Yes' : 'No'}</p>
          <p>Is Dirty: {isDirty ? 'Yes' : 'No'}</p>
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
