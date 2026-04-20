import { useState, useEffect } from 'react'
import './pages.css'

const INITIAL_QUEUE = [
  { token: 'A-100', name: 'Michael Chen',  status: 'Serving',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 27 },
  { token: 'A-101', name: 'Emma Wilson',   status: 'Waiting',  priority: 'High',      joined: Date.now() - 1000 * 60 * 24 },
  { token: 'A-102', name: 'David Lee',     status: 'Waiting',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 22 },
  { token: 'A-103', name: 'Lisa Brown',    status: 'Waiting',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 20 },
  { token: 'A-104', name: 'James Taylor',  status: 'Waiting',  priority: 'Emergency', joined: Date.now() - 1000 * 60 * 17 },
]

function getSortedWaiting(queue) {
  const order = { Emergency: 0, High: 1, Normal: 2 }
  return queue
    .filter((q) => q.status === 'Waiting')
    .sort((a, b) => order[a.priority] - order[b.priority] || a.joined - b.joined)
}

export default function Display() {
  const [queue] = useState(INITIAL_QUEUE)
  const [refreshing, setRefreshing] = useState(false)

  const serving = queue.find((q) => q.status === 'Serving')
  const nextUp = getSortedWaiting(queue).slice(0, 4)
  const waitingCount = queue.filter((q) => q.status === 'Waiting').length

  // Simulate refresh indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true)
      setTimeout(() => setRefreshing(false), 1000)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100svh',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 100px',
      boxSizing: 'border-box',
    }}>

      {/* Title */}
      <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 700, margin: '0 0 8px', textAlign: 'center' }}>
        Queue Management System
      </h1>
      <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 40px', textAlign: 'center' }}>
        Please be ready when your number is called
      </p>

      {/* Now Serving */}
      <div style={{
        width: '100%', maxWidth: 780,
        background: '#1e293b',
        borderRadius: 16,
        padding: '28px 28px 32px',
        marginBottom: 24,
        boxSizing: 'border-box',
      }}>
        <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600, textAlign: 'center', margin: '0 0 20px', letterSpacing: '0.03em' }}>
          Now Serving
        </p>
        <div style={{
          background: '#f59e0b',
          borderRadius: 12,
          padding: '40px 28px 28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px', marginBottom: 16 }}>
            {serving?.token || '—'}
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {serving?.name || ''}
          </div>
        </div>
      </div>

      {/* Next in Queue */}
      <div style={{
        width: '100%', maxWidth: 780,
        background: '#1e293b',
        borderRadius: 16,
        padding: '28px 28px 32px',
        boxSizing: 'border-box',
      }}>
        <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600, textAlign: 'center', margin: '0 0 20px', letterSpacing: '0.03em' }}>
          Next in Queue
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {nextUp.map((p) => (
            <div key={p.token} style={{
              background: '#2d3f55',
              borderRadius: 12,
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 10, lineHeight: 1.2 }}>
                {p.token}
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{p.name}</div>
            </div>
          ))}
          {/* Fill empty slots */}
          {Array.from({ length: Math.max(0, 4 - nextUp.length) }).map((_, i) => (
            <div key={`empty-${i}`} style={{
              background: '#1a2b3c',
              borderRadius: 12,
              padding: '20px 16px',
              opacity: 0.4,
            }} />
          ))}
        </div>
      </div>

      {/* Refresh indicator */}
      {refreshing && (
        <div style={{
          position: 'fixed', bottom: 60,
          background: '#1e293b',
          color: '#94a3b8',
          borderRadius: 999,
          padding: '8px 18px',
          fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          ✓ Refreshing...
        </div>
      )}

      {/* Bottom status bar */}
      <div style={{
        position: 'fixed', bottom: 16,
        background: '#1e293b',
        borderRadius: 999,
        padding: '10px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        fontSize: 14, color: '#e2e8f0',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          Live Updates
        </span>
        <span style={{ width: 1, height: 16, background: '#334155' }} />
        <span>People in Queue: <strong>{waitingCount}</strong></span>
      </div>

    </div>
  )
}