import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FormStateDemo from './FormStateDemo'

describe('FormStateDemo', () => {
  it('renders form elements', () => {
    render(<FormStateDemo />)
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('shows validation errors for required fields', () => {
    render(<FormStateDemo />)
    
    fireEvent.submit(screen.getByRole('form'))
    
    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('shows validation errors for minimum length', () => {
    render(<FormStateDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')

    fireEvent.change(usernameInput, { target: { value: 'ab' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })
    fireEvent.blur(usernameInput)
    fireEvent.blur(passwordInput)
    
    expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument()
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  it('disables submit button when form is invalid', () => {
    render(<FormStateDemo />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when form is valid', () => {
    render(<FormStateDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(usernameInput, { target: { value: 'user123' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(submitButton).toBeEnabled()
  })

  it('shows form state information correctly', () => {
    render(<FormStateDemo />)
    
    expect(screen.getByText('Is Submitting: No')).toBeInTheDocument()
    expect(screen.getByText('Is Submit Successful: No')).toBeInTheDocument()
    expect(screen.getByText('Is Valid: No')).toBeInTheDocument()
    expect(screen.getByText('Is Dirty: No')).toBeInTheDocument()
  })

  it('handles successful submission', async () => {
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<FormStateDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(usernameInput, { target: { value: 'user123' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Form submitted:',
      expect.objectContaining({
        username: 'user123',
        password: 'password123'
      })
    )
    
    vi.clearAllMocks()
  })
})
