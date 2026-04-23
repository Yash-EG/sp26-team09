const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`)
  if (res.status === 204) return null
  return res.json()
}

export const createBand = (data) =>
  request('/bands', { method: 'POST', body: JSON.stringify(data) })

export const getBandById = (id) => request(`/bands/${id}`)

export const updateBand = (id, data) =>
  request(`/bands/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const getBandByEmail = (email) => request(`/bands/email/${encodeURIComponent(email)}`)

export const getShowsByBand = (bandId) => request(`/shows/band/${bandId}`)

export const getAllShows = () => request('/shows')

export const createShow = (data) =>
  request('/shows', { method: 'POST', body: JSON.stringify(data) })

export const updateShow = (id, data) =>
  request(`/shows/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteShow = (id) =>
  request(`/shows/${id}`, { method: 'DELETE' })
