const now = Date.now()

function makeToken(i) {
  return `A-${100 + i}`
}

export const initialQueue = [
  { token: makeToken(0), name: 'Michael Chen', status: 'Skipped', priority: 'Normal', joined: now - 1000 * 60 * 16 },
  { token: makeToken(1), name: 'Emma Wilson', status: 'Serving', priority: 'High', joined: now - 1000 * 60 * 13 },
  { token: makeToken(2), name: 'David Lee', status: 'Waiting', priority: 'Normal', joined: now - 1000 * 60 * 11 },
  { token: makeToken(3), name: 'Lisa Brown', status: 'Waiting', priority: 'Normal', joined: now - 1000 * 60 * 9 },
  { token: makeToken(4), name: 'James Taylor', status: 'Waiting', priority: 'Emergency', joined: now - 1000 * 60 * 6 },
]

export function generateToken() {
  const n = Math.floor(Math.random() * 900) + 100
  return `A-${n}`
}

export default {
  initialQueue,
  generateToken,
}
