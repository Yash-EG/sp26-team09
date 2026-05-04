const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

// Customer endpoints also go through the Vite proxy (/api → localhost:8080)
async function customerRequest(path, options = {}) {
  return request(path, options)
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

export const deleteBand = (id) =>
  request(`/bands/${id}`, { method: 'DELETE' })

export const getAllPosts = () => request('/posts')

export const getPostsByBand = (bandId) => request(`/posts/band/${bandId}`)

export const createPost = (data) =>
  request('/posts', { method: 'POST', body: JSON.stringify(data) })

export const deletePost = (id) =>
  request(`/posts/${id}`, { method: 'DELETE' })

export const likePost = (id) =>
  request(`/posts/${id}/like`, { method: 'POST' })

export const unlikePost = (id) =>
  request(`/posts/${id}/like`, { method: 'DELETE' })

export const getPostComments = (id) =>
  request(`/posts/${id}/comments`)

export const addPostComment = (id, customerId, authorName, text) =>
  request(`/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ customerId, authorName, text }) })

// Customer API
export const createCustomer = (data) =>
  customerRequest('/customers', { method: 'POST', body: JSON.stringify(data) })

export const getCustomerByEmail = (email) =>
  customerRequest(`/customers/email/${encodeURIComponent(email)}`)

export const getCustomerById = (id) => customerRequest(`/customers/${id}`)

export const updateCustomer = (id, data) =>
  customerRequest(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteCustomer = (id) =>
  customerRequest(`/customers/${id}`, { method: 'DELETE' })

export const getInterestedShows = (customerId) =>
  customerRequest(`/customers/${customerId}/interested`)

export const addInterestedShow = (customerId, showId) =>
  customerRequest(`/customers/${customerId}/interested/${showId}`, { method: 'POST' })

export const removeInterestedShow = (customerId, showId) =>
  customerRequest(`/customers/${customerId}/interested/${showId}`, { method: 'DELETE' })

export const getFollowedBands = (customerId) =>
  customerRequest(`/customers/${customerId}/following`)

export const followBand = (customerId, bandId) =>
  customerRequest(`/customers/${customerId}/follow/${bandId}`, { method: 'POST' })

export const unfollowBand = (customerId, bandId) =>
  customerRequest(`/customers/${customerId}/follow/${bandId}`, { method: 'DELETE' })

export const getBandFollowerCount = (bandId) => request(`/bands/${bandId}/followers/count`)

export const getShowInterestedCount = (showId) => request(`/shows/${showId}/interested/count`)

export const getAllGenres = () => customerRequest('/genres')

export const updateCustomerGenres = (customerId, genreIds) =>
  customerRequest(`/customers/${customerId}/genres`, { method: 'PUT', body: JSON.stringify(genreIds) })
