import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Availability from './pages/Availability'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/availability" element={<Availability />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
