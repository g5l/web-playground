import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UseFormDemo from './UseFormDemo'

describe('UseFormDemo', () => {
  it('renders form elements', () => {
    render(<UseFormDemo />)
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByText('Simple Form Registration')).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(<UseFormDemo />)
    
    fireEvent.submit(screen.getByRole('form'))
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for minimum name length', async () => {
    render(<UseFormDemo />)
    
    const nameInput = screen.getByLabelText('Name')
    
    fireEvent.change(nameInput, { target: { value: 'a' } })
    fireEvent.blur(nameInput)
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    render(<UseFormDemo />)
    
    const emailInput = screen.getByLabelText('Email')
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('allows submission when form is valid', async () => {
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UseFormDemo />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.blur(nameInput)
    fireEvent.blur(emailInput)
    
    fireEvent.click(submitButton)
    
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Form submitted:',
      expect.objectContaining({
        firstName: 'John Doe',
        email: 'john.doe@example.com'
      })
    )
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(JSON.stringify({
        firstName: 'John Doe',
        email: 'john.doe@example.com'
      }, null, 2))
    })
    
    vi.clearAllMocks()
  })

  it('displays learning points', () => {
    render(<UseFormDemo />)
    
    expect(screen.getByText('Learning Points:')).toBeInTheDocument()
    expect(screen.getByText(/useForm\(\)/)).toBeInTheDocument()
    expect(screen.getByText(/register\(\)/)).toBeInTheDocument()
    expect(screen.getByText(/handleSubmit\(\)/)).toBeInTheDocument()
    expect(screen.getByText(/formState/)).toBeInTheDocument()
  })

  it('shows success message after submission', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UseFormDemo />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument()
    })
    
    vi.clearAllMocks()
  })
})