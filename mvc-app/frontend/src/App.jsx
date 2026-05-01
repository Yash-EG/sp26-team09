import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import Posts from './pages/Posts'
import Bookings from './pages/Bookings'
import Availability from './pages/Availability'
import ShowDetails from './pages/ShowDetails'
import BandPage from './pages/BandPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/stats"     element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/posts"     element={<ProtectedRoute><Posts /></ProtectedRoute>} />
          <Route path="/feed"      element={<Feed />} />
          <Route path="/bookings"  element={<Bookings />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/show/:id"  element={<ShowDetails />} />
          <Route path="/band/:id"  element={<BandPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
