import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('/api/greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    const data = await response.json()
    setMessage(data.message)
  }

  return (
    <div className="container">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="input"
        />
        <button type="submit" className="button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
      <a href="/posts" className="link">View Posts</a>
    </div>
  )
}
