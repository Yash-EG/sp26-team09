import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Feed', path: '/feed' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Profile', path: '/profile' },
    { name: 'Availability', path: '/availability' },
  ]

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">

        <div className="bg-[#111111] backdrop-blur-md rounded-br-4xl px-2 py-3 pointer-events-auto flex items-center gap-3">
          <Link to="/" className="text-white font-bold text-3xl tracking-widest uppercase">
            SceneScout
          </Link>
          
        </div>

        <div className="hidden md:flex bg-[#111111] backdrop-blur-md rounded-bl-4xl px-8 py-3 items-center gap-8 pointer-events-auto">
          {searchOpen ? (
            <SearchBar onClose={() => setSearchOpen(false)} />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          )}
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

        <div className="md:hidden bg-[#111111] backdrop-blur-md rounded-bl-4xl px-6 py-3 pointer-events-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
              <rect x="2"    y="2"    width="7" height="7" rx="1.5"/>
              <rect x="10.5" y="2"    width="7" height="7" rx="1.5"/>
              <rect x="19"   y="2"    width="7" height="7" rx="1.5"/>
              <rect x="2"    y="10.5" width="7" height="7" rx="1.5"/>
              <rect x="10.5" y="10.5" width="7" height="7" rx="1.5"/>
              <rect x="19"   y="10.5" width="7" height="7" rx="1.5"/>
              <rect x="2"    y="19"   width="7" height="7" rx="1.5"/>
              <rect x="10.5" y="19"   width="7" height="7" rx="1.5"/>
              <rect x="19"   y="19"   width="7" height="7" rx="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 right-0 z-40 md:hidden">
          <div className="bg-[#111111] backdrop-blur-md rounded-bl-4xl pt-16 pb-6 px-8 flex flex-col gap-6 items-end pointer-events-auto">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-xl tracking-widest uppercase text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 z-50">
        <div className="w-2 h-screen bg-[#111111] rounded-full backdrop-blur-sm"></div>
      </div>

      <div className="fixed top-0 right-0 z-50">
        <div className="w-2 h-screen bg-[#111111] rounded-full backdrop-blur-sm"></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">

        <div className="bg-[#111111] backdrop-blur-md rounded-tr-4xl px-6 py-3 flex items-center gap-3 pointer-events-auto">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Online</span>
        </div>

        <div className="bg-[#111111] backdrop-blur-md rounded-tl-4xl px-8 py-3 pointer-events-auto">
          <span className="text-xl tracking-widest uppercase text-gray-300">2026</span>
        </div>

      </div>

      <div className="fixed top-0 left-0 right-0 bg-[#111111] h-2 z-40"></div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] h-2 z-40"></div>
    </div>
  )
}
