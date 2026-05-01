import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('bandId') || !!localStorage.getItem('customerId')
  return isLoggedIn ? children : <Navigate to="/" replace />
}
