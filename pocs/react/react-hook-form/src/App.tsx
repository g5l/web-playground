import React from 'react'
import './App.css'
import FormStateDemo from './poc/formState/FormStateDemo'
import './poc/formState/FormStateDemo.css'
import UseFormDemo from './poc/useForm/UseFormDemo'
import './poc/useForm/UseFormDemo.css'

function App() {
  return (
    <div className="App">
      <h1>React Hook Form POCs</h1>
      
      <div className="poc-container">
        <div className="poc-item">
          <UseFormDemo />
        </div>
        
        <div className="poc-item">
          <FormStateDemo />
        </div>
      </div>
    </div>
  )
}

export default App
