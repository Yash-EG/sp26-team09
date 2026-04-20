//imports react hook for nav and necessary components
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'
//main component feed
export default function Feed() {
  
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");
  const [feedItems, setFeedItems] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [savedShows, setSavedShows] = useState(new Set());
  //genre array for left sidebar
  const genres = ['Rock', 'Jazz', 'Blues', 'Country', 'Electronic', 'Hip Hop', 'Indie', 'Metal'];
  //feed data hardcoded temporarily until we connect to backend


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
    navigate(`/show/${item.showId}`);
  };
//fetch feed data and interested shows on component mount, and whenever customerId changes
useEffect(() => {
  const fetchData = async () => {
    try {
      const showsResponse = await fetch("http://localhost:8080/shows");
      if (!showsResponse.ok) {
        throw new Error("Failed to fetch shows");
      }
      //set feed items with data returned from backend
      const showsData = await showsResponse.json();

      //set items based on json returned
      setFeedItems(showsData);

    //fetch interested shows to determine which shows are saved by the user
      if (customerId) {
        const interestedResponse = await fetch(
          `http://localhost:8080/api/customers/${customerId}/interested`
        );

        if (!interestedResponse.ok) {
          throw new Error("Failed to fetch interested shows");
        }

        //create a set of showIds that the user is interested in for easy lookup when rendering feed items
        const interestedData = await interestedResponse.json();
        const interestedIds = interestedData.map(show => show.showId);
        setSavedShows(new Set(interestedIds));
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [customerId]);

//function to handle saving a show as interested, sends POST request if not already saved, DELETE request if already saved
const handleSaveShow = async (showId) => {
  try {
    const isSaved = savedShows.has(showId);

    const response = await fetch(
      `http://localhost:8080/api/customers/${customerId}/interested/${showId}`,
      {
        // Specify the HTTP method based on whether the show is already saved
        method: isSaved ? "DELETE" : "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update interested show");
    }

    // Update the savedShows state to reflect the change
    setSavedShows(prev => {
      const newSet = new Set(prev);
      if (isSaved) {
        newSet.delete(showId);
      } else {
        newSet.add(showId);
      }
      return newSet;
    });
  } catch (error) {
    console.error(error);
  }
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
              <article key={item.showId} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:bg-white/15 transition-all">
                {/* Show Image */}
                <div className="w-full h-64 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
                  <img src={item.image} alt={item.band.name} className="w-full h-full object-cover opacity-80" />
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
                      <span className="text-white text-lg font-bold">{item.band?.name?.[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl">{item.band.name}</h3>
                      <p className="text-white/70 text-sm">{item.location} • {item.date}</p>
                    </div>
                    <span className="text-purple-400 font-bold text-lg">{item.ticketPrice}</span>
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
                      onClick={() => handleSaveShow(item.showId)}
                      className={`backdrop-blur-sm border text-white px-4 py-2 rounded-full transition-all ${
                        savedShows.has(item.showId) 
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