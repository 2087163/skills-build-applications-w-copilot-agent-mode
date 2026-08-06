import { useEffect, useMemo, useState } from 'react'

function getApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api${normalizedPath}`
  }

  return `http://localhost:8000/api${normalizedPath}`
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

export default function Teams() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const apiUrl = useMemo(() => getApiUrl('/teams'), [])

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
      <h2>Teams</h2>
      <p className="text-muted">API endpoint: {apiUrl}</p>
      {error ? (
        <p className="text-danger">Unable to load teams: {error}</p>
      ) : (
        <ul className="list-group mt-3">
          {items.length === 0 ? (
            <li className="list-group-item">No teams yet.</li>
          ) : (
            items.map((item, index) => (
              <li key={item.id || item._id || `${item.name}-${index}`} className="list-group-item">
                <strong>{item.name || 'Team'}</strong> — {item.description || 'New team ready for action'}
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  )
}
