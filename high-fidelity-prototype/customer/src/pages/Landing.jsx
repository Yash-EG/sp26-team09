//nav hooks and necessary components
import { Link } from 'react-router-dom'
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
//main component for landing page
export default function Landing() {
  return (
    <div className="relative w-full h-screen">

      {/* Layer 1 - Map */}
      <MapBackground showResetButton={true} />

      {/* Layer 2 - Cloud overlay */}
      <CloudLayer />

      {/* Layer 3 - Content */}
      <div className="relative z-20">
        <Navbar />
        {/* rest of your landing content */}
      </div>

<div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl fixed bottom-18 left-10 z-30 w-108 h-80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden'>
  
  <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none' />

  <div className='flex items-start justify-between'>
    
    <div className='w-14 h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center'>
      <span className='text-white text-xl font-bold'>S</span>
    </div>

    <div className='flex flex-col  h-40 justify-center p-2 gap-2'>
      <Link to="/signup">
        <button className='bg-purple-600/60 hover:bg-purple-600 w-40 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-6 py-2 rounded-full transition-all'>
          Sign Up
        </button>
      </Link>
      <Link to="/login">
        <button className='bg-white/10 hover:bg-white/20 w-40 backdrop-blur-sm border border-white/20 text-white text-xs tracking-widest uppercase px-6 py-2 rounded-full transition-all'>
          Log In
        </button>
      </Link>
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

    </div>
  )
}