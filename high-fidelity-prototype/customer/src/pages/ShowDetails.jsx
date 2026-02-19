
//imports react hook for nav and necessary components
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround';
import CloudLayer from '../components/CloudLayer';
//main component for show details page
export default function ShowDetails() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const savedShows = JSON.parse(localStorage.getItem('savedShows') || '[]');
    setIsSaved(savedShows.some(show => show.id === parseInt(id)));
  }, [id]);
  //mock show data until we connect to backend
  const mockShows = {
    0: {
      band: 'Linkin Park',
      venue: 'The Roxy',
      date: 'Tomorrow 8 PM',
      genre: 'Nu Metal/Rock',
      price: '$100',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQbR6DUFfTscAAJp_npKAUNgjqhK_Gb2cJ78ZypTh1ocWRlZeCxdF3fZffz3liESG_-ixAdT68erfXVU0dnGXAZ4RStaRN1ct3QJz2Q&s=10',
      fullDescription: 'From Zero - Experience Linkin Park\'s powerful return with their latest album. An electrifying night of rock music featuring their biggest hits and new tracks.',
      lineup: ['Lead Vocals: Emily Armstrong', 'Guitar: Brad Delson', 'Bass: Dave Farrell', 'Drums: Colin Brittain'],
      doors: '7:00 PM',
      showTime: '8:00 PM',
      ageRestriction: '18+',
      venueAddress: '123 Music Street, Greensboro, NC'
    },
    1: {
      band: 'Metallica',
      venue: 'Black Cat',
      date: 'Feb 22, 9 PM',
      genre: 'Metal',
      price: '$20',
      image: 'https://www.syracuse.com/resizer/v2/PSFTG32PW5EH3MFTQBWRRMFSSQ.jpg?auth=146312b081912d104f77ef32b5fc31b216a7b202ab49889724e8f538d531fe79&width=1280&smart=true&quality=90',
      fullDescription: 'Join us for an unforgettable night of live music! Incredible vibes guaranteed. Don\'t miss out! Metallica brings their legendary metal sound to an intimate venue.',
      lineup: ['Lead Vocals/Guitar: James Hetfield', 'Guitar: Kirk Hammett', 'Bass: Robert Trujillo', 'Drums: Lars Ulrich'],
      doors: '8:00 PM',
      showTime: '9:00 PM',
      ageRestriction: '21+',
      venueAddress: '456 Rock Avenue, Greensboro, NC'
    },
    2: {
      band: 'Wallows',
      venue: 'Paradise Rock',
      date: 'Monday 10PM',
      genre: 'Indie',
      price: '$25',
      image: 'https://www.rollingstone.com/wp-content/uploads/2024/03/Wallows-album-announcement-lead.jpg?w=1581&h=1054&crop=1',
      fullDescription: 'Wallows is an American indie rock band formed in 2017, featuring members Braeden Lemasters, Cole Preston, and Dylan Minnette, known for their alternative, bedroom pop, and post-punk sound. Their music features catchy hooks and has evolved from their 2018 EP Spring to albums like Nothing Happens (2019) and Model (2024).',
      lineup: ['Vocals/Guitar: Braeden Lemasters', 'Vocals/Guitar: Dylan Minnette', 'Drums: Cole Preston'],
      doors: '9:00 PM',
      showTime: '10:00 PM',
      ageRestriction: '18+',
      venueAddress: '789 Indie Lane, Greensboro, NC'
    },
    3: {
      band: 'The Cosmic Waves',
      venue: 'The Basement',
      date: 'Saturday 7PM',
      genre: 'Indie',
      price: '$30',
      image: 'https://picsum.photos/seed/3/600/400',
      fullDescription: 'Join us for an unforgettable night of live music! Intimate show guaranteed. Don\'t miss out!',
      lineup: ['Lead Vocals: Alex Chen', 'Guitar: Jordan Lee', 'Bass: Sam Rivera', 'Drums: Taylor Kim'],
      doors: '6:00 PM',
      showTime: '7:00 PM',
      ageRestriction: '21+',
      venueAddress: '321 Underground St, Greensboro, NC'
    },
    4: {
      band: 'The Urban Legends',
      venue: 'Electric Factory',
      date: 'Next Week',
      genre: 'Hip Hop',
      price: '$35',
      image: 'https://picsum.photos/seed/4/600/400',
      fullDescription: 'Join us for an unforgettable night of live music! High energy set guaranteed. Don\'t miss out!',
      lineup: ['MC: Marcus Flow', 'DJ: DJ Spin', 'Hype: Energy Mike'],
      doors: '8:00 PM',
      showTime: '9:00 PM',
      ageRestriction: '18+',
      venueAddress: '555 Beat Street, Greensboro, NC'
    }
  };

  const show = mockShows[id] || mockShows[0];
//function to handle saving and unsaving a show to local storage
  const handleSaveShow = () => {
    const savedShows = JSON.parse(localStorage.getItem('savedShows') || '[]');
    const showData = { id: parseInt(id), ...show };
    
    if (isSaved) {
      const filtered = savedShows.filter(s => s.id !== parseInt(id));
      localStorage.setItem('savedShows', JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      savedShows.push(showData);
      localStorage.setItem('savedShows', JSON.stringify(savedShows));
      setIsSaved(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        <Navbar />
        
        <div className="px-6 pt-28 pb-12 max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] mb-6">
            <div className="w-full h-96 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
              <img src={show.image} alt={show.band} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-6 right-6">
                <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full">
                  {show.genre}
                </span>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-white font-bold text-4xl mb-2">{show.band}</h1>
                <p className="text-white/70 text-lg">{show.venue}</p>
                <p className="text-purple-400 text-lg mt-1">{show.date}</p>
              </div>
              <span className="text-purple-400 font-bold text-3xl">{show.price}</span>
            </div>
            
            <p className="text-white/80 text-base leading-relaxed mb-6">{show.fullDescription}</p>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all">
                Buy Tickets
              </button>
              <button 
                onClick={handleSaveShow}
                className={`backdrop-blur-sm border text-white px-6 py-3 rounded-full transition-all ${
                  isSaved 
                    ? 'bg-red-600/60 hover:bg-red-600 border-red-400/40' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                ♥ {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Show Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Event Info</h2>
              <div className="space-y-3 text-white/80">
                <p><span className="text-purple-400 font-bold">Doors:</span> {show.doors}</p>
                <p><span className="text-purple-400 font-bold">Show Time:</span> {show.showTime}</p>
                <p><span className="text-purple-400 font-bold">Age:</span> {show.ageRestriction}</p>
                <p><span className="text-purple-400 font-bold">Location:</span> {show.venueAddress}</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Lineup</h2>
              <ul className="space-y-2 text-white/80">
                {show.lineup.map((member, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
