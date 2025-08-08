import React from 'react'
import { useForm } from 'react-hook-form'
import './WatchDemo.css'

interface FormData {
  username: string
  email: string
  age: number
  bio: string
}

export default function WatchDemo() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isDirty, dirtyFields, touchedFields }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      age: 0,
      bio: ''
    }
  })

  // Watch all form values in real-time
  const watchedValues = watch()
  
  // Watch specific fields
  const watchedUsername = watch('username')
  const watchedEmail = watch('email')

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    alert(JSON.stringify(data, null, 2))
  }

  const handleGetValues = () => {
    const currentValues = getValues()
    alert(JSON.stringify(currentValues, null, 2))
  }

  return (
    <div className="watch-form-container">
      <h2>Form State Management</h2>
      <p className="form-description">
        This demo shows how to monitor form state in real-time using watch() and getValues() functions.
      </p>

      <div className="form-and-state-container">
        <div className="form-section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
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

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input 
                id="age" 
                type="number" 
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 18, message: 'You must be at least 18 years old' },
                  max: { value: 120, message: 'Age cannot exceed 120' }
                })}
              />
              {errors.age && <p className="error">{errors.age.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea 
                id="bio" 
                {...register('bio', { 
                  maxLength: { value: 200, message: 'Bio cannot exceed 200 characters' }
                })}
              />
              {errors.bio && <p className="error">{errors.bio.message}</p>}
            </div>

            <div className="button-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleGetValues}>Get Values</button>
            </div>
          </form>
        </div>

        <div className="state-display-section">
          <h3>Form State</h3>
          
          <div className="state-card">
            <h4>Watched Values (Real-time)</h4>
            <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
          </div>
          
          <div className="state-card">
            <h4>Specific Watched Fields</h4>
            <p>Username: <strong>{watchedUsername || '(empty)'}</strong></p>
            <p>Email: <strong>{watchedEmail || '(empty)'}</strong></p>
          </div>
          
          <div className="state-card">
            <h4>Form Status</h4>
            <p>Dirty: <span className={isDirty ? 'status-true' : 'status-false'}>{isDirty ? 'Yes' : 'No'}</span></p>
            <p>Dirty Fields: <pre>{JSON.stringify(dirtyFields, null, 2)}</pre></p>
            <p>Touched Fields: <pre>{JSON.stringify(touchedFields, null, 2)}</pre></p>
          </div>
          
          <div className="state-card">
            <h4>Errors</h4>
            <pre>{Object.keys(errors).length ? JSON.stringify(errors, null, 2) : '(no errors)'}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}