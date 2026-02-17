//imports react hook for nav and necessary components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'
//main component feed
export default function Feed() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [savedShows, setSavedShows] = useState(new Set());
  //genre array for left sidebar
  const genres = ['Rock', 'Jazz', 'Blues', 'Country', 'Electronic', 'Hip Hop', 'Indie', 'Metal'];
  //feed data hardcoded temporarily until we connect to backend
  const feedItems = [
    {
      id: 0,
      band: 'Linkin Park',
      venue: 'The Roxy',
      date: 'TTomorrow 8 PM',
      genre: 'Nu Metal/Rock',
      description: 'From Zero',
      price: '$100',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQbR6DUFfTscAAJp_npKAUNgjqhK_Gb2cJ78ZypTh1ocWRlZeCxdF3fZffz3liESG_-ixAdT68erfXVU0dnGXAZ4RStaRN1ct3QJz2Q&s=10'
    },
    {
      id: 1,
      band: 'Metallica',
      venue: 'Black Cat',
      date: 'Feb 22, 9 PM',
      genre: 'Metal',
      description: 'Join us for an unforgettable night of live music! Incredible vibes guaranteed. Don\'t miss out!',
      price: '$20',
      image: 'https://www.syracuse.com/resizer/v2/PSFTG32PW5EH3MFTQBWRRMFSSQ.jpg?auth=146312b081912d104f77ef32b5fc31b216a7b202ab49889724e8f538d531fe79&width=1280&smart=true&quality=90'
    },
    {
      id: 2,
      band: 'Wallows',
      venue: 'Paradise Rock',
      date: 'Monday 10PM',
      genre: 'Indie',
      description: 'Wallows is an American indie rock band formed in 2017, featuring members Braeden Lemasters, Cole Preston, and Dylan Minnette, known for their alternative, bedroom pop, and post-punk sound. Their music features catchy hooks and has evolved from their 2018 EP Spring to albums like Nothing Happens (2019) and Model (2024). ',
      price: '$25',
      image: 'https://www.rollingstone.com/wp-content/uploads/2024/03/Wallows-album-announcement-lead.jpg?w=1581&h=1054&crop=1'
    },
    {
      id: 3,
      band: 'The Cosmic Waves',
      venue: 'The Basement',
      date: 'Saturday 7PM',
      genre: 'Indie',
      description: 'Join us for an unforgettable night of live music! Intimate show guaranteed. Don\'t miss out!',
      price: '$30',
      image: 'https://picsum.photos/seed/3/600/400'
    },
    {
      id: 4,
      band: 'The Urban Legends',
      venue: 'Electric Factory',
      date: 'Next Week',
      genre: 'Hip Hop',
      description: 'Join us for an unforgettable night of live music! High energy set guaranteed. Don\'t miss out!',
      price: '$35',
      image: 'https://picsum.photos/seed/4/600/400'
    },
  ];

//click to select genre, clicking again deselects it
  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    console.log('Genre selected:', genre);
  };
//click to select filter, clicking again deselects it
  const handleFilterClick = (filter) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
    console.log('Filter selected:', filter);
  };
//navigation to show details page with id param when view details button is clicked
  const handleViewDetails = (item) => {
    navigate(`/show/${item.id}`);
  };

  //temporary save/remove show
  const handleSaveShow = (itemId) => {
    setSavedShows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        console.log('Removed from saved shows:', itemId);
      } else {
        newSet.add(itemId);
        console.log('Added to saved shows:', itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        <Navbar />
        
        <div className="flex gap-6 px-6 pt-28 pb-12 max-w-7xl mx-auto">
          {/* Left Sidebar - Genres */}
          <aside className="w-64 flex-shrink-0">
            <div className="backdrop-blur-xl bg-white/10 border border-purple-600/20 rounded-3xl p-6 sticky top-28">
              <h2 className="text-white font-bold text-lg tracking-widest uppercase mb-4">Genres</h2>
              <div className="flex flex-col gap-2">
                {genres.map(genre => (
                  <button 
                    key={genre} 
                    onClick={() => handleGenreClick(genre)}
                    className={`bg-white/5 hover:bg-purple-600/40 border border-white/10 text-white text-sm tracking-wide px-4 py-2 rounded-full transition-all text-left ${
                      selectedGenre === genre ? 'bg-purple-600/40 border-purple-400/40' : ''
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Feed */}
          <main className="flex-1 space-y-6">
            {feedItems.map(item => (
              <article key={item.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:bg-white/15 transition-all">
                {/* Show Image */}
                <div className="w-full h-64 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
                  <img src={item.image} alt={item.band} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                      {item.genre}
                    </span>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">{item.band[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl">{item.band}</h3>
                      <p className="text-white/70 text-sm">{item.venue} • {item.date}</p>
                    </div>
                    <span className="text-purple-400 font-bold text-lg">{item.price}</span>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{item.description}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="flex-1 bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleSaveShow(item.id)}
                      className={`backdrop-blur-sm border text-white px-4 py-2 rounded-full transition-all ${
                        savedShows.has(item.id) 
                          ? 'bg-red-600/60 hover:bg-red-600 border-red-400/40' 
                          : 'bg-white/10 hover:bg-white/20 border-white/20'
                      }`}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </main>

          {/* Right Sidebar - Trending */}
          <aside className="w-64 flex-shrink-0">
            <div className="backdrop-blur-xl bg-white/10 border border-purple-600/20 rounded-3xl p-6 sticky top-28">
              <h2 className="text-white font-bold text-lg tracking-widest uppercase mb-4">Trending</h2>
              <div className="space-y-3">
                {['Tonight', 'This Week', 'Near You'].map(filter => (
                  <button 
                    key={filter} 
                    onClick={() => handleFilterClick(filter)}
                    className={`bg-white/5 hover:bg-purple-600/40 border border-white/10 text-white text-sm tracking-wide px-4 py-2 rounded-full transition-all w-full text-left ${
                      selectedFilter === filter ? 'bg-purple-600/40 border-purple-400/40' : ''
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}