import { useState } from 'react'
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import LoginCard from '../components/LoginCard'
import SignupCard from '../components/SignupCard'
import logo from '../assets/logo.png'

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="relative w-full h-screen">

      {/* Layer 1 - Map */}
      <MapBackground />

      {/* Layer 2 - Cloud overlay */}
      <CloudLayer />

      {/* Layer 3 - Content */}
      <div className="relative z-20">
        <Navbar />
        {/* rest of your landing content */}
      </div>

<div className='backdrop-blur bg-white/10 border border-white/20 rounded-3xl fixed bottom-18 left-10 z-30 w-108 h-80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden'>
  
  <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none' />

  <div className='flex items-start justify-between'>
    
    <div className='w-40 h-40 rounded-full shadow-[0_0_100px_rgba(168,85,247,0.15)] bg-[rgba(168,85,247,0.15)] flex items-center justify-center overflow-hidden'>
      <img src={logo} alt="Logo" className='w-full h-full object-cover rotate-3' />
    </div>

    <div className='flex flex-col  h-40 justify-center p-2 gap-2'>
      <button onClick={() => setShowSignup(true)} className='bg-purple-600/60 hover:bg-purple-600 w-40 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-6 py-2 rounded-full transition-all'>
        Sign Up
      </button>
      <button onClick={() => setShowLogin(true)} className='bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs tracking-widest uppercase px-6 py-2 rounded-full transition-all'>
        Log In
      </button>
    </div>

  </div>

  <div className='absolute bottom-6 left-6 right-6'>
    <p className='text-white/50 text-xs tracking-widest uppercase mb-2'>
      Live Music • Local Artists • Your City
    </p>
    <h1 className='text-white font-black text-3xl leading-tight uppercase'>
      Find Local <br />
      <span className='text-purple-400'>Live Shows</span>
    </h1>
  </div>
</div>

{showLogin && <LoginCard onClose={() => setShowLogin(false)} />}
{showSignup && <SignupCard onClose={() => setShowSignup(false)} />}

    </div>
  )
}