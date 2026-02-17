import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Bookings from './pages/Bookings'
import Feed from './pages/Feed'
import ShowDetails from './pages/ShowDetails'
import Signup from './pages/Signup'
import Login from './pages/Login'


import Navbar from './components/Navbar'
import MapBackground from './components/MapBackround'
import CloudLayer from './components/CloudLayer'  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
