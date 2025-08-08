import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WatchDemo from './WatchDemo'

describe('WatchDemo', () => {
  it('renders form elements', () => {
    render(<WatchDemo />)
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Bio')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get values/i })).toBeInTheDocument()
  })

  it('displays form state sections', () => {
    render(<WatchDemo />)
    
    expect(screen.getByText('Form State Management')).toBeInTheDocument()
    expect(screen.getByText('Watched Values (Real-time)')).toBeInTheDocument()
    expect(screen.getByText('Specific Watched Fields')).toBeInTheDocument()
    expect(screen.getByText('Form Status')).toBeInTheDocument()
    expect(screen.getByText('Errors')).toBeInTheDocument()
    expect(screen.getByText('Learning Points:')).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(<WatchDemo />)
    
    // Focus and blur fields to trigger validation
    const usernameInput = screen.getByLabelText('Username')
    const emailInput = screen.getByLabelText('Email')
    const ageInput = screen.getByLabelText('Age')
    
    fireEvent.focus(usernameInput)
    fireEvent.blur(usernameInput)
    
    fireEvent.focus(emailInput)
    fireEvent.blur(emailInput)
    
    fireEvent.focus(ageInput)
    fireEvent.blur(ageInput)
    
    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Age is required')).toBeInTheDocument()
    })
  })

  it('updates watched values when form inputs change', async () => {
    render(<WatchDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    await waitFor(() => {
      // Check if the username appears in the watched values section
      const preElements = screen.getAllByText(/testuser/i)
      expect(preElements.length).toBeGreaterThan(0)
      
      // Check if the specific watched field is updated
      expect(screen.getByText(/Username: testuser/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for minimum username length', async () => {
    render(<WatchDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    
    fireEvent.change(usernameInput, { target: { value: 'ab' } })
    fireEvent.blur(usernameInput)
    
    await waitFor(() => {
      expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    render(<WatchDemo />)
    
    const emailInput = screen.getByLabelText('Email')
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('shows validation error for age constraints', async () => {
    render(<WatchDemo />)
    
    const ageInput = screen.getByLabelText('Age')
    
    fireEvent.change(ageInput, { target: { value: '10' } })
    fireEvent.blur(ageInput)
    
    await waitFor(() => {
      expect(screen.getByText('You must be at least 18 years old')).toBeInTheDocument()
    })
  })

  it('handles form submission with valid data', async () => {
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<WatchDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    const emailInput = screen.getByLabelText('Email')
    const ageInput = screen.getByLabelText('Age')
    const bioInput = screen.getByLabelText('Bio')
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(ageInput, { target: { value: '25' } })
    fireEvent.change(bioInput, { target: { value: 'This is a test bio' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          username: 'testuser',
          email: 'test@example.com',
          age: 25,
          bio: 'This is a test bio'
        })
      )
      
      expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining('testuser'))
    })
    
    vi.clearAllMocks()
  })

  it('handles getValues button click', async () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<WatchDemo />)
    
    const usernameInput = screen.getByLabelText('Username')
    const getValuesButton = screen.getByRole('button', { name: /get values/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(getValuesButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining('testuser'))
    })
    
    vi.clearAllMocks()
  })

  it('displays dirty state correctly', async () => {
    render(<WatchDemo />)
    
    // Initially, form should not be dirty
    expect(screen.getByText('Dirty: No')).toBeInTheDocument()
    
    // Change a field to make the form dirty
    const usernameInput = screen.getByLabelText('Username')
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    await waitFor(() => {
      expect(screen.getByText('Dirty: Yes')).toBeInTheDocument()
    })
  })
})