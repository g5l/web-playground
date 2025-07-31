import React from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import FormStateDemo from '../poc/formState/FormStateDemo'
import '../poc/formState/FormStateDemo.css'

interface FormData {
  firstName: string
  email: string
}

function App() {
  return (
    <div className="App">
      <h1>React Hook Form POCs</h1>
      <FormStateDemo />
    </div>
  )
}

export default App
