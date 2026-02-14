import MapBackground from '../components/MapBackround'
import Navbar from '../components/Navbar'

export default function Landing() {
  return (
    <div className="relative w-full h-screen">
      
      {/* 3D Map as background */}
      <MapBackground />

      {/* Content on top */}
      <div className="relative z-10">
        <Navbar />
        {/* rest of your landing content */}
      </div>

    </div>
  )
}