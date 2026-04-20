import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { initialQueue } from '../data/mockQueue'
import './pages.css'

function getQueueData(token) {
  const servingEntry = initialQueue.find((q) => q.status === 'Serving')
  const waitingList = initialQueue.filter((q) => q.status === 'Waiting')

  const entry = initialQueue.find((q) => q.token === token)
  if (!entry) return null

  const isCalled = entry.status === 'Serving'

  // Position among waiting tokens (1-based)
  const positionIndex = waitingList.findIndex((q) => q.token === token)
  const queuePosition = positionIndex !== -1 ? positionIndex + 1 : null

  // Rough estimate: 3 min per person ahead
  const estimatedWait = queuePosition != null ? queuePosition * 3 : null

  return {
    ...entry,
    isCalled,
    queuePosition,
    estimatedWait,
    currentlyServing: servingEntry?.token || '—',
  }
}

export default function Status() {
  const { id } = useParams()
  const loc = useLocation()
  const navigate = useNavigate()

  const token = decodeURIComponent(id || '')
  const data = getQueueData(token)

  const name = loc.state?.name || data?.name || 'Guest'
  const priority = data?.priority || 'Normal'
  const isCalled = data?.isCalled || false

  if (!data) {
    return (
      <div className="page-center">
        <div className="token-card">
          <p className="token-label">Token not found</p>
          <h1 className="token-number">{token}</h1>
        </div>
        <button className="link-back" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    )
  }

  return (
    <div className="page-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 1rem' }}>

      {isCalled && (
        <div className="called-banner">
          <span>&#9432;</span>
          Please proceed to the counter!
        </div>
      )}

      <div className="card-stack">
        <div className="token-card">
          <p className="token-label">Your Token</p>
          <h1 className="token-number">{token}</h1>
          {isCalled ? (
            <span className="badge badge-called">You are being called!</span>
          ) : (
            <span className="badge badge-waiting">Waiting in queue</span>
          )}
          {priority === 'High' && !isCalled && (
            <span className="badge badge-priority">⚠ High Priority</span>
          )}
          {priority === 'Emergency' && !isCalled && (
            <span className="badge badge-emergency">🚨 Emergency</span>
          )}
        </div>

        {!isCalled && (
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">👥 Queue Position</span>
              <strong className="info-value">
                {data.queuePosition != null ? `#${data.queuePosition}` : '—'}
              </strong>
            </div>

            <div className="info-row">
              <span className="info-label">🕐 Estimated Wait</span>
              <strong className="info-value">
                {data.estimatedWait != null ? `${data.estimatedWait} min` : '—'}
              </strong>
            </div>

            <div className="info-row">
              <span className="info-label">Currently Serving</span>
              <strong className="info-value">{data.currentlyServing}</strong>
            </div>

            <div className="info-stay">
              <span>✓</span>
              <div>
                <p className="stay-title">Stay nearby</p>
                <p className="stay-sub">This page will auto-update. You'll see a notification when called.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}