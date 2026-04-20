import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <header className="q-header">
      <div className="q-header-inner">
        <div className="brand">
          <div className="logo">🔁</div>
          <div>
            <div className="title">Queue Management</div>
            <div className="subtitle">Smart Queue System</div>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/display">Display</Link>
        </nav>
      </div>
    </header>
  )
}
