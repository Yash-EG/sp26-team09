import { Link } from 'react-router-dom'

export default function Navbar() {
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Profile', path: '/profile' },
    { name: 'Availability', path: '/availability' },
  ]

  return (
    <div>
      {/* --- TOP BAR (Logo + Links) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">
        
        {/* Left pill - Logo */}
        <div className="bg-[#111111] backdrop-blur-md rounded-br-4xl px-2 py-3 pointer-events-auto">
          <Link to="/" className="text-white font-bold text-3xl tracking-widest uppercase">
            SceneScout
          </Link>
        </div>

        {/* Right pill - Nav Links */}
        <div className="bg-[#111111] backdrop-blur-md rounded-bl-4xl px-8 py-3 flex items-center gap-8 pointer-events-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xl tracking-widest uppercase text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed top-0 left-0 z-50">
        <div className="w-2 h-screen bg-[#111111] rounded-full backdrop-blur-sm"></div>
      </div>

      <div className="fixed top-0 right-0 z-50">
        <div className="w-2 h-screen bg-[#111111] rounded-full backdrop-blur-sm"></div>
      </div>

      {/* --- BOTTOM BAR (Logo + Links) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">

        {/* Left pill - System Online */}
        <div className="bg-[#111111] backdrop-blur-md rounded-tr-4xl px-6 py-3 flex items-center gap-3 pointer-events-auto">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Online</span>
        </div>

        {/* Right pill - Year */}
        <div className="bg-[#111111] backdrop-blur-md rounded-tl-4xl px-8 py-3 pointer-events-auto">
          <span className="text-xl tracking-widest uppercase text-gray-300">2026</span>
        </div>

      </div>
      <div className="fixed top-0 left-0 right-0 bg-[#111111] h-2 z-40"></div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] h-2 z-40"></div>

    </div>
  )
}