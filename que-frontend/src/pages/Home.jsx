import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateToken } from '../data/mockQueue'
import './pages.css'
import UserIcon from '../components/UserIcon'

export default function Home() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function join(e) {
    e.preventDefault()
    const token = generateToken()
    navigate(`/status/${encodeURIComponent(token)}`, { state: { name } })
  }

  return (
    <div className="home-viewport">
      <div className="home-card">
        <div className="home-icon"><UserIcon size={40} /></div>
        <h1 className="home-title">Smart Queue System</h1>
        <p className="home-sub">Join the queue and track your status in real-time</p>

        <form className="home-form" onSubmit={join}>
          <label className="field-label">Your Name</label>
          <input
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button className="home-cta" disabled={!name}>Stand in Queue</button>
        </form>
      </div>
    </div>
  )
}
