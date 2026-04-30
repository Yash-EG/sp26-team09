import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useTheme } from '../ThemeContext'

const NAV = 'bg-[#ede8e2] dark:bg-[#111111]'

const authLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Feed',      path: '/feed' },
  { name: 'Posts',     path: '/posts' },
  { name: 'Stats',     path: '/stats' },
  { name: 'Profile',   path: '/profile' },
]

const guestLinks = [
  { name: 'Feed', path: '/feed' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isLoggedIn = !!localStorage.getItem('bandId')

  const links = isLoggedIn ? authLinks : guestLinks

  function handleLogout() {
    localStorage.removeItem('bandId')
    localStorage.removeItem('bandName')
    navigate('/')
  }

  const linkClass = 'text-xl tracking-widest uppercase text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">

        <div className={`${NAV} backdrop-blur-md rounded-br-4xl px-2 py-3 pointer-events-auto flex items-center gap-3`}>
          <Link to="/" className="text-gray-900 dark:text-white font-bold text-3xl tracking-widest uppercase">
            SceneScout
          </Link>
        </div>

        <div className={`hidden md:flex ${NAV} backdrop-blur-md rounded-bl-3xl px-8 py-3 items-center gap-8 pointer-events-auto`}>
          {searchOpen ? (
            <SearchBar onClose={() => setSearchOpen(false)} />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          )}

          {links.map((link) => (
            <Link key={link.name} to={link.path} className={linkClass}>
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Log out"
              className="text-gray-400 dark:text-gray-500 hover:text-red-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/?login=1" className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 text-gray-700 dark:text-white text-sm tracking-widest uppercase px-5 py-2.5 rounded-full transition-all">
                Log In
              </Link>
              <Link to="/?signup=1" className="bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-sm tracking-widest uppercase px-5 py-2.5 rounded-full transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className={`md:hidden ${NAV} backdrop-blur-md rounded-bl-4xl px-6 py-3 pointer-events-auto`}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none"
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
          <div className={`${NAV} backdrop-blur-md rounded-bl-4xl pt-16 pb-6 px-8 flex flex-col gap-6 items-end pointer-events-auto`}>
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-xl tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/?login=1" onClick={() => setMenuOpen(false)} className={linkClass}>Log In</Link>
                <Link to="/?signup=1" onClick={() => setMenuOpen(false)} className="text-xl tracking-widest uppercase text-purple-500 dark:text-purple-400 hover:text-purple-600 transition-colors">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 z-50">
        <div className={`w-2 h-screen ${NAV} rounded-full backdrop-blur-sm`}></div>
      </div>
      <div className="fixed top-0 right-0 z-50">
        <div className={`w-2 h-screen ${NAV} rounded-full backdrop-blur-sm`}></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none">
        <div className={`${NAV} backdrop-blur-md rounded-tr-4xl px-6 py-3 flex items-center gap-3 pointer-events-auto`}>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">System Online</span>
        </div>

        <div className={`${NAV} backdrop-blur-md rounded-tl-4xl px-6 py-2.5 pointer-events-auto`}>
          <button onClick={toggle} className="flex items-center gap-2" aria-label="Toggle theme">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm8-4a1 1 0 110 2h-1a1 1 0 110-2h1zM5 13a1 1 0 110 2H4a1 1 0 110-2h1zm14.07-7.07a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0zM7.05 16.95a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zm12.02 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 011.41-1.41zM5.34 5.34l.71.71A1 1 0 114.63 7.46l-.71-.71a1 1 0 011.42-1.41zM12 19a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"/>
            </svg>
            <div className={`relative w-9 h-5 rounded-full transition-colors ${isDark ? 'bg-purple-600' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 ${NAV} h-2 z-40`}></div>
      <div className={`fixed bottom-0 left-0 right-0 ${NAV} h-2 z-40`}></div>
    </div>
  )
}
