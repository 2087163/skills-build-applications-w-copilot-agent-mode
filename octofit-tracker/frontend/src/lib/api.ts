export function getApiEndpoint(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const fallbackBase = 'http://localhost:8000/api'

  if (typeof window === 'undefined') {
    return `${fallbackBase}${normalizedPath}`
  }

  const hostname = window.location.hostname

  if (hostname.includes('app.github.dev')) {
    const backendHost = hostname.replace(/-5173|-5174|-5175/, '-8000')
    return `https://${backendHost}${normalizedPath}`
  }

  return `${fallbackBase}${normalizedPath}`
}
