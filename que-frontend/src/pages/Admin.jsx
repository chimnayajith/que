import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'
import { Users, Home, Monitor, TriangleAlert, Zap, ArrowUp, ArrowDown, SkipForward, PhoneCall, Settings, Play } from 'lucide-react'

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000)
  return `${mins} min ago`
}

function getPosition(queue, token) {
  const waiting = queue.filter((q) => q.status === 'Waiting')
  // Emergency first, then High, then Normal — sorted by priority then joined
  const sorted = [...waiting].sort((a, b) => {
    const order = { Emergency: 0, High: 1, Normal: 2 }
    return order[a.priority] - order[b.priority] || a.joined - b.joined
  })
  const idx = sorted.findIndex((q) => q.token === token)
  return idx !== -1 ? idx + 1 : null
}

export default function Admin() {
  const navigate = useNavigate()
  const [queue, setQueue] = useState([
    { token: 'A-100', name: 'Michael Chen',  status: 'Serving',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 27 },
    { token: 'A-101', name: 'Emma Wilson',   status: 'Waiting',  priority: 'High',      joined: Date.now() - 1000 * 60 * 24 },
    { token: 'A-102', name: 'David Lee',     status: 'Waiting',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 22 },
    { token: 'A-103', name: 'Lisa Brown',    status: 'Waiting',  priority: 'Normal',    joined: Date.now() - 1000 * 60 * 20 },
    { token: 'A-104', name: 'James Taylor',  status: 'Waiting',  priority: 'Emergency', joined: Date.now() - 1000 * 60 * 17 },
  ])
  const [selected, setSelected] = useState(null)

  const serving = queue.find((q) => q.status === 'Serving')

  function callNext() {
    setQueue((q) => {
      const waiting = [...q].filter((x) => x.status === 'Waiting')
      const sorted = waiting.sort((a, b) => {
        const order = { Emergency: 0, High: 1, Normal: 2 }
        return order[a.priority] - order[b.priority] || a.joined - b.joined
      })
      if (sorted.length === 0) return q
      const next = sorted[0]
      return q.map((item) => {
        if (item.token === serving?.token) return { ...item, status: 'Completed' }
        if (item.token === next.token) return { ...item, status: 'Serving' }
        return item
      })
    })
  }

  function skipCurrent() {
    if (!serving) return
    setQueue((q) =>
      q.map((item) =>
        item.token === serving.token ? { ...item, status: 'Completed' } : item
      )
    )
  }

  function changePriority(token, priority) {
    setQueue((q) =>
      q.map((item) => (item.token === token ? { ...item, priority } : item))
    )
    setSelected((s) => s ? { ...s, priority } : s)
  }

  const waitingCount = queue.filter((q) => q.status === 'Waiting').length

  return (
    <div style={{ minHeight: '100svh', background: '#f8f9fb', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#0f172a', display: 'grid', placeItems: 'center' }}>
            <Users size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Queue Management</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{waitingCount} people in queue</div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Home size={15} /> Home
          </button>
          <button onClick={() => navigate('/display')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Monitor size={15} /> Display
          </button>
        </nav>
      </header>

      <div style={{ display: 'flex', flex: 1, gap: 0 }}>

        {/* Table */}
        <div style={{ flex: 1, padding: '24px 24px 24px 24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.06)', border: '1px solid #e5e7eb' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                {['TOKEN', 'NAME', 'STATUS', 'PRIORITY', 'TIME JOINED', 'POSITION'].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queue.map((u) => {
                const isServing = u.status === 'Serving'
                const isEmergency = u.priority === 'Emergency'
                const isSelected = selected?.token === u.token
                const pos = getPosition(queue, u.token)
                return (
                  <tr
                    key={u.token}
                    onClick={() => setSelected(u)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      background: isSelected ? '#f0f9ff' : isServing ? '#fffbeb' : '#fff',
                      cursor: 'pointer',
                      borderLeft: isEmergency ? '3px solid #ef4444' : isServing ? '3px solid #f59e0b' : '3px solid transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: isServing ? '#f59e0b' : '#0f172a' }}>{u.token}</td>
                    <td style={{ padding: '14px 20px', fontSize: 14, color: '#0f172a' }}>{u.name}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                        background: u.status === 'Serving' ? '#f59e0b' : u.status === 'Completed' ? '#e2e8f0' : '#334155',
                        color: u.status === 'Completed' ? '#64748b' : '#fff'
                      }}>{u.status}</span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                        background: u.priority === 'Emergency' ? '#ef4444' : u.priority === 'High' ? '#f59e0b' : '#334155',
                        color: '#fff'
                      }}>
                        {u.priority === 'Emergency' ? '⚡ ' : u.priority === 'High' ? '▲ ' : ''}{u.priority}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748b' }}>{timeAgo(u.joined)}</td>
                    <td style={{ padding: '14px 20px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
                      {pos ? `#${pos}` : '–'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Sidebar */}
        <aside style={{ width: 280, background: '#fff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>

          {/* Action Panel */}
          <div style={{ background: '#0f172a', padding: '20px 20px 24px', color: '#fff' }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8', margin: '0 0 14px' }}>Action Panel</p>
            <button onClick={callNext} style={{ width: '100%', padding: '11px', borderRadius: 8, border: '1.5px solid #fff', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Play size={15} /> Call Next
            </button>
            <button onClick={skipCurrent} style={{ width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <SkipForward size={15} /> Skip Current
            </button>
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.07)', borderRadius: 8 }}>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 4px' }}>Currently Serving</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>{serving?.token || '–'}</p>
            </div>
          </div>

          {/* User Details */}
          {selected ? (
            <div style={{ padding: '20px', flex: 1, textAlign: 'left'}}>
              <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.08em', color: '#30363d', margin: '0 0 16px' }}>USER DETAILS</p>

              <p style={{ fontSize: 13, fontWeight: 500, color: '#30363d', margin: '0 0 2px' }}>Token</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>{selected.token}</p>

              <p style={{ fontSize: 13, fontWeight: 500, color: '#30363d', margin: '0 0 2px' }}>Name</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>{selected.name}</p>

              <p style={{ fontSize: 13, fontWeight: 500, color: '#30363d', margin: '0 0 6px' }}>Status</p>
              <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#334155', color: '#fff', marginBottom: 14, display: 'inline-block' }}>
                {selected.status}
              </span>

              <p style={{ fontSize: 13, fontWeight: 500, color: '#30363d', margin: '14px 0 8px' }}>Priority</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Normal', 'High', 'Emergency'].map((p) => (
                  <button key={p} onClick={() => changePriority(selected.token, p)} style={{
                    padding: '9px 14px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 13,
                    textAlign: 'left',
                    background: selected.priority === p
                      ? '#0f172a'
                      : p === 'Emergency' ? '#fff5f5'
                      : p === 'High' ? '#fffbeb'
                      : '#f8fafc',
                    color: selected.priority === p
                      ? '#fff'
                      : p === 'Emergency' ? '#ef4444'
                      : p === 'High' ? '#f59e0b'
                      : '#475569',
                  }}>
                   {p === 'High' ? <TriangleAlert size={13} /> : p === 'Emergency' ? <Zap size={13} /> : null} {p}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#30363d', margin: '16px 0 2px' }}>Join Time</p>
              <p style={{ fontSize: 14, color: '#0f172a', margin: 0 }}>{timeAgo(selected.joined)}</p>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: 10 }}>
              <Settings size={32} color="#cbd5e1" />
              <p style={{ fontSize: 13, margin: 0 }}>Select a user to view details</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}