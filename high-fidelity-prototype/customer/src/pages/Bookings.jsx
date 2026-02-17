//imports react hook for nav and necessary components
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'

//main component bookings
export default function Bookings() {
  //call to nav hook
  const navigate = useNavigate();
  //array with all of the shows the user has served to their feed
  const savedShows = [
    {
      id: 1,
      band: 'Knocked Loose',
      venue: 'The Ritz',
      date: 'Tonight 8PM',
      genre: 'Metal',
      description: 'You won\'t go before you\'re supposed to.',
      price: '$20',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Knocked_Loose_2024.jpg'
    },
    {
      id: 2,
      band: 'Fake Happy - A Tribute To Paramore',
      venue: 'Hangar 1819',
      date: 'Saturday, Feb 21 6:30PM',
      genre: 'Electronic',
      description: '30 Is Dead Get Back!',
      price: '$30',
      image: 'https://fanimal-event-images-2.s3-us-west-2.amazonaws.com/cover-photo--926930375381591235.jpg'
    },
    {
      id: 3,
      band: 'Bring Me the Horizon',
      venue: 'Greensboro Coliseum',
      date: 'Saturday 7PM',
      genre: 'Metal',
      description: 'BRING ME THE HORIZON',
      price: '$20',
      image: 'https://blangl33.wordpress.com/wp-content/uploads/2015/01/bring-me-the-horizon-drown.jpg'
    },
  ];

  return (
    //outer layer for positioning
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        
        <Navbar />
        
        <div className="px-6 pt-28 pb-12 max-w-5xl mx-auto">
          <h1 className="text-white font-bold text-4xl tracking-widest uppercase mb-8">My Shows</h1>
          
          <div className="space-y-6">

            {savedShows.map(show => (
              <article key={show.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:bg-white/15 transition-all">
                {/* Show Image and change it based on link src*/}
                <div className="w-full h-64 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
                  <img src={show.image} alt={show.band} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                      {show.genre}
                    </span>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">{show.band[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl">{show.band}</h3>
                      <p className="text-white/70 text-sm">{show.venue} • {show.date}</p>
                    </div>
                    <span className="text-purple-400 font-bold text-lg">{show.price}</span>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{show.description}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(`/show/${show.id}`)}
                      className="flex-1 bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                    >
                      View Details
                    </button>
                    <button className="bg-red-600/60 hover:bg-red-600 backdrop-blur-sm border border-red-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full transition-all">
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}