import { useEffect, useMemo, useState } from 'react'

function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const normalizedResource = resource.replace(/^\/+/, '')

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${normalizedResource}/`
  }

  return `http://localhost:8000/api/${normalizedResource}/`
}

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  return payload ? [payload] : []
}

export default function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const apiUrl = useMemo(() => getApiUrl('workouts'), [])

  useEffect(() => {
    let isMounted = true

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((payload) => {
        if (isMounted) {
          setItems(normalizeItems(payload))
          setError('')
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          setError(fetchError.message)
        }
      })

    return () => {
      isMounted = false
    }
  }, [apiUrl])

  return (
    <section className="card">
      <h2>Workouts</h2>
      <p className="text-muted">API endpoint: {apiUrl}</p>
      {error ? (
        <p className="text-danger">Unable to load workouts: {error}</p>
      ) : (
        <ul className="list-group mt-3">
          {items.length === 0 ? (
            <li className="list-group-item">No workouts yet.</li>
          ) : (
            items.map((item, index) => (
              <li key={item.id || item._id || `${item.name}-${index}`} className="list-group-item">
                <strong>{item.name || 'Workout'}</strong> — {item.type || 'fitness'} • {item.duration || 0} min
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  )
}
