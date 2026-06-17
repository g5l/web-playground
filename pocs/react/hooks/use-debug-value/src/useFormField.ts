import { useDebugValue, useState } from 'react'

interface FormField {
  value: string
  isDirty: boolean
  isValid: boolean
}

export function useFormField(validate: (v: string) => boolean) {
  const [value, setValue] = useState('')
  const isDirty = value.length > 0
  const isValid = validate(value)

  const field: FormField = { value, isDirty, isValid }

  // Formatter only runs when DevTools is open, so expensive computations
  // can safely go here without affecting production performance.
  useDebugValue(field, ({ isDirty, isValid }) => {
    if (!isDirty) return 'pristine'
    return isValid ? 'valid' : 'invalid'
  })

  return { ...field, setValue }
}
